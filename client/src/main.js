import 'normalize.css/normalize.css'
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
// import locale from 'element-plus/lib/locale/lang/zh-cn'
import router from '@/router'
import Main from '@/Main.vue'
import CmTable from '@/components/CmTable.vue'

const app = createApp(Main)

import * as ElIcons from '@element-plus/icons-vue'
for (const name in ElIcons) {
  app.component(name, ElIcons[name])
}
app.component('cm-table', CmTable)

app.use(router).use(ElementPlus, { size: 'small' }).mount('#app')
