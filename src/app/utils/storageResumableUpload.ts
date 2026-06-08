import * as tus from "tus-js-client";
import { supabase } from "../supabase";

/** Supabase 권장: 6MB 초과 시 TUS 재개 업로드 */
export const STORAGE_RESUMABLE_THRESHOLD_BYTES = 6 * 1024 * 1024;
const TUS_CHUNK_SIZE = 6 * 1024 * 1024;

export type StorageUploadOptions = {
  bucket: string;
  path: string;
  file: File;
  contentType?: string;
  cacheControl?: string;
  upsert?: boolean;
};

function getResumableUploadEndpoint(): string {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.replace(/\/$/, "");
  if (!supabaseUrl) {
    throw new Error("Supabase URL이 설정되지 않았습니다.");
  }

  let hostname: string;
  try {
    hostname = new URL(supabaseUrl).hostname;
  } catch {
    throw new Error("Supabase URL 형식이 올바르지 않습니다.");
  }

  const projectRef = hostname.split(".")[0];
  return `https://${projectRef}.storage.supabase.co/storage/v1/upload/resumable`;
}

function getStorageAuthHeaders(): Record<string, string> {
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (!anonKey) {
    throw new Error("Supabase API 키가 설정되지 않았습니다.");
  }

  return {
    authorization: `Bearer ${anonKey}`,
    apikey: anonKey,
  };
}

async function uploadViaTus(options: StorageUploadOptions): Promise<void> {
  const { bucket, path, file, contentType, cacheControl = "3600", upsert = false } = options;
  const endpoint = getResumableUploadEndpoint();
  const headers = getStorageAuthHeaders();
  if (upsert) {
    headers["x-upsert"] = "true";
  }

  await new Promise<void>((resolve, reject) => {
    const upload = new tus.Upload(file, {
      endpoint,
      retryDelays: [0, 1000, 3000, 5000, 10000],
      headers,
      uploadDataDuringCreation: true,
      removeFingerprintOnSuccess: true,
      chunkSize: TUS_CHUNK_SIZE,
      metadata: {
        bucketName: bucket,
        objectName: path,
        contentType: contentType || file.type || "application/octet-stream",
        cacheControl,
      },
      onError: (error) => reject(error),
      onSuccess: () => resolve(),
    });

    void upload
      .findPreviousUploads()
      .then((previousUploads) => {
        if (previousUploads.length > 0) {
          upload.resumeFromPreviousUpload(previousUploads[0]);
        }
        upload.start();
      })
      .catch(reject);
  });
}

export async function uploadFileToStorage(options: StorageUploadOptions): Promise<void> {
  const { bucket, path, file, contentType, cacheControl, upsert } = options;

  if (file.size > STORAGE_RESUMABLE_THRESHOLD_BYTES) {
    await uploadViaTus(options);
    return;
  }

  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: cacheControl ?? "3600",
    upsert: upsert ?? false,
    contentType: contentType || file.type || undefined,
  });
  if (error) throw error;
}
