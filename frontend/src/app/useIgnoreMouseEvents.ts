import { merge } from 'lodash'
import { useQuasar } from 'quasar'

type Props = {
  /** 要忽略鼠标事件的元素的类名 */
  classList?: string[]
  /** 要忽略鼠标事件的元素的属性 */
  attrList?: { key: string; val: string | true }[]
}

/** 忽略鼠标事件 */
const useIgnoreMouseEvents = (_props: Props) => {
  const props = merge(
    {
      classList: [],
      attrList: []
    } as Props,
    _props
  ) as Required<Props>

  const q = useQuasar()
  if (!q.platform.is.electron) return

  const isIgnoreMouseEvents = ref(true)
  watch(isIgnoreMouseEvents, isIgnore => {
    window.electron.ipc(
      ({ windows }, { isIgnore }) => {
        windows.main.setIgnoreMouseEvents(isIgnore, { forward: true })
      },
      { isIgnore }
    )
  })

  const bodyEl = document.body
  const ignoreMouseEventsListenter = (e: MouseEvent) => {
    const target = e.target as HTMLBodyElement
    const classList = [...(target.classList as unknown as string[])]
    let isIgnore = classList.some(className => props.classList.includes(className))
    if (!isIgnore) {
      isIgnore = props.attrList.some(attr => {
        const attrVal = target.getAttribute(attr.key)
        if (attrVal === null) return false
        if (attr.val === true) return true
        const attrValList = attrVal.split(' ')
        return attrValList.includes(attr.val)
      })
    }
    isIgnoreMouseEvents.value = isIgnore
  }
  bodyEl.addEventListener('mousemove', ignoreMouseEventsListenter)
}

export default useIgnoreMouseEvents

