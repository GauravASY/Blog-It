import { Skeleton } from "../components/ui/skeleton";

function BlogSkeleton() {
  return (
    <div className="flex flex-col justify-center gap-2 w-full p-4 shadow-sm shadow-gray-300">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-4 w-[60px]" />
        <Skeleton className="h-4 w-[60px]" />
      </div>
      <div>
        <Skeleton className="h-6 w-[350px]" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-[280px]" />
        <Skeleton className="h-4 w-[250px]" />
      </div>
    </div>
  );
}

export default BlogSkeleton;
