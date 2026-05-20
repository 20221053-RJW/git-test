import React, { useState, useEffect } from "react";
import type { Team, TeamMember } from "../types";
import { api } from "../api/supabase-api";

export default function RandomTeamPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamSize, setTeamSize] = useState(4);
  const [students, setStudents] = useState<TeamMember[]>([]);

  useEffect(() => {
    // Supabase의 ai_users와 수강 관계에서 가져온 학생 목록을 팀원 형태로 바꿉니다.
    api.students.getAll().then((data) => {
      const members: TeamMember[] = data.map((s) => ({
        id: s.id,
        name: s.name,
        studentId: s.studentId,
      }));
      setStudents(members);
    });
  }, []);

  const generateRandomTeams = () => {

    // 랜덤 섞기
    const shuffled = [...students].sort(() => Math.random() - 0.5);

    // 팀 나누기
    const newTeams: Team[] = [];
    for (let i = 0; i < shuffled.length; i += teamSize) {
      newTeams.push({
        id: `team-${newTeams.length + 1}`,
        name: `팀 ${newTeams.length + 1}`,
        members: shuffled.slice(i, i + teamSize),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    setTeams(newTeams);
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-2xl font-black text-gray-900 sm:text-3xl">랜덤 팀 생성</h1>

      <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center">
          <label className="text-gray-700 font-medium">팀당 인원:</label>
          <input
            type="number"
            min="2"
            max="10"
            value={teamSize}
            onChange={(e) => setTeamSize(Number(e.target.value))}
            className="border border-gray-300 rounded px-3 py-2 w-20"
          />
          <button
            onClick={generateRandomTeams}
            className="w-full rounded bg-blue-600 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-700 sm:w-auto"
          >
            팀 생성하기
          </button>
        </div>
      </div>

      {teams.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {teams.map((team) => (
            <div key={team.id} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {team.name}
              </h2>
              <ul className="space-y-2">
                {team.members.map((member) => (
                  <li
                    key={member.id}
                    className="flex items-center gap-3 text-gray-700"
                  >
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {(member.name ?? "").charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium">{member.name ?? ""}</div>
                      <div className="text-sm text-gray-500">
                        {member.studentId}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
