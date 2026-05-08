import { createContext, useContext, useState, ReactNode } from "react";
import type { User, StudentProfile, ProfessorProfile, UserRole } from "../types";

interface AuthContextType {
  user: User | StudentProfile | ProfessorProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  role: UserRole | null;
  isStudent: boolean;
  isProfessor: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUserRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | StudentProfile | ProfessorProfile | null>(() => {
    // 초기 사용자 (개발용)
    const mockStudent: StudentProfile = {
      id: "1",
      name: "류지원",
      email: "student@example.com",
      role: "student",
      studentId: "2021123456",
      major: "컴퓨터공학과",
      skills: ["React", "TypeScript", "Node.js"],
      bio: "웹 개발에 관심이 많은 학생입니다.",
    };
    return mockStudent;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const role = user?.role || null;
  const isStudent = role === "student";
  const isProfessor = role === "professor";
  const isAdmin = role === "admin";

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // TODO: 실제 로그인 API 호출
    console.log("Login attempt:", email, password);
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const setUserRole = (newRole: UserRole) => {
    if (user) {
      if (newRole === "professor") {
        const mockProfessor: ProfessorProfile = {
          id: "prof1",
          name: "김교수",
          email: "prof@example.com",
          role: "professor",
          department: "컴퓨터공학부",
          office: "공학관 301호",
          researchAreas: ["웹 기술", "소프트웨어 공학"],
          officeHours: "화, 목 15:00-17:00",
        };
        setUser(mockProfessor);
      } else if (newRole === "student") {
        const mockStudent: StudentProfile = {
          id: "1",
          name: "류지원",
          email: "student@example.com",
          role: "student",
          studentId: "2021123456",
          major: "컴퓨터공학과",
          skills: ["React", "TypeScript", "Node.js"],
          bio: "웹 개발에 관심이 많은 학생입니다.",
        };
        setUser(mockStudent);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        role,
        isStudent,
        isProfessor,
        isAdmin,
        login,
        logout,
        setUserRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
