import { useState, type ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription
} from "@/components/ui/alert-dialog";
import { GlobalAlertDialogContext } from "./context";

type DialogOptions = {
  title: ReactNode;
  description?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
};

export type GlobalAlertDialogContextType = {
  showDialog: (options: DialogOptions) => void;
  beforeClose?: () => void;
};


export const GlobalAlertDialogProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<DialogOptions | null>(null);

  const showDialog = (opt: DialogOptions) => {
    setOptions(opt);
    setOpen(true);
  };

  return (
    <GlobalAlertDialogContext.Provider value={{ showDialog }}>
      {children}

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader >
            <AlertDialogTitle>{options?.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {options?.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="cursor-pointer bg-red-500 hover:bg-red-600 text-white hover:text-gray-100 font-semibold text-base rounded-lg"
              onClick={() => setOpen(false)}>
              {options?.cancelText || "Cancel"}
            </AlertDialogCancel>
            {
              options?.confirmText && (
                <AlertDialogAction
                  className="cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-base rounded-lg"
                  onClick={(e) => {
                    e.preventDefault();
                    options?.onConfirm?.()
                    console.log('closing dialog');
                    setOpen(false)
                  }}
                >
                  {options?.confirmText || "Confirm"}
                </AlertDialogAction>
              )
            }
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </GlobalAlertDialogContext.Provider>
  )
}
