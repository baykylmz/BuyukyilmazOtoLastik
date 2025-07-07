export interface Tire {
  id: string;
  brand: string;
  name: string;
  size: string;
  season: 'SUMMER' | 'WINTER' | 'ALL_SEASON';
  price: number;
  stockQuantity: number;
  imageURL?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
} 