import { useNavigate } from "react-router";

const STAGES = [
  "아이디어 기획",
  "서비스 디자인",
  "프론트 개발",
  "백앤드 개발",
  "배포 & 고객 테스트",
];

interface TeamMember {
  id: string;
  initial: string;
  color: string;
}

interface Activity {
  tag: string;
  title: string;
  description: string;
  time: string;
}

interface TeamCard {
  id: string;
  name: string;
  badge?: string;
  projectTitle: string;
  members: TeamMember[];
  progress: number;
  completedStages: number;
  activities: Activity[];
}

interface Announcement {
  title: string;
  description: string;
  dDay: number;
}

const teams: TeamCard[] = [
  {
    id: "1",
    name: "1조",
    badge: "🔥 🚀 가장 조회수가 높은 조",
    projectTitle: "캠퍼스 카풀 웹서비스",
    members: [
      { id: "1", initial: "김", color: "bg-[#e5e7eb]" },
      { id: "2", initial: "이", color: "bg-[#d1d5dc]" },
      { id: "3", initial: "박", color: "bg-[#99a1af]" },
    ],
    progress: 50,
    completedStages: 3,
    activities: [
      {
        tag: "트러블슈팅",
        title: "트러블슈팅 로그 추가",
        description: "API 아이디어 추가가 필요합니다. 오류 관련해서 추가적인 검토가 필요한 사항입니다.",
        time: "방금 전",
      },
      {
        tag: "진행사항",
        title: "API 오류 해결",
        description: "인증 토큰 만료 문제 수정 완료. 로그인 흐름 전반 재점검이 필요합니다.",
        time: "방금 전",
      },
    ],
  },
  {
    id: "2",
    name: "2조",
    badge: "",
    projectTitle: "중고 전공책 거래 커뮤니티",
    members: [
      { id: "4", initial: "김", color: "bg-[#e5e7eb]" },
      { id: "5", initial: "이", color: "bg-[#d1d5dc]" },
      { id: "6", initial: "박", color: "bg-[#99a1af]" },
    ],
    progress: 25,
    completedStages: 1,
    activities: [],
  },
  {
    id: "3",
    name: "3조",
    badge: "🔥 🚀 교수님께서 가장 오래 머무른 조",
    projectTitle: "AI 학식 메뉴 추천",
    members: [
      { id: "7", initial: "한", color: "bg-[#e5e7eb]" },
      { id: "8", initial: "오", color: "bg-[#d1d5dc]" },
      { id: "9", initial: "임", color: "bg-[#99a1af]" },
    ],
    progress: 75,
    completedStages: 4,
    activities: [
      {
        tag: "제출",
        title: "print.py 제출 완료",
        description: "데이터 전처리 코드를 제출했습니다. 다음 단계로 모델 학습을 진행할 예정입니다.",
        time: "방금 전",
      },
    ],
  },
  {
    id: "4",
    name: "4조",
    badge: "데이터 관련 도움이 필요한 조, sos",
    projectTitle: "스터디 매칭 시스템",
    members: [
      { id: "10", initial: "배", color: "bg-[#e5e7eb]" },
      { id: "11", initial: "송", color: "bg-[#d1d5dc]" },
      { id: "12", initial: "김", color: "bg-[#99a1af]" },
    ],
    progress: 50,
    completedStages: 3,
    activities: [
      {
        tag: "이슈",
        title: "데이터 연동이 안되는 문제발생",
        description: "서버와 클라이언트 간 데이터 연동 오류. 현재 디버깅 중이며 내일까지 해결 예정입니다.",
        time: "방금 전",
      },
    ],
  },
  {
    id: "5",
    name: "5조",
    badge: "",
    projectTitle: "유학생 튜터링 플랫폼",
    members: [
      { id: "13", initial: "박", color: "bg-[#e5e7eb]" },
      { id: "14", initial: "아", color: "bg-[#d1d5dc]" },
    ],
    progress: 50,
    completedStages: 3,
    activities: [],
  },
];

