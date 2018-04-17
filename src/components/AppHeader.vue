<template>
  <nav>
    <ul id="menu">
      <div v-if="loggedIn">
        <li><router-link to="/">Home</router-link></li>
        <li class="logout"><a @click="logout" href="#">Logout</a></li>
        <!-- <li class="right">{{user.username}}</li> -->
      </div>
      <form v-else class="right" v-on:submit.prevent="login">
      	<input v-model="email" placeholder="Email Address">
      	<input v-model="password" placeholder="Password">
      	<button class="primary" type="submit">Login</button>
      </form>
    </ul>
    <div class="flexWrapper errorPlace">
      <p v-if="loginError" class="flexRight error">{{loginError}}</p>
    </div>
  </nav>
</template>
<script>
 export default {
   name: 'AppHeader',
   data () {
     return {
       email: '',
       password: '',
     }
   },
   computed: {
     user: function() {
       return this.$store.getters.user;
     },
     loggedIn: function() {
       return this.$store.getters.loggedIn;
     },
     loginError: function() {
       return this.$store.getters.loginError;
     },
   },
   methods: {
     login: function() {
       this.$store.dispatch('login',{
         email: this.email,
         password: this.password,
       }).then(user => {
	 this.email = '';
	 this.password = '';
       });
     },
     logout: function() {
       this.$store.dispatch('logout');
     }
   }
 }
</script>
<style scoped>
 /* Strip the ul of padding and list styling */
 nav {
     margin-bottom: 20px;
     display: grid;
     width: 100%;
     grid-template-columns: auto;
 }
 ul {
     list-style-type:none;
     margin:0;
     padding:0;
     width: 100%;
 }
 /* Create a horizontal list with spacing */
 li {
     display:inline-block;
     width: 100%;
     text-align: left;
     line-height: 50px;
     color: #666;
 }
 form {
  margin-top: 50px;
  display: grid;
  width: 100%;
  font-size: 22pt;
 }
 input {
  display: block;
  font-size: 22pt;
  height: 50px;
  border: 5px solid red;
 }
 /*Active color*/
 li a.active {
 }
 /*Hover state for top level links*/
 li:hover a {
 }
 .errorPlace {
     height: 20px;
 }
 img {
     width: 50%;
 }
</style>
