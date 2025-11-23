import { SignOutIcon } from "@phosphor-icons/react";
import { logOut } from "@/lib/auth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useState } from "react";
export const LogoutSection = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="p-6 bg-fl-bg rounded-2xl border border-fl-border flex justify-between ">
      <h2 className="text-xl font-semibold text-fl-text relative">
        Logout
        <span className="block w-8 h-0.5 bg-red-500 mt-1 rounded"></span>
      </h2>

      <button
        onClick={() => setOpen(true)}
        className=" cursor-pointer flex items-center gap-2 bg-red-500 text-fl-insider px-4 py-2 rounded-lg hover:bg-red-600 transition"
      >
        <SignOutIcon size={18} weight="fill" />
        <span className="text-sm font-medium">Logout</span>
      </button>

      {/* Delete Confirmation Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-fl-bg text-fl-text border-fl-border">
          <DialogHeader>
            <DialogTitle className="text-fl-text">Logout User?</DialogTitle>
            <DialogDescription className="text-fl-text-2">
              Are you sure you want to log out? You will have to manually log in
              again.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-fl-border text-fl-text hover:bg-fl-bg-sec"
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={logOut}>
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
