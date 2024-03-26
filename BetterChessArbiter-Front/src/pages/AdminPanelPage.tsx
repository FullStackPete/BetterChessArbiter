import { useEffect } from "react";
import useAuth from "../hooks/useAuth";

function AdminPanelPage() {
  const { auth } = useAuth();
  useEffect(() => {
    console.log(auth);
  }, []);
  return (
    <div className="text-4xl mt-20">
      <button>Press Me!</button>
      Not Implemented yet!
    </div>
  );
}

export default AdminPanelPage;
