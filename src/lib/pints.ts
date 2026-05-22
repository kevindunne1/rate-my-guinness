import pint1 from "@/assets/pint-1.jpg";
import pint2 from "@/assets/pint-2.jpg";
import pint3 from "@/assets/pint-3.jpg";
import pint4 from "@/assets/pint-4.jpg";
import pint5 from "@/assets/pint-5.jpg";
import pint6 from "@/assets/pint-6.jpg";

export type Pint = {
  id: string;
  photo: string;
  pub: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  handle: string;
  date: string;
  score: number;
  ratings: number;
  notes?: string;
};

export const PINTS: Pint[] = [
  { id: "1", photo: pint1, pub: "The Long Hall", city: "Dublin", country: "Ireland", lat: 53.3416, lng: -6.2649, handle: "@stoutscout", date: "2 hours ago", score: 4.8, ratings: 142, notes: "Cathedral of a pour." },
  { id: "2", photo: pint2, pub: "Mulligan's", city: "Dublin", country: "Ireland", lat: 53.3458, lng: -6.2533, handle: "@pintpilgrim", date: "Yesterday", score: 4.6, ratings: 88 },
  { id: "3", photo: pint3, pub: "The Toucan", city: "London", country: "UK", lat: 51.5142, lng: -0.1356, handle: "@thirstyfox", date: "3 days ago", score: 4.2, ratings: 56 },
  { id: "4", photo: pint4, pub: "O'Malley's Tavern", city: "Boston", country: "USA", lat: 42.3601, lng: -71.0589, handle: "@bostonbarfly", date: "Last week", score: 1.4, ratings: 211, notes: "An insult to the harp." },
  { id: "5", photo: pint5, pub: "The Cobblestone", city: "Dublin", country: "Ireland", lat: 53.3492, lng: -6.2779, handle: "@traditional_tom", date: "5 days ago", score: 4.9, ratings: 320 },
  { id: "6", photo: pint6, pub: "The Brazen Head", city: "Dublin", country: "Ireland", lat: 53.3441, lng: -6.2756, handle: "@oldschool", date: "1 week ago", score: 4.4, ratings: 175 },
  { id: "7", photo: pint2, pub: "The Crown", city: "Belfast", country: "UK", lat: 54.5949, lng: -5.9333, handle: "@northernpour", date: "2 weeks ago", score: 3.8, ratings: 67 },
  { id: "8", photo: pint4, pub: "Sydney Sports Bar", city: "Sydney", country: "Australia", lat: -33.8688, lng: 151.2093, handle: "@aussieswill", date: "3 weeks ago", score: 1.9, ratings: 134 },
  { id: "9", photo: pint3, pub: "Kehoe's", city: "Dublin", country: "Ireland", lat: 53.3411, lng: -6.2589, handle: "@kehoefan", date: "1 month ago", score: 4.7, ratings: 256 },
];
