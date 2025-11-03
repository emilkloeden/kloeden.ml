export default interface PostAttributes {
  title: string;
  slug: string;
  description: string;
  date: Date;
  subtitle?: string; 
  coverImage?: string;
}
