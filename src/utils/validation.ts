import { ClassConstructor, plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { error } from 'itty-router'
import { map } from 'lodash'

export const validation = async <Cls extends ClassConstructor<any>>(
  cls: Cls,
  obj: any
): Promise<InstanceType<Cls>> => {
  const dtoInstance = plainToClass(cls, obj)
  const errors = await validate(dtoInstance)

  if (errors.length > 0) {
    // @ts-ignore
    return error(400, {
      error: errors
        .map(error => map(error.constraints))
        .flat()
        .join('<br>')
    })
  }

  return { ...obj }
}
