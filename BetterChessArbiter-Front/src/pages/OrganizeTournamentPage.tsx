import { useNavigate } from "react-router-dom";

function OrganizeTournamentsPage() {
  const navigate = useNavigate();
  return (
    <div className="mt-12">
      <button onClick={() => navigate("/adminpanel")}>Go to adminpanel</button>
    </div>
  );
}

export default OrganizeTournamentsPage;
