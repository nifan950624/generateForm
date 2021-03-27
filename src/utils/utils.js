const componentObj = {
  input: generateInputComponent,
  button: generateButtonComponent,
  select: generateSelectComponent
}

function generateChildrenComponents(h, formData, children, vm) {
  return children.map(item => {
    const type = item.type
    const componentFn = componentObj[type]
    if (componentFn) {
      return componentFn(h, formData, item, vm)
    }

    return h(type, {
      class: item.class,
      props: item.props || {},
      slot: item.slot,
      style: item.style,
      on: item.on
    }, item.text || (item.children && generateButtonComponent(item.children)))
  })
}

function generateSelectComponent(h, formData = {}, obj, vm) {
  const { options = [], key } = obj
  const optionComponents = options.map(option => {
    return h(
      'ElOption',
      {
        props: {
          label: option.label,
          value: option.value,
          key: option.value
        }
      },
      optionComponents
    )
  })
  return h(
    'ElSelect',
    {
      props: {
        value: formData[key] || '',
        placeholder: '请选择'
      },
      attrs: obj.props,
      slot: obj.slot,
      style: obj.style,
      on: {
        ...translateEvents(obj.on, vm),
        input(val) {
          if (key) {
            formData[key] = val
          }
        }
      },
      slot: obj.slot
    },
    optionComponents
  )
}

function generateInputComponent(h, formData = {}, obj, vm) {
  const { children = [], key } = obj
  const components = generateChildrenComponents(h, formData, children, vm)

  return h(
    'ElInput',
    {
      class: obj.class || '',
      props: {
        value: key ? formData[key] : '',
        ...obj.props
      },
      attrs: {
        ...obj.props
      },
      style: obj.style,
      on: {
        ...translateEvents(obj.on, vm),
        input(val) {
          if (key) {
            formData[key] = val
          }
        }
      },
      slot: obj.slot
    },
    components
  )
}

function generateButtonComponent(h, formData = {}, obj, vm) {
  return h(
    'ElButton',
    {
      class: obj.class || '',
      props: obj.props || {},
      slot: obj.slot,
      style: obj.style,
      on: obj.on,
      nativeOn: obj.nativeOn
    },
    [obj.text]
  )
}

export function translateEvents(events = {}, vm) {
  const result = {}
  for (let event in events) {
    result[event] = events[event].bind(vm)
  }

  return result
}

export default componentObj
