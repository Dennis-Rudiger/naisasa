export interface Event {
  id: string
  title: string
  description: string
  date: string
  location: string
  price: string | number
  image: string
  status?: 'DRAFT' | 'ACTIVE' | 'CANCELLED' | 'COMPLETED'
  isVirtual?: boolean
  isFree?: boolean
  virtualLink?: string
  capacity?: number
  creatorId?: string
  categoryId?: string
}

export interface CartItem {
  id: string
  title: string
  price: number
  quantity: number
  image: string
}
