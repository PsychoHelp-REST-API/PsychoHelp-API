import * as moment from 'moment-timezone';

export class DateTime {
  private datetime: Date;

  private constructor(
    datetime: Date
  ) {
    this.datetime = datetime;
  }

  public static from(datetime: Date) {
    return new DateTime(
      datetime
    );
  }

  public static utcNow() {
    moment.tz.setDefault('UTC');
    const datetime = moment.tz().toDate();
    //moment.tz().format();
    return new DateTime(
      datetime
    );
  }
}