import { Star, TrendingUp, Code, GitBranch } from "lucide-react";

interface OpenSourceProjectCard {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  contributors: number;
  lastCommit: string;
  trending: boolean;
}

interface Props {
  projectData: OpenSourceProjectCard;
}

const OpenSourceProjectCard = ({ projectData }: Props) => {
  const {
    name,
    description,
    stars,
    forks,
    language,
    contributors,
    trending,
  } = projectData;
  return (
    <div className="group bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 hover:border-gray-700/50 transition-all duration-300 hover:transform hover:scale-105">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="font-bold text-white group-hover:text-green-400 transition-colors">
              {name}
            </h3>
            {trending && (
              <div className="flex items-center px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded-full border border-orange-500/30">
                <TrendingUp size={12} className="mr-1" /> Trending
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center text-yellow-400 space-x-1">
          <Star size={16} />
          <span className="text-sm font-medium">{stars}</span>
        </div>
      </div>
      <p className="text-gray-300 text-sm mb-6 leading-relaxed">
        {description}
      </p>
      <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1">
            <Code size={16} /> <span className="text-gray-300">{language}</span>
          </span>
          <span className="flex items-center space-x-1">
            <GitBranch size={16} /> <span>{forks} forks</span>
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-400">
          <span className="text-gray-300 font-medium">{contributors}</span>{" "}
          contributors
        </span>
        <button className="px-4 py-2 bg-gradient-to-r from-green-500/20 to-teal-500/20 text-green-400 rounded-lg hover:from-green-500/30 hover:to-teal-500/30 border border-green-500/30 hover:border-green-500/50 transition-all duration-200 text-sm font-medium">
          View Project
        </button>
      </div>
    </div>
  );
};

export default OpenSourceProjectCard;
