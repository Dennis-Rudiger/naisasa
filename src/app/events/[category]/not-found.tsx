import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-4xl font-display font-bold mb-4">Category Not Found</h2>
        <p className="text-gray-600 mb-8">Sorry, the event category you're looking for doesn't exist.</p>
        <Link href="/" className="btn-primary">
          Return Home
        </Link>
      </div>
    </div>
  )
}
