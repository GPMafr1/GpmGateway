export interface IOrdreTravailClient {
  id?: number;
  demandeur?: string;
  origine?: string;
  motif?: string;
}

export class OrdreTravailClient implements IOrdreTravailClient {
  constructor(public id?: number, public demandeur?: string, public origine?: string, public motif?: string) {}
}
