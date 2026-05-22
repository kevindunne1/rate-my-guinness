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

// Unsplash photos — free for commercial use, no attribution required (Unsplash Licence)
const PHOTOS = [
  "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=800&q=80", // dark stout pint
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", // pint on bar
  "https://images.unsplash.com/photo-1566633806327-68e152aaf26d?w=800&q=80", // guinness pint
  "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=800&q=80", // stout close up
  "https://images.unsplash.com/photo-1527481138388-31827a7c94d5?w=800&q=80", // pub pint
  "https://images.unsplash.com/photo-1600788886242-5c96aabe3757?w=800&q=80", // dark beer glass
  "https://images.unsplash.com/photo-1518099074172-2e47ee6cfdc0?w=800&q=80", // pub interior pint
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80", // beer on table
  "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&q=80", // pint glass
  "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80", // stout
  "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?w=800&q=80", // beer pour
  "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80", // golden pint
  "https://images.unsplash.com/photo-1436076863939-06870fe779c2?w=800&q=80", // dark pint close
  "https://images.unsplash.com/photo-1474722883778-792e7990302f?w=800&q=80", // bar stout
  "https://images.unsplash.com/photo-1559526324-593bc073d938?w=800&q=80", // pint on wood
];

const p = (i: number) => PHOTOS[i % PHOTOS.length];

export const PINTS: Pint[] = [
  // Dublin
  {
    id: "1",
    photo: p(0),
    pub: "The Long Hall",
    city: "Dublin",
    country: "Ireland",
    lat: 53.3428,
    lng: -6.2639,
    handle: "@stoutscout",
    date: "2 hours ago",
    score: 4.8,
    ratings: 142,
    notes: "Cathedral of a pour. Worth every second of the wait.",
  },
  {
    id: "2",
    photo: p(1),
    pub: "Mulligan's",
    city: "Dublin",
    country: "Ireland",
    lat: 53.3456,
    lng: -6.2534,
    handle: "@pintpilgrim",
    date: "Yesterday",
    score: 4.7,
    ratings: 203,
    notes: "Since 1782. The pint knows.",
  },
  {
    id: "3",
    photo: p(2),
    pub: "Kehoe's",
    city: "Dublin",
    country: "Ireland",
    lat: 53.3408,
    lng: -6.2573,
    handle: "@kehoefan",
    date: "3 days ago",
    score: 4.6,
    ratings: 189,
  },
  {
    id: "4",
    photo: p(3),
    pub: "The Stag's Head",
    city: "Dublin",
    country: "Ireland",
    lat: 53.3445,
    lng: -6.2644,
    handle: "@dublinpours",
    date: "5 days ago",
    score: 4.5,
    ratings: 97,
  },
  {
    id: "5",
    photo: p(4),
    pub: "Grogan's Castle Lounge",
    city: "Dublin",
    country: "Ireland",
    lat: 53.3406,
    lng: -6.2626,
    handle: "@traditional_tom",
    date: "1 week ago",
    score: 4.4,
    ratings: 76,
  },
  {
    id: "6",
    photo: p(5),
    pub: "The Palace Bar",
    city: "Dublin",
    country: "Ireland",
    lat: 53.3461,
    lng: -6.2584,
    handle: "@literarypint",
    date: "1 week ago",
    score: 4.3,
    ratings: 58,
    notes: "Haunt of Flann O'Brien. The pint would approve.",
  },
  {
    id: "7",
    photo: p(6),
    pub: "John Kavanagh's (The Gravediggers)",
    city: "Dublin",
    country: "Ireland",
    lat: 53.3694,
    lng: -6.2700,
    handle: "@gravedigger",
    date: "2 weeks ago",
    score: 4.9,
    ratings: 312,
    notes: "Best pint in Dublin. Non-negotiable.",
  },
  {
    id: "8",
    photo: p(7),
    pub: "Doheny & Nesbitt",
    city: "Dublin",
    country: "Ireland",
    lat: 53.3343,
    lng: -6.2500,
    handle: "@politicalpint",
    date: "3 weeks ago",
    score: 4.2,
    ratings: 44,
  },
  // Belfast
  {
    id: "9",
    photo: p(8),
    pub: "The Crown Bar",
    city: "Belfast",
    country: "N. Ireland",
    lat: 54.5963,
    lng: -5.9331,
    handle: "@northernpour",
    date: "4 days ago",
    score: 4.5,
    ratings: 134,
    notes: "National Trust listed. The snugs are worth the trip alone.",
  },
  {
    id: "10",
    photo: p(9),
    pub: "White's Tavern",
    city: "Belfast",
    country: "N. Ireland",
    lat: 54.5980,
    lng: -5.9300,
    handle: "@belfastbarfly",
    date: "2 weeks ago",
    score: 4.1,
    ratings: 67,
  },
  // London
  {
    id: "11",
    photo: p(10),
    pub: "The Toucan",
    city: "London",
    country: "UK",
    lat: 51.5131,
    lng: -0.1316,
    handle: "@londonpint",
    date: "3 days ago",
    score: 4.3,
    ratings: 88,
    notes: "Soho institution. Tiny but mighty.",
  },
  {
    id: "12",
    photo: p(11),
    pub: "The Harp",
    city: "London",
    country: "UK",
    lat: 51.5088,
    lng: -0.1245,
    handle: "@coventgarden",
    date: "1 week ago",
    score: 4.0,
    ratings: 55,
  },
  // New York
  {
    id: "13",
    photo: p(12),
    pub: "The Dead Rabbit",
    city: "New York",
    country: "USA",
    lat: 40.7027,
    lng: -74.0133,
    handle: "@nycstout",
    date: "5 days ago",
    score: 4.4,
    ratings: 201,
    notes: "World's best bar. The pour backs it up.",
  },
  {
    id: "14",
    photo: p(13),
    pub: "McSorley's Old Ale House",
    city: "New York",
    country: "USA",
    lat: 40.7285,
    lng: -73.9890,
    handle: "@oldestpub",
    date: "2 weeks ago",
    score: 1.8,
    ratings: 176,
    notes: "Historic place, questionable pour. Comes out lukewarm.",
  },
  // Sydney
  {
    id: "15",
    photo: p(14),
    pub: "P.J. O'Brien's",
    city: "Sydney",
    country: "Australia",
    lat: -33.8676,
    lng: 151.2070,
    handle: "@aussieswill",
    date: "1 week ago",
    score: 3.2,
    ratings: 89,
    notes: "Better than average for Sydney. Low bar.",
  },
  // New entry — zero ratings for demo
  {
    id: "16",
    photo: p(0),
    pub: "Toner's",
    city: "Dublin",
    country: "Ireland",
    lat: 53.3357,
    lng: -6.2493,
    handle: "@toners_regular",
    date: "Just now",
    score: 0,
    ratings: 0,
    notes: "First submission from this spot.",
  },
];