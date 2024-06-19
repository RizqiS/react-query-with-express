import { Suspense, lazy } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBlog } from "../libs/blog";
import ContentBlog from "../components/ContentBlog";
import SearchBlog from "../components/SearchBlog";
import SkeletonLoading from "../components/SkeletonLoading";

const NewFormBlog = lazy(() => import("../components/NewFormBlog"));
const ConfirmDelete = lazy(() => import("../components/ConfirmDelete"));

export default function Blog() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["blog", { max: 10 }],
    queryFn: ({ signal, queryKey }) =>
      getBlog({ signal, queryKey, ...(typeof queryKey[1] === "object" ? queryKey[1] : {}) }),
    staleTime: 5000,
  });

  if (isPending) {
    return (
      <div className="flex">
        <SkeletonLoading countLoading={4} line={1} />
      </div>
    );
  }

  if (isError) {
    return <p className="text-center">{error.message}</p>;
  }

  return (
    <>
      <Suspense>
        <ConfirmDelete title="Are you sure" description=" You want to delete this blog " />
        <NewFormBlog />
      </Suspense>
      <section>
        <div>{data && data.length !== 0 && <ContentBlog blog={data} />}</div>
        <div className="mt-12">
          <SearchBlog />
        </div>
      </section>
    </>
  );
}
