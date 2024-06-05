import { useParams } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import { useEffect } from "react";
import { TournamentModel } from "../models/TournamentModel";
import { Tile, TournamentBasicTile } from "../components/TournamentPage/Tile";
import FIDETag from "../components/HomePage/FIDETag";
import Map from "../components/TournamentPage/Map";

function TournamentPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, err } = useApi<TournamentModel>(
    `https://localhost:7001/api/tournament/${id}`,
    { method: "GET" }
  );

  useEffect(() => {
    console.log(data);
  }, [data]); // Dodajemy data jako zależność, aby useEffect działał poprawnie

  if (isLoading) return <div className="text-2xl mt-12">Loading...</div>;
  if (err) return <>{err.message}</>; // Zapewnienie, że err jest typu Error

  return (
    <div className="mt-16 text-2xl">
      {data && (
        <Tile bgColor="FFFFFF">
          <p className="font-medium text-center">{data.title}</p>
          <div className="flex justify-center m-2">
            <FIDETag isFide={data.isFide} />
          </div>
          <div className="flex flex-col text-base py-4 my-4 border-y-2 border-gray-200">
            <div className="flex flex-row justify-between">
              <div>Organizer:</div>
              <div>Referee:</div>
            </div>
            <div className="flex flex-row justify-between font-medium">
              <div>{data.details.organizer}</div>
              <div>{data.details.referee}</div>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <TournamentBasicTile
              topIcon={"info"}
              topText={"Status"}
              result={data.status}
              tileColor="FBFEFB"
            />
            <TournamentBasicTile
              topIcon={"groups_3"}
              topText={"Type"}
              result={data.type}
              tileColor={"FBFEFB"}
            />
            <TournamentBasicTile
              topIcon={"calendar_month"}
              topText={"Schedule"}
              result={
                new Date(data.details.startDate).toLocaleDateString("pl-PL", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }) +
                " - " +
                new Date(data.details.endDate).toLocaleDateString("pl-PL", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              }
              tileColor={"FBFEFB"}
            />
            <TournamentBasicTile
              topIcon={"groups"}
              topText={"Contestants"}
              result={
                <div>
                  {data.details.numOfPlayers !== 0 &&
                    data.details.numOfPlayers !== null &&
                    data.details.numOfPlayers.toString() + " players"}
                  <br />
                  {data.details.contestantsWithFIDE !== 0 &&
                    data.details.contestantsWithFIDE !== null &&
                    data.details.contestantsWithFIDE.toString() + " FIDE rated"}
                  <br />
                  {data.details.numOfWomen !== 0 &&
                    data.details.numOfWomen !== null &&
                    data.details.numOfWomen.toString() + " women"}
                  <br />
                  {data.details.numOfTeams !== 0 &&
                    data.details.numOfTeams !== null &&
                    data.details.numOfTeams + " Teams"}
                </div>
              }
              tileColor={"FBFEFB"}
            />
            <TournamentBasicTile
              textCenter={true}
              topIcon={"trophy"}
              topText={"Average ranking"}
              result={data.details.averageRanking + " Elo"}
              tileColor={"FBFEFB"}
            />
            <TournamentBasicTile
              textCenter
              topIcon={"Schedule"}
              topText={"Tempo"}
              result={data.details.gameTempo}
              tileColor={"FBFEFB"}
            />
          </div>
          
          <Tile className="border-2 border-[#F1DFD2] text-lg text-center font-semibold" bgColor={"EFE5DC"}> Add to favourites!</Tile>
        </Tile>
      )}
      <Tile bgColor={"FFFFFF"}>
        <p className="font-medium text-xl">More info:</p>
        <div className="text-lg">
          <p>Game system: {data?.details.gameSystem}</p>
          <br />
          <p className="text-lg">
            Original website: <a href={`${data?.eventUrl}`}>{data?.eventUrl}</a>
          </p>{" "}
          <br />
        </div>
      </Tile>
      <Tile bgColor={"FFFFFF"}>
        <p className=" my-2 text-center">{data?.details.place}</p>
        <Map tournamentId={id!} />
      </Tile>
    </div>
  );
}

export default TournamentPage;
