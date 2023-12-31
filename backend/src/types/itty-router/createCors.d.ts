import { IRequest } from './Router'
export type CorsOptions = {
  origins?: string[] | ((origin: string) => boolean)
  maxAge?: number
  methods?: string[]
  headers?: any
}
export declare const createCors: (options?: CorsOptions) => {
  corsify: (response: Response) => Response
  preflight: (r: IRequest) => Response | undefined
}
