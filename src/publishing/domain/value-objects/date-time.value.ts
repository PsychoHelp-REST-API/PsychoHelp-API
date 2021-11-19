import * as moment from "moment-timezone";

export class PublishingDatetime {
  private date: Date;

  private constructor(date: Date) {
    this.date = date;
  }

  public static from(date: Date) {
    return new PublishingDatetime(date);
  }

  public static utcNow() {
    moment.tz.setDefault('UTC');
    const date = moment.tz().toDate();
    //moment.tz().format();
    return new PublishingDatetime(date);
  }
}