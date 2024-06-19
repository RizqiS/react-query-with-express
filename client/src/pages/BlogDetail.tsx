import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { getBlog } from "../libs/blog";
import { TBlog } from "../types/blog.type";
import { openModalEdit } from "../stored/modalSlice";
import { useAppDispatch } from "../stored/hooks";
import { setId } from "../stored/blogSlice";
import SkeletonLoading from "../components/SkeletonLoading";
import EditFormBlog from "../components/EditFormBlog";
import NewFormBlog from "../components/NewFormBlog";

export default function BlogDetail() {
  const { blogId } = useParams();
  const dispatch = useAppDispatch();

  const { data, isPending } = useQuery({
    queryKey: ["blog", { blogId }],
    queryFn: ({ signal, queryKey }) => getBlog({ signal, queryKey, blogId }),
    staleTime: 5000,
  });

  const handleOpenEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(openModalEdit());
    dispatch(setId(blogId!));
  };

  let content;

  if (isPending) {
    return (
      <div className="flex">
        <SkeletonLoading countLoading={5} line={2} />
      </div>
    );
  }

  if (data && data.length !== 0) {
    const blog = data as TBlog;
    content = (
      <section className="p-6 max-w-7xl mx-auto">
        <div className="overflow-hidden rounded-lg shadow-md shadow-slate-500">
          <img
            src={blog.image}
            alt={blog.title}
            width={100}
            height={100}
            className="w-full h-[512px] object-cover bg-top"
          />
        </div>
        <div className="mt-6">
          <h1 className="text-3xl font-bold mb-3">{blog.title}</h1>
          <button
            className="mb-6 px-3 py-1.5 text-slate-200 bg-sky-500 rounded-md hover:bg-sky-800 transition-all duration-300"
            onClick={handleOpenEdit}
          >
            edit
          </button>
          <p className="mb-3 flex flex-col text-sm">
            <span className="font-semibold">{new Date(blog.date).toUTCString()}</span>
            <span>{blog.location}</span>
            <span>
              time: <time>{blog.time}</time>
            </span>
          </p>
          <p className="text-lg">{blog.description}</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <NewFormBlog />
      <EditFormBlog blogId={blogId!} />
      <div className="container mx-auto mt-12">
        <h1>Blog Detail</h1>
        <Link to="/">Back</Link>
        {!isPending && content}
      </div>
    </>
  );
}
