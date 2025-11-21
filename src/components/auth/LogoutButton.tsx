import { cn } from "@/lib/utils";
import { unSetUser } from "@/redux/features/auth/auth-slice";
import { useAppDispatch } from "@/redux/hooks";
import { useLogoutMutation } from "@/redux/services/auth/auth-api";
import handleApiError from "@/utils/handleApiError";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";

interface LogoutButtonProps {
  classNames?: string;
}

const LogoutButton = ({ classNames }: LogoutButtonProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      toast.success("Logout Successful", {
        description: new Date().toLocaleString(),
      });
      setTimeout(() => {
        router.push("/login");
      }, 200);
    } catch (error) {
      const errMessage = handleApiError(error);
      toast.error(errMessage, {
        description: new Date().toLocaleString(),
      });
    } finally {
      dispatch(unSetUser());
    }
  };

  return (
    <Button className={cn("w-full", classNames)} onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
