const fs = require("fs");
const p = "src/app/pages/MyPage.tsx";
const s = fs.readFileSync(p, "utf8");
const old =
  '            <div className="border-t border-gray-200 pt-4 text-center">\n' +
  '              <p className="text-[9px] font-bold leading-4 text-[#64748b]">\n' +
  "                본 화면은 현재 하드코딩된 예시 리포트입니다. 추후 ai_users, ai_courses, ai_teams, ai_team_detail_* 데이터를 집계하여 자동 생성하도록 확장할 수 있습니다.\n" +
  "              </p>\n" +
  "            </div>";
const neu =
  '            <div className="border-t border-gray-200 pt-4 text-center space-y-3">\n' +
  '              <p className="text-[9px] font-bold leading-4 text-[#64748b]">\n' +
  "                본 화면은 현재 하드코딩된 예시 리포트입니다. Supabase 집계 + Edge Function 배포 후 자동 생성됩니다.\n" +
  "              </p>\n" +
  '              <button\n' +
  '                type="button"\n' +
  "                onClick={handleGenerateAiReport}\n" +
  "                disabled={aiReportLoading}\n" +
  '                className="rounded-lg bg-[#155dfc] px-4 py-2 text-[11px] font-bold text-white disabled:opacity-50"\n' +
  "              >\n" +
  '                {aiReportLoading ? "생성 중…" : "AI 리포트 생성 (베타)"}\n' +
  "              </button>\n" +
  "              {aiReportMessage && (\n" +
  '                <p className="text-[10px] font-medium text-[#475569]">{aiReportMessage}</p>\n' +
  "              )}\n" +
  "            </div>";
if (!s.includes(old)) {
  console.error("OLD NOT FOUND");
  process.exit(1);
}
fs.writeFileSync(p, s.replace(old, neu));
console.log("ok");
