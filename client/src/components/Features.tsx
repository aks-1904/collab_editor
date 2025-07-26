import { Code2, FileText, MessageSquare, Zap } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Code2 className="h-8 w-8" />,
      title: "Real-time Collaboration",
      description:
        "Code together with your team in real-time. See live cursors, instant edits, and synchronized changes across all devices.",
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "Inline Comments",
      description:
        "Add contextual comments directly in your code. Discuss specific lines, suggest improvements, and keep conversations organized.",
      color: "from-green-400 to-green-600",
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Smart File Management",
      description:
        "Organize your projects with intelligent file trees, quick search, and seamless navigation across multiple codebases.",
      color: "from-purple-400 to-purple-600",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning Fast",
      description:
        "Experience blazing-fast performance with optimized real-time synchronization and minimal latency worldwide.",
      color: "from-yellow-400 to-orange-500",
    },
  ];

  return (
    <div className="py-24 bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
            Why Choose Collab-Editor?
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Built for modern development teams who demand speed, reliability,
            and seamless collaboration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-gray-600 rounded-2xl p-8 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-gray-900/50"
            >
              <div
                className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${feature.color} mb-6 group-hover:shadow-lg transition-all duration-300`}
              >
                <div className="text-white">{feature.icon}</div>
              </div>

              <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-blue-400 transition-colors">
                {feature.title}
              </h3>

              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
