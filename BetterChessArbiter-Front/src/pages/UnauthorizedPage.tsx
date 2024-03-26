import { useEffect } from "react";
import useAuth from "../hooks/useAuth";

function UnauthorizedPage() {
  const { auth } = useAuth();
  useEffect(() => {
    console.log(auth);
  }, []);
  return (
    <div className="mt-12">
      <p className="text-4xl">403 Unauthorized</p>
    </div>
  );
}

export default UnauthorizedPage;
