import { useApi } from "../../hooks/useApi";
import { TournamentModel } from "../../models/TournamentModel";
import FIDETag from "./FIDETag";
import Icon from "../Icon";
import { useNavigate } from "react-router-dom";

type PopularTournamentCard = {
  tournament: TournamentModel;
};

function PopularTournamentCard({ tournament }: PopularTournamentCard) {
  const navigate = useNavigate();
  return (
    <div className="flex bg-white flex-col rounded-xl p-4 my-4">
      <div className="flex flex-row justify-between items-center">
        <p className="font-semibold text-xl">{tournament.title}</p>
        <div className="flex flex-row m-2">
          <Icon Icon="group" />
          <p className="font-medium">{tournament.details.numOfPlayers} </p>
        </div>
      </div>
      <div className="flex justify-between flex-row">
        <div className="flex flex-col">
          <p>{tournament.county}</p>
          <div className="font-medium">{tournament.details.gameTempo}</div>
          <div
            onClick={() => navigate(`/tournament/${tournament.id}`)}
            className="items-center flex rounded-md bg-[#EFE5DC] font-medium px-2 py-1 max-w-fit mt-2"
          >
            Szczegóły <Icon Icon="arrow_right_alt" />
          </div>
        </div>
        <div className="flex flex-col items-center p-2">
          <p className="font-medium p-1">{tournament.status}</p>
          <FIDETag isFide={tournament.isFide} />
        </div>
      </div>
    </div>
  );
}

function PopularTournaments() {
  const { data, isLoading, err } = useApi(
    "https://localhost:7001/api/Tournament/mostpopulartournaments",
    { method: "GET" }
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (err) return <div>{err}</div>;

  return (
    <div>
      {(data as TournamentModel[]) &&
        (data as TournamentModel[]).map((t: TournamentModel) => {
          return <PopularTournamentCard tournament={t} key={t.id} />;
        })}
    </div>
  );
}

export default PopularTournaments;
