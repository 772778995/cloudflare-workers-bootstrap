<script lang="ts" setup>
import useTab from './useTab'
import useRecorder from '@/src/stores/useRecorder'

const { tabList, activeTab } = useTab()
useRecorder().init()
</script>

<template>
  <div _nm="flat-q-primary-8">
    <router-view />

    <!-- 底部栏 -->
    <div _m="t-auto 25px" _flex="~ justify-between">
      <div
        v-for="item in tabList"
        :key="item.name"
        :title="item.name"
        _nm="flat-q-primary-7-sm"
        _flex="~ center"
        _w="50px"
        _h="50px"
        _cursor="pointer"
        _p="2px"
        _border="rounded-8px"
        _transition="duration-300"
        _filter="~"
        _transform="gpu"
        _active="scale-95 brightness-95"
        @click="activeTab = item"
      >
        <div
          _flex="~ center"
          _w="full"
          _h="full"
          _border="rounded-8px"
          _transition="all duration-300"
          :class="{
            'nm-inset-q-primary-7-sm': item.name === activeTab.name
          }"
        >
          <component
            :is="item.icon"
            _transform="~ translate-y-2px"
            _text="q-primary-9 3xl"
          />
        </div>
      </div>
    </div>
  </div>
</template>

