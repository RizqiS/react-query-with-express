import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Progress from "./UI/progres";
import { TPost } from "../types/post.type";

export default function Posts() {
  const { isPending, error, data } = useQuery({
    queryKey: ["postings"],
    queryFn: () =>
      axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then((res) => res.data.slice(0, 10))
        .catch((err) => err),
    staleTime: 5000,
  });

  if (isPending) {
    return (
      <div className="text-center mt-12">
        <h1 className="text-3xl ">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-12">
        <h1 className="text-3xl ">error: {error.message}</h1>
      </div>
    );
  }

  const post = data as TPost[];

  return (
    <div className="mt-12 container mx-auto">
      <Progress />
      <ul>
        {post.map((posts, no) => (
          <li key={posts.id}>
            {no + 1}. <span className="ml-3">{posts.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
