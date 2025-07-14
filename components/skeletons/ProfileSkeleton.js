import Skeleton from './Skeleton'

export default function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-12 max-w-3xl mx-auto">
      <div className="flex items-center space-x-4 mb-6">
        <Skeleton className="w-16 h-16 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="w-40 h-4" />
          <Skeleton className="w-32 h-4" />
          <Skeleton className="w-24 h-4" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full rounded-lg" />
        ))}
      </div>
    </div>
  )
}
