export default function Loading() {
  return (
    <div>
      <div className="relative h-[40vh] bg-gray-200 animate-pulse" />
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="card">
              <div className="relative aspect-video mb-4 bg-gray-200 animate-pulse rounded-lg" />
              <div className="h-6 bg-gray-200 animate-pulse rounded mb-2" />
              <div className="h-4 bg-gray-200 animate-pulse rounded mb-4" />
              <div className="h-4 bg-gray-200 animate-pulse rounded mb-2 w-1/2" />
              <div className="h-4 bg-gray-200 animate-pulse rounded mb-4 w-1/3" />
              <div className="flex justify-between items-center">
                <div className="h-6 bg-gray-200 animate-pulse rounded w-20" />
                <div className="h-10 bg-gray-200 animate-pulse rounded w-24" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
