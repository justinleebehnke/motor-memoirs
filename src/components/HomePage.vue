<template>
  <div>
    <div v-if="loggedIn">
      <user-vehicles/>
    </div>
    <div v-else>
      <welcome-page/>
    </div>
  </div>
</template>

<script>
 import WelcomePage from './WelcomePage';
 import UserVehicles from './UserVehicles';
 export default {
   name: 'HomePage',
   components: {WelcomePage,UserVehicles},
   computed: {
     loggedIn: function() {
       return this.$store.getters.loggedIn;
     },
   },
 }
</script>

<style scoped>
</style>
