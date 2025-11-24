import { createContext } from "react";
import type { GlobalAlertDialogContextType } from "./component";

export const GlobalAlertDialogContext =
  createContext<GlobalAlertDialogContextType | null>(null);
