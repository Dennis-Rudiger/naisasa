export interface Event {
  id: string
  title: string
  date: string
  location: string
  price: string
  image: string
  isVirtual?: boolean
  isFree?: boolean
  virtualLink?: string
}
