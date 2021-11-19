import { Column } from "typeorm";

export class ImageTypeORM {
  @Column('text', {name: 'image', nullable: true})
  public description: string;

  private constructor(image: string) {
    this.description = image;
  }

  public static from(image: string): ImageTypeORM {
    return new ImageTypeORM(image);
  }
}