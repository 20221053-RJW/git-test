import { useLocation } from "react-router";
import { getAppShellClassName } from "../layouts/appShell";
import PlaceholderFooterLink from "./PlaceholderFooterLink";

type FooterProps = {
  variant?: "default" | "compact";
};

export default function Footer({ variant = "default" }: FooterProps) {
  const location = useLocation();
  const shellClass = getAppShellClassName(location.pathname);

  const footerLinks = (
    <>
      <PlaceholderFooterLink className="hover:text-white">이용약관</PlaceholderFooterLink>
      <PlaceholderFooterLink className="hover:text-white">개인정보처리방침</PlaceholderFooterLink>
      <PlaceholderFooterLink className="hover:text-white">FAQ</PlaceholderFooterLink>
    </>
  );

  if (variant === "compact") {
    return (
      <footer className="bg-[var(--cc-footer)] py-6" role="contentinfo">
        <div className={`${shellClass} grid grid-cols-1 gap-6 text-sm sm:grid-cols-3`}>
          <div>
            <h3 className="mb-2 font-bold text-white">CampusConnect</h3>
            <p className="text-xs text-gray-300">
              학생들의 팀 프로젝트 협업을 위한 올인원 플랫폼
            </p>
          </div>

          <div>
            <h4 className="mb-2 font-semibold text-white">연락처</h4>
            <div className="space-y-1 text-xs text-gray-300">
              <p>
                <a href="mailto:support@campusconnect.com" className="underline-offset-2 hover:underline">
                  support@campusconnect.com
                </a>
              </p>
              <p>
                <a href="tel:+82212345678" className="underline-offset-2 hover:underline">
                  02-1234-5678
                </a>
              </p>
            </div>
          </div>

          <div>
            <h4 className="mb-2 font-semibold text-white">바로가기</h4>
            <div className="flex flex-wrap gap-3 text-xs text-gray-300">{footerLinks}</div>
          </div>
        </div>

        <div className={`${shellClass} mt-4 border-t border-gray-700 pt-4 text-center text-xs text-gray-300`}>
          <p>© 2026 CampusConnect. All rights reserved. 본 서비스는 교육 목적으로 제작된 프로젝트입니다.</p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="mt-16 bg-[var(--cc-footer)] text-white" role="contentinfo">
      <div className={`${shellClass} grid grid-cols-1 gap-8 py-10 md:grid-cols-3 md:gap-10`}>
        <div>
          <p className="mb-2 text-xl font-bold">CampusConnect</p>
          <p className="text-sm leading-relaxed text-gray-300">
            학생들의 팀 프로젝트 협업을 위한
            <br />
            올인원 플랫폼
          </p>
        </div>
        <div>
          <p className="mb-3 font-semibold">연락처</p>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <a href="mailto:support@campusconnect.com" className="underline-offset-2 hover:underline">
                support@campusconnect.com
              </a>
            </li>
            <li>
              <a href="tel:+82212345678" className="underline-offset-2 hover:underline">
                02-1234-5678
              </a>
            </li>
            <li>서울특별시 광진구 능동로 209</li>
          </ul>
        </div>
        <div>
          <p className="mb-3 font-semibold">바로가기</p>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <PlaceholderFooterLink className="hover:text-white transition-colors">
                이용약관
              </PlaceholderFooterLink>
            </li>
            <li>
              <PlaceholderFooterLink className="hover:text-white transition-colors">
                개인정보처리방침
              </PlaceholderFooterLink>
            </li>
            <li>
              <PlaceholderFooterLink className="hover:text-white transition-colors">
                공지사항
              </PlaceholderFooterLink>
            </li>
            <li>
              <PlaceholderFooterLink className="hover:text-white transition-colors">FAQ</PlaceholderFooterLink>
            </li>
          </ul>
        </div>
      </div>
      <div className={`${shellClass} space-y-1 border-t border-gray-700 py-6 text-center text-xs text-gray-300`}>
        <p>© 2026 CampusConnect. All rights reserved.</p>
        <p>본 서비스는 교육 목적으로 제작된 프로젝트입니다.</p>
      </div>
    </footer>
  );
}
