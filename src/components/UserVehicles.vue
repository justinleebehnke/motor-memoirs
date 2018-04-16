<template>
  <div class="vehicles">
    <div>
      <form v-on:submit.prevent="vehicle" class="vehicleForm">
	     <textarea v-model="vehicle_name" placeholder=""/><br/>
       <textarea v-model="year" placeholder=""/><br/>
       <textarea v-model="make" placeholder=""/><br/>
       <textarea v-model="model" placeholder=""/><br/>
       <textarea v-model="odometer" placeholder=""/><br/>
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
    </div>
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
 .vehicles {
     width: 600px;
 }
 .vehicleForm {
     background: #eee;
     padding: 10px;
     margin-bottom: 10px;
 }
 .buttonWrap {
     width: 100%;
     display: flex;
 }
 button {
     margin-left: auto;
     height: 2em;
     font-size: 0.9em;
 }
 textarea {
     width: 100%;
     height: 5em;
     padding: 2px;
     margin-bottom: 5px;
     resize: none;
     box-sizing: border-box;
 }
 .item {
     border-bottom: 1px solid #ddd;
     padding: 10px;
 }
 .tweet {
     margin-top: 0px;
 }
 .idline {
     margin-bottom: 0px;
 }
 .user {
     font-weight: bold;
     margin-right: 10px;
 }
 .handle {
     margin-right: 10px;
     color: #666;
 }
</style>
