export type TournamentsType = {
  Title?: string;
  EventUrl: string;
  County: string;
  Status: string;
  Type: string;
  IsFide: boolean;
  Details: FixedDetailsType;
};
export type UrlType = {
  aTag: string;
};

export type DetailsType = {
  Title: string;
  StartDate: number;
  EndDate: number;
  Place: string;
  GameTempo: string;
  Referee: string;
  Organizer: string;
  RoundsTotal: number;
  RoundsEnded: number;
  GameSystem: string;
  numOfContestants?: string;
};
export type FixedDetailsType = {
  Title?: string;
  StartDate: Date;
  EndDate: Date;
  Place: string;
  GameTempo: string;
  Referee: string;
  Organizer: string;
  RoundsTotal: number;
  RoundsEnded: number;
  GameSystem: string;
  numOfTeams: number;
  numOfPlayers: number;
  numOfFederations: number;
  contestantsWithFIDE: number;
  numOfWomen: number;
  averageRanking: number;
};
