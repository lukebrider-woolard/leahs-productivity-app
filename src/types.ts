export interface MagnetData {
  id: string;
  name: string;
  stock: number;
  bundles: string[];
  sold: number;
  countries: string[];
}

export interface SalesData {
  id: string;
  date: string;
  magnets: string[];
}