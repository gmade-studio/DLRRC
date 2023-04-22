import { Item } from '.';

export type Part = {
  no: string;
  label: string;
  totalScore: number;
  items: Item[]
}