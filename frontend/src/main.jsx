import { createRoot } from "react-dom/client";
import App from "./app/App";
import "./styles/index.css";
import { supabase } from "./services/supabase";
import { useAuthStore } from "./store/authStore";

const root = createRoot(document.getElementById("root"));

supabase.auth.getSession().then(({ data }) => {
  useAuthStore.getState().setUser(data.session?.user || null);

  supabase.auth.onAuthStateChange((_event, session) => {
    useAuthStore.getState().setUser(session?.user || null);
  });

  root.render(<App />);
});