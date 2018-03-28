<template>
  <div id="app">
    <div class="main-wrapper">
      <div class="icon_wrapper">
        <img src="./assets/img/icon_light.png" width="40px" height="40px">
      </div>
      <router-view/>
    </div>
  </div>
</template>

<script>
import Product from './components/Product'
import Info from './components/Info'
import Provision from './components/Provision'
export default {
  name: 'App',
  components: {
    Product, Info, Provision
  }
}
</script>

<style>
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  li{
    list-style: none;
  }
  a {
    text-decoration: none;
    color: #98BBF0;
  }
  #app .main-wrapper{
    background-color: #e9e9e9;
  }
  #app .icon_wrapper{
    background-color: #333;
    text-align: center;
    padding-top: 5px;
    padding-bottom: 1px;
  }
  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.5;
  }
  h1, h2, h3, h4, h5, h6, label {
    font-family: Raleway,sans-serif;
  }
  h1, h2, h3, h4, h5, h6 {
    color: #444;
    font-weight: 600;
    line-height: 1.5;
    margin: 0 0 30px;
    font-family: Raleway,sans-serif;
  }
  input{
    outline: none;
  }
  button{
    outline: none;
  }
</style>
