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

export default function Navigation() {
  return (
    <div className="bg-gradient-to-r content-stretch flex flex-col from-[#0028bb] items-start px-[128px] relative size-full to-black via-[#001663] via-[35.096%]" data-name="Navigation">
      <div aria-hidden="true" className="absolute border-[#3676ff] border-b-3 border-solid inset-0 pointer-events-none shadow-[0px_10px_15px_0px_rgba(0,0,0,0.1),0px_4px_6px_0px_rgba(0,0,0,0.1)]" />
      <Container />
    </div>
  );
}