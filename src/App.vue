<template>
  <div id="app">
    <!--左侧导航-->
    <leftNav></leftNav>
    
    <!--操作区域-->
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import leftNav from '@/components/common/leftNav'

export default {
  name: 'app',
  components:{
    leftNav
  }
}
</script>

<style>
#app {
  font-family: 'Microsoft YaHei','Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
   height:100%;
}

.main{
  float:left;
  width:95%; 
  background-color: #EFF2F7;
  height:100%;
  overflow: auto;

}
</style>

<!-- app.vue文件我们可以分成三部分解读:
<template></template>标签包裹的内容：这是模板的HTMLDom结构，<router-view></router-view>标签，<router-view>标签说明使用了路由机制。我们会在以后专门拿出一篇文章讲Vue-router。
<script></script>标签包括的js内容：你可以在这里些一些页面的动态效果和Vue的逻辑代码。
<style></style>标签包裹的css内容：这里就是你平时写的CSS样式，对页面样子进行装饰用的，需要特别说明的是你可以用<style scoped></style>来声明这些css样式只在本模板中起作用。-->