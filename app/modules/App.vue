<template>

  <div>
    <header>
      <nav_top></nav_top>
      <nav_menu></nav_menu>
    </header><!-- /header -->

    <transition :name="transitionName"  mode="out-in">
      <router-view ></router-view>
    </transition>
     <footer_nav></footer_nav>
  </div>
</template>

<style>

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease;
}
.fade-enter, .fade-leave-active {
  opacity: 0
}

</style>
<script>
import nav_top from '../components/Nav_Top.vue'

import nav_menu from '../components/Nav_Menu.vue'
import footer_nav from '../components/Footer_Nav.vue'


export default {
  data(){
    return {
      transitionName:"fade"
    }
  },
  computed: {
  },
  methods: {
  },
  watch:{
  },
  components: {nav_top, nav_menu, footer_nav},
  created () {
    console.log("app")
  }
}
</script>
 