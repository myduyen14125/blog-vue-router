<template>
  <div id="app">
    <div id="nav">
      <transition name="fade" mode="out-in"> 
        <component :is="layout">
          <transition name="slide-fade" mode="out-in">
            <router-view />
          </transition>
        </component>                
      </transition>
         
    </div>
    
  </div>
</template>

<script>
import defaultLayout from './layout/default.vue'
import unauthLayout from './layout/unauth.vue'
import secretLayout from './layout/secret.vue'

export default ({
  components: {
    defaultLayout,
    unauthLayout,
    secretLayout
  },
  data() {
    return{
      loggIn: true
    }
  },
  created() {
    console.log(this.$route)
  },
  computed: {
    layout() {
      if(this.$route.meta.layout === 'unauth') return 'unauthLayout';
      if(this.$route.meta.layout === 'secret') return 'secretLayout';
      else return 'defaultLayout'
    }
  }
})
</script>


<style lang="scss">
*{
  font-family: 'Be Vietnam', sans-serif;
}
body{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
a{
  text-decoration: none !important;

}
a.router-link-exact-active {
  border-bottom: 5px solid #2c3e50;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* Enter and leave animations can use different. 
Transition for each slide in one component
 durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
{
  transform: translateX(10px);
  opacity: 0;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .slide-fade-leave-to {
  opacity: 0;
}


</style>
