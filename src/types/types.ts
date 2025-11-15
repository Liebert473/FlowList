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
  id: string;
  user_id: string;
  column_id: string;
  label: string;
  color: string;
  metadata?: Record<string, any>;
  created_at: string;
}

export type ItemType = {
  id: string;
  user_id: string;
  table_id: string;
  data: Record<string, any>;
  created_at: string;
}

export type ColumnType = {
  id: string;
  user_id: string;
  table_id: string;
  title: string;
  type: string
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