export function ScoreBadge({ score, size = "md" }: { score: number; size?: "sm" | "md" | "lg" }) {
  const tone =
    score >= 4
      ? "bg-gold text-stout"
      : score >= 2
      ? "bg-cream text-stout"
      : "bg-blood text-cream";
  const dim = {
    sm: "h-9 w-9 text-sm",
    md: "h-12 w-12 text-base",
    lg: "h-20 w-20 text-2xl",
  }[size];
  return (
    <div
      className={`${tone} ${dim} flex shrink-0 items-center justify-center rounded-full font-serif font-bold shadow-gold`}
    >
      {score.toFixed(1)}
    </div>
  );
}
