import React from "react";
import type { ItemType } from "@/types/types";
import { useColumn } from "@/contexts/table_data/ColumnContext";
import { div } from "framer-motion/client";

const items: ItemType[] = [
  {
    id: "1",
    user_id: "user_001",
    table_id: "tbl_tasks",
    data: {
      title: "Design Landing Page",
      status: "In Progress",
      priority: "High",
      category: "Design",
      dueDate: "2025-11-20",
    },
    created_at: "2025-11-14T10:00:00",
  },
  {
    id: "2",
    user_id: "user_001",
    table_id: "tbl_tasks",
    data: {
      title: "Fix Auth Redirect Bug",
      status: "Pending",
      priority: "Medium",
      category: "Development",
      dueDate: "2025-11-18",
    },
    created_at: "2025-11-14T10:05:00",
  },
  {
    id: "3",
    user_id: "user_001",
    table_id: "tbl_tasks",
    data: {
      title: "Prepare Presentation Slides",
      status: "Completed",
      priority: "Low",
      category: "Documentation",
      dueDate: "2025-11-10",
    },
    created_at: "2025-11-14T10:10:00",
  },
  {
    id: "4",
    user_id: "user_001",
    table_id: "tbl_tasks",
    data: {
      title: "Optimize Database Queries",
      status: "In Progress",
      priority: "High",
      category: "Backend",
      dueDate: "2025-11-25",
    },
    created_at: "2025-11-14T10:15:00",
  },
  {
    id: "5",
    user_id: "user_001",
    table_id: "tbl_tasks",
    data: {
      title: "Create Social Media Posters",
      status: "Pending",
      priority: "Low",
      category: "Design",
      dueDate: "2025-11-22",
    },
    created_at: "2025-11-14T10:20:00",
  },
  {
    id: "6",
    user_id: "user_001",
    table_id: "tbl_tasks",
    data: {
      title: "Write API Test Scripts",
      status: "In Progress",
      priority: "Medium",
      category: "QA",
      dueDate: "2025-11-19",
    },
    created_at: "2025-11-14T10:25:00",
  },
  {
    id: "7",
    user_id: "user_001",
    table_id: "tbl_tasks",
    data: {
      title: "Build Profile Page UI",
      status: "Pending",
      priority: "High",
      category: "Frontend",
      dueDate: "2025-11-28",
    },
    created_at: "2025-11-14T10:30:00",
  },
  {
    id: "8",
    user_id: "user_001",
    table_id: "tbl_tasks",
    data: {
      title: "Refactor Utils Folder",
      status: "Completed",
      priority: "Low",
      category: "Development",
      dueDate: "2025-11-12",
    },
    created_at: "2025-11-14T10:35:00",
  },
  {
    id: "9",
    user_id: "user_001",
    table_id: "tbl_tasks",
    data: {
      title: "Review Merge Requests",
      status: "Pending",
      priority: "Medium",
      category: "Management",
      dueDate: "2025-11-21",
    },
    created_at: "2025-11-14T10:40:00",
  },
  {
    id: "10",
    user_id: "user_001",
    table_id: "tbl_tasks",
    data: {
      title: "Update API Documentation",
      status: "In Progress",
      priority: "Low",
      category: "Documentation",
      dueDate: "2025-11-23",
    },
    created_at: "2025-11-14T10:45:00",
  },
];

const Table: React.FC = () => {
  const { columns } = useColumn();

  return (
    <div className="custom-scrollbar flex flex-1 flex-col bg-fl-bg rounded-lg border border-fl-border text-fl-text overflow-auto relative">
      {/* Header */}
      <div className="px-8 sticky top-0 bg-fl-bg min-w-[800px]">
        <div className="grid grid-cols-5 text-sm font-semibold text-fl-info pt-6 pb-4 border-b border-fl-border min-w-[600px]">
          {columns.map((col, index) => (
            <div key={index}>{col.title}</div>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col min-w-[800px]">
        {items.map((item, index) => (
          <div className="px-8 hover:bg-fl-hover">
            <div
              key={index}
              className="grid grid-cols-5 items-center border-b border-fl-border text-sm transition-colors py-3"
            >
              {/* Title */}
              <div className="font-semibold">{item.data.title}</div>

              {/* Status */}
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full font-medium bg-fl-bg-sec text-fl-primary border border-fl-border">
                  <span className="h-2 w-2 rounded-full bg-fl-primary"></span>
                  {item.data.status}
                </span>
              </div>

              {/* Priority */}
              <div>
                <span className="inline-block px-3 py-1 rounded-md font-medium bg-fl-primary text-fl-bg">
                  {item.data.priority}
                </span>
              </div>

              {/* Category */}
              <div>
                <span className="inline-block px-3 py-1 rounded-md font-medium bg-fl-info text-fl-bg">
                  {item.data.category}
                </span>
              </div>

              {/* Due date */}
              <div className="text-fl-text">{item.data.dueDate}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
