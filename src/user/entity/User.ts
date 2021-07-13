export class User {
  constructor(
    public readonly emailAddress: string,
    public readonly passwordHash: string,
  ) {}
}
