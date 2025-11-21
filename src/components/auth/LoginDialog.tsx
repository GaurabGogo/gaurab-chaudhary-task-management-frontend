import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";

interface LoginDialogProps {
  openDialog: boolean;
  setOpenDialog: (openDialog: boolean) => void;
}

const LoginDialog: React.FC<LoginDialogProps> = ({
  openDialog,
  setOpenDialog,
}) => {
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="flex flex-col gap-2">
        <h2 className="text-xl font-bold">Account</h2>
        <p className="text-sm text-gray-600">
          You need to login to access your account. Please login to your account
          to continue.
        </p>
        <Link href={"/login"}>
          <Button
            variant="default"
            className="mt-3 w-full bg-sky-400 hover:bg-sky-500"
          >
            Login
          </Button>
        </Link>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
