import React from 'react';

export const SkeletonProductCard = () => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-4 flex flex-col gap-4 animate-pulse shadow-premium">
      <div className="w-full aspect-square bg-slate-200 dark:bg-slate-800 rounded-2xl" />
      <div className="flex flex-col gap-2">
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-1/3" />
        <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded-md w-3/4" />
        <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-md w-1/2" />
      </div>
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-50 dark:border-slate-800">
        <div className="flex flex-col gap-1 w-1/3">
          <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded-md" />
          <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-md w-3/4" />
        </div>
        <div className="h-9 bg-slate-200 dark:bg-slate-800 rounded-xl w-20" />
      </div>
    </div>
  );
};

export const SkeletonCategoryCard = () => {
  return (
    <div className="flex flex-col items-center gap-2 animate-pulse p-2">
      <div className="w-20 h-20 bg-slate-200 dark:bg-slate-800 rounded-full" />
      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-16" />
    </div>
  );
};

export const SkeletonProductDetails = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 py-8 animate-pulse">
      <div className="aspect-square bg-slate-200 dark:bg-slate-800 rounded-3xl" />
      <div className="flex flex-col gap-6 justify-center">
        <div className="flex flex-col gap-3">
          <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-md w-1/4" />
          <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-md w-3/4" />
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-1/2" />
        </div>
        <hr className="border-slate-100 dark:border-slate-800" />
        <div className="flex gap-4">
          <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-md w-24" />
          <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-md w-20" />
        </div>
        <div className="h-20 bg-slate-200 dark:bg-slate-800 rounded-xl w-full" />
        <div className="flex gap-4 items-center">
          <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded-2xl w-32" />
          <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded-2xl w-40" />
        </div>
      </div>
    </div>
  );
};
