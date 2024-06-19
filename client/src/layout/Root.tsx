import { Outlet } from "react-router-dom";
import { useAppDispatch } from "../stored/hooks";
import { openModal } from "../stored/modalSlice";
import { useIsFetching } from "@tanstack/react-query";
export default function Root() {
  const isFetching = useIsFetching();
  const dispatch = useAppDispatch();

  const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(openModal());
  };

  return (
    <>
      {isFetching > 0 && (
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-sky-400 fixed top-0">
          <div
            className="bg-purple-600 h-2.5 animate-pulse transition-all duration-300 dark:bg-sky-700"
            style={{ width: "100%" }}
          ></div>
        </div>
      )}
      <header className="container mx-auto mt-12">
        <nav className="flex justify-between items-center">
          <h2>Tanstack Query</h2>
          <button
            onClick={handleOpenModal}
            className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded cursor-pointer"
          >
            New Blog
          </button>
        </nav>
      </header>
      <main className="container mx-auto mt-12">
        <Outlet />
      </main>
    </>
  );
}
