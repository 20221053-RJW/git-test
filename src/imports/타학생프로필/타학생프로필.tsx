import svgPaths from "./svg-obj4npmc9d";
import imgImage from "./aa91fc3bfd83a40f05adc58f5ebf933c8383813b.png";
import imgImage1 from "./406d529a56f3b9d9ad3e662c6d776c55f3e2aa9b.png";
import imgImage2 from "./9de9fdaeffd8fddb608de811ab9b40d6f981daba.png";
import img20260429221251 from "./23a4a1e81e141c51141955a4a528bc7ea5d88b55.png";
import imgFrame from "./a7a153f0ca347bb07eae4e478325ec3f1f013e3a.png";
import imgImage3 from "./600b289b15a5b37539669090e9d37a1565429567.png";

function Container1() {
  return (
    <div className="absolute content-stretch flex h-[32px] items-start left-[32px] top-[16px] w-[200.359px]" data-name="Container">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[32px] not-italic relative shrink-0 text-[24px] text-white tracking-[1.2px] whitespace-nowrap">CampusConnect</p>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute h-[30px] left-[140px] top-0 w-[32px]" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold leading-[24px] left-[16px] not-italic text-[#d1d5dc] text-[16px] text-center top-px whitespace-nowrap">수업</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute h-[30px] left-[204.39px] top-0 w-[84px]" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold leading-[24px] left-[32.5px] not-italic text-[#3676ff] text-[16px] text-center top-[-4px] whitespace-nowrap">수강자들</p>
      <div className="absolute h-0 left-[8px] top-[28px] w-[50px]">
        <div className="absolute inset-[-3px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 50 3">
            <line id="Line 2" stroke="var(--stroke-0, #2F67DF)" strokeWidth="3" x2="50" y1="1.5" y2="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="flex-[1_0_0] h-[30px] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Button />
        <Button1 />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="bg-[#2f67df] relative rounded-[16777200px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">류</p>
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="flex-[1_0_0] h-[20px] min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[14px] text-white top-[-0.5px] whitespace-nowrap">류지원</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[32px] relative shrink-0 w-[82px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Container5 />
        <Text />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute content-stretch flex gap-[32px] h-[32px] items-center left-[808.61px] top-[16px] w-[439.391px]" data-name="Container">
      <Container3 />
      <Container4 />
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute h-[30px] left-[1118px] top-[20px] w-[16px]" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold leading-[24px] left-[8.5px] not-italic text-[16px] text-center text-white top-[-2px] whitespace-nowrap">팀</p>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Container">
      <Container1 />
      <Container2 />
      <Button2 />
    </div>
  );
}

function Navigation() {
  return (
    <div className="absolute bg-gradient-to-r content-stretch flex flex-col from-[#0028bb] h-[64px] items-start left-0 px-[128px] to-black top-0 via-[#001663] via-[35%] w-[1536px]" data-name="Navigation">
      <div aria-hidden="true" className="absolute border-[#3676ff] border-b-3 border-solid inset-0 pointer-events-none shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)]" />
      <Container />
    </div>
  );
}

function PlaceholderForApp() {
  return (
    <div className="absolute h-[64px] left-0 top-0 w-[1536px]" data-name="Placeholder for App">
      <Navigation />
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[32px] relative shrink-0 w-[200.438px]" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="flex-[1_0_0] font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[32px] min-w-px not-italic relative text-[#155dfc] text-[24px]">수강자들 네트워크</p>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[358.75px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#ebebeb] text-[14px] top-[-0.5px] whitespace-nowrap">프로필을 클릭하여 자기소개와 포트폴리오를 확인하세요.</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute content-stretch flex h-[32px] items-end justify-between left-0 right-0 top-0" data-name="Container">
      <Heading />
      <Text1 />
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[32px] relative shrink-0 w-[24px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[32px] not-italic relative shrink-0 text-[#2b7fff] text-[24px] text-center whitespace-nowrap">류</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute bg-[#eff6ff] content-stretch flex items-center justify-center left-[146.5px] overflow-clip px-[20px] rounded-[16777200px] size-[64px] top-[24px]" data-name="Container">
      <Text2 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="absolute h-[28px] left-[132.89px] top-[104px] w-[91.219px]" data-name="Heading 4">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[28px] left-[46px] not-italic text-[#101828] text-[18px] text-center top-[-1px] whitespace-nowrap">류지원 (나)</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start left-[67.79px] top-[140px] w-[221.414px]" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[16px] min-w-px not-italic relative text-[#6a7282] text-[12px] text-center">벤처중소기업학 / 글로벌미디어 복수전공</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[19.5px] left-[137.22px] not-italic text-[#1c398e] text-[12px] text-center top-[-0.5px] whitespace-nowrap">이번 프로젝트에서 개발 역할을 하고 싶습니다!</p>
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute bg-[#eff6ff] content-stretch flex flex-col h-[45.5px] items-start left-[24px] pb-px pt-[13px] px-[17px] rounded-[10px] top-[172px] w-[309px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#bedbff] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Paragraph1 />
    </div>
  );
}

function Text3() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[27px] left-[44.55px] rounded-[16777200px] top-0 w-[80.031px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[15px] left-[40px] not-italic text-[#4a5565] text-[10px] text-center top-[5.5px] whitespace-nowrap">#기획/디자인</p>
    </div>
  );
}

function Text4() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[27px] left-[130.58px] rounded-[16777200px] top-0 w-[86.07px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[15px] left-[43px] not-italic text-[#4a5565] text-[10px] text-center top-[5.5px] whitespace-nowrap">#기아타이거즈</p>
    </div>
  );
}

function Text5() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[27px] left-[222.65px] rounded-[16777200px] top-0 w-[41.805px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-[21px] not-italic text-[#4a5565] text-[10px] text-center top-[5.5px] whitespace-nowrap">#TFT</p>
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute h-[27px] left-[24px] top-[233.5px] w-[309px]" data-name="Container">
      <Text3 />
      <Text4 />
      <Text5 />
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute bg-white border-2 border-[#2b7fff] border-solid h-[343px] left-0 rounded-[14px] top-[258px] w-[361px]" data-name="Container">
      <Container12 />
      <Heading2 />
      <Paragraph />
      <Container13 />
      <Container14 />
    </div>
  );
}

function Image() {
  return (
    <div className="relative shrink-0 size-[64px]" data-name="Image (김철수)">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage} />
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute bg-[#eff6ff] content-stretch flex items-center justify-center left-[146.5px] overflow-clip rounded-[16777200px] size-[64px] top-[24px]" data-name="Container">
      <Image />
    </div>
  );
}

function Heading3() {
  return (
    <div className="absolute h-[28px] left-[151.5px] top-[104px] w-[54px]" data-name="Heading 4">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[28px] left-[27px] not-italic text-[#101828] text-[18px] text-center top-[-1px] whitespace-nowrap">김철수</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start left-[142.5px] top-[140px] w-[72px]" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[16px] min-w-px not-italic relative text-[#6a7282] text-[12px] text-center">시각디자인과</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[19.5px] left-[137.68px] not-italic text-[#1c398e] text-[12px] text-center top-[-0.5px] whitespace-nowrap">UI/UX 중심의 프론트엔드 개발을 맡고 싶습니다!</p>
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute bg-[#eff6ff] content-stretch flex flex-col h-[45.5px] items-start left-[24px] pb-px pt-[13px] px-[17px] rounded-[10px] top-[172px] w-[309px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#bedbff] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Paragraph3 />
    </div>
  );
}

function Text6() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[27px] left-[21.13px] rounded-[16777200px] top-0 w-[52.797px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-[26px] not-italic text-[#4a5565] text-[10px] text-center top-[5.5px] whitespace-nowrap">#UI/UX</p>
    </div>
  );
}

function Text7() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[27px] left-[79.93px] rounded-[16777200px] top-0 w-[56.07px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[15px] left-[28px] not-italic text-[#4a5565] text-[10px] text-center top-[5.5px] whitespace-nowrap">#피그마</p>
    </div>
  );
}

function Text8() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[27px] left-[142px] rounded-[16777200px] top-0 w-[66.07px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[15px] left-[33px] not-italic text-[#4a5565] text-[10px] text-center top-[5.5px] whitespace-nowrap">#퍼블리싱</p>
    </div>
  );
}

function Text9() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[27px] left-[214.07px] rounded-[16777200px] top-0 w-[73.797px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-[37.5px] not-italic text-[#4a5565] text-[10px] text-center top-[5.5px] whitespace-nowrap">#HTML/CSS</p>
    </div>
  );
}

function Text10() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[27px] left-[41.6px] rounded-[16777200px] top-[33px] w-[70.211px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-[35px] not-italic text-[#4a5565] text-[10px] text-center top-[5.5px] whitespace-nowrap">#JavaScript</p>
    </div>
  );
}

function Text11() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[27px] left-[117.81px] rounded-[16777200px] top-[33px] w-[149.586px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[15px] left-[75px] not-italic text-[#4a5565] text-[10px] text-center top-[5.5px] whitespace-nowrap">#일러스트레이팅 좋아합니다</p>
    </div>
  );
}

function Text12() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[27px] left-[111.46px] rounded-[16777200px] top-[66px] w-[86.07px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[15px] left-[43px] not-italic text-[#4a5565] text-[10px] text-center top-[5.5px] whitespace-nowrap">#프로토타이핑</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute h-[93px] left-[24px] top-[233.5px] w-[309px]" data-name="Container">
      <Text6 />
      <Text7 />
      <Text8 />
      <Text9 />
      <Text10 />
      <Text11 />
      <Text12 />
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute bg-white border-2 border-[#e5e7eb] border-solid h-[343px] left-[381px] rounded-[14px] top-[258px] w-[361px]" data-name="Container">
      <Container16 />
      <Heading3 />
      <Paragraph2 />
      <Container17 />
      <Container18 />
    </div>
  );
}

function Text13() {
  return (
    <div className="h-[32px] relative shrink-0 w-[24px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[32px] not-italic relative shrink-0 text-[#2b7fff] text-[24px] text-center whitespace-nowrap">이</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute bg-[#eff6ff] content-stretch flex items-center justify-center left-[146.5px] overflow-clip px-[20px] rounded-[16777200px] size-[64px] top-[24px]" data-name="Container">
      <Text13 />
    </div>
  );
}

function Heading4() {
  return (
    <div className="absolute h-[28px] left-[151.5px] top-[104px] w-[54px]" data-name="Heading 4">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[28px] left-[27px] not-italic text-[#101828] text-[18px] text-center top-[-1px] whitespace-nowrap">이영희</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start left-[142.5px] top-[140px] w-[72px]" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[16px] min-w-px not-italic relative text-[#6a7282] text-[12px] text-center">소프트웨어학</p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[19.5px] left-[137.72px] not-italic text-[#1c398e] text-[12px] text-center top-[-0.5px] whitespace-nowrap">안정적인 백엔드 API 서버 구축을 담당하겠습니다!</p>
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute bg-[#eff6ff] content-stretch flex flex-col h-[45.5px] items-start left-[24px] pb-px pt-[13px] px-[17px] rounded-[10px] top-[172px] w-[309px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#bedbff] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Paragraph5 />
    </div>
  );
}

function Text14() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[27px] left-[24.74px] rounded-[16777200px] top-0 w-[56.07px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[15px] left-[28px] not-italic text-[#4a5565] text-[10px] text-center top-[5.5px] whitespace-nowrap">#백엔드</p>
    </div>
  );
}

function Text15() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[27px] left-[86.81px] rounded-[16777200px] top-0 w-[60.07px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-[30.5px] not-italic text-[#4a5565] text-[10px] text-center top-[5.5px] whitespace-nowrap">#Node.js</p>
    </div>
  );
}

function Text16() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[27px] left-[152.88px] rounded-[16777200px] top-0 w-[66.07px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[15px] left-[33px] not-italic text-[#4a5565] text-[10px] text-center top-[5.5px] whitespace-nowrap">#서버배포</p>
    </div>
  );
}

function Text17() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[27px] left-[224.95px] rounded-[16777200px] top-0 w-[59.305px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-[30px] not-italic text-[#4a5565] text-[10px] text-center top-[5.5px] whitespace-nowrap">#Express</p>
    </div>
  );
}

function Text18() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[27px] left-[55.55px] rounded-[16777200px] top-[33px] w-[72.039px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-[36.5px] not-italic text-[#4a5565] text-[10px] text-center top-[5.5px] whitespace-nowrap">#MongoDB</p>
    </div>
  );
}

function Text19() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[27px] left-[133.59px] rounded-[16777200px] top-[33px] w-[66.617px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-[33.5px] not-italic text-[#4a5565] text-[10px] text-center top-[5.5px] whitespace-nowrap">#REST API</p>
    </div>
  );
}

function Text20() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[27px] left-[206.21px] rounded-[16777200px] top-[33px] w-[47.234px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-[24.5px] not-italic text-[#4a5565] text-[10px] text-center top-[5.5px] whitespace-nowrap">#AWS</p>
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute h-[60px] left-[24px] top-[233.5px] w-[309px]" data-name="Container">
      <Text14 />
      <Text15 />
      <Text16 />
      <Text17 />
      <Text18 />
      <Text19 />
      <Text20 />
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute bg-white border-2 border-[#e5e7eb] border-solid h-[343px] left-[762px] rounded-[14px] top-[258px] w-[361px]" data-name="Container">
      <Container20 />
      <Heading4 />
      <Paragraph4 />
      <Container21 />
      <Container22 />
    </div>
  );
}

function Text21() {
  return (
    <div className="h-[32px] relative shrink-0 w-[24px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[32px] not-italic relative shrink-0 text-[#2b7fff] text-[24px] text-center whitespace-nowrap">박</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute bg-[#eff6ff] content-stretch flex items-center justify-center left-[146.5px] overflow-clip px-[20px] rounded-[16777200px] size-[64px] top-[24px]" data-name="Container">
      <Text21 />
    </div>
  );
}

function Heading5() {
  return (
    <div className="absolute h-[28px] left-[151.5px] top-[104px] w-[54px]" data-name="Heading 4">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[28px] left-[27px] not-italic text-[#101828] text-[18px] text-center top-[-1px] whitespace-nowrap">박지성</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start left-[154.5px] top-[140px] w-[48px]" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[16px] min-w-px not-italic relative text-[#6a7282] text-[12px] text-center">경영학과</p>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[19.5px] left-[138.21px] not-italic text-[#1c398e] text-[12px] text-center top-[-0.5px] whitespace-nowrap">프로젝트 전체 일정 관리와 QA를 책임지겠습니다!</p>
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute bg-[#eff6ff] content-stretch flex flex-col h-[45.5px] items-start left-[24px] pb-px pt-[13px] px-[17px] rounded-[10px] top-[172px] w-[309px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#bedbff] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Paragraph7 />
    </div>
  );
}

function Text22() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[27px] left-[53.83px] rounded-[16777200px] top-0 w-[40.953px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-[20px] not-italic text-[#4a5565] text-[10px] text-center top-[5.5px] whitespace-nowrap">#PM</p>
    </div>
  );
}

function Text23() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[27px] left-[100.78px] rounded-[16777200px] top-0 w-[46.07px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[15px] left-[23.5px] not-italic text-[#4a5565] text-[10px] text-center top-[5.5px] whitespace-nowrap">#기획</p>
    </div>
  );
}

function Text24() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[27px] left-[152.85px] rounded-[16777200px] top-0 w-[40.25px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-[20.5px] not-italic text-[#4a5565] text-[10px] text-center top-[5.5px] whitespace-nowrap">#QA</p>
    </div>
  );
}

function Text25() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[27px] left-[199.1px] rounded-[16777200px] top-0 w-[56.07px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[15px] left-[28px] not-italic text-[#4a5565] text-[10px] text-center top-[5.5px] whitespace-nowrap">#애자일</p>
    </div>
  );
}

function Text26() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[27px] left-[25.88px] rounded-[16777200px] top-[33px] w-[123.102px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[15px] left-[62.5px] not-italic text-[#4a5565] text-[10px] text-center top-[5.5px] whitespace-nowrap">#축구 보는거 좋아해요</p>
    </div>
  );
}

function Text27() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[27px] left-[154.98px] rounded-[16777200px] top-[33px] w-[56.07px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[15px] left-[28px] not-italic text-[#4a5565] text-[10px] text-center top-[5.5px] whitespace-nowrap">#문서화</p>
    </div>
  );
}

function Text28() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[27px] left-[217.05px] rounded-[16777200px] top-[33px] w-[66.07px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[15px] left-[33px] not-italic text-[#4a5565] text-[10px] text-center top-[5.5px] whitespace-nowrap">#일정관리</p>
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute h-[60px] left-[24px] top-[233.5px] w-[309px]" data-name="Container">
      <Text22 />
      <Text23 />
      <Text24 />
      <Text25 />
      <Text26 />
      <Text27 />
      <Text28 />
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute bg-white border-2 border-[#e5e7eb] border-solid h-[343px] left-[1143px] rounded-[14px] top-[258px] w-[361px]" data-name="Container">
      <Container24 />
      <Heading5 />
      <Paragraph6 />
      <Container25 />
      <Container26 />
    </div>
  );
}

function Image1() {
  return (
    <div className="relative shrink-0 size-[64px]" data-name="Image (최수민)">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage1} />
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute bg-[#eff6ff] content-stretch flex items-center justify-center left-[146.5px] overflow-clip rounded-[16777200px] size-[64px] top-[24px]" data-name="Container">
      <Image1 />
    </div>
  );
}

function Heading6() {
  return (
    <div className="absolute h-[28px] left-[151.5px] top-[104px] w-[54px]" data-name="Heading 4">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[28px] left-[27px] not-italic text-[#101828] text-[18px] text-center top-[-1px] whitespace-nowrap">최수민</p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start left-[142.5px] top-[140px] w-[72px]" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[16px] min-w-px not-italic relative text-[#6a7282] text-[12px] text-center">글로벌미디어</p>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[19.5px] left-[138.05px] not-italic text-[#1c398e] text-[12px] text-center top-[-0.5px] whitespace-nowrap">React로 사용자 경험이 좋은 UI를 만들고 싶어요!</p>
    </div>
  );
}

function Container29() {
  return (
    <div className="absolute bg-[#eff6ff] content-stretch flex flex-col h-[45.5px] items-start left-[24px] pb-px pt-[13px] px-[17px] rounded-[10px] top-[172px] w-[309px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#bedbff] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Paragraph9 />
    </div>
  );
}

function Text29() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[27px] left-[12.78px] rounded-[16777200px] top-0 w-[50.594px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-[25px] not-italic text-[#4a5565] text-[10px] text-center top-[5.5px] whitespace-nowrap">#React</p>
    </div>
  );
}

function Text30() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[27px] left-[69.38px] rounded-[16777200px] top-0 w-[76.07px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[15px] left-[38.5px] not-italic text-[#4a5565] text-[10px] text-center top-[5.5px] whitespace-nowrap">#프론트엔드</p>
    </div>
  );
}

function Text31() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[27px] left-[151.45px] rounded-[16777200px] top-0 w-[66.07px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[15px] left-[33px] not-italic text-[#4a5565] text-[10px] text-center top-[5.5px] whitespace-nowrap">#인터랙션</p>
    </div>
  );
}

function Text32() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[27px] left-[223.52px] rounded-[16777200px] top-0 w-[72.703px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-[36px] not-italic text-[#4a5565] text-[10px] text-center top-[5.5px] whitespace-nowrap">#TypeScript</p>
    </div>
  );
}

function Text33() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[27px] left-[38.84px] rounded-[16777200px] top-[33px] w-[99.586px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[15px] left-[50px] not-italic text-[#4a5565] text-[10px] text-center top-[5.5px] whitespace-nowrap">#음원작업 합니다</p>
    </div>
  );
}

function Text34() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[27px] left-[144.42px] rounded-[16777200px] top-[33px] w-[66.07px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[15px] left-[33px] not-italic text-[#4a5565] text-[10px] text-center top-[5.5px] whitespace-nowrap">#상태관리</p>
    </div>
  );
}

function Text35() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[27px] left-[216.49px] rounded-[16777200px] top-[33px] w-[53.672px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-[27px] not-italic text-[#4a5565] text-[10px] text-center top-[5.5px] whitespace-nowrap">#Redux</p>
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute h-[60px] left-[24px] top-[233.5px] w-[309px]" data-name="Container">
      <Text29 />
      <Text30 />
      <Text31 />
      <Text32 />
      <Text33 />
      <Text34 />
      <Text35 />
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute bg-white border-2 border-[#e5e7eb] border-solid h-[343px] left-0 rounded-[14px] top-[616px] w-[361px]" data-name="Container">
      <Container28 />
      <Heading6 />
      <Paragraph8 />
      <Container29 />
      <Container30 />
    </div>
  );
}

function Text36() {
  return (
    <div className="h-[32px] relative shrink-0 w-[24px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[32px] not-italic relative shrink-0 text-[#2b7fff] text-[24px] text-center whitespace-nowrap">정</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="absolute bg-[#eff6ff] content-stretch flex items-center justify-center left-[146.5px] overflow-clip px-[20px] rounded-[16777200px] size-[64px] top-[24px]" data-name="Container">
      <Text36 />
    </div>
  );
}

function Heading7() {
  return (
    <div className="absolute h-[28px] left-[151.5px] top-[104px] w-[54px]" data-name="Heading 4">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[28px] left-[27px] not-italic text-[#101828] text-[18px] text-center top-[-1px] whitespace-nowrap">정다은</p>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start left-[154.5px] top-[140px] w-[48px]" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[16px] min-w-px not-italic relative text-[#6a7282] text-[12px] text-center">통계학과</p>
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="h-[39px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[19.5px] left-[137.5px] not-italic text-[#1c398e] text-[12px] text-center top-[-0.5px] w-[275px]">효율적인 데이터베이스 설계와 최적화를 맡겠습니다!</p>
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute bg-[#eff6ff] content-stretch flex flex-col h-[65px] items-start left-[24px] pb-px pt-[13px] px-[17px] rounded-[10px] top-[172px] w-[309px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#bedbff] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Paragraph11 />
    </div>
  );
}

function Text37() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[27px] left-[13.51px] rounded-[16777200px] top-0 w-[86.07px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[15px] left-[43px] not-italic text-[#4a5565] text-[10px] text-center top-[5.5px] whitespace-nowrap">#데이터베이스</p>
    </div>
  );
}

function Text38() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[27px] left-[105.58px] rounded-[16777200px] top-0 w-[44.039px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-[22px] not-italic text-[#4a5565] text-[10px] text-center top-[5.5px] whitespace-nowrap">#SQL</p>
    </div>
  );
}

function Text39() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[27px] left-[155.62px] rounded-[16777200px] top-0 w-[56.07px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[15px] left-[28px] not-italic text-[#4a5565] text-[10px] text-center top-[5.5px] whitespace-nowrap">#파이썬</p>
    </div>
  );
}

function Text40() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[27px] left-[217.69px] rounded-[16777200px] top-0 w-[77.797px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-[39.5px] not-italic text-[#4a5565] text-[10px] text-center top-[5.5px] whitespace-nowrap">#PostgreSQL</p>
    </div>
  );
}

function Text41() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[27px] left-[59.45px] rounded-[16777200px] top-[33px] w-[119.586px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[15px] left-[60px] not-italic text-[#4a5565] text-[10px] text-center top-[5.5px] whitespace-nowrap">#사진촬영 좋아합니다</p>
    </div>
  );
}

function Text42() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[27px] left-[185.03px] rounded-[16777200px] top-[33px] w-[64.516px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[15px] left-[32.5px] not-italic text-[#4a5565] text-[10px] text-center top-[5.5px] whitespace-nowrap">#ERD설계</p>
    </div>
  );
}

function Container34() {
  return (
    <div className="absolute h-[60px] left-[24px] top-[253px] w-[309px]" data-name="Container">
      <Text37 />
      <Text38 />
      <Text39 />
      <Text40 />
      <Text41 />
      <Text42 />
    </div>
  );
}

function Container31() {
  return (
    <div className="absolute bg-white border-2 border-[#e5e7eb] border-solid h-[343px] left-[381px] rounded-[14px] top-[616px] w-[361px]" data-name="Container">
      <Container32 />
      <Heading7 />
      <Paragraph10 />
      <Container33 />
      <Container34 />
    </div>
  );
}

function Image2() {
  return (
    <div className="relative shrink-0 size-[64px]" data-name="Image (강동원)">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage2} />
    </div>
  );
}

function Container36() {
  return (
    <div className="absolute bg-[#eff6ff] content-stretch flex items-center justify-center left-[146.5px] overflow-clip rounded-[16777200px] size-[64px] top-[24px]" data-name="Container">
      <Image2 />
    </div>
  );
}

function Heading8() {
  return (
    <div className="absolute h-[28px] left-[151.5px] top-[104px] w-[54px]" data-name="Heading 4">
      <p className="-translate-x-1/2 absolute font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[28px] left-[27px] not-italic text-[#101828] text-[18px] text-center top-[-1px] whitespace-nowrap">강동원</p>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start left-[136.5px] top-[140px] w-[84px]" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[16px] min-w-px not-italic relative text-[#6a7282] text-[12px] text-center">벤처중소기업학</p>
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="h-[39px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[19.5px] left-[137.5px] not-italic text-[#1c398e] text-[12px] text-center top-[-0.5px] w-[275px]">서비스의 비즈니스 모델 검증과 발표를 담당하겠습니다!</p>
    </div>
  );
}

function Container37() {
  return (
    <div className="absolute bg-[#eff6ff] content-stretch flex flex-col h-[65px] items-start left-[24px] pb-px pt-[13px] px-[17px] rounded-[10px] top-[172px] w-[309px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#bedbff] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Paragraph13 />
    </div>
  );
}

function Text43() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[27px] left-[28.36px] rounded-[16777200px] top-0 w-[46.07px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[15px] left-[23.5px] not-italic text-[#4a5565] text-[10px] text-center top-[5.5px] whitespace-nowrap">#창업</p>
    </div>
  );
}

function Text44() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[27px] left-[80.43px] rounded-[16777200px] top-0 w-[86.07px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[15px] left-[43px] not-italic text-[#4a5565] text-[10px] text-center top-[5.5px] whitespace-nowrap">#비즈니스모델</p>
    </div>
  );
}

function Text45() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[27px] left-[172.5px] rounded-[16777200px] top-0 w-[46.07px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[15px] left-[23.5px] not-italic text-[#4a5565] text-[10px] text-center top-[5.5px] whitespace-nowrap">#발표</p>
    </div>
  );
}

function Text46() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[27px] left-[224.57px] rounded-[16777200px] top-0 w-[56.07px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[15px] left-[28px] not-italic text-[#4a5565] text-[10px] text-center top-[5.5px] whitespace-nowrap">#마케팅</p>
    </div>
  );
}

function Text47() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[27px] left-[63.67px] rounded-[16777200px] top-[33px] w-[109.586px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[15px] left-[55.5px] not-italic text-[#4a5565] text-[10px] text-center top-[5.5px] whitespace-nowrap">#베이킹 취미입니다</p>
    </div>
  );
}

function Text48() {
  return (
    <div className="absolute bg-[#f3f4f6] h-[27px] left-[179.26px] rounded-[16777200px] top-[33px] w-[66.07px]" data-name="Text">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[15px] left-[33px] not-italic text-[#4a5565] text-[10px] text-center top-[5.5px] whitespace-nowrap">#투자유치</p>
    </div>
  );
}

function Container38() {
  return (
    <div className="absolute h-[60px] left-[24px] top-[253px] w-[309px]" data-name="Container">
      <Text43 />
      <Text44 />
      <Text45 />
      <Text46 />
      <Text47 />
      <Text48 />
    </div>
  );
}

function Container35() {
  return (
    <div className="absolute bg-white border-2 border-[#e5e7eb] border-solid h-[343px] left-[762px] rounded-[14px] top-[616px] w-[361px]" data-name="Container">
      <Container36 />
      <Heading8 />
      <Paragraph12 />
      <Container37 />
      <Container38 />
    </div>
  );
}

function Frame4() {
  return <div className="absolute h-[579px] left-[816px] top-[154px] w-[661px]" />;
}

function Container10() {
  return (
    <div className="absolute h-[980px] left-0 right-0 top-[56px]" data-name="Container">
      <Container11 />
      <Container15 />
      <Container19 />
      <Container23 />
      <Container27 />
      <Container31 />
      <Container35 />
      <div className="absolute bg-white border-[#155dfc] border-l-6 border-solid h-[191px] left-[26px] rounded-[20px] shadow-[2px_4px_4px_2px_rgba(0,0,0,0.25)] top-0 w-[1452px]" />
      <div className="absolute bg-[#d9d9d9] h-[30px] left-[1300px] rounded-[5px] top-[210px] w-[203px]" />
      <p className="-translate-x-1/2 absolute font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium h-[19px] leading-[19.5px] left-[1367.5px] not-italic text-[12px] text-black text-center top-[215px] w-[105px]">키워드를 입력하세요</p>
      <div className="absolute h-[124px] left-[58px] top-[30px] w-[1394px]" data-name="스크린샷 2026-04-29 오전 2.21.25 1">
        <img alt="" className="absolute block inset-0 max-w-none size-full" height="124" src={img20260429221251} width="1394" />
      </div>
      <Frame4 />
    </div>
  );
}

function Section() {
  return (
    <div className="absolute h-[1036px] left-[16px] right-[16px] top-[32px]" data-name="Section">
      <Container9 />
      <Container10 />
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute bg-[#f0f0f0] h-[1100px] left-0 top-0 w-[1536px]" data-name="Container">
      <Section />
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[20px] text-white top-[-1.5px] whitespace-nowrap">CampusConnect</p>
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="h-[45.5px] relative shrink-0 w-full" data-name="Paragraph">
      <div className="absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[0] left-0 not-italic text-[#99a1af] text-[14px] top-0 w-[480px]">
        <p className="leading-[22.75px] mb-0">학생들의 팀 프로젝트 협업을 위한</p>
        <p className="leading-[22.75px]">올인원 플랫폼</p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[144px] items-start left-0 top-0 w-[480px]" data-name="Container">
      <Heading1 />
      <Paragraph14 />
    </div>
  );
}

function Heading9() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[24px] left-0 not-italic text-[16px] text-white top-[-2px] whitespace-nowrap">연락처</p>
    </div>
  );
}

function ListItem() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="List Item">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#d1d5dc] text-[14px] top-[-0.5px] whitespace-nowrap">📧 support@campusconnect.com</p>
    </div>
  );
}

function ListItem1() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="List Item">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#d1d5dc] text-[14px] top-[-0.5px] whitespace-nowrap">📞 02-1234-5678</p>
    </div>
  );
}

function ListItem2() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="List Item">
      <p className="absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#d1d5dc] text-[14px] top-[-0.5px] whitespace-nowrap">📍 서울특별시 광진구 능동로 209</p>
    </div>
  );
}

function List() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[76px] items-start relative shrink-0 w-full" data-name="List">
      <ListItem />
      <ListItem1 />
      <ListItem2 />
    </div>
  );
}

function Container41() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[144px] items-start left-[512px] top-0 w-[480px]" data-name="Container">
      <Heading9 />
      <List />
    </div>
  );
}

function Heading10() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[24px] left-0 not-italic text-[16px] text-white top-[-2px] whitespace-nowrap">바로가기</p>
    </div>
  );
}

function ListItem3() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="List Item">
      <p className="absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#d1d5dc] text-[14px] top-[-0.5px] whitespace-nowrap">이용약관</p>
    </div>
  );
}

function ListItem4() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="List Item">
      <p className="absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#d1d5dc] text-[14px] top-[-0.5px] whitespace-nowrap">개인정보처리방침</p>
    </div>
  );
}

function ListItem5() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="List Item">
      <p className="absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#d1d5dc] text-[14px] top-[-0.5px] whitespace-nowrap">공지사항</p>
    </div>
  );
}

function ListItem6() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="List Item">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#d1d5dc] text-[14px] top-[-0.5px] whitespace-nowrap">FAQ</p>
    </div>
  );
}

function List1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[104px] items-start relative shrink-0 w-full" data-name="List">
      <ListItem3 />
      <ListItem4 />
      <ListItem5 />
      <ListItem6 />
    </div>
  );
}

function Container42() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[144px] items-start left-[1024px] top-0 w-[480px]" data-name="Container">
      <Heading10 />
      <List1 />
    </div>
  );
}

function Container39() {
  return (
    <div className="h-[144px] relative shrink-0 w-full" data-name="Container">
      <Container40 />
      <Container41 />
      <Container42 />
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[752.62px] not-italic text-[#6a7282] text-[14px] text-center top-[-0.5px] whitespace-nowrap">© 2026 CampusConnect. All rights reserved.</p>
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[20px] left-[752.16px] not-italic text-[#6a7282] text-[14px] text-center top-[-0.5px] whitespace-nowrap">본 서비스는 교육 목적으로 제작된 프로젝트입니다.</p>
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[73px] items-start pt-[25px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#364153] border-solid border-t inset-0 pointer-events-none" />
      <Paragraph15 />
      <Paragraph16 />
    </div>
  );
}

function Footer() {
  return (
    <div className="absolute bg-black content-stretch flex flex-col gap-[32px] h-[345px] items-start left-0 pt-[48px] px-[16px] top-[1100px] w-[1536px]" data-name="Footer">
      <Container39 />
      <Container43 />
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute h-[1445px] left-0 right-0 top-0" data-name="Container">
      <Container8 />
      <div className="absolute bg-[rgba(45,45,45,0.76)] h-[1101px] left-0 top-0 w-[1536px]" />
      <Footer />
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute h-[1445px] left-0 top-[64px] w-[1536px]" data-name="Container">
      <Container7 />
    </div>
  );
}

function App() {
  return (
    <div className="absolute bg-[#f9fafb] h-[1509px] left-0 top-0 w-[1536px]" data-name="App">
      <PlaceholderForApp />
      <Container6 />
    </div>
  );
}

function Component1() {
  return (
    <div className="absolute bg-gradient-to-b from-[#151515] h-[1509px] left-0 to-[#454545] top-0 w-[1536px]" data-name="프로필-학생들">
      <App />
    </div>
  );
}

function Frame({ className }: { className?: string }) {
  return (
    <div className={className || "-translate-y-1/2 absolute h-[94px] left-[24px] rounded-[14px] top-[calc(50%-348px)] w-[248px]"} data-name="Frame">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[14px]">
        <img alt="" className="absolute h-[614.43%] left-[-9.68%] max-w-none top-[-37.42%] w-[266.53%]" src={imgFrame} />
      </div>
      <div className="absolute left-[911px] size-[24px] top-[8px]" data-name="dash">
        <div className="absolute bottom-1/2 flex items-center justify-center left-[20%] right-[20%] top-1/2" style={{ containerType: "size" }}>
          <div className="-rotate-90 flex-none h-[100cqw] w-[190644000cqh]">
            <div className="relative size-full" data-name="Icon">
              <div className="absolute inset-[-6.94%_-1px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 16.4">
                  <path d="M1 15.4V1" id="Icon" stroke="var(--stroke-0, #FF2D55)" strokeLinecap="round" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents left-0 top-0">
      <div className="absolute bg-white h-[844px] left-0 rounded-[20px] top-0 w-[802px]" />
      <Frame />
    </div>
  );
}

function Container44() {
  return <div className="absolute h-[66px] left-[32px] right-[33px] top-[337px]" data-name="Container" />;
}

function Group5() {
  return (
    <div className="absolute contents left-[911px] top-[8px]">
      <div className="absolute left-[911px] size-[24px] top-[8px]" data-name="dash">
        <div className="absolute bottom-1/2 flex items-center justify-center left-[20%] right-[20%] top-1/2" style={{ containerType: "size" }}>
          <div className="-rotate-90 flex-none h-[100cqw] w-[190644000cqh]">
            <div className="relative size-full" data-name="Icon">
              <div className="absolute inset-[-6.94%_-1px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 16.4">
                  <path d="M1 15.4V1" id="Icon" stroke="var(--stroke-0, #FF2D55)" strokeLinecap="round" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame1({ className }: { className?: string }) {
  return (
    <div className={className || "-translate-y-1/2 absolute h-[401px] left-[55px] rounded-[14px] top-[calc(50%+199.5px)] w-[692px]"} data-name="Frame">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[14px]">
        <img alt="" className="absolute h-[147.1%] left-[-3.73%] max-w-none top-[-42%] w-[107.31%]" src={imgFrame} />
      </div>
      <Container44 />
      <Group5 />
    </div>
  );
}

function Container45() {
  return <div className="relative size-full" data-name="Container" />;
}

function Frame2({ className }: { className?: string }) {
  return (
    <div className={className || "-translate-y-1/2 absolute h-[50px] left-[747px] rounded-[14px] top-[calc(50%-386px)] w-[48px]"} data-name="Frame">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[14px]">
        <img alt="" className="absolute h-[1179.71%] left-[-1260.42%] max-w-none top-[-44.86%] w-[1377.08%]" src={imgFrame} />
      </div>
      <div className="absolute flex h-[66px] items-center justify-center left-[23px] right-[24px] top-[337px]" style={{ containerType: "size" }}>
        <div className="-scale-x-100 flex-none h-[100cqh] w-[100cqw]">
          <Container45 />
        </div>
      </div>
      <div className="absolute left-[911px] size-[24px] top-[8px]" data-name="dash">
        <div className="absolute bottom-1/2 flex items-center justify-center left-[20%] right-[20%] top-1/2" style={{ containerType: "size" }}>
          <div className="-rotate-90 flex-none h-[100cqw] w-[190644000cqh]">
            <div className="relative size-full" data-name="Icon">
              <div className="absolute inset-[-6.94%_-1px]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 16.4">
                  <path d="M1 15.4V1" id="Icon" stroke="var(--stroke-0, #FF2D55)" strokeLinecap="round" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[84px] top-[278px]">
      <div className="absolute bg-white h-[36px] left-[84px] rounded-[10px] shadow-[2px_4px_4px_2px_rgba(0,0,0,0.15)] top-[278px] w-[218px]" />
      <p className="absolute font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium h-[18px] leading-[normal] left-[96px] not-italic text-[17px] text-black top-[286px] w-[165px]">다시 팀하고 싶어요</p>
      <div className="absolute left-[255px] overflow-clip size-[21px] top-[286px]" data-name="person">
        <div className="absolute inset-[16.67%]" data-name="icon">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
            <path d={svgPaths.p9a4f600} fill="var(--fill-0, #1D1B20)" id="icon" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium h-[12px] leading-[normal] left-[280px] not-italic text-[17px] text-black top-[286px] w-[13px]">5</p>
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute contents left-[323px] top-[329px]">
      <div className="absolute bg-white h-[36px] left-[323px] rounded-[10px] shadow-[2px_4px_4px_2px_rgba(0,0,0,0.15)] top-[329px] w-[329px]" />
      <p className="absolute font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium h-[18px] leading-[normal] left-[335px] not-italic text-[17px] text-black top-[337px] w-[259px]">끝까지 책임감을 가지고 완성해요</p>
      <div className="absolute left-[600px] overflow-clip size-[21px] top-[337px]" data-name="person">
        <div className="absolute inset-[16.67%]" data-name="icon">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
            <path d={svgPaths.p9a4f600} fill="var(--fill-0, #1D1B20)" id="icon" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium h-[12px] leading-[normal] left-[625px] not-italic text-[17px] text-black top-[337px] w-[13px]">6</p>
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute contents left-[84px] top-[329px]">
      <div className="absolute bg-white h-[36px] left-[84px] rounded-[10px] shadow-[2px_4px_4px_2px_rgba(0,0,0,0.15)] top-[329px] w-[218px]" />
      <p className="absolute font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium h-[18px] leading-[normal] left-[96px] not-italic text-[17px] text-black top-[337px] w-[165px]">디자인을 잘 해요</p>
      <div className="absolute left-[255px] overflow-clip size-[21px] top-[337px]" data-name="person">
        <div className="absolute inset-[16.67%]" data-name="icon">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
            <path d={svgPaths.p9a4f600} fill="var(--fill-0, #1D1B20)" id="icon" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium h-[12px] leading-[normal] left-[280px] not-italic text-[17px] text-black top-[337px] w-[13px]">3</p>
      <Group7 />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-[84px] top-[278px]">
      <div className="absolute bg-white h-[36px] left-[323px] rounded-[10px] shadow-[2px_4px_4px_2px_rgba(0,0,0,0.15)] top-[278px] w-[249px]" />
      <p className="absolute font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium h-[18px] leading-[normal] left-[335px] not-italic text-[17px] text-black top-[286px] w-[165px]">시간 약속을 잘 지켜요</p>
      <div className="absolute left-[523px] overflow-clip size-[21px] top-[286px]" data-name="person">
        <div className="absolute inset-[16.67%]" data-name="icon">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
            <path d={svgPaths.p9a4f600} fill="var(--fill-0, #1D1B20)" id="icon" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium h-[12px] leading-[normal] left-[548px] not-italic text-[17px] text-black top-[286px] w-[13px]">8</p>
      <Group6 />
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents left-0 top-0">
      <Group2 />
      <Frame1 />
      <Frame2 />
      <div className="absolute bg-[#eff6ff] h-[246px] left-[55px] rounded-[20px] shadow-[2px_4px_4px_3px_rgba(0,0,0,0.25)] top-[142px] w-[693px]" />
      <p className="absolute font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold h-[29px] leading-[normal] left-[84px] not-italic text-[25px] text-black top-[156px] w-[108px]">매너온도</p>
      <p className="absolute font-['Inter:Black',sans-serif] font-black h-[29px] leading-[normal] left-[84px] not-italic text-[#155dfc] text-[35px] top-[199px] w-[160px]">37.5°C</p>
      <div className="absolute bg-[#d9d9d9] h-[14px] left-[84px] rounded-[20px] top-[246px] w-[634px]" />
      <div className="absolute bg-gradient-to-r from-[#b0bfde] h-[14px] left-[84px] rounded-bl-[20px] rounded-tl-[20px] to-[#155dfc] top-[246px] via-1/2 via-[#63bfed] w-[200px]" />
      <div className="absolute left-[652px] size-[66px] top-[167px]" data-name="image 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage3} />
      </div>
      <Group />
      <Group1 />
      <p className="absolute font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold h-[30px] leading-[0] left-[581px] not-italic text-[17px] text-black top-[104px] w-[206px]">
        <span className="leading-[normal]">{`팀 프로젝트 경험 : `}</span>
        <span className="leading-[normal] text-[#1e68fa]">10회</span>
      </p>
    </div>
  );
}

function Frame8() {
  return (
    <div className="absolute h-[844px] left-[367px] top-[185px] w-[802px]">
      <Group3 />
      <div className="absolute h-0 left-[55px] top-[421px] w-[693px]">
        <div className="absolute inset-[-3px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 693 3">
            <line id="Line 4" stroke="var(--stroke-0, #DADADA)" strokeOpacity="0.55" strokeWidth="3" x2="693" y1="1.5" y2="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents left-[367px] top-[185px]">
      <Frame8 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="absolute h-[1509px] left-0 top-0 w-[1536px]">
      <Component1 />
      <Group4 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="absolute h-[1509px] left-0 top-0 w-[1536px]">
      <Frame3 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="absolute h-[1509px] left-[331px] top-0 w-[1536px]">
      <Frame5 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="absolute h-[1509px] left-0 top-0 w-[1877px]">
      <Frame6 />
    </div>
  );
}

export default function Component() {
  return (
    <div className="relative size-full" data-name="타학생 프로필">
      <Frame7 />
    </div>
  );
}