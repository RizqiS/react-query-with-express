import { closeModal, selectModal } from "../stored/modalSlice";
import { useAppDispatch, useAppSelector } from "../stored/hooks";
import Modal from "./UI/Modal";
import Form from "./UI/Form";
import { useNavigation, useSubmit } from "react-router-dom";

export default function NewFormBlog() {
  const isModal = useAppSelector(selectModal);
  const dispatct = useAppDispatch();
  const submit = useSubmit();
  const { state } = useNavigation();

  // const mutation = useMutation({
  //   mutationFn: (blog: any) => addBlog(blog, "POST"),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["blog", { max: 10 }], exact: true });
  //     dispatct(closeModal());
  //   },
  // });

  const handleBlogSend = (blog: {
    title: string;
    description: string;
    location: string;
    image: string;
    time: string;
  }) => {
    // mutation.mutate(blog);
    submit(blog, { action: "/", method: "post" });
  };

  const handleCloseModal = () => {
    dispatct(closeModal());
  };

  return (
    <>
      {isModal && (
        <Modal titleModal="Create New Blog" onClose={handleCloseModal} isModal={isModal} width="2xl">
          <Form onSend={handleBlogSend} isSelect={"post"} />
          {state === "submitting" && <p>Loading...</p>}
        </Modal>
      )}
    </>
  );
}
