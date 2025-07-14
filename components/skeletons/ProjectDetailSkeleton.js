import Skeleton from './Skeleton'

export default function ProjectDetailSkeleton() {
  return (
    <div className="min-h-screen bg-white p-6 sm:p-12 max-w-4xl mx-auto space-y-8">
      <Skeleton className="w-40 h-4" />
      <Skeleton className="w-80 h-6" />
      <Skeleton className="w-full h-64 rounded-lg" />
      <Skeleton className="w-32 h-4" />
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-4 w-3/4" />
        ))}
      </div>
    </div>
  )
}
