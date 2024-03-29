import { useNavigate } from "react-router-dom";
import Users from "../components/AdminPanelPage/Users";
import useRefreshToken from "../hooks/useRefreshToken";
function AdminPanelPage() {
  const refresh = useRefreshToken();
  const navigate = useNavigate();
  return (
    <div className="text-4xl mt-20">
      <Users />
      <button onClick={() => navigate("/organize")}>Go to organize</button>
      <button onClick={() => refresh()}>Get new token</button>
    </div>
  );
}

export default AdminPanelPage;
