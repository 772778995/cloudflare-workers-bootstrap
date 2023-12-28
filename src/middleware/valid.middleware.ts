import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { error } from 'itty-router'
import map from 'lodash/map'

export const validationMiddleware = async (req: Request) => {
  req.$v = async (cls, obj) => {
    const dtoInstance = plainToClass(cls as any, obj)
    const errors = await validate(dtoInstance)

    if (errors.length > 0) {
      return error(200, {
        error: errors.map(error => map(error.constraints)).flat()
      })
    }

    return { ...obj }
  }
}
