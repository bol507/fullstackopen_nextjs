
  
  "use client";

import { useNotification } from "./NotificationContext";

export default function Notification() {
  const { message, type, hideNotification } = useNotification();

  if (!message) return null;

  const isSuccess = type === "success";
  const bgClass = isSuccess 
    ? "bg-emerald-50 dark:bg-emerald-900/20" 
    : "bg-red-50 dark:bg-red-900/20";
  const textClass = isSuccess 
    ? "text-emerald-800 dark:text-emerald-300" 
    : "text-red-800 dark:text-red-300";
  const borderClass = isSuccess 
    ? "border-emerald-400 dark:border-emerald-800" 
    : "border-red-400 dark:border-red-800";
  const icon = isSuccess ? "✅" : "❌";

  return (
    <div
      className={`${bgClass} ${textClass} ${borderClass} border-l-4 p-4 rounded-r-md shadow-lg flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-300`}
      role="alert"
    >
      <div className="flex items-center gap-3">
        <span className="text-lg">{icon}</span>
        <p className="font-medium text-sm">{message}</p>
      </div>
      <button
        onClick={hideNotification}
        className="ml-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        aria-label="Close notification"
      >
        <span className="text-lg font-bold">✕</span>
      </button>
    </div>
  );
}