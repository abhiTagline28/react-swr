import { toast } from "react-toastify";

export const handleToast = () => {
  const errorMsg = toast.error;
  const successMsg = toast.success;
  return { errorMsg, successMsg };
};
