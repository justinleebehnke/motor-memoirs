<template>
  <div>
  <!-- show records for selected vehicle -->
  <div v-if="vehicle_selected">
    <div id="container">
      <div v-if="add_not_clicked">
        <button class="add" v-on:click="toggle_record">ADD RECORD</button>
      </div>
      <div v-else>
        <form v-on:submit.prevent="add_record">
          <input placeholder="Describe Service Performed"/>
          <input placeholder="Enter Date of Service"/>
          <button class="cancel" v-on:click="toggle_record">CANCEL</button>
          <button class="add" type="submit">SAVE RECORD</button>
        </form>
      </div>
    </div>
    <div v-for="item in records">
      <p>I AM A RECORD</p>
    </div>
  </div>
  <!-- List all vehicles -->
  <div v-else class="vehicles">
    <h2>Select the vehicle to access its records.</h2>
    <div v-for="item in vehicles">
      <div class="buttonWrap">
        <form v-on:submit.prevent="select_vehicle">
          <button class="primary" type="submit">{{item.vehicle_name}}</button>
        </form>
      </div>
    </div>
    <!-- add a vehicle to the list -->
    <div v-if="add_vehicle_not_clicked">
      <button class="alternate" v-on:click="toggle_vehicle">Add a Vehicle</button>
    </div>
    <div v-else>
      <form v-on:submit.prevent="add_vehicle">
        <input v-model="vehicle_name" placeholder="Enter the name of the vehicle you want to add."/>
        <div id="add_container">
          <button id="cancel_add" class="primary" v-on:click="toggle_vehicle">Cancel</button>
          <button id="confirm_add" class="alternate" type="submit">Save Vehicle</button>
        </div>
      </form>
    </div>
    <!-- Remove a Vehicle -->
    <div v-if="remove_not_clicked">
      <button class="alternate" v-on:click="toggle_remove">Remove a Vehicle</button>
    </div>
    <div v-else>
      <h2>Select the vehicle you want to remove completely</h2>
      <button class="alternate" v-on:click="toggle_remove">Cancel Remove</button>
      <div v-for="item in vehicles">
        <div class="buttonWrap">
          <button class="remove" v-on:click="delete_vehicle(item.vehicle_name)" type="submit">DELETE: {{item.vehicle_name}}</button>
        </div>
      </div>
    </div>
  </div>
  <img src="static/ryanlerch-Red-Lamborghini-2400px.png" alt="red-car">
</div>
</template>
<script>
 import moment from 'moment';
 export default {
   name: 'UserVehicles',
   data () {
     return {
        vehicle_name: '',
        add_not_clicked: true,
        add_vehicle_not_clicked: true,
        remove_not_clicked: true,
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
     vehicle_selected: function() {
       return this.$store.getters.vehicle_selected;
     },
     records: function () {
       return this.$store.getters.records;
     }
   },
   methods: {
     add_vehicle: function() {
       this.$store.dispatch('addVehicle',{
         vehicle_name: this.vehicle_name,
       }).then(vehicle_name => {
	      this.vehicle_name = "";
        this.add_vehicle_not_clicked = true;
       });
     },
     delete_vehicle: function(name) {
       this.$store.dispatch('deleteVehicle',name).then(vehicle_name => {
	      this.vehicle_name = "";
        console.log("vehicle deleted");
       });
     },
     select_vehicle: function() {
       this.$store.dispatch('selectVehicle',{
         vehicle_name: this.vehicle_name,
       }).then(vehicle_name => {
	      this.vehicle_name = "";
       });
     },
     toggle_record: function() {
       this.add_not_clicked = !this.add_not_clicked;
     },
     toggle_vehicle: function() {
       this.add_vehicle_not_clicked = !this.add_vehicle_not_clicked;
     },
     toggle_remove: function() {
       this.remove_not_clicked = !this.remove_not_clicked;
     },
   }
 }
</script>
<style scoped>
  .remove {
    background-color: #FFFF59;
    color: #353708;
  }
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
  .add {
    float: right;
    width: 45%;
    background-color: #77C4D3;
  }
  .cancel {
    width: 45%;
    background-color: #F35537;
  }
  #container {
    display: grid;
    grid-template-columns: auto, auto;
  }
  #add_container {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  #confirm_add {
    width: 75%;
  }
  #cancel_add {
    display: block;
    width: 75%;
  }
</style>
