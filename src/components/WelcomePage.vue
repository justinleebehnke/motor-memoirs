<template>
  <div>
  <h1>Take care of your car,
    and it will take care of you.</h1>
  <div class="welcome">
    <form v-on:submit.prevent="register">
      <div id="container">
      <input v-model="name" placeholder="First and Last Name">
      <input v-model="email" placeholder="Email Address">
      <input type="password" v-model="password" placeholder="Password">
      <button class="alternate" type="submit">Create a Free Account</button>
      <p class="error">{{registerError}}</p>
      </div>
    </form>

    <img src="/static/ryanlerch-Red-Lamborghini-2400px.png"/>
    </div>
  </div>
</template>
<script>
 export default {
   name: 'WelcomePage',
   data () {
     return {
       email: '',
       password: '',
       name: '',
     }
   },
   computed: {
     registerError: function() {
       return this.$store.getters.registerError;
     },
   },
   methods: {
     register: function() {
       this.$store.dispatch('register',{
         email: this.email,
         password: this.password,
	       name: this.name,
       });
     }
   }
 }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.welcome {
  display: grid;
  grid-template-columns: auto;
}
 #container {
  align: center;
  width: 100%;
  display: grid;
  grid-template-columns: auto;
 }
 img {
     width: 100%;
 }
 form {
  margin-top: 10%;
 }

 h1 {
     margin-bottom: 0px;
 }
 h2 {
     margin-top: 0px;
     font-size: 1.0em;
     font-weight: normal;
     margin-bottom: 50px;
 }
 @media screen and (min-width: 1010px) {
 .welcome {
   display: grid;
   grid-template-columns: auto auto auto auto;
   grid-row-gap: 40px;
 }
}
</style>
