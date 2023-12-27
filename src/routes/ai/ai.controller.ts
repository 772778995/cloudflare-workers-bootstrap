import { Router } from 'itty-router'
import { speechToText } from './ai.service'
import { validation } from '@/utils/validation'
import { SpeechToTextDto } from './ai.dto'

export default Router({ base: '/api/ai' })
  // 语音转文本
  .get('/speech-to-text', async (req, env) => {
    const speechToTextDto = await validation(SpeechToTextDto, req.query)
    return speechToText(env, speechToTextDto)
  })
