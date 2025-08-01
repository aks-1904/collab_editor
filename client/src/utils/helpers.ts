const gradientCombos = [
  "from-green-500 to-blue-500",
  "from-pink-500 to-rose-500",
  "from-blue-500 to-indigo-500",
  "from-emerald-500 to-teal-500",
  "from-violet-500 to-purple-500",
];

export function getRandomGradient(): string {
  return gradientCombos[Math.floor(Math.random() * gradientCombos.length)];
}
