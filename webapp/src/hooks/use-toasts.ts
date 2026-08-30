import { useContext } from "react";
import type { Toast } from "@/contexts/toast-context";
import { ToastContext } from "@/contexts/toast-context";

/**
 * Wrapper hook for our toast provider / context.
 *
 * @returns function to enqueue a toast notification.
 */
export function useToasts() {
  const context = useContext(ToastContext);

  if (!context) {
    throw Error("useToasts must be used within ToastProvider");
  }

  const { setToasts } = context;

  const enqueueToast = ({ message, severity }: Omit<Toast, "id">) => {
    const id = new Date().getTime() + Math.random();
    setToasts((prev) => [...prev, { id, message, severity }]);
  };

  return enqueueToast;
}
