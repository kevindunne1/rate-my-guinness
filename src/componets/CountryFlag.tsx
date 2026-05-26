export const COUNTRY_CODES: Record<string, string> = {
  "Ireland":     "ie",
  "N. Ireland":  "gb",
  "UK":          "gb",
  "Scotland":    "gb-sct",
  "USA":         "us",
  "Canada":      "ca",
  "Australia":   "au",
  "New Zealand": "nz",
  "Spain":       "es",
  "Germany":     "de",
  "France":      "fr",
  "Japan":       "jp",
  "Singapore":   "sg",
};

type Size = "sm" | "md";

const DIMS: Record<Size, { w: number; h: number }> = {
  sm: { w: 16, h: 12 },
  md: { w: 24, h: 18 },
};

export function CountryFlag({ country, size = "md" }: { country: string; size?: Size }) {
  const code = COUNTRY_CODES[country];
  if (!code) return null;
  const { w, h } = DIMS[size];
  return (
    <img
      src={`https://flagcdn.com/${w}x${h}/${code}.png`}
      srcSet={`https://flagcdn.com/${w * 2}x${h * 2}/${code}.png 2x`}
      width={w}
      height={h}
      alt={country}
      className="rounded-sm shadow-sm shrink-0"
    />
  );
}