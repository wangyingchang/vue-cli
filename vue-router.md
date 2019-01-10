# vue-router

## 1.vue-router 安装

npm install vue-router --save-dev

## 2.解读router/index.js文件

```javascript
import Vue from 'vue'   //引入Vue
import Router from 'vue-router'  //引入vue-router
import Hello from '@/components/Hello'  // 引入Hello.vue组件
Vue.use(Router)  //Vue全局使用Router
export default new Router({
  routes: [              //配置路由，这里是个数组
    {                    //每一个链接都是一个对象
      path: '/',         //链接路径
      name: 'Hello',     //路由名称，
      component: Hello   //对应的组件模板
    }
  ]
})
```

## 3.vue-router 新增路由页

### (1)在src/components目录下 新建Hi.vue文件

```javascript
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>
<script>
export default {
  name: 'hi',
  data () {
    return {
      msg: 'Hi, I am JSPang'
    }
  }
}
</script>
<style scoped>
</style>
```

### (2)在router/index.js文件中 引入Hi.vue组件并配置路由

```javascript
import Vue from 'vue'
import Router from 'vue-router'  
import Hello from '@/components/Hello'  
import Hi from '@/components/Hi' // 引入Hi组件
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {// 配置路由
      path:'/hi',
      name:'Hi',
      component:Hi
    }
  ]
})
```

### (3)router-link制作导航

```html
<router-link to="/">[显示字段]</router-link>
<!-- 
    to: 导航路径，填写在router/index.js文件里配置的path值，如果要导航到默认首页，只需to="/";
    [显示字段]: 显示给用户的导航名称，比如首页 新闻页
-->
```

## 4.vue-router 配置子路由

### (1)router-link

```html
<p>导航 ：
    <router-link to="/">首页</router-link> |
    <router-link to="/hi">Hi页面</router-link> |
    <router-link to="/hi/hi1">-Hi页面1</router-link> |
    <router-link to="/hi/hi2">-Hi页面2</router-link>
</p>
```

### (2)Hi.vue 引入router-view

```html
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <router-view class="aaa"></router-view>
  </div>
</template>
```

### (3)router/index.js

```javascript
import Vue from 'vue'
import Router from 'vue-router'  
import Hello from '@/components/Hello'  
import Hi from '@/components/Hi'
import Hi1 from '@/components/Hi1'
import Hi2 from '@/components/Hi2'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path:'/hi',
      component:Hi,
      children:[
        {path:'/',component:Hi},
        {path:'hi1',name:'hi1',component:Hi1},
        {path:'hi2',name:'hi2',component:Hi2},
      ]
    }
  ]
})
```

## 5.vue-router 传递参数

### (1)通过name传递参数

```javascript
//在路由文件src/router/index.js里配置name属性。
routes: [
{
  path: '/',
  name: 'Hello',
  component: Hello
}
]
//模板里(src/App.vue)用$route.name的形势接收
<p>{{$route.namte}}</p>
```

### (2)通过标签中的to传参参数

```html
<!-- src/App.vue的路由 -->
<router-link :to="{name:'hi1',params:{username:'wang'}}">valueString</router-link>
<!-- 
    name：就是我们在路由配置文件中起的name值。
    params：就是我们要传的参数，它也是对象形势，在对象里可以传递多个值。 
-->
<!-- Hi1.vue页接收 -->
{{$route.params.username}}
```

### (3)通过url传递参数

```javascript
// App.vue
<router-link to="/params/198/新闻标题">params</router-link>
// src/router/index.js
{
    path:'/params/:newsId/:newsTitle',
    //path:'/params/:newsId(\\d+)/:newsTitle',//newsId只能是数字的形式
    component:Params
}
// 新建params.vue
<template>
    <div>
        <h2>{{ msg }}</h2>
        <p>新闻ID：{{ $route.params.newsId}}</p>
        <p>新闻标题：{{ $route.params.newsTitle}}</p>
    </div>
</template>
<script>
export default {
  name: 'params',
  data () {
    return {
      msg: 'params page'
    }
  }
}
</script>

```

## 6.vue-router 单页面多路由区域操作

```html
<!-- App.vue -->
<router-view></router-view>
 <router-view name="left" style="float:left;width:50%;background-color:#ccc;height:300px;"></router-view>
 <router-view name="right" style="float:right;width:50%;background-color:#c0c;height:300px;"></router-view>
```

```javascript
import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Hi1 from '@/components/Hi1'
import Hi2 from '@/components/Hi2'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      components: {
        default:Hello,
        left:Hi1,
        right:Hi2
      }
    },{
      path: '/Hi',
      components: {
        default:Hello,
        left:Hi2,
        right:Hi1
      }
    }
  ]
})
```

## 7.vue-router 重定向-redirect

```javascript
// src/router/index.js把原来的component换成redirect参数就可以了;
export default new Router({
  routes: [
    {
      path: '/',
      component: Hello
    },{
      path:'/params/:newsId(\\d+)/:newsTitle',
      component:Params
    },{
      path:'/goback',
      redirect:'/'
    }
  ]
})
//设置了goback路由，但是它并没有配置任何component（组件），而是直接redirect到path:’/’下了，这就是一个简单的重新定向。

//重定向时传递参数
{
  path:'/params/:newsId(\\d+)/:newsTitle',
  component:Params
},
{
  path:'/goParams/:newsId(\\d+)/:newsTitle',
  redirect:'/params/:newsId(\\d+)/:newsTitle'
}
```

## 8.vue-router alias别名的使用

```javascript
// src/router/index.js
{
    path: '/hi1',
    component: Hi1,
    alias:'/jspang'
 }
// 直接使用<router-link>标签里的to属性，进行重新定向
<router-link  to="/jspang">jspang</router-link>

// redirect和alias的区别
// redirect：仔细观察URL，redirect是直接改变了url的值，把url变成了真实的path路径。
// alias：URL路径没有别改变，这种情况更友好，让用户知道自己访问的路径，只是改变了<router-view>中的内容。
```

## 9.vue-router 过度动画

```javascript
// src/App.vue <router-view>标签的外部添加<transition>标签
<transition name="fade">
  <router-view ></router-view>
</transition>
<style>
.fade-enter {
  opacity:0;
}
.fade-leave{
  opacity:1;
}
.fade-enter-active{
  transition:opacity .5s;
}
.fade-leave-active{
  opacity:0;
  transition:opacity .5s;
}
</style>
// css过渡类名： 组件过渡过程中，会有四个CSS类名进行切换，这四个类名与transition的name属性有关，比如name=”fade”,会有如下四个CSS类名：
// fade-enter:进入过渡的开始状态，元素被插入时生效，只应用一帧后立刻删除。
// fade-enter-active:进入过渡的结束状态，元素被插入时就生效，在过渡过程完成后移除。
// fade-leave:离开过渡的开始状态，元素被删除时触发，只应用一帧后立刻删除。
// fade-leave-active:离开过渡的结束状态，元素被删除时生效，离开过渡完成后被删除。
// 从上面四个类名可以看出，fade-enter-active和fade-leave-active在整个进入或离开过程中都有效，所以CSS的transition属性在这两个类下进行设置。

```

## 10.vue-router 404页面

```javascript
// src/router/index.js
{
   path:'*',
   component:Error
}
// 新建src/components/Error.vue文件
<template>
    <div>
        <h2>{{ msg }}</h2>
    </div>
</template>
<script>
export default {
  data () {
    return {
      msg: 'Error:404'
    }
  }
}
</script>

// App.vue 点击下面路由到404页面
<router-link to="/bbbbbb">我是瞎写的</router-link> |

```

## 11.vue-router 路由中的钩子函数

```javascript
// src/router/index.js路由文件中我们只能写beforeEnter
{
    path:'/params/:newsId(\\d+)/:newsTitle',
    component:Params,
    beforeEnter:(to,from,next)=>{
    console.log('我进入了params模板');
    console.log(to);
    console.log(from);
    next();
},
// to:路由将要跳转的路径信息，信息是包含在对像里边的。
// from:路径跳转前的路径信息，也是一个对象的形式。
// next:路由的控制参数，常用的有next(true)和next(false)。

// 写在模板中的钩子函数 在配置文件中的钩子函数，只有一个钩子-beforeEnter，如果我们写在模板中就可以有两个钩子函数可以使用：
// beforeRouteEnter：在路由进入前的钩子函数。
// beforeRouteLeave：在路由离开前的钩子函数。
export default {
  name: 'params',
  data () {
    return {
      msg: 'params page'
    }
  },
  beforeRouteEnter:(to,from,next)=>{
    console.log("准备进入路由模板");
    next();
  },
  beforeRouteLeave: (to, from, next) => {
    console.log("准备离开路由模板");
    next();
  }
}
</script>
```

## 12.vue-router 编程式导航

```java
// 用<router-link>标签或者直接操作地址栏的形式完成的，那如果在业务逻辑代码中需要跳转页面我们如何操作？这就是我们要说的编程式导航，顾名思义，就是在业务逻辑代码中实现导航。
//this.$router.go(-1) 和 this.$router.go(1)
//这两个编程式导航的意思是后退和前进，功能跟我们浏览器上的后退和前进按钮一样，这在业务逻辑中经常用到。比如条件不满足时，我们需要后退。

// App.vue
<button @click="goback">后退</button>
<script>
export default {
  name: 'app',
  methods:{
    goback(){
      this.$router.go(-1);
    }
  }
}
</script>

//this.$router.push(‘/xxx ‘)
//这个编程式导航都作用就是跳转，比如我们判断用户名和密码正确时，需要跳转到用户中心页面或者首页，都用到这个编程的方法来操作路由。
//我们设置一个按钮，点击按钮后回到站点首页。
<button @click="goHome">回到首页</button>
export default {
  name: 'app',
  methods:{
    goHome(){
      this.$router.push('/');
    }
  }
}
```