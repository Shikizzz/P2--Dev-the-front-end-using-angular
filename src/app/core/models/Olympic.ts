import { Participation } from "./Participation";

export class Olympic {
    public constructor(
        public id: number,
        public country: string,
        public participations: Participation[]
    ) { }
}