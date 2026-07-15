export interface Project {
  id?: string,
  name: string,
  description?: string,
  owner_username: string,
  members?: string[],
  created_at?: Date,
}
