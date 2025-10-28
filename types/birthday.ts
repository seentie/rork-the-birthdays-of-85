export interface Birthday {
  id: string;
  name: string;
  date: {
    month: number; // 1-12
    day: number; // 1-31
  };
  photo?: string; // base64 or URI
  notes?: string;
  createdAt: number;
  updatedAt: number;
}

export interface MonthData {
  month: number;
  name: string;
  days: number;
}