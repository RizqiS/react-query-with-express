import { Link } from "react-router-dom";
import { TBlog } from "../types/blog.type";

import { useAppDispatch } from "../stored/hooks";
import { openModalDelete } from "../stored/modalSlice";
import { setId } from "../stored/blogSlice";

type ContentItemBlogProps = {
  blog: TBlog;
};
export default function ContentItemBlog({ blog }: ContentItemBlogProps) {
  const dispatch = useAppDispatch();

  const handleOpenDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(openModalDelete());
    dispatch(setId(blog._id));
  };

  return (
    <>
      <li className="flex flex-col justify-between rounded-lg shadow shadow-slate-500 overflow-hidden group/item">
        <div className="w-full mb-3 flex justify-center items-center">
          <img src={blog.image} alt="images" />
        </div>
        <div className="p-3">
          <h1 className="text-2xl font-semibold line-clamp-1 mb-3">{blog.title}</h1>
          <p className="text-base mb-3">{blog.description}</p>

          <div className="flex justify-between items-center">
            <Link
              to={`/${blog._id}`}
              className="text-slate-200 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 transition duration-150 rounded-md"
            >
              show detail
            </Link>
            <button
              className=" px-3 py-1.5 text-slate-200 bg-pink-500 rounded-md hover:bg-pink-800 transition-all duration-300"
              onClick={handleOpenDelete}
            >
              delete
            </button>
          </div>
        </div>
      </li>
    </>
  );
}
