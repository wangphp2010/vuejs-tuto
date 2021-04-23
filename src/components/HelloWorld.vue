<template>
  <div class="hello">
    
    <pre>{{content}}</pre>
    <pre>{{msg}}</pre>
    <p>
    Ask a yes/no question:
    <input v-model="question">
  </p>
  <p>{{ answer }}</p>

  计算属性默认只有 getter ，不过在需要时你也可以提供一个 setter ：

// ...
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
// ...
现在再运行 vm.fullName = 'John Doe' 时，setter 会被调用，vm.firstName 和 vm.lastName 也会相应地被更新。



  </div>
  
</template>

<script>

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Hello World page' ,
      content: "", // 定义这个变量content
       question: '',
      answer: 'I cannot give you an answer until you ask a question!'
    };
  },
  created: function () {
    // `_.debounce` 是一个通过 Lodash 限制操作频率的函数。
    // 在这个例子中，我们希望限制访问 yesno.wtf/api 的频率
    // AJAX 请求直到用户输入完毕才会发出。想要了解更多关于
    // `_.debounce` 函数 (及其近亲 `_.throttle`) 的知识，
    // 请参考：https://lodash.com/docs#debounce
 //  <script src="https://cdn.jsdelivr.net/npm/lodash@4.13.1/lodash.min.js"></script>

//  <script src="https://cdn.jsdelivr.net/npm/axios@0.12.0/dist/axios.min.js"></script>
// 如果是在index.html里载入的 直接写 axios.post(`${this.$url}/test/testRequest`,data)
 

    this.debouncedGetAnswer = _.debounce(this.getAnswer, 500) // 500秒运行一次
  },
  methods: {
    getAnswer: function () {
      if (this.question.indexOf('?') === -1) {
        this.answer = 'Questions usually contain a question mark. ;-)'
        return
      }
      this.answer = 'Thinking...'
      var vm = this
      axios.get('https://yesno.wtf/api')
        .then(function (response) {
          vm.answer = _.capitalize(response.data.answer)
        })
        .catch(function (error) {
          vm.answer = 'Error! Could not reach the API. ' + error
        })
    }
  },

  mounted(){ // 所有加载完后会调用这个
    this.axios.post("http://api.komavideo.com/news/list")
    .then(body => {
      this.content = body.data ;
    })
    .catch(function (error) {
          this.answer = 'Error! Could not reach the API. ' + error
        });

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 
</style>
