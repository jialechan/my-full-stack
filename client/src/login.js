import 'normalize.css/normalize.css'
import { createApp } from 'vue'
import Login from '@/Login.vue'
import ElementPlus from 'element-plus'

const app = createApp(Login)

import * as ElIcons from '@element-plus/icons-vue'
for (const name in ElIcons) {
  app.component(name, ElIcons[name])
}

app.use(ElementPlus, { size: 'small' }).mount('#app')