import { usePermission } from '@vueuse/core'
import dayjs from 'dayjs'
import { defineStore } from 'pinia'
import WaveSurfer from 'wavesurfer.js'
import RecordPlugin from 'wavesurfer.js/dist/plugins/record'
import throwError from '../utils/throwError'
import useTheme from './useTheme'
// import { blobToBase64String } from 'blob-util'

const useRecorder = defineStore('recorder', {
  state: () => ({
    /** waveSurfer 实例 */
    waveSurfer: null as WaveSurfer | null,
    /** waveSurfer 配置 */
    waveSurferOpts: {
      container: '#recorder',
      height: 200,
      barWidth: 5,
      barRadius: 60,
      waveColor: useTheme().themeCss['primary-5']
    },
    /** 录音器 实例 */
    recorder: null as RecordPlugin | null,
    /** 是否正在录音 */
    isRecording: false,
    /** 录音音频时长 */
    audioDuration: dayjs(0).add(30, 's'),
    /** 录音定时器 */
    recorderTimer: {
      /** 已录制的音频时长 */
      audioDuration: 0,
      /** 更新录音时长的定时器 */
      timer: -1 as unknown as NodeJS.Timer
    }
  }),
  actions: {
    async init() {
      await this.authMicrophone()
      this.initWaveSurfer()
      this.initRecorderPlugin()
      this.recorder!.startRecording()
    },
    /** 授权麦克风 */
    async authMicrophone() {
      const micAuth = usePermission('microphone')
      if (micAuth.value === 'granted') return
      await navigator.mediaDevices.getUserMedia({ audio: true }).catch(throwError)
    },
    /** 初始化 wavesurfer */
    initWaveSurfer() {
      watch(
        this.waveSurferOpts,
        opts => {
          if (this.waveSurfer) this.waveSurfer.destroy()
          this.waveSurfer = WaveSurfer.create(opts)
        },
        { immediate: true, deep: true }
      )
    },
    /** 初始化录音器插件 */
    initRecorderPlugin() {
      watch(
        () => this.waveSurfer,
        () => {
          // 监听录音器销毁事件
          this.recorder?.on('destroy', () => {
            this.recorderTimer.audioDuration = 0
            clearInterval(this.recorderTimer.timer)
          })

          if (!this.waveSurfer) return this.recorder?.destroy()
          if (this.recorder) this.recorder.destroy()
          this.recorder = this.waveSurfer.registerPlugin(RecordPlugin.create())

          // 监听录音器开始录制
          this.recorder.on('record-start', async () => {
            this.isRecording = true
            this.recorderTimer.timer = setInterval(
              () => (this.recorderTimer.audioDuration += 1000), // 更新当前记录音频时长
              1000
            )
          })
          // 监听录音器结束录制
          this.recorder.on('record-end', async () => {
            this.isRecording = false
            // const base64URL =
            //   `data:${blob.type.replace(/.+;/, '')};base64,` +
            //   (await blobToBase64String(blob))

            clearInterval(this.recorderTimer.timer)
            this.recorderTimer.audioDuration = 0
          })
        },
        { immediate: true }
      )
    }
  }
})

export default useRecorder

