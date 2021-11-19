import { PublishingTypeORM } from "../../infraestructure/persistence/typeorm/entities/publishing.typeorm";
import { Publishing } from "../../domain/entities/publishing.entity";
import { PublishingIdTypeORM } from "../../infraestructure/persistence/typeorm/entities/publishing.id.typeorm";
import { TitleTypeORM } from "../../infraestructure/persistence/typeorm/entities/publishing.title.typeorm";
import { DescriptionTypeORM } from "../../infraestructure/persistence/typeorm/entities/description.typeorm";
import { ImageTypeORM } from "../../infraestructure/persistence/typeorm/entities/image.typeorm";

export class PublishingMapper {
  public static toTypeORM(publishing: Publishing): PublishingTypeORM {
    const publishingTypeORM: PublishingTypeORM = new PublishingTypeORM();
    publishingTypeORM.id = PublishingIdTypeORM.from(publishing.getId().getPubId());
    // TODO: Implementar el nombre del psicologo en el mapper
    publishingTypeORM.publishingTitle = TitleTypeORM.from( publishing.getTitle().getTitle());
    publishingTypeORM.description = DescriptionTypeORM.from( publishing.getDescription());
    publishingTypeORM.id= ImageTypeORM.from(publishing.getImage());
    return publishingTypeORM;
  }
}