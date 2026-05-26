import { useEffect, useMemo, useRef } from "react";
import { supabase } from "../supabase";

type RealtimeTableSpec = {
  table: string;
  filter?: string;
  events?: Array<"INSERT" | "UPDATE" | "DELETE">;
};

/**
 * Supabase postgres_changes → debounced reload (vision #143)
 */
export function useDebouncedRealtimeReload(
  channelKey: string,
  enabled: boolean,
  reload: () => void | Promise<void>,
  tables: RealtimeTableSpec[],
  debounceMs = 450
) {
  const reloadRef = useRef(reload);
  reloadRef.current = reload;
  const tablesKey = useMemo(() => JSON.stringify(tables), [tables]);

  useEffect(() => {
    if (!enabled || tables.length === 0) return;

    let timer: ReturnType<typeof setTimeout> | undefined;
    const scheduleReload = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        void reloadRef.current();
      }, debounceMs);
    };

    let channel = supabase.channel(channelKey);
    for (const spec of tables) {
      const events = spec.events ?? ["INSERT", "UPDATE", "DELETE"];
      for (const event of events) {
        channel = channel.on(
          "postgres_changes",
          {
            event,
            schema: "public",
            table: spec.table,
            ...(spec.filter ? { filter: spec.filter } : {}),
          },
          scheduleReload
        );
      }
    }

    channel.subscribe((status, err) => {
      if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
        console.warn(`Realtime ${channelKey}:`, status, err);
      }
    });

    return () => {
      if (timer) clearTimeout(timer);
      void supabase.removeChannel(channel);
    };
  }, [channelKey, debounceMs, enabled, tablesKey]);
}
