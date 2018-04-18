import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import UserVehicles from '@/components/UserVehicles'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
  ]
})
