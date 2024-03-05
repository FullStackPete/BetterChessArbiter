export type TournamentsType = {
  title: string;
  eventUrl: string;
  county: string;
  status: string;
  tournamentType: string;
  isFide: boolean;
  details: FixedDetailsType;
};
export type UrlType = {
  aTag: string;
};

export type DetailsType = {
  title: string;
  startDate: number;
  endDate: number;
  place: string;
  gameTempo: string;
  referee: string;
  organizer: string;
  roundsTotal: number;
  roundsEnded: number;
  system: string;
};
export type FixedDetailsType ={
  title: string;
  startDate: Date;
  endDate: Date;
  place: string;
  gameTempo: string;
  referee: string;
  organizer: string;
  roundsTotal: number;
  roundsEnded: number;
  system: string;
}