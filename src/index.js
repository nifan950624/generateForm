import FormGenerator from './componets/FormGenerator'

const install = function (Vue, opts = {}) {
  Vue.component('FormGenerator', FormGenerator)
}

const API = {
  install,
  version: '0.0.1'
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default API