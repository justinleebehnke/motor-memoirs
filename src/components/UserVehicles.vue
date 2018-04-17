<template>
  <div class="vehicles">
    <!-- <div v-for="item in vehicle" class="item"> -->
      <div class="vehicle_button">
        <button class="primary">Buick Lesabre</button>
      </div>
    <!-- </div> -->

    <!-- <div>
      <form v-on:submit.prevent="vehicle" class="vehicleForm">
	     Vehicle Name <input v-model="vehicle_name" placeholder=""></input><br/>
       Year <input v-model="year" placeholder=""/><br/>
       Make <input v-model="make" placeholder=""/><br/>
       Model <input v-model="model" placeholder=""/><br/>
       Odometer <input v-model="odometer" placeholder=""/><br/>
	<div class="buttonWrap">
	  <button class="primary" type="submit">Add Vehicle</button>
	</div>
      </form>
    </div>
    <div v-for="item in vehicle" class="item">
      <p class="idline">
        <span class="user">{{item.name}}</span>
        <span class="handle">@{{item.username}}</span>
      </p>
      <p class="vehicle">
        {{item.vehicle_name}}
        {{item.year}}
        {{item.make}}
        {{item.model}}
        {{item.odometer}}
      </p>
    </div> -->
  </div>
</template>
<script>
 import moment from 'moment';
 export default {
   name: 'UserVehicles',
   data () {
     return {
        vehicle_name,
        year,
        make,
        model,
        odometer,
      }
     },
   created: function() {
     this.$store.dispatch('getVehicles');
   },
   filters: {
   computed: {
     vehicles: function() {
       return this.$store.getters.vehicles;
     },
     },
   },
   methods: {
     tweet: function() {
       this.$store.dispatch('addVehicle',{
         vehicle_name: this.vehicle_name,
         year:this.year,
         make:this.make,
         model:this.model,
         odometer:this.odometer
       }).then(vehicle => {
	      this.vehicle_name = "";
        this.year = "";
        this.make = "";
        this.model = "";
        this.odometer = "";
       });
     },
   }
 }
</script>
<style scoped>
  button {
    width: 100%;
  }
</style>
