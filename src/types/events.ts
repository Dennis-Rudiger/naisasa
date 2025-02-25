export interface Event {
  id: string
  title: string
  description: string
  location: string
  date: string
  image: string
  price: number | string
  isFree: boolean
  isVirtual: boolean
  category: string
  status: string
}

export interface CartItem {
  id: string
  title: string
  price: number
  quantity: number
  image: string
}
