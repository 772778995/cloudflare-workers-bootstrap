<script lang="ts" setup>
import useTheme from '@/src/stores/useTheme'
import { Voice, VoiceOff } from '@icon-park/vue-next'
import { usePermission } from '@vueuse/core'

const micAuth = usePermission('microphone')
</script>

<template>
  <div
    id="recorder"
    _pos="relative"
    _nm="convex-q-primary-7"
    _w="300px"
    _h="300px"
    _p="y-50px x-30px"
    _m="auto"
    _border="rounded-full"
    _transition="all duration-100"
    _transform="gpu"
    _filter="~"
    _active="nm-concave-q-primary-7 brightness-90 scale-98"
  >
    <component
      :is="micAuth === 'granted' ? Voice : VoiceOff"
      _pos="absolute top-1/2 left-1/2"
      _transform="~ -translate-x-1/2 -translate-y-1/2"
      _z="1"
      _w="200px"
      _h="200px"
      _p="5px"
      _text="q-primary-5 200px"
      _cursor="pointer"
      :style="{
        filter: `drop-shadow(2px 4px 6px ${useTheme().themeCss['primary-9']})`
      }"
    />
  </div>
</template>

