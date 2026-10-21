import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";

export type Toast = {
  /**
   * The id (so we can remove them)
   */
  id: number;

  /**
   * Message to display in the toast / snackbar.
   */
  message: string;

  /**
   * The alert severity of the toast / snackbar.
   */
  severity: "info" | "success" | "warning" | "error";
};

interface ToastContextType {
  setToasts: Dispatch<SetStateAction<Array<Toast>>>;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);
