import { FunnelSimple, MagnifyingGlass } from "@phosphor-icons/react";
import type { TableType } from "@/types/types";

interface TableHeaderProps {
  tableData: TableType;
}

export default function TableHeader({ tableData }: TableHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-fl-border py-4 px-6">
      {/* Left side */}
      <h2 className="text-xl font-semibold text-fl-text relative">
        {tableData?.title ?? "Not Found"}
        <span className="block w-10 h-0.5 bg-fl-primary mt-1 rounded"></span>
      </h2>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Filter Buttons */}
        {[1, 2].map((id) => (
          <button
            key={id}
            className="flex items-center gap-2 border border-fl-border rounded-full px-4 py-1.5 text-sm font-medium text-fl-text hover:bg-fl-hover transition relative cursor-pointer"
          >
            <FunnelSimple size={18} weight="bold" />
            Filter
            <span className="absolute -top-1 -right-1 bg-fl-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              1
            </span>
          </button>
        ))}

        {/* Search Bar */}
        <div className="flex items-center border border-fl-border rounded-full px-3 py-1.5 text-fl-text bg-transparent w-52 focus-within:ring-1 focus-within:ring-fl-primary">
          <MagnifyingGlass size={18} className="opacity-70" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm ml-2 placeholder:text-fl-text/60 w-full"
          />
        </div>

        {/* New Button */}
        <button className="px-5 py-1.5 rounded-lg bg-fl-primary text-white text-sm font-medium hover:bg-fl-primary-hover transitio cursor-pointer">
          New
        </button>
      </div>
    </div>
  );
}
