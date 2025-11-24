import { GlobalAlertDialogContext } from "@/components/custom/global-alert-dialog/context";
import { useContext } from "react";

export const useGlobaAlertDialog = () => {
  const context = useContext(GlobalAlertDialogContext);

  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }

  return context;
}
