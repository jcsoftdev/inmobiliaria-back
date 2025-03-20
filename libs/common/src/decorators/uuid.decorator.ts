import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator'

const UUID_V7_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

export function IsUUIDv7(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isUUIDv7',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string) {
          return typeof value === 'string' && UUID_V7_REGEX.test(value)
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid UUIDv7`
        },
      },
    })
  }
}
