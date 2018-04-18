<template>
  <div class="vehicles">
    <h2>Select the vehicle to access its records.</h2>
    <div v-for="item in vehicles">
      <div class="buttonWrap">
        <button class="primary" type="submit">{{item.vehicle_name}}</button>
      </div>
    </div>
    <form v-on:submit.prevent="add_vehicle">
      <!--dynamic listing -->
      <h3>
        Enter the name of a vehicle you want to add.
        <input v-model="vehicle_name" placeholder=""/>
      </h3>
      <button class="alternate" type="submit">Add a Vehicle</button>
    </form>
    <img src="static/ryanlerch-Red-Lamborghini-2400px.png" alt="red-car">
  </div>
</template>
<script>
 import moment from 'moment';
 export default {
   name: 'UserVehicles',
   data () {
     return {
        vehicle_name: ' ',
      }
     },
   created: function() {
     this.$store.dispatch('getVehicles');
   },
   filters: {},
   computed: {
     vehicles: function() {
       return this.$store.getters.vehicles;
     },
   },
   methods: {
     add_vehicle: function() {
       this.$store.dispatch('addVehicle',{
         vehicle_name: this.vehicle_name,
       }).then(vehicle_name => {
	      this.vehicle_name = "";
       });
     },
   }
 }
</script>
<style scoped>
  .vehicles {
    width: 100%;
  }
  button {
    width: 100%;
  }
  img {
    width: 100%;
  }
  input {
    width: 95%;
  }
</style>
