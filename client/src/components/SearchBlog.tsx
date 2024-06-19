import { useQuery } from "@tanstack/react-query";
import { getBlog } from "../libs/blog";
import { useRef, useState } from "react";
import ContentBlog from "./ContentBlog";

export default function SearchBlog() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchBlog, setSearchBlog] = useState<string | undefined>(undefined);

  const { data, isLoading } = useQuery({
    queryKey: ["blog", { search: searchBlog }],
    queryFn: ({ signal, queryKey }) => getBlog({ signal, queryKey, search: searchBlog }),
    enabled: searchBlog !== undefined,
  });

  const handleSend = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchBlog(inputRef.current?.value);
    const target = event.target as HTMLFormElement;
    target.reset();
  };

  let content = <p>please enter a search blog to find blog</p>;

  if (data && data.length !== 0) {
    content = <ContentBlog blog={data} />;
  }
  if (isLoading) {
    content = <p className="text-center">Loading...</p>;
  }
  return (
    <div>
      <form className="flex items-center max-w-lg gap-x-4" onSubmit={handleSend}>
        <div className="mb-6 w-full">
          <label htmlFor="text" className="block mb-2 font-medium text-gray-900 text-xl">
            Search Data
          </label>
          <input
            ref={inputRef}
            type="text"
            id="text"
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            placeholder="john.doe@company.com"
          />
        </div>
        <div className="mt-3">
          <button className="bg-slate-800 hover:ring hover:bg-slate-700 transition duration-150 text-slate-200 p-2.5 rounded-lg">
            Search
          </button>
        </div>
      </form>
      <article>{content}</article>
    </div>
  );
}
