import axios from "axios";
import { BSON, deserialize, ObjectId } from "mongodb";

let Tournament = {
  userId: {},
  title: "string",
  eventUrl: "string",
  county: "string",
  status: 0,
  type: 0,
  isFide: true,
  details: {
    startDate: "2024-03-13T18:53:41.465Z",
    endDate: "2024-03-13T18:53:41.465Z",
    place: "string",
    gameTempo: "string",
    referee: "string",
    organizer: "string",
    roundsTotal: 0,
    roundsEnded: 0,
    gameSystem: "string",
  },
};

export const grabData = async () => {
  try {
    const response = await axios.get("https://localhost:7001/api/user");
    console.log(response.data);
    console.log("Res.data[0]: " + response.data[0]);
    const objectId = response.data[0].id;
    // const objectIdString = ObjectId.createFromValues(objectId.timestamp, objectId.machine, objectId.pid, objectId.increment).toHexString();
    console.log(objectId);
    return objectId;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
};

export const main = async () => {
  try {
    const UserId = await grabData();
    Tournament.userId = UserId;
    const tournamentToPush = Tournament;
    console.log("Tournament pushed:", tournamentToPush);
    const response = await axios.post(
      "https://localhost:7001/api/tournament",
      tournamentToPush
    );
    console.log("Tournament created:", response.data);
  } catch (error) {
    console.error("Error:", error.message);
  }
};
