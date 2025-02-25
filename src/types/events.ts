export interface User {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string | null;
  price: number | string;
  capacity: number;
  isVirtual: boolean;
  isFree: boolean;
  virtualLink?: string;
  category: string;
  status: 'DRAFT' | 'ACTIVE' | 'CANCELLED' | 'COMPLETED';
  creator?: {
    name: string | null;
    image: string | null;
  };
}

export interface CartItem {
  id: string
  title: string
  price: number
  quantity: number
  image: string
}
