import { useMutation } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "../stored/hooks";
import { closeModalDelete, modalDelete } from "../stored/modalSlice";
import { blogId } from "../stored/blogSlice";
import { delBlog, queryClient } from "../libs/blog";
import Modal from "./UI/Modal";

type TConfirmBlogProps = {
  title: string;
  description: string;
};

function ContentChildren({ title, description }: TConfirmBlogProps) {
  const dispatch = useAppDispatch();
  const getId = useAppSelector(blogId);

  const mutation = useMutation({
    mutationFn: delBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog"], refetchType: "active" });
      dispatch(closeModalDelete());
    },
  });

  return (
    <div className="text-center">
      <h1 className="text-lg font-normal text-gray-500">{title}</h1>
      <h3 className="mb-5 text-lg font-normal text-gray-500">{description}</h3>
      <div className="flex items-center justify-center space-x-4">
        <button
          className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
          onClick={() => mutation.mutate(getId)}
        >
          yes
        </button>
        <button
          className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
          onClick={() => dispatch(closeModalDelete())}
        >
          cancel
        </button>
      </div>
      {mutation.isError && <p className="text-red-600 mt-6 text-lg">{mutation.error?.message} or Id Not Found</p>}
    </div>
  );
}

export default function ConfirmDelete({ title, description }: TConfirmBlogProps) {
  const dispatch = useAppDispatch();
  const isModalDel = useAppSelector(modalDelete);

  return (
    <>
      {isModalDel && (
        <Modal titleModal="Delete Blog" isModal={isModalDel} onClose={() => dispatch(closeModalDelete())} width="md">
          <ContentChildren title={title} description={description} />
        </Modal>
      )}
    </>
  );
}
