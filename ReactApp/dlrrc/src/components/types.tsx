export type Checklist = {
  totalScore: number;
  parts: Part[];
};

export type Part = {
  no: string;
  label: string;
  totalScore: number;
  items: Item[]
}

export type Item = {
  no: number;
  label: string;
  description: string;
  totalScore: number;
  options: Option[]
};

export type Option = {
  answer: string;
  score: number;
}
