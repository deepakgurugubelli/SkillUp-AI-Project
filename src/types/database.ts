export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  preferences: Record<string, any>;
  strengths: string[];
  weaknesses: string[];
  created_at: string;
  updated_at: string;
}