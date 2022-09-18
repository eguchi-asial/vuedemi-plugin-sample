# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## 使い方

1. package.jsonのdevDeendenciesに以下

```package.json
"my-component": "git@github.com:eguchi-asial/vuedemi-plugin-sample.git#main"
```

2. src/main.jsに以下

```main.js

import App from './App.vue'
import * as Components from 'my-component'
const app = createApp(App)
Object.keys(Components).forEach(componentName => {
  if (componentName.startsWith('My')) {
    app.component(componentName, Components[componentName])
  }
})
app.mount('#app')

```

Vue2までなら、install funcをexport dfaultして、App.useすればlibrary側のinstallが呼ばれて自動登録されたのだが、なぜかVue3のapp.useでinstallが呼ばれないため、上記にしている

3. templateに以下

```
<my-hoge msg="hello" />
```

or 

```
<MyHoge msg="hello" />
```

2で登録してあるので、importは不要
