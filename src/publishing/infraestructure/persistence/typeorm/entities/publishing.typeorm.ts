import { Column, Entity } from "typeorm";
import { Unique } from "typeorm/browser";
import { DescriptionTypeORM } from "../../../../../billing/infraestructure/persistence/typeorm/entities/description.typeorm";
import { DateTimeTypeORM } from "../../../../../billing/infraestructure/persistence/typeorm/entities/date-time.typeorm";
import { ImageTypeORM } from "./publishing.image.typeorm";
import { TitleTypeORM } from "./publishing.title.typeorm";

@Entity('posts')
@Unique('UQ_posts_code', ['code.value'])
export class PublishingTypeORM {
  @Column((type)=>PublishingTypeORM, {prefix:false})
  public id: PublishingIdTypeORM;

  // TODO: Implementar Psicologo tipo ORM
  // @Column((type) => NameTypeORM, { prefix: false})
  // public name: NameTypeORM;

  @Column((type)=>TitleTypeORM, { prefix: false })
  public publishingTitle: TitleTypeORM;

  @Column((type) => DescriptionTypeORM, { prefix: false })
  public description: DescriptionTypeORM;

  @Column((type) => ImageTypeORM, { prefix: false })
  public image: ImageTypeORM;

  @Column((type) => DateTimeTypeORM, { prefix: false })
  public dateTime: DateTimeTypeORM;
}