import { ListTodo, BookOpen, FolderOpen, CheckCircle2 } from "lucide-react";
import { StatCard } from "@/components/dashboard/statCard";
import { TasksOverview } from "@/components/dashboard/tasksOverview";
import { ProjectsOverview } from "@/components/dashboard/projectsOverview";
import { JournalsOverview } from "@/components/dashboard/journalsOverview";
import { useTables } from "@/features/tables/useTables";
import { useItems } from "@/features/items/useItems";
import { useColumns } from "@/features/columns/useColumns";

export function Dashboard() {
  const { data: tables } = useTables();

  // Calculate statistics
  const tasksTable = tables?.find((t) => t.slug === "tasks");
  const projectsTable = tables?.find((t) => t.slug === "projects");
  const journalsTable = tables?.find((t) => t.slug === "journals");

  const { data: tasksItems } = useItems(tasksTable?.id || "");
  const { data: projectsItems } = useItems(projectsTable?.id || "");
  const { data: journalsItems } = useItems(journalsTable?.id || "");

  const { data: tasksColumns } = useColumns(tasksTable?.id || "");

  const completedTasks = tasksItems?.filter((item) => {
    const statusColumnId = tasksColumns?.find((c) => c.title === "Status")?.id;
    return item.data[statusColumnId || ""]?.[0] === "done";
  }).length;

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-text-balance">Welcome back!</h1>
        <p className="text-muted-foreground mt-2">
          Here's an overview of your tasks, projects, and journals.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Tasks"
          value={tasksItems?.length || 0}
          icon={ListTodo}
          color="bg-blue-500/10 text-blue-600 dark:text-blue-400"
        />
        <StatCard
          title="Completed"
          value={completedTasks || 0}
          icon={CheckCircle2}
          color="bg-green-500/10 text-green-600 dark:text-green-400"
        />
        <StatCard
          title="Projects"
          value={projectsItems?.length || 0}
          icon={FolderOpen}
          color="bg-orange-500/10 text-orange-600 dark:text-orange-400"
        />
        <StatCard
          title="Journals"
          value={journalsItems?.length || 0}
          icon={BookOpen}
          color="bg-purple-500/10 text-purple-600 dark:text-purple-400"
        />
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TasksOverview items={tasksItems || []} table={tasksTable} />
        <ProjectsOverview items={projectsItems || []} table={projectsTable} />
        <JournalsOverview items={journalsItems || []} table={journalsTable} />
      </div>
    </div>
  );
}
