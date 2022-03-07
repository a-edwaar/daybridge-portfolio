export interface Roadmap {
  categories: string[];
  tags: Tag[];
  cards: Card[];
  months: string[];
  years: number[];
  initialYear: number;
  introHtml: string;
}

export interface Card {
  title: string;
  bio: string;
  url: string;
  tag: number;
  secondaryTag: string | null;
  category: number;
  startDate: string;
  endDate: string | null;
}

export interface Tag {
  name: string;
  fromColor: string;
  toColor: string;
}
