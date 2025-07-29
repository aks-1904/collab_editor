import { Clock, Users } from "lucide-react";

interface UserProjectCard {
  id: number;
  name: string;
  description: string;
  members: number;
  status: string;
  lastUpdated: string;
  tech: string[];
  gradient: string;
}

interface Props {
  projectData: UserProjectCard;
}

const UserProjectCard = ({ projectData }: Props) => {
    const {name, description, members, status, lastUpdated, tech, gradient} = projectData;
  return (
    <div className="group bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 hover:border-gray-700/50 transition-all duration-300 hover:transform hover:scale-105">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-bold text-white text-lg mb-2 group-hover:text-blue-400 transition-colors">
            {name}
          </h3>
          <div
            className={`w-12 h-1 bg-gradient-to-r ${gradient} rounded-full mb-3`}
          ></div>
        </div>
        <span
          className={`px-3 py-1 text-xs rounded-full font-medium ${
            status === "Active"
              ? "bg-green-500/20 text-green-400 border border-green-500/30"
              : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
          }`}
        >
          {status}
        </span>
      </div>
      <p className="text-gray-300 text-sm mb-6 leading-relaxed">
        {description}
      </p>
      <div className="flex flex-wrap gap-2 mb-6">
        {tech.map((t) => (
          <span
            key={t}
            className="px-3 py-1 bg-gray-800/50 text-gray-300 text-xs rounded-lg border border-gray-700/50 hover:border-gray-600/50 transition-colors"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between text-sm text-gray-400">
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
  );
};

export default UserProjectCard;
