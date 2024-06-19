import { useMutation, useQuery } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "../stored/hooks";
import { addBlog, getBlog, queryClient } from "../libs/blog";
import { closeModalEdit, modalEdit } from "../stored/modalSlice";
import Modal from "./UI/Modal";
import Form from "../components/UI/Form";

type EditProps = {
  blogId: string;
};

export default function EditFormBlog({ blogId }: EditProps) {
  const isEdit = useAppSelector(modalEdit);
  const dispatch = useAppDispatch();

  const { data } = useQuery({
    queryKey: ["blog", { blogId }],
    queryFn: ({ signal, queryKey }) => getBlog({ signal, queryKey, blogId }),
  });

  const mutation = useMutation({
    mutationFn: (data: any) => addBlog(data, "PATCH"),
    onMutate: async (data) => {
      await queryClient.cancelQueries({ queryKey: ["blog", { blogId }] });
      const previousData = queryClient.getQueryData(["blog", { blogId }]);

      queryClient.setQueryData(["blog", { blogId }], data);
      return { previousData };
    },
    onError: (_, context) => {
      queryClient.setQueryData(["blog", { blogId }], context?.previousData);
    },
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ["blog", { blogId }] });
    },
  });

  const handleCloseModal = () => {
    dispatch(closeModalEdit());
  };

  const handleBlogSend = (blog: any) => {
    mutation.mutate({ _id: data._id, ...blog });
    dispatch(closeModalEdit());
  };

  return (
    <>
      {isEdit && (
        <Modal titleModal="Create New Blog" onClose={handleCloseModal} isModal={isEdit} width="2xl">
          <Form onSend={handleBlogSend} inputData={data} isSelect="patch" />
        </Modal>
      )}
    </>
  );
}
