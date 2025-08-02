import { Crown } from "lucide-react";
import type { UserCard } from "./dialog/AddMembers";

const MembersCard = ({
  member,
  isOwner,
}: {
  member: UserCard;
  isOwner: boolean;
}) => {
  return (
    <div
      key={member.id}
      className="flex items-center space-x-3 p-3 bg-gray-800/30 rounded-xl border border-gray-700/30 hover:border-gray-600/50 transition-all duration-200"
    >
      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-sm font-bold">
        {member.avatar}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <p className="font-medium text-white text-sm truncate">
            {member.name}
          </p>
          {isOwner && (
            <p>
              <Crown size={16} className="text-yellow-300" />
            </p>
          )}
        </div>
        <p className="text-gray-400 text-xs">{member.email}</p>
      </div>
    </div>
  );
};

export default MembersCard;
