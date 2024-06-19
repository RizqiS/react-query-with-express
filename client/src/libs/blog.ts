import { QueryClient } from "@tanstack/react-query";
import { LoaderFunctionArgs, redirect } from "react-router-dom";

const url = import.meta.env.VITE_SERVER;
export const queryClient = new QueryClient();
// { signal, search, blogId }

/*
 * Get Blog
 * @param {Object} data { signal, search?, blogId?, queryKey }
 * @returns {Promise}
 * @throws {Error}
 */

type TGetBlog = {
  signal: AbortSignal;
  queryKey: (string | { blogId?: string; search?: string; max?: number })[];
  search?: string;
  blogId?: string;
  max?: number;
};

export async function getBlog(data: TGetBlog) {
  let baseUrl = `${url}/blog`;

  if (data.blogId) {
    baseUrl += `/${data.blogId}`;
  } else if (data.search && data.max) {
    baseUrl += `?search=${data.search}&max=${data.max}`;
  } else if (data.search) {
    baseUrl += `?search=${data.search}`;
  } else if (data.max) {
    baseUrl += `?max=${data.max}`;
  }

  console.log(baseUrl);

  const response = await fetch(`${baseUrl}`, { signal: data.signal });
  const resData = await response.json();

  if (!response.ok) {
    const error = new Error(resData.message || "Failed to fetch");
    error.message = resData.message;
    throw error;
  }

  return resData;
}

export async function addBlog(
  blog: {
    _id?: string;
    title: string;
    description: string;
    location: string;
    image: string;
    time: string;
  },
  method?: "POST" | "PATCH"
) {
  let baseUrl = `${url}/blog`;

  if (blog._id) {
    baseUrl += "/edit";
  }

  const response = await fetch(baseUrl, {
    method: method,
    headers: {
      // Authorization: "Bearer token",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blog),
  });
  const resData = await response.json();

  if (!response.ok) {
    const error = new Error(resData.message || "Failed to updated");
    error.message = resData.message;
    throw error;
  }

  return resData;
}

export async function delBlog(blogId: string) {
  const response = await fetch(`${url}/blog/${blogId}/delete`, {
    method: "DELETE",
  });
  const resData = await response.json();

  if (!response.ok) {
    const error = new Error(resData.message || "Failed to delete");
    error.message = resData.message;
    throw error;
  }

  return resData;
}

type TParams = {
  blogId: string;
};
export function loader({ params }: LoaderFunctionArgs<TParams>) {
  const { blogId } = params;
  return queryClient.fetchQuery({
    queryKey: ["blog", { blogId }],
    queryFn: ({ signal, queryKey }) => getBlog({ signal, queryKey, blogId }),
  });
}

export async function action({ request }: LoaderFunctionArgs<TParams>) {
  console.log("action");
  const fd = await request.formData();
  const newBlog = {
    title: fd.get("title") as string,
    description: fd.get("description") as string,
    location: fd.get("location") as string,
    image: fd.get("image") as string,
    time: fd.get("time") as string,
  };
  await addBlog(newBlog, "POST");
  await queryClient.invalidateQueries({ queryKey: ["blog", { max: 10 }], exact: true });
  return redirect("../");
}
