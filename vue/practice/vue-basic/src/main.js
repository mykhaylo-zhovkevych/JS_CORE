import { createApp } from 'vue'

import App from './App.vue'
import uiComponents from './UI/index.js'
import intersection from './directives/VIntersection.js'
import router from './router/router.js'

const app = createApp(App)

uiComponents.forEach((component) => {
  app.component(component.name, component)
})

app.directive('intersection', intersection)
app.use(router)
app.mount('#app')
