# generateForm

### usage

```js
  const vm = new Vue({
  el: '#app',
  data: {
    options: {
      formItems: [
        {
          type: 'input',
          key: 'inputValue',
          props: {
            placeholder: '请输入内容...'
          },
          children: [
            {
              type: 'span',
              slot: 'prepend',
              text: 'http://'
            },
            {
              type: 'span',
              slot: 'append',
              text: '.com'
            }
          ]
        },
        {
          type: 'input',
          key: 'inputValue',
          props: {
            placeholder: '请输入内容...'
          },
          children: [
            {
              type: 'span',
              slot: 'append',
              text: 'com'
            }
          ]
        },
        {
          type: 'input',
          key: 'inputValue',
          props: {
            placeholder: '请输入内容...'
          },
          children: [
            {
              type: 'select',
              slot: 'prepend',
              options: []
            },
            {
              type: 'button',
              slot: 'append',
              props: {
                icon: 'el-icon-search',
                type: 'primary'
              }
            }
          ]
        },
        {
          type: 'button', text: 'test', props: { type: 'primary', loading: true }
        }
      ],
      formData: {
        inputValue: ''
      }
    }
  }
})
```