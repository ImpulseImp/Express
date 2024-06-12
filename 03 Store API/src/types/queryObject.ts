export type queryObjectType = {
  featured?: boolean;
  company?: string;
  name?: { $regex: string; $options: string };
  sort?: string;
  fields?: string;
  numericFilters?: string;
  [key: string]: any;
};
