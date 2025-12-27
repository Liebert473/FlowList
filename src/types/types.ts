export type ProfileType = {
  id: string;
  first_name?: string;
  last_name?: string;
  avatar_url: string | null;
  email: string;
  updated_at: string;
  created_at: string;
};

export type ValueType = {
  id: string; //uuid
  user_id: string; //uuid
  column_id: string; //uuid
  label: string;
  color: string;
  metadata?: Record<string, any>;
  created_at: string;
}

export type ItemType = {
  id: string; //uuid
  user_id: string; //uuid
  table_id: string; //uuid
  data: Record<string, any>;
  created_at: string;
  content: Record<string, any>;
}

export type ColumnType = {
  id: string; //uuid
  user_id: string; //uuid
  table_id: string; //uuid
  title: string;
  type: "text" | "date" | "choice" | "multiChoice"| "relation";
  metadata: Record<string, any>;
  created_at: string;
}

export type TableType = {
  id: string;
  user_id: string;
  title: string;
  slug: string;
  created_at: string;
}

export type FilterState = Record<string, any>;

export type SortDirection = "asc" | "desc";

export interface SortState {
  columnId: string | null;
  direction: SortDirection;
}
