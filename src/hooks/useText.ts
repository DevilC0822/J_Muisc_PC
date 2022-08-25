import { ref } from 'vue'

const text = ref('')
export default function useText() {
  const changeText = (val: string) => {
    text.value = val
  }
  return {
    text,
    changeText,
  }
}
