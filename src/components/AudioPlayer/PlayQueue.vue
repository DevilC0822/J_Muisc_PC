<script setup lang="ts">
import { computed, ref, Ref, toRefs, watch, withDefaults, onMounted } from 'vue'
interface ISong {
  name: string
  artist: string
  playurl: string
  picurl: string
  sort?: number
}
interface Props {
  songlist: ISong[]
  targetSong: ISong
}
const props = defineProps<Props>()
const { songlist, targetSong } = toRefs(props)

const isShowPopover = ref(false)
const change = () => {
  isShowPopover.value = !isShowPopover.value
}
const popoverbindShow = computed(() => {
  return isShowPopover.value ? 'flex' : 'none'
})

const emit = defineEmits(['selectSong'])
const selectSong = (item: ISong) => {
  emit('selectSong', item.sort)
}
</script>

<template>
  <div class="PlayQueue popover-content-box" @click.stop="change">
    <div class="popover-content">
      <div
        v-for="item in songlist"
        :key="item.name"
        class="popover-content-item"
        :class="targetSong.sort === item.sort ? 'target' : ''"
        @click="selectSong(item)"
      >
        <p>{{ item.name }}</p>
      </div>
    </div>
    <slot name="reference"></slot>
  </div>
</template>

<style scoped>
.popover-content-box {
  position: relative;
}

.popover-content {
  position: absolute;
  display: v-bind(popoverbindShow);
  flex-direction: column;
  bottom: 50px;
  right: 0px;
  width: 200px;
  background-color: #fff;
  border-radius: 10px;
  overflow: auto;
  height: 500px;
}

.target {
  color: red;
}
</style>
