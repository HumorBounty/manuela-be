export interface Course {
  _id?: any;
  title: string;
  description: string;
  status: "PUBLISHED" | "UNPUBLISHED" | "DRAFT";
  tags: string[];
  stages: Stage[];
  createdAt?: string;
}

export interface Stage {
  title: string;
  content?: string;
  practicalExam?: any;
}
