import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface AlertDialogBoxProps {
  onAlertContinue: () => void;
  children: React.ReactNode;
}

export default function AlertDialogBox({
  onAlertContinue,
  children,
}: AlertDialogBoxProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>{children}</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant={"outline"}>Cancel</Button>
        </DialogClose>
        <DialogClose asChild>
          <Button
            variant={"default"}
            className="bg-sky-400 hover:bg-sky-500"
            onClick={() => onAlertContinue()}
          >
            Continue
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
