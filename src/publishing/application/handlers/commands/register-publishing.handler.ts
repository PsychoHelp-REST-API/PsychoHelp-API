import { RegisterPostCommand } from "../../commands/register-post.command";
import { EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { Repository } from "typeorm";
import { PublishingTypeORM } from "../../../infraestructure/persistence/typeorm/entities/publishing.typeorm";
import { AppNotification } from "../../../../common/application/app.notification";
import { PublishingTitle } from "../../../domain/value-objects/publishing-title.value";
import { Result } from "typescript-result";
import { InjectRepository } from "@nestjs/typeorm";
import { CommandHandler } from "@nestjs/cqrs/dist/utils/command-handler.decorator";

@CommandHandler(RegisterPostCommand)
export class RegisterPublishingHandler
  implements ICommandHandler<RegisterPostCommand> {
  constructor(
    @InjectRepository(PublishingTypeORM)
    private publishingRepository: Repository<PublishingTypeORM>,
    private publisher: EventPublisher,
  ){}

  async execute(command: RegisterPostCommand) {
    const titleResult: Result<AppNotification, PublishingTitle> = PublishingTitle.createTitle(command.title);
    if (titleResult.isFailure()) return 0;

    // TODO: implementar nombre del psicologo
  }
}