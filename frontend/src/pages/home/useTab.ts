import useRecorder from '@/src/stores/useRecorder'
import { Voice, VoiceOff, AudioFile, People } from '@icon-park/vue-next'

const useTab = () => {
  const router = useRouter()
  const { isRecording } = storeToRefs(useRecorder())

  const tabList = computed(() => [
    { name: '录音器', icon: isRecording.value ? Voice : VoiceOff },
    { name: '音频文件', icon: AudioFile },
    { name: '我的', icon: People }
  ])

  const activeTab = ref(tabList.value[0])
  watchEffect(() => {
    router.push({ name: activeTab.value.name })
  })

  return {
    tabList,
    activeTab
  }
}

export default useTab

