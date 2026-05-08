import { useState } from "react";

interface ProfessorProfile {
  name: string;
  department: string;
  office: string;
  email: string;
  researchAreas: string[];
  officeHours: string;
}

export default function ProfessorProfilePage() {
  const [profile] = useState<ProfessorProfile>({
    name: "김교수",
    department: "컴퓨터공학부",
    office: "공학관 301호",
    email: "professor@example.com",
    researchAreas: ["웹 기술", "소프트웨어 공학", "인공지능"],
    officeHours: "화, 목 15:00-17:00",
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center mb-6">
          <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mr-6">
            {profile.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
            <p className="text-gray-600">{profile.department}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">연구실</h2>
            <p className="text-gray-700">{profile.office}</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">이메일</h2>
            <p className="text-gray-700">{profile.email}</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">연구 분야</h2>
            <div className="flex flex-wrap gap-2">
              {profile.researchAreas.map((area) => (
                <span
                  key={area}
                  className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Office Hours
            </h2>
            <p className="text-gray-700">{profile.officeHours}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
