<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">汽车管理</router-link> |
      <router-link to="/about">关于我们</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #28a7e4;
  text-underline: none;
  outline: none;
}
</style>
