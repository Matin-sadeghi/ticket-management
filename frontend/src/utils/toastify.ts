import { toast } from "react-toastify";

export const toasti = (
  text: string,
  type: "info" | "success" | "warning" | "error" | "default",
  icon: string,
  theme: "light" | "dark" | "colored" = "colored",
  position:
    | "top-right"
    | "top-center"
    | "top-left"
    | "bottom-right"
    | "bottom-center"
    | "bottom-left" = "bottom-right",
  autoClose = 5000,
  hideProgressBar = false,
  closeOnClick = true,
  pauseOnHover = true,
  draggable = true,
  progress = undefined
) => {
  toast(text, {
    type,
    icon,
    theme,
    position,
    autoClose,
    hideProgressBar,
    closeOnClick,
    pauseOnHover,
    draggable,
    progress,
  });
};
