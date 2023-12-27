import { IsUrl } from 'class-validator'
import { decorate } from 'ts-mixer'

export class SpeechToTextDto {
  /** 音频文件地址 */
  @decorate(IsUrl({}, { message: '请提供有效的音频文件地址' }))
  audioUrl!: string
}
