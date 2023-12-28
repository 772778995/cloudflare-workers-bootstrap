import { Router } from 'itty-router'
import { speechToText } from './ai.service'
import { SpeechToTextDto } from './ai.dto'

export default Router({ base: '/api/ai' })
  // 语音转文本
  .get('/speech-to-text', async ({ $v }, env) => {
    const speechToTextDto = await $v.query(SpeechToTextDto)
    return speechToText(env, speechToTextDto)
  })