const announcements: Announcement[] = [
  {
    title: "중간발표 관련 공지",
    description:
      "해결방안에 맞는 POC 초안설계(핵심기능위주, Figma 활용), 검토 및 수정(10주차까지 2주의 시간이 있으므로 수업 이외시간에 진행가능보임)",
    dDay: 3,
  },
  {
    title: "주제 발표 공지 (11주차, 12주차 진행)",
    description:
      "이번 주제발표는 \"우리 프로젝트를 더 좋게 만들기 위한 실전 적용 발표\"이며, 다른 팀도 바로 활용할 수 있게 만드는 발표, 그리고 발표 후 서로 자연스럽게 묻고 배우는 시간까지 포함한 활동입니다.",
    dDay: 18,
  },
];

function StageProgress({ completedStages }: { completedStages: number }) {
  return (
    <div className="flex flex-col">
      {STAGES.map((stage, i) => {
        const isDone = i < completedStages;
        const isLineBlue = i < completedStages - 1;
        return (
          <div key={stage}>
            {/* Stage row */}
            <div className="flex items-center gap-2">
              {/* Dot */}
              <div
                className={`w-[18px] h-[18px] rounded-full flex-shrink-0 ${isDone ? "bg-[#3676ff]" : "bg-black"
                  }`}
              />
              {/* Label */}
              <div className="flex-1 bg-[#d2e0ff] border border-[#0143d2] rounded-[5px] px-2 py-[3px]">
                <span className="text-[#101828] text-[11px] font-medium">
                  {stage}
                </span>
              </div>
            </div>
            {/* Connector line between stages */}
            {i < STAGES.length - 1 && (
              <div
                className={`ml-[5.5px] w-[7px] h-[10px] ${isLineBlue ? "bg-[#3676ff]" : "bg-[#c8c8c8]"
                  } rounded-sm`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function ActivityCard({ activity }: { activity: Activity }) {
  return (
    <div className="bg-white border border-[#d2e0ff] rounded-[10px] p-3 shadow-sm">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] font-bold text-[#3676ff] bg-[#eff6ff] px-2 py-0.5 rounded-full">
          {activity.tag}
        </span>
        <span className="text-[10px] text-gray-400">{activity.time}</span>
      </div>
      <p className="text-[11px] font-bold text-[#101828] mb-0.5">{activity.title}</p>
      <p className="text-[10px] text-gray-500 leading-[1.4] line-clamp-2">
        {activity.description}
      </p>
    </div>
  );
}

function TeamCardComponent({
  team,
  onClick,
}: {
  team: TeamCard;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-[14px] border border-gray-200 shadow-[2px_4px_4px_2px_rgba(224,224,224,0.28)] overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col"
    >
      {/* Blue gradient header */}
      <div className="bg-gradient-to-r from-[#3676ff] to-[#003ecc] px-5 py-5 border-b border-black/10 flex-shrink-0">
        <p className="text-white font-black text-3xl leading-none mb-1">
          {team.name}
        </p>
        {team.badge && (
          <p className="text-white text-xs font-bold leading-snug mt-1">
            {team.badge}
          </p>
        )}
        {!team.badge && <div className="h-4" />}
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col gap-4 flex-1">
        {/* Project title */}
        <p className="text-[#101828] font-bold text-base text-center">
          {team.projectTitle}
        </p>

        {/* Enter button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className="w-full bg-[#3676ff] text-white rounded-[10px] py-2 font-bold flex items-center justify-center gap-2 hover:bg-[#255dd4] transition-colors text-sm shadow-md"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M10.6239 13.9775L14.4999 10L10.6239 6.02252M14.4999 10H5.98347M1 15.625L1 4.37498C1 2.51103 2.51103 1 4.37498 1L15.6249 1C17.4889 1 18.9999 2.51103 18.9999 4.37498V15.625C18.9999 17.489 17.4889 19 15.6249 19H4.37498C2.51103 19 1 17.489 1 15.625Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          입장하기
        </button>

        {/* Progress label */}
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#3676ff]" />
          <span className="text-[#3676ff] text-xs font-bold">
            {team.progress}% 진행중
          </span>
        </div>

        {/* Stage progress */}
        <StageProgress completedStages={team.completedStages} />

        {/* Recent activity */}
        <div>
          <p className="text-xs font-bold text-gray-600 mb-2 flex items-center gap-1">
            📋 최근 업데이트 & 활동
          </p>
          {team.activities.length > 0 ? (
            <div className="flex flex-col gap-2">
              {team.activities.map((activity, idx) => (
                <ActivityCard key={idx} activity={activity} />
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-[10px] p-3 text-center">
              <p className="text-[11px] text-gray-400">아직 활동 기록이 없습니다</p>
            </div>
          )}
        </div>
      </div>

      {/* Member avatars at bottom */}
      <div className="px-5 pb-4 flex items-center gap-1 flex-shrink-0">
        {team.members.map((member) => (
          <div
            key={member.id}
            className={`w-8 h-8 ${member.color} rounded-full flex items-center justify-center border-2 border-white shadow-sm`}
          >
            <span className="text-[10px] font-bold text-[#364153]">
              {member.initial}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-[#111827] text-white mt-16">
      <div className="max-w-6xl mx-auto px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <p className="text-xl font-bold mb-2">CampusConnect</p>
          <p className="text-gray-400 text-sm leading-relaxed">
            학생들의 팀 프로젝트 협업을 위한
            <br />
            올인원 플랫폼
          </p>
        </div>
        <div>
          <p className="font-semibold mb-3">연락처</p>
          <ul className="text-gray-400 text-sm space-y-2">
            <li>✉ support@campusconnect.com</li>
            <li>📞 02-1234-5678</li>
            <li>📍 서울특별시 광진구 능동로 209</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold mb-3">바로가기</p>
          <ul className="text-gray-400 text-sm space-y-2">
            <li><a href="#" className="hover:text-white transition-colors">이용약관</a></li>
            <li><a href="#" className="hover:text-white transition-colors">개인정보처리방침</a></li>
            <li><a href="#" className="hover:text-white transition-colors">공지사항</a></li>
            <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 py-6 text-center text-gray-500 text-xs space-y-1">
        <p>© 2026 CampusConnect. All rights reserved.</p>
        <p>본 서비스는 교육 목적으로 제작된 프로젝트입니다.</p>
      </div>
    </footer>
  );
}

export default function TeamsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 max-w-7xl mx-auto w-full px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black text-[#155dfc] tracking-tight">
            [2026-1] [웹프로그래밍] [가반]
          </h1>
          <button className="bg-[#1962ff] text-white px-5 py-2.5 rounded-[10px] font-bold hover:bg-[#1450e0] transition-colors shadow-md text-sm">
            + 새 팀 만들기
          </button>
        </div>

        {/* Team cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {teams.map((team) => (
            <TeamCardComponent
              key={team.id}
              team={team}
              onClick={() => navigate(`/app/teams/${team.id}`)}
            />
          ))}
        </div>

        {/* Announcements */}
        <div className="mt-12">
          <h2 className="text-xl font-black text-[#101828] mb-5 flex items-center gap-2">
            📌 중요 공지 &amp; 마감일
          </h2>
          <div className="flex flex-col gap-4">
            {announcements.map((ann, i) => (
              <div
                key={i}
                className="bg-white rounded-[14px] border border-gray-200 shadow-sm p-6 flex items-start justify-between gap-6"
              >
                <div className="flex-1">
                  <p className="font-bold text-[#101828] text-base mb-2">
                    {ann.title}
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {ann.description}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <span className="bg-[#fee2e2] text-[#dc2626] text-sm font-bold px-3 py-1 rounded-full">
                    D-{ann.dDay}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
