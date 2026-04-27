import React from 'react';

export const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-slate-200 rounded-2xl ${className}`} />
);

export const ProductSkeleton = () => (
  <div className="bg-white border border-slate-100 rounded-[32px] p-6 shadow-sm">
    <Skeleton className="aspect-square w-full mb-6" />
    <Skeleton className="h-6 w-3/4 mb-4" />
    <Skeleton className="h-5 w-1/2 mb-6" />
    <div className="flex justify-between items-center mt-auto">
      <Skeleton className="h-8 w-24" />
      <Skeleton className="h-10 w-10 rounded-xl" />
    </div>
  </div>
);

export const ServiceSkeleton = () => (
  <div className="bg-white border border-slate-100 rounded-[32px] p-8 shadow-sm">
    <Skeleton className="w-16 h-16 mb-8" />
    <Skeleton className="h-8 w-3/4 mb-4" />
    <Skeleton className="h-20 w-full mb-8" />
    <Skeleton className="h-6 w-32" />
  </div>
);
