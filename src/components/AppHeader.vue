<template>
  <nav>
    <ul id="menu">
      <div id="login_menu" v-if="loggedIn">
        <button class="alternate">
          <router-link id="home" to="/">Home</router-link>
        </button>
        <button id="logout" class="alternate" @click="logout" href="#">Logout</button>
        <!-- <li class="right">{{user.username}}</li> -->
      </div>
      <form v-else class="right" v-on:submit.prevent="login">
      	<input v-model="email" placeholder="Email Address">
      	<input type="password" v-model="password" placeholder="Password">
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
 .container {
   display: grid;
   grid-template-columns: auto, auto;
 }
 #home {
   text-decoration: none;
   color: inherit;
 }
 #logout {
   margin-right: 0px;
   margin-left: auto;
   float: right;

 }

 nav {
     margin-bottom: 20px;
     width: 100%;

 }
 ul {
     list-style-type:none;
     margin:0;
     padding:0;
     width: 100%;
 }
 /* Create a horizontal list with spacing */
 #home {
   text-decoration: none;
   color: inherit;
 }
li {
     display:inline-block;
     width: 100%;
     text-align: left;
     line-height: 50px;
     color: #666;
     text-decoration: none;
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
 .alternate {
   padding-left: 100px;
   padding-right: 100px;
 }
</style>
