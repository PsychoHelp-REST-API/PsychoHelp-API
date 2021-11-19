import { Column } from "typeorm";

export class ImageTypeORM {
  @Column('string', {name: 'image', nullable: true})
  public image: string;

  private constructor(image: string) {
    this.image=image;
  }

  public static from(image: string): ImageTypeORM {
    return new ImageTypeORM(image);
  }
}