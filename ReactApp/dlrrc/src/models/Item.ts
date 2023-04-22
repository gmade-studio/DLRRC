import { Option } from '.';

export type Item = {
  no: number;
  label: string;
  description: string;
  totalScore: number;
  options: Option[]
};