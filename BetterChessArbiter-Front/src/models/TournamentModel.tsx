export type TournamentModel = {
  id: string;
  userId: string | null;
  title: string;
  eventUrl: string;
  county: string;
  status: "Planned" | "Ongoing" | "NoInfo" | "Finished";
  type: "Rapid" | "Classic" | "Blitz" | "Bullet";
  isVerified: boolean;
  isFide: boolean;
  details: TournamentDetailsModel;
};
export type TournamentDetailsModel = {
  startDate: Date;
  endDate: Date;
  place: string;
  gameTempo: string;
  referee: string;
  organizer: string;
  roundsTotal: number;
  roundsEnded: number;
  gameSystem: string;
  numOfTeams: number;
  numOfPlayers: number;
  numOfFederations: number;
  contestantsWithFIDE: number;
  numOfWomen: number;
  averageRanking: number;
};
