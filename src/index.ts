import Hoge from '@/components/Hoge.vue'
export const MyHoge = Hoge

const components = { Hoge }

const camel2Dash = (v: string): string => {
  let ret = ''
  let prevLowercase = false

  for (const s of v) {
    const isUppercase = s.toUpperCase() === s
    if (isUppercase && prevLowercase) {
      ret += '-'
    }

    ret += s
    prevLowercase = !isUppercase
  }

  return ret.replace(/-+/g, '-').toLowerCase()
}

const Plugin = {
  install(app: any) {
    Object.entries(components).forEach(([name, component]) => {
      const componentName = camel2Dash(name)

      app.component(`my-${componentName}`, component)
    })
  }
}

export default Plugin
