<script setup lang="ts">
import 'virtual:windi.css'
import useInterceptExit from './useInterceptExit'
import useIgnoreMouseEvents from './useIgnoreMouseEvents'
import useSetting from '@/src/stores/useSetting'
import vConsole from 'vconsole'
import getIsMobile from 'is-mobile'

if (process.env.NODE_ENV === 'development') {
  if (getIsMobile()) new vConsole()
}
useInterceptExit()
useIgnoreMouseEvents({
  classList: ['electron-ignore-mouse-events', 'el-overlay-dialog'],
  attrList: [{ key: '_electron', val: 'ignore-mouse-events' }]
})
const settingStore = useSetting()
settingStore.init()
</script>

<template>
  <div _electron="ignore-mouse-events" _pos="fixed top-0 left-0" _w="full" _h="full">
    <div _pos="relative" _flex="~ col" _h="full" _w="full">
      <router-view
        _flex="~ col 1"
        _pos="absolute top-0 left-0"
        _w="full"
        _h="full"
        _overflow="auto"
      />
    </div>
  </div>
</template>

