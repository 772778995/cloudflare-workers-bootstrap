import WaveSurfer, { WaveSurferOptions } from 'wavesurfer.js'
import RecordPlugin from 'wavesurfer.js/dist/plugins/record'
import useAudio from '@/src/stores/useAudio'
import { blobToBase64String } from 'blob-util'
import { usePermission } from '@vueuse/core'
import useTheme from '@/src/stores/useTheme'

type Props = {
  /** 录音器容器元素 ID */
  container: string
}

const useRecorder = (props: Props) => {
  const { container } = props
  const { audioList } = storeToRefs(useAudio())

  const microphoneAccess = usePermission('microphone')

  /** 录音器音频声谱 */
  const waveSurfer: Ref<WaveSurfer | null> = ref(null)
  /** 录音器 */
  const recorder: Ref<RecordPlugin | null> = ref(null)
  /** 是否正在录音 */
  const isRecording = ref(recorder.value?.isRecording() || false)
  /** 音频时长，单位毫秒 */
  const audioDuration = ref(30000)
  const recorderTimer = ref({
    /** 已录音的时长，单位毫秒 */
    audioDuration: 0,
    /** 定时器 */
    timer: -1 as unknown as NodeJS.Timer
  })
  watch(
    () => recorderTimer.value.audioDuration,
    dur => {
      if (dur < audioDuration.value) return
      recorder.value!.stopRecording()
    }
  )
  /** 录音器音频声谱配置项 */
  const waveSurferOpts: Ref<WaveSurferOptions> = ref({
    container,
    height: 200,
    barWidth: 5,
    barRadius: 60,
    waveColor: useTheme().themeCss['primary-2']
  })
  watch(waveSurferOpts, opts => waveSurfer.value?.setOptions(opts))

  // 初始化录音器
  onMounted(() => {
    waveSurfer.value = WaveSurfer.create(waveSurferOpts.value) // 创建 waveSufer
    recorder.value = waveSurfer.value.registerPlugin(RecordPlugin.create()) // 创建录音器

    // 监听录音器开始录制
    recorder.value.on('record-start', async () => {
      isRecording.value = true
      recorderTimer.value.timer = setInterval(
        () => (recorderTimer.value.audioDuration += 1000), // 更新当前记录音频时长
        1000
      )
    })
    // 监听录音器结束录制
    recorder.value.on('record-end', async blob => {
      isRecording.value = false
      const base64URL =
        `data:${blob.type.replace(/.+;/, '')};base64,` + (await blobToBase64String(blob))
      // open(base64URL)
      audioList.value.push({
        blob,
        base64URL,
        createTime: Date.now()
      })
      clearInterval(recorderTimer.value.timer)
      recorderTimer.value.audioDuration = 0
      console.log(audioList.value)
      // recorder.value!.startRecording()
    })

    recorder.value.startRecording()
    recorder.value.stopRecording()
  })

  // 销毁录音器
  onUnmounted(() => recorder.value?.destroy())

  return {
    microphoneAccess,
    waveSurfer,
    recorder,
    isRecording,
    audioDuration,
    waveSurferOpts
  }
}

export default useRecorder

