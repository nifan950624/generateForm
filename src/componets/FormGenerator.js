import componentObj from '../utils/utils'

export default {
  props: {
    options: {
      type: Object,
      required: true
    }
  },
  render(h) {
    const { options } = this
    if (!options.formItems && !Array.isArray(options.formItems)) {
      return h('div')
    }
    const { formItems, formData = {} } = options

    const generateComponents = (formItems) => {
      return formItems.map(formItem => {
        const type = formItem.type
        const componentTypeFn = componentObj[type]
        const subItem = generateFormItemComponent(h, formItem, componentTypeFn(h, formData, formItem, this))
        const colItem = generateColComponent(h, formItem, subItem)

        return colItem
      })
      return []
    }

    const components = generateComponents(formItems)

    return h(
      'ElForm',
      {
        ref: 'form',
        props: {
          model: formData,
          ...options.formProps
        },
        class: 'vue-generate-form'
      },
      components
    )
  }
}

function generateColComponent(h, obj, component) {
  return h(
    'ElCol',
    {
      props: {
        'class-name': obj['class-name'] || obj['className'],
        ...obj.colProps
      }
    },
    [component]
  )
}

function generateFormItemComponent(h, obj, component) {
  return h(
    'ElFormItem',
    {
      slot: obj.slot,
      props: obj.itemProps,
      on: obj.on
    },
    [component]
  )
}