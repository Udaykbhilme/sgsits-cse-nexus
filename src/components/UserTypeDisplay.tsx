import { Crown, GraduationCap, Users, UserCheck } from "lucide-react";
import { useUserRoleManager } from "@/hooks/useUserRoleManager";

const UserTypeDisplay = () => {
  const { userType } = useUserRoleManager();

  const getUserTypeDisplay = () => {
    switch (userType) {
      case 'admin':
        return (
          <div className="flex items-center justify-center gap-2 mt-2">
            <Crown className="w-5 h-5 text-yellow-500" />
            <span className="text-lg font-bold text-yellow-500">Administrator</span>
            <Crown className="w-5 h-5 text-yellow-500" />
          </div>
        );
      case 'faculty':
        return (
          <div className="flex items-center justify-center gap-2 mt-2">
            <UserCheck className="w-5 h-5 text-blue-500" />
            <span className="text-lg font-bold text-blue-500">Faculty Member</span>
          </div>
        );
      case 'alumni':
        return (
          <div className="flex items-center justify-center gap-2 mt-2">
            <Users className="w-5 h-5 text-green-500" />
            <span className="text-lg font-bold text-green-500">Alumni</span>
          </div>
        );
      case 'student':
        return (
          <div className="flex items-center justify-center gap-2 mt-2">
            <GraduationCap className="w-5 h-5 text-purple-500" />
            <span className="text-lg font-bold text-purple-500">Student</span>
          </div>
        );
      default:
        return null;
    }
  };

  return getUserTypeDisplay();
};

export default UserTypeDisplay;