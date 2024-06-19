import { TBlog } from "../types/blog.type";
import ContentItemBlog from "./ContentItemBlog";

type ContentBlogProps = {
  blog: TBlog[];
};

export default function ContentBlog({ blog }: ContentBlogProps) {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 m-2">
        {blog?.map((item) => (
          <ContentItemBlog key={item._id} blog={item} />
        ))}
      </div>
    </>
  );
}
