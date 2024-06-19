import { useIsFetching } from "@tanstack/react-query";
// import { useEffect, useState } from "react";

export default function Progress() {
  const isFetching = useIsFetching({ queryKey: ["postings"] });
  console.log(isFetching);
  // const [start, setStart] = useState(0);
  // const [isRun, setRun] = useState(true);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (isRun) {
  //       setStart((prev) => prev + 1);
  //     }
  //     if (start === 100) {
  //       setStart(0);
  //       setRun(false);
  //       clearInterval(interval);
  //     }
  //   }, 100);
  //   return () => clearInterval(interval);
  // }, [start, isRun]);

  return isFetching === 1 ? (
    <div className="w-full bg-slate-100 rounded-full h-2.5 mb-4  fixed top-0">
      <div
        className="bg-gradient-to-r animate-pulse from-indigo-500 via-purple-500 to-pink-500 h-2.5 rounded-full "
        style={{ width: `${100}%` }}
      ></div>
    </div>
  ) : (
    ""
  );
}
