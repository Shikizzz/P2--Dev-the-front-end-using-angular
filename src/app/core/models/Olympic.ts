import { Participation } from "./Participation";

export class Olympic {
    public constructor(
        public id: number,
        public country: string,
        public participations: Participation[]
    ) { }
}

/*
export interface Olympic {
    id: number;
    country: string;
    participations: Participation[];
}
*/