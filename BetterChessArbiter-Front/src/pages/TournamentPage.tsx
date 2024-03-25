import { useParams } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import { useEffect } from "react";
import { TournamentModel } from "../models/TournamentModel";

type T = {
  data: TournamentModel | TournamentModel[];
  isLoading: boolean;
  err: any;
};

function TournamentPage() {
  const { id } = useParams();
  const { data, isLoading, err } = useApi<T>(
    `https://localhost:7001/api/tournament/${id}`,
    { method: "GET" }
  );
  useEffect(() => {
    console.log(data);
  });
  if (isLoading) return <div className="text-2xl mt-12">Loading...</div>;
  if (err) return <>{err}</>;
  return (
    <div className="mt-12 text-2xl">
      {(data as TournamentModel) && data.title}
    </div>
  );
}

export default TournamentPage;
