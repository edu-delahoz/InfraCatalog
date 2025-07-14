import Skeleton from './Skeleton'

export default function GovernanceSkeleton({ count = 2 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-lg p-5 shadow space-y-3">
          <Skeleton className="h-5 w-5/6" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-8 w-full rounded" />
        </div>
      ))}
    </div>
  )
}
