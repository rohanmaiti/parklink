export const LoadingSkeleton = () => {
    return (
      <div className="bg-blue-50 h-screen flex flex-row justify-center items-center" >
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-600"></div>
      </div>
    );
  };