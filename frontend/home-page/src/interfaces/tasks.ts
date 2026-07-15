export interface Tasks {
  id?: string,
  project_id: string,
  project_name: string,
  title: string,
  description?: string,
  status?: string,
  assigned_to?: string,
  due_date?: Date,
  priority?: string,
  create_at?: string,
}


export interface Comments {
  id?: string,
  task_id: string,
  user_name: string,
  comment: string,
  created_at?: Date,
}
