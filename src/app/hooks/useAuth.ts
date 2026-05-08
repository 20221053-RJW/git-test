import { useState, useEffect } from "react";
import type { User, StudentProfile, ProfessorProfile } from "../types";

interface AuthState {
  user: User | StudentProfile | ProfessorProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

/**
 * 인증 상태를 관리하는 커스텀 훅
 * 향후 실제 인증 API와 통합할 수 있도록 설계됨
 */
export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    // Mock 사용자 데이터 - 실제로는 localStorage나 API에서 가져옴
    const mockUser: StudentProfile = {
      id: "1",
      name: "류지원",
      email: "student@example.com",
      role: "student",
      studentId: "2021123456",
      major: "컴퓨터공학과",
      skills: ["React", "TypeScript", "Node.js"],
      bio: "웹 개발에 관심이 많은 학생입니다.",
    };

    // 임시 로그인 상태 설정
    setTimeout(() => {
      setAuthState({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
      });
    }, 500);
  }, []);

  const login = async (email: string, password: string) => {
    // TODO: 실제 로그인 API 호출
    console.log("Login attempt:", email, password);
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  return {
    ...authState,
    login,
    logout,
  };
}
