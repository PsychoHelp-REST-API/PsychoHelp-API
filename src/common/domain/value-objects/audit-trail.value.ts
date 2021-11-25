import { DateTime } from "./date-time.value";
import { PsychologistId } from "../../../psychologists/domain/value-objects/psychologist-id.value";

export class AuditTrail {
  private readonly createdAt: DateTime;
  private readonly createdBy: PsychologistId;
  private readonly updatedAt: DateTime;
  private readonly updatedBy: PsychologistId;

  private constructor(createdAt: DateTime, createdBy: PsychologistId, updatedAt: DateTime, updatedBy: PsychologistId) {
    this.createdAt = createdAt;
    this.createdBy = createdBy;
    this.updatedAt = updatedAt;
    this.updatedBy = updatedBy;
  }

  public static from(createdAt: DateTime, createdBy: PsychologistId, updatedAt: DateTime, updatedBy: PsychologistId) {
    return new AuditTrail(createdAt, createdBy, updatedAt, updatedBy);
  }

  public getCreatedAt(): DateTime {
    return this.createdAt;
  }

  public getCreatedBy(): PsychologistId {
    return this.createdBy;
  }

  public getUpdatedAt(): DateTime {
    return this.updatedAt;
  }

  public getUpdatedBy(): PsychologistId {
    return this.updatedBy;
  }
}