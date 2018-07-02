import { ApiModelPropertyOptional, ApiModelProperty } from '@nestjs/swagger';

// TODO: Does this and DTO in general need to go in lib???
enum ErrorSeverityLevel {
  CRITICAL = 'CRITICAL',
  WARNING = 'WARNING'
}

export class Error {
  severity: ErrorSeverityLevel;
  errorId: string;
  message: string;
}

/**
 * Return class for APIs.
 * TODO: return this for all APIs?
 */
export class OptionalErrorResponse<T> {

  // TODO: are any APIs complicated enough to return multiple errors/warnings/validation?
  @ApiModelPropertyOptional({ description: 'Error messages if failed.' })
  errors?: Error[];

  @ApiModelPropertyOptional({ description: 'Non-critical errors or precautionary.' })
  warnings?: string[];

  @ApiModelPropertyOptional({ description: 'If successful, the requested value or object.' })
  result?: T;

  // TODO: how much value does this add?
  @ApiModelProperty({ description: 'Version of API' })
  version: string;
}
