export class Borrower {
  constructor(
    public id: number,
    public nom: string,
    public date: Date,
    public rendue: Date,
    public commentaire: string
  ) {}
}
