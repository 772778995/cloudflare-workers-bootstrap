import { GetApiSchema } from '~/types/common'

declare module '~/types/apis' {
  interface Get {
    '/api/ai/speech-to-text': GetApiSchema<{}>
  }
}
