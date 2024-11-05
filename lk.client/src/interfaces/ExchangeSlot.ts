import { Location } from "./Location";
import { JobTitle } from "./JobTitle";

export interface ExchangeSlot {
    available: number;
    id: number;
    personalities: null;
    locations: Location;
    jobTitles: JobTitle;
    begin: string;
    end: string;
    status: number;
  }