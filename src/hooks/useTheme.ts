// 如果导出的是函数的话 形成天然闭包环境 theme状态不能在多个组件间共享
import { ref } from 'vue'
import { darkTheme } from 'naive-ui'
import type { GlobalTheme } from 'naive-ui'

const theme = ref<GlobalTheme | null>(null)

const changeTheme = (val: 'dark' | 'light') => {
  if (val === 'light') {
    theme.value = null
    return
  }
  theme.value = darkTheme
}
export default { theme, changeTheme }
