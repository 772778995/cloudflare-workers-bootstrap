import { Ai } from '@cloudflare/ai'
import { SpeechToTextDto } from './ai.dto'

export const speechToText = async (env: Env, speechToTextDto: SpeechToTextDto): Promise<any> => {
  const audioResponse = await fetch(speechToTextDto.audioUrl)
  const blob = await audioResponse.arrayBuffer()

  const ai = new Ai(env.AI)
  const inputs = {
    audio: [...new Uint8Array(blob)]
  }
  const response = await ai.run('@cf/openai/whisper', inputs)

  return { response }
}
