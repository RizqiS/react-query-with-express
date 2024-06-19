import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { queryClient } from "./libs/query-client.ts";
import { QueryClientProvider } from "@tanstack/react-query";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);