import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type DateViewProps = {
  value: Date | undefined;
};

export function DateView({ value }: DateViewProps) {
  return (
    <div
      className={cn(
        "w-full justify-start text-left font-normal flex items-center",
        !value && "text-muted-foreground"
      )}
    >
      <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
      {value ? format(value, "PPP") : <span>No date</span>}
    </div>
  );
}
