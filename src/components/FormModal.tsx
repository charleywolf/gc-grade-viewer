"use client";

import {
  CheckBadgeIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";

import { createRoot } from "react-dom/client";

export function triggerFormModal(message: string, type: boolean) {
  const container = document.getElementById("modal-container");
  if (!container) throw new Error("Failed to find the root element");

  let isUnmounted = false;

  const root = createRoot(container);
  const element = <FormModal message={message} type={type} />;
  root.render(element);

  setTimeout(() => {
    if (!isUnmounted) {
      root.unmount();
      isUnmounted = true;
    }
  }, 3000);
}

export default function FormModal({
  message,
  type,
}: {
  message: string;
  type: boolean;
}) {
  const modalColor = type ? "bg-green-500" : "bg-red-500";

  return (
    <div
      className={`fixed bottom-4 z-50 right-4 p-4 rounded-lg ${modalColor} text-white animate-fadeInOut`}
    >
      <div className="flex items-center gap-2">
        {type ? (
          <CheckBadgeIcon className="h-6 w-auto" />
        ) : (
          <ExclamationCircleIcon className="h-6 w-auto" />
        )}
        {message}
      </div>
    </div>
  );
}
