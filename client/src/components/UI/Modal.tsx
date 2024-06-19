import { createPortal } from "react-dom";

type TModalProps = {
  titleModal: string;
  children: React.ReactNode;
  isModal: boolean;
  onClose(): void;
  width?: "sm" | "md" | "lg" | "xl" | "2xl";
};

export default function Modal({ children, titleModal, isModal, width, onClose }: TModalProps) {
  const handleCloseModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    onClose();
  };

  return createPortal(
    <div
      className={`${
        isModal ? "block" : "hidden"
      } overflow-y-auto overflow-x-hidden flex fixed top-0 right-0 left-0 z-50 justify-center items-center w-full max-h-full md:inset-0 h-[calc(100%)] bg-black bg-opacity-30`}
    >
      <div className={`relative p-4 w-full max-w-md md:max-w-${width} max-h-full`}>
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900 ">{titleModal}</h3>
            <button
              type="button"
              onClick={handleCloseModal}
              className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
            >
              <svg
                className="w-3 h-3 text-pink-700"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5 h-max ">{children}</div>
        </div>
      </div>
    </div>,
    document.getElementById("modal")!
  );
}
