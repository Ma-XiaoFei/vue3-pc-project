export interface OptionsItemType {
  label?: string;
  value: string | number;
}

export type QueryGroupType = {
  label: string;
  name: string;
  options: OptionsItemType[];
}[];
