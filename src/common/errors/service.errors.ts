export abstract class ServiceError extends Error {}

export class NotFoundError extends ServiceError {}

export class AlreadyExistsError extends ServiceError {}

export class UnexpectedError extends ServiceError {}

export class ForeignKeyError extends ServiceError {}

export class UnauthorizedError extends ServiceError {}