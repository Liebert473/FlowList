import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ItemType, TableType } from "@/types/types";
import { colorClasses } from "@/utils/colors";
import { useColumns } from "@/features/columns/useColumns";
import { useValues } from "@/features/values/useValues";

interface JournalsOverviewProps {
  items: ItemType[];
  table?: TableType;
}

export function JournalsOverview({ items, table }: JournalsOverviewProps) {
  if (!table) return null;
  const { data: columns } = useColumns(table.id);

  const statusColumn = columns?.find((c) => c.title === "Status");
  const categoryColumn = columns?.find((c) => c.title === "Category");
  const titleColumn = columns?.find((c) => c.title === "Title");

  const { data: statusValues } = useValues(statusColumn?.id || "");
  const { data: categoryValues } = useValues(categoryColumn?.id || "");

  return (
    <Card className="shadow-none border-fl-border dark:bg-fl-bg-sec">
      <CardHeader>
        <CardTitle className="text-lg">Recent Journals</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.slice(0, 3).map((item) => {
          const title = item.data[titleColumn?.id || ""] || "Untitled";

          const ItemStatus = item.data[statusColumn?.id || ""] || null;
          const ItemCategory = item.data[categoryColumn?.id || ""] || null;

          return (
            <div
              key={item.id}
              className="flex items-start justify-between gap-2 p-2 rounded hover:bg-muted transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{title}</p>
                <div className="flex gap-2 mt-1 flex-wrap">
                  {ItemStatus.map((value: string) => {
                    const currVal = statusValues?.find((v) => v.id == value);
                    return (
                      <Badge
                        variant="secondary"
                        className={`${
                          colorClasses[currVal?.color || "red"].bg.normal
                        } text-fl-insider`}
                      >
                        {currVal?.label}
                      </Badge>
                    );
                  })}
                  {ItemCategory.map((value: string) => {
                    const currVal = categoryValues?.find((v) => v.id == value);
                    return currVal ? (
                      <Badge
                        key={value}
                        variant="secondary"
                        className={`${
                          colorClasses[currVal?.color || "red"].bg.normal
                        } text-fl-insider`}
                      >
                        {currVal?.label}
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
