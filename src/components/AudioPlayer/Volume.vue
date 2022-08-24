<script setup lang="ts">
import { computed, ref, Ref, withDefaults, onMounted } from 'vue'
// interface Props {
//   width?: string
//   height?: string
// }
// const props = withDefaults(defineProps<Props>(), {
//   width: '150px',
//   height: '40px',
// })

const isShowPopover = ref(false)
const change = () => {
  isShowPopover.value = !isShowPopover.value
}
const popoverbindShow = computed(() => {
  return isShowPopover.value ? 'flex' : 'none'
})

const rangeRef: Ref<HTMLInputElement> = ref(null as unknown as HTMLInputElement)
onMounted(() => {
  rangeRef.value.value = 100 + ''
})

const emit = defineEmits(['rangeChange'])
const rangeChange = ($event: Event) => {
  const val = ($event.target as HTMLInputElement).value
  // emit val
  emit('rangeChange', val)
}
</script>

<template>
  <div class="Popover">
    <div class="popover-content-box" @click="change">
      <div class="popover-content">
        <slot>
          <div class="control-box">
            <input
              ref="rangeRef"
              type="range"
              min="0"
              max="100"
              value="10"
              step="1"
              @change="rangeChange"
            />
          </div>
        </slot>
      </div>
      <slot name="reference"> 文本 </slot>
    </div>
  </div>
</template>

<style scoped>
.popover-content-box {
  position: relative;
}

.popover-content {
  display: v-bind(popoverbindShow);
  position: absolute;
  right: -50px;
  bottom: 90px;
  transform: rotate(-90deg);
}
</style>
