export default interface Call {
  id: number;
  title: string;
  comment: string;
  status: string;
  user: number;
  priority: string;
  createdAt: Date;
  updatedAt: Date;
};
