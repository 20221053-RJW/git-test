function Container1() {
  return (
    <div className="absolute content-stretch flex h-[32px] items-start left-[32px] top-[16px] w-[200.359px]" data-name="Container">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[32px] not-italic relative shrink-0 text-[24px] text-white tracking-[1.2px] whitespace-nowrap">CampusConnect</p>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute h-[30px] left-[274px] top-0 w-[32px]" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold leading-[24px] left-[16px] not-italic text-[#2f67df] text-[16px] text-center top-[-4px] whitespace-nowrap">수업</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="flex-[1_0_0] h-[30px] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Button />
        <div className="absolute h-0 left-[272.39px] top-[30px] w-[34px]">
          <div className="absolute inset-[-4px_0_0_0]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 4">
              <line id="Line 3" stroke="var(--stroke-0, #155DFC)" strokeWidth="4" x2="34" y1="2" y2="2" />
            </svg>
          </div>
        </div>
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

function Container() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Container">
      <Container1 />
      <Container2 />
    </div>
  );
}

function Navigation() {
  return (
    <div className="absolute bg-gradient-to-r content-stretch flex flex-col from-[#0028bb] h-[64px] items-start left-0 px-[128px] to-black top-0 via-[#001663] via-[35.096%] w-[1536px]" data-name="Navigation">
      <div aria-hidden="true" className="absolute border-[#3676ff] border-b-3 border-solid inset-0 pointer-events-none shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)]" />
      <Container />
    </div>
  );
}

function PlaceholderForApp1() {
  return (
    <div className="absolute h-[64px] left-0 top-0 w-[1536px]" data-name="Placeholder for App">
      <Navigation />
    </div>
  );
}

function PlaceholderForApp() {
  return (
    <div className="absolute h-[64px] left-0 top-0 w-[1536px]" data-name="Placeholder for App">
      <PlaceholderForApp1 />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex h-[32px] items-start relative shrink-0 w-full" data-name="Heading 2">
      <p className="flex-[1_0_0] font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[32px] min-w-px not-italic relative text-[#155dfc] text-[24px]">수강 중인 과목</p>
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#101828] text-[18px] top-[-1px] whitespace-nowrap">웹프로그래밍</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[16px] min-w-px not-italic relative text-[#4a5565] text-[12px]">2026-1</p>
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[44px] relative shrink-0 w-[140px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Heading1 />
        <Paragraph />
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[19.227px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#6a7282] text-[14px] top-[-0.5px] whitespace-nowrap">👨‍🏫</p>
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[16px] relative shrink-0 w-[48px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="flex-[1_0_0] font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[16px] min-w-px not-italic relative text-[#364153] text-[12px]">성보경</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[20px] relative shrink-0 w-[100px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Text1 />
        <Text2 />
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[20px] relative shrink-0 w-[19.227px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#6a7282] text-[14px] top-[-0.5px] whitespace-nowrap">🕒</p>
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="flex-[1_0_0] h-[16px] min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] whitespace-nowrap">월 13:00-15:00, 수 13:00-15:00</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="h-[20px] relative shrink-0 w-[188.602px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Text3 />
        <Text4 />
      </div>
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[20px] relative shrink-0 w-[11.367px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#6a7282] text-[14px] top-[-0.5px] whitespace-nowrap">📍</p>
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[16px] relative shrink-0 w-[72.047px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] whitespace-nowrap">공학관 301호</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[20px] relative shrink-0 w-[90px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Text5 />
        <Text6 />
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[44px] relative shrink-0 w-[801.836px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Container13 />
        <Container14 />
        <Container15 />
        <Container16 />
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="bg-[#dbeafe] h-[24px] relative rounded-[16777200px] shrink-0 w-[46.961px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start px-[8px] py-[4px] relative size-full">
        <p className="font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[16px] not-italic relative shrink-0 text-[#1447e6] text-[12px] whitespace-nowrap">3학점</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#155dfc] flex-[1_0_0] h-[28px] min-w-px relative rounded-[10px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start px-[16px] py-[6px] relative size-full">
        <p className="flex-[1_0_0] font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[16px] min-w-px not-italic relative text-[12px] text-center text-white">강의실 입장</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="h-[28px] relative shrink-0 w-[146.961px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Text7 />
        <Button1 />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex h-[44px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container12 />
      <Container17 />
    </div>
  );
}

function Container10() {
  return (
    <div className="bg-white h-[80px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)]" />
      <div className="content-stretch flex flex-col items-start pb-[2px] pt-[18px] px-[18px] relative size-full">
        <Container11 />
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#101828] text-[18px] top-[-1px] whitespace-nowrap">데이터베이스 설계</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[16px] min-w-px not-italic relative text-[#4a5565] text-[12px]">2026-1</p>
    </div>
  );
}

function Container21() {
  return (
    <div className="h-[44px] relative shrink-0 w-[150.328px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Heading2 />
        <Paragraph1 />
      </div>
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[20px] relative shrink-0 w-[19.227px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#6a7282] text-[14px] top-[-0.5px] whitespace-nowrap">👨‍🏫</p>
      </div>
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[16px] relative shrink-0 w-[36px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="flex-[1_0_0] font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[16px] min-w-px not-italic relative text-[#364153] text-[12px]">이순신</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[20px] relative shrink-0 w-[100px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Text8 />
        <Text9 />
      </div>
    </div>
  );
}

function Text10() {
  return (
    <div className="h-[20px] relative shrink-0 w-[19.227px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#6a7282] text-[14px] top-[-0.5px] whitespace-nowrap">🕒</p>
      </div>
    </div>
  );
}

function Text11() {
  return (
    <div className="flex-[1_0_0] h-[16px] min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] whitespace-nowrap">화 10:00-12:00, 목 10:00-12:00</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="h-[20px] relative shrink-0 w-[188.602px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Text10 />
        <Text11 />
      </div>
    </div>
  );
}

function Text12() {
  return (
    <div className="h-[20px] relative shrink-0 w-[11.367px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#6a7282] text-[14px] top-[-0.5px] whitespace-nowrap">📍</p>
      </div>
    </div>
  );
}

function Text13() {
  return (
    <div className="h-[16px] relative shrink-0 w-[72.047px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] whitespace-nowrap">공학관 205호</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="h-[20px] relative shrink-0 w-[90px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Text12 />
        <Text13 />
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[44px] relative shrink-0 w-[801.836px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Container21 />
        <Container22 />
        <Container23 />
        <Container24 />
      </div>
    </div>
  );
}

function Text14() {
  return (
    <div className="bg-[#dbeafe] h-[24px] relative rounded-[16777200px] shrink-0 w-[46.961px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start px-[8px] py-[4px] relative size-full">
        <p className="font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[16px] not-italic relative shrink-0 text-[#1447e6] text-[12px] whitespace-nowrap">3학점</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#155dfc] flex-[1_0_0] h-[28px] min-w-px relative rounded-[10px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start px-[16px] py-[6px] relative size-full">
        <p className="flex-[1_0_0] font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[16px] min-w-px not-italic relative text-[12px] text-center text-white">강의실 입장</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="h-[28px] relative shrink-0 w-[146.961px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Text14 />
        <Button2 />
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex h-[44px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container20 />
      <Container25 />
    </div>
  );
}

function Container18() {
  return (
    <div className="bg-white h-[80px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)]" />
      <div className="content-stretch flex flex-col items-start pb-[2px] pt-[18px] px-[18px] relative size-full">
        <Container19 />
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#101828] text-[18px] top-[-1px] whitespace-nowrap">소프트웨어공학</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[16px] min-w-px not-italic relative text-[#4a5565] text-[12px]">2026-1</p>
    </div>
  );
}

function Container29() {
  return (
    <div className="h-[44px] relative shrink-0 w-[140px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Heading3 />
        <Paragraph2 />
      </div>
    </div>
  );
}

function Text15() {
  return (
    <div className="h-[20px] relative shrink-0 w-[19.227px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#6a7282] text-[14px] top-[-0.5px] whitespace-nowrap">👨‍🏫</p>
      </div>
    </div>
  );
}

function Text16() {
  return (
    <div className="h-[16px] relative shrink-0 w-[36px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="flex-[1_0_0] font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[16px] min-w-px not-italic relative text-[#364153] text-[12px]">장영실</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="h-[20px] relative shrink-0 w-[100px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Text15 />
        <Text16 />
      </div>
    </div>
  );
}

function Text17() {
  return (
    <div className="h-[20px] relative shrink-0 w-[19.227px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#6a7282] text-[14px] top-[-0.5px] whitespace-nowrap">🕒</p>
      </div>
    </div>
  );
}

function Text18() {
  return (
    <div className="h-[16px] relative shrink-0 w-[79.266px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] whitespace-nowrap">금 14:00-17:00</p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="h-[20px] relative shrink-0 w-[140px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Text17 />
        <Text18 />
      </div>
    </div>
  );
}

function Text19() {
  return (
    <div className="h-[20px] relative shrink-0 w-[11.367px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#6a7282] text-[14px] top-[-0.5px] whitespace-nowrap">📍</p>
      </div>
    </div>
  );
}

function Text20() {
  return (
    <div className="h-[16px] relative shrink-0 w-[57.695px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px] whitespace-nowrap">IT관 402호</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="h-[20px] relative shrink-0 w-[90px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Text19 />
        <Text20 />
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="h-[44px] relative shrink-0 w-[801.836px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Container29 />
        <Container30 />
        <Container31 />
        <Container32 />
      </div>
    </div>
  );
}

function Text21() {
  return (
    <div className="bg-[#dbeafe] h-[24px] relative rounded-[16777200px] shrink-0 w-[46.961px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start px-[8px] py-[4px] relative size-full">
        <p className="font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[16px] not-italic relative shrink-0 text-[#1447e6] text-[12px] whitespace-nowrap">3학점</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#155dfc] flex-[1_0_0] h-[28px] min-w-px relative rounded-[10px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start px-[16px] py-[6px] relative size-full">
        <p className="flex-[1_0_0] font-['Inter:Medium','Noto_Sans_KR:Medium',sans-serif] font-medium leading-[16px] min-w-px not-italic relative text-[12px] text-center text-white">강의실 입장</p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="h-[28px] relative shrink-0 w-[146.961px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Text21 />
        <Button3 />
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex h-[44px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container28 />
      <Container33 />
    </div>
  );
}

function Container26() {
  return (
    <div className="bg-white h-[80px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)]" />
      <div className="content-stretch flex flex-col items-start pb-[2px] pt-[18px] px-[18px] relative size-full">
        <Container27 />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[272px] items-start relative shrink-0 w-full" data-name="Container">
      <Container10 />
      <Container18 />
      <Container26 />
    </div>
  );
}

function Text22() {
  return (
    <div className="absolute h-[20px] left-0 top-0 w-[17.758px]" data-name="Text">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[20px] left-0 not-italic text-[#1c398e] text-[14px] top-[-0.5px] whitespace-nowrap">📚</p>
    </div>
  );
}

function Heading4() {
  return (
    <div className="absolute h-[20px] left-[17px] right-[17px] top-[17px]" data-name="Heading 3">
      <Text22 />
      <p className="absolute font-['Inter:Bold','Noto_Sans_KR:Bold',sans-serif] font-bold leading-[20px] left-[25.76px] not-italic text-[#1c398e] text-[14px] top-[-0.5px] whitespace-nowrap">{` 수강 정보 요약`}</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="content-stretch flex h-[32px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Black',sans-serif] font-black leading-[32px] min-w-px not-italic relative text-[#155dfc] text-[24px] text-center">3</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[16px] min-w-px not-italic relative text-[#4a5565] text-[12px] text-center">수강 과목</p>
    </div>
  );
}

function Container36() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[4px] h-[76px] items-start left-0 pt-[12px] px-[12px] rounded-[10px] top-0 w-[312.93px]" data-name="Container">
      <Paragraph3 />
      <Paragraph4 />
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="content-stretch flex h-[32px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Black',sans-serif] font-black leading-[32px] min-w-px not-italic relative text-[#00a63e] text-[24px] text-center">9</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[16px] min-w-px not-italic relative text-[#4a5565] text-[12px] text-center">총 학점</p>
    </div>
  );
}

function Container37() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[4px] h-[76px] items-start left-[324.93px] pt-[12px] px-[12px] rounded-[10px] top-0 w-[312.93px]" data-name="Container">
      <Paragraph5 />
      <Paragraph6 />
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="content-stretch flex h-[32px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Black',sans-serif] font-black leading-[32px] min-w-px not-italic relative text-[#9810fa] text-[24px] text-center">4.1</p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Regular','Noto_Sans_KR:Regular',sans-serif] font-normal leading-[16px] min-w-px not-italic relative text-[#4a5565] text-[12px] text-center">평균 학점</p>
    </div>
  );
}

function Container38() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[4px] h-[76px] items-start left-[649.86px] pt-[12px] px-[12px] rounded-[10px] top-0 w-[312.93px]" data-name="Container">
      <Paragraph7 />
      <Paragraph8 />
    </div>
  );
}

function Container35() {
  return (
    <div className="absolute h-[76px] left-[86px] top-[49px] w-[963px]" data-name="Container">
      <Container36 />
      <Container37 />
      <Container38 />
    </div>
  );
}

function Container34() {
  return (
    <div className="bg-[#e3efff] drop-shadow-[0px_0px_0px_rgba(0,0,0,0.25),0px_4px_2px_rgba(0,0,0,0.25)] h-[142px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#bedbff] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Heading4 />
      <Container35 />
    </div>
  );
}

function Section() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex flex-col gap-[24px] items-start left-[calc(50%-10px)] top-[32px] w-[1176px]" data-name="Section">
      <Heading />
      <Container9 />
      <Container34 />
    </div>
  );
}

function Container8() {
  return (
    <div className="bg-[#f0f0f0] flex-[558_0_0] min-h-px relative w-[1536px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Section />
      </div>
    </div>
  );
}

function Heading5() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[20px] text-white top-[-1.5px] whitespace-nowrap">CampusConnect</p>
    </div>
  );
}

function Paragraph9() {
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
      <Heading5 />
      <Paragraph9 />
    </div>
  );
}

function Heading6() {
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
      <Heading6 />
      <List />
    </div>
  );
}

function Heading7() {
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
      <Heading7 />
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

function Paragraph10() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[752.62px] not-italic text-[#6a7282] text-[14px] text-center top-[-0.5px] whitespace-nowrap">© 2026 CampusConnect. All rights reserved.</p>
    </div>
  );
}

function Paragraph11() {
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
      <Paragraph10 />
      <Paragraph11 />
    </div>
  );
}

function Footer() {
  return (
    <div className="bg-black h-[345px] relative shrink-0 w-[1536px]" data-name="Footer">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[32px] items-start pt-[48px] px-[16px] relative size-full">
        <Container39 />
        <Container43 />
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="flex-[1536_0_0] h-[903px] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container8 />
        <Footer />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute content-stretch flex h-[903px] items-start left-0 top-[64px] w-[1536px]" data-name="Container">
      <Container7 />
    </div>
  );
}

function App() {
  return (
    <div className="bg-[#f9fafb] h-[967px] relative shrink-0 w-[1536px]" data-name="App">
      <PlaceholderForApp />
      <Container6 />
    </div>
  );
}

export default function Component() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="수강중인 과목">
      <App />
    </div>
  );
}