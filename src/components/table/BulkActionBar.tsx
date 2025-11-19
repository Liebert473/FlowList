import { Trash2, Copy } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";

interface BulkActionsBarProps {
  count: number;
  onDelete: () => void;
  onDuplicate: () => void;
  onClear: () => void;
}

export default function BulkActionsBar({
  count,
  onDelete,
  onDuplicate,
  onClear,
}: BulkActionsBarProps) {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    onDelete();
    setOpen(false);
  };

  return (
    <>
      <div className="w-full flex items-center gap-3 bg-fl-bg-sec-rev border border-fl-border rounded-xl px-3 py-2">
        {/* Selected Count */}
        <div className="flex items-center gap-2 bg-fl-bg-rev border border-fl-border-rev rounded-lg px-3 py-1 text-sm text-fl-text-rev">
          <span>{count} selected</span>
          <button
            onClick={onClear}
            className="text-fl-info-rev cursor-pointer hover:text-fl-text-rev transition"
          >
            ×
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 ml-auto">
          {/* Duplicate */}
          <button
            onClick={onDuplicate}
            className="flex items-center gap-1 px-2 py-1 text-sm cursor-pointer text-fl-info-rev hover:text-fl-text-rev hover:bg-fl-bg-sec-rev rounded-lg transition"
          >
            <Copy size={16} />
          </button>

          {/* Delete */}
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-1 px-2 py-1 text-sm cursor-pointer text-red-500 hover:text-red-400 hover:bg-fl-bg-sec-rev rounded-lg transition"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-fl-bg text-fl-text border-fl-border">
          <DialogHeader>
            <DialogTitle className="text-fl-text">
              Delete selected items?
            </DialogTitle>
            <DialogDescription className="text-fl-text-2">
              This action cannot be undone. The selected items will be
              permanently removed.
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
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
