export class User {
  constructor(
    private readonly emailAddress: string,
    private readonly passwordHash: string,
  ) {}
}
