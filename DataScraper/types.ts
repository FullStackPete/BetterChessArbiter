export type combinedObjectType = {
  title: string;
  eventUrl: string;
  county: string;
  status: string;
  tournamentTempo: string;
  isFide: boolean;
  details: subdata;
};
export type urlsType = {
  aTag: string;
};

export type subdata = {
  title: string;
  startDate: string;
  endDate: string;
  place: string;
  gameTempo: string;
  referee: string;
  organizer: string;
  roundsTotal: string;
  roundsEnded: string;
  system: string;
};
