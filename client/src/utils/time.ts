export function getTimeSinceCreated(createdAt: string | Date): string {
  const createdDate = new Date(createdAt); // handles both string and Date
  if (isNaN(createdDate.getTime())) {
    throw new Error("Invalid date input");
  }

  const now = new Date();
  const diffInMs = now.getTime() - createdDate.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const days = Math.floor(diffInMs / oneDay);

  if (days === 0) return "Today";

  if (days < 30) {
    return days === 1 ? "1 day" : `${days} days`;
  }

  const months =
    now.getFullYear() * 12 +
    now.getMonth() -
    (createdDate.getFullYear() * 12 + createdDate.getMonth());

  if (months < 12) {
    return months === 1 ? "1 month" : `${months} months`;
  }

  const years = now.getFullYear() - createdDate.getFullYear();
  return years === 1 ? "1 year" : `${years} years`;
}
