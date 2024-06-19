import { useRef } from "react";
import Input from "./Input";
import { TBlog } from "../../types/blog.type";

type TFormBlogProps = {
  inputData?: TBlog;
  isSelect?: "post" | "patch";
  onSend(data: any): void;
};

export default function FormBlog({ onSend, isSelect, inputData }: TFormBlogProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const localRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);
  const timeRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const blog: any = {
      title: titleRef.current?.value,
      description: descRef.current?.value,
      location: localRef.current?.value,
      image: imgRef.current?.value,
      time: timeRef.current?.value,
    };

    onSend(blog);

    const target = e.target as HTMLFormElement;
    target.reset();
  };

  return (
    <div className="p-4 md:p-5">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          ref={titleRef}
          text="Title Blog"
          label={{ htmlFor: "title", "aria-label": "title blog" }}
          input={{
            type: "text",
            id: "title",
            name: "title",
            placeholder: "input your title blog here",
            defaultValue: inputData?.title || "",
          }}
        />
        <Input
          ref={descRef}
          text="Description Blog"
          label={{ htmlFor: "description", "aria-label": "description blog" }}
          textarea={{
            id: "description",
            name: "description",
            placeholder: "input your description blog here",
            defaultValue: inputData?.description || "",
            rows: 4,
          }}
        />
        <Input
          ref={localRef}
          text="Location"
          label={{ htmlFor: "location", "aria-label": "location blog" }}
          input={{
            type: "text",
            id: "location",
            name: "location",
            placeholder: "input your location here",
            defaultValue: inputData?.location || "",
          }}
        />
        <Input
          ref={imgRef}
          text="Image URL"
          label={{ htmlFor: "image", "aria-label": "image blog" }}
          input={{
            type: "url",
            id: "image",
            name: "location",
            placeholder: "input your url image here",
            defaultValue: inputData?.image || "",
          }}
        />
        <Input
          ref={timeRef}
          text="Time"
          label={{ htmlFor: "time", "aria-label": "time blog" }}
          input={{ type: "time", id: "time", name: "time", defaultValue: inputData?.time || "" }}
        />
        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >
          {isSelect ? "Add Blog" : "Update Blog"}
        </button>
      </form>
    </div>
  );
}
