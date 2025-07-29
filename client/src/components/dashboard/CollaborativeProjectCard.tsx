import { Clock, Users } from "lucide-react";

interface CollaborativeProjectCard {
  name: string;
  description: string;
  owner: string;
  role: string;
  members: number;
  lastUpdated: string;
}

interface Props {
  projectData: CollaborativeProjectCard;
}

const CollaborativeProjectCard = ({ projectData }: Props) => {
  const { name, description, owner, role, members, lastUpdated } = projectData;
  
  return (
    <div className="p-6 hover:bg-gray-800/30 transition-all duration-200 border-b border-gray-800/50">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-bold text-white text-lg hover:text-purple-400 transition-colors cursor-pointer">
          {name}
        </h3>
        <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full border border-purple-500/30 font-medium">
          {role}
        </span>
      </div>
      <p className="text-gray-300 text-sm mb-4 leading-relaxed">
        {description}
      </p>
      <div className="flex items-center justify-between text-sm text-gray-400">
        <span>
          Owner: <span className="text-gray-300 font-medium">{owner}</span>
        </span>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-1">
            <Users size={16} />
            <span>{members} members</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock size={16} />
            <span>{lastUpdated}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollaborativeProjectCard;
