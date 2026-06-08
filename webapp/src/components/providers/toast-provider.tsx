import { Alert, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import type { Dispatch, PropsWithChildren, SetStateAction } from "react";
import type { Toast } from "@/contexts/toast-context";
import { ToastContext } from "@/contexts/toast-context";

const DEFAULT_TIMEOUT = 3000;

type ToastProps = { setToasts: Dispatch<SetStateAction<Array<Toast>>> } & Toast;

/**
 * Wrapper around a Mui {@link Snackbar} with logic to dequeue.
 */
function Toast({ id, message, severity, setToasts }: Readonly<ToastProps>) {
  useEffect(() => {
    const timer = setTimeout(
      () => setToasts((prev) => prev.filter((toast) => toast.id !== id)),
      DEFAULT_TIMEOUT,
    );
    return () => clearTimeout(timer);
  });

  return (
    <Snackbar open anchorOrigin={{ horizontal: "left", vertical: "bottom" }}>
      <Alert severity={severity}>{message}</Alert>
    </Snackbar>
  );
}

/**
 * Renders toasts for the app.
 */
export function ToastProvider({ children }: PropsWithChildren) {
  const [toasts, setToasts] = useState<Array<Toast>>([]);

  return (
    <ToastContext.Provider value={{ setToasts }}>
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} setToasts={setToasts} />
      ))}
      {children}
    </ToastContext.Provider>
  );
}
