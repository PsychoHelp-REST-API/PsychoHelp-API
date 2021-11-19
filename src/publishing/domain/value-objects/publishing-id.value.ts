export class PublishingId {
  private readonly id: number;

  private constructor(id: number) {
    this.id = id;
  }

  public static createPubId(id: number) {
    return new PublishingId(id);
  }

  public getPubId(): number {
    return this.id;
  }
}