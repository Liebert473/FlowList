"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ItemType, TableType } from "@/types/types";
import { colorClasses } from "@/utils/colors";
import { useColumns } from "@/features/columns/useColumns";
import { useValues } from "@/features/values/useValues";

interface ProjectsOverviewProps {
  items: ItemType[];
  table?: TableType;
}

export function ProjectsOverview({ items, table }: ProjectsOverviewProps) {
  if (!table) return null;

  const { data: columns } = useColumns(table.id);

  const titleColumn = columns?.find((c) => c.title === "Title");
  const statusColumn = columns?.find((c) => c.title === "Status");
  const priorityColumn = columns?.find((c) => c.title === "Priority");
  const categoryColumn = columns?.find((c) => c.title === "Category");

  const { data: statusValues } = useValues(statusColumn?.id || "");
  const { data: priorityValues } = useValues(priorityColumn?.id || "");
  const { data: categoryValues } = useValues(categoryColumn?.id || "");

  return (
    <Card className="shadow-none border-fl-border dark:bg-fl-bg-sec">
      <CardHeader>
        <CardTitle className="text-lg">Active Projects</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.slice(0, 3).map((item) => {
          const title = item.data[titleColumn?.id || ""] || "Untitled";

          const itemStatus = item.data[statusColumn?.id || ""] || [];
          const itemPriority = item.data[priorityColumn?.id || ""] || [];
          const itemCategories = item.data[categoryColumn?.id || ""] || [];

          return (
            <div
              key={item.id}
              className="flex items-start justify-between gap-2 p-2 rounded hover:bg-muted transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{title}</p>
                <div className="flex gap-2 mt-1 flex-wrap">
                  {itemStatus.map((valueId: string) => {
                    const value = statusValues?.find((v) => v.id === valueId);
                    return value ? (
                      <Badge
                        key={valueId}
                        variant="secondary"
                        className={`${
                          colorClasses[value.color].bg.normal
                        } text-fl-insider`}
                      >
                        {value.label}
                      </Badge>
                    ) : null;
                  })}

                  {itemPriority.map((valueId: string) => {
                    const value = priorityValues?.find((v) => v.id === valueId);
                    return value ? (
                      <Badge
                        key={valueId}
                        variant="secondary"
                        className={`${
                          colorClasses[value.color].bg.normal
                        } text-fl-insider`}
                      >
                        {value.label}
                      </Badge>
                    ) : null;
                  })}

                  {itemCategories.map((valueId: string) => {
                    const value = categoryValues?.find((v) => v.id === valueId);
                    return value ? (
                      <Badge
                        key={valueId}
                        variant="secondary"
                        className={`${
                          colorClasses[value.color].bg.normal
                        } text-fl-insider`}
                      >
                        {value.label}
                      </Badge>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
