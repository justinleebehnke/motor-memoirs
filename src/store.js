import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    loggedIn: false,
    loginError: '',
    registerError: '',
    vehicles: [],
    records: [],
    vehicle: '',
    vehicle_selected: false,
  },
  getters: {
    user: state => state.user,
    loggedIn: state => state.loggedIn,
    loginError: state => state.loginError,
    registerError: state => state.registerError,
    vehicles: state => state.vehicles,
    records: state => state.records,
    vehicle: state => state.vehicle,
    vehicle_selected: state => state.vehicle_selected,
  },
  mutations: {
    setUser (state, user) {
      state.user = user;
    },
    setLogin (state, status) {
      state.loggedIn = status;
    },
    setLoginError (state, message) {
      state.loginError = message;
    },
    setRegisterError (state, message) {
      state.registerError = message;
    },
    setVehicles (state, vehicles) {
      state.vehicles = vehicles;
    },
    setRecords (state, records) {
      state.records = records;
    },
    setVehicle (state, vehicle) {
      state.vehicle = vehicle;
    },
    setVehicleSelected (state, status) {
      state.vehicle_selected = status;
    }
  },
  actions: {
    // Registration, Login //
    register(context,user) {
      axios.post("/api/users", user).then(response => {
        context.commit('setUser', response.data.user);
        context.commit('setLogin',true);
        context.commit('setRegisterError',"");
        context.commit('setLoginError',"");
      }).catch(error => {
        context.commit('setLoginError',"");
        context.commit('setLogin',false);
        if (error.response) {
          if (error.response.status === 403) {
            context.commit('setRegisterError',"That email address already has an account.");
          }
          else if (error.response.status === 409) {
            context.commit('setRegisterError',"That user name is already taken.");
          }
          return;
        }
        context.commit('setRegisterError',"Sorry, your request failed. We will look into it.");
      });
    },
    login(context,user) {
      axios.post("/api/login",user).then(response => {
        context.commit('setUser', response.data.user);
        context.commit('setLogin',true);
        context.commit('setRegisterError',"");
        context.commit('setLoginError',"");
      }).catch(error => {
        context.commit('setRegisterError',"");
        if (error.response) {
          if (error.response.status === 403 || error.response.status === 400) {
            context.commit('setLoginError',"Invalid login.");
          }
          context.commit('setRegisterError',"");
          return;
        }
        context.commit('setLoginError',"Sorry, your request failed. We will look into it.");
      });
    },
    logout(context,user) {
      context.commit('setUser', {});
      context.commit('setLogin',false);
    },
    // List Vehicles //
    getVehicles(context) {
      axios.get("/api/users/" + context.state.user.id + "/vehicles").then(response => {
        context.commit('setVehicles',response.data.vehicles);
      }).catch(err => {
        console.log("getVehicles failed:",err);
      });
    },
    addVehicle(context,vehicle_name) {
      axios.post("/api/users/" + context.state.user.id + "/vehicles", vehicle_name).then(response => {
         context.commit('setVehicles',response.data.vehicles);
      }).catch(err => {
	       console.log("addVehicle failed:",err);
      });
    },
    deleteVehicle(context,vehicle_name) {
      axios.delete("/api/users/" + context.state.user.id + "/vehicles/vehicle_name/" + vehicle_name).then(response => {
	       return context.commit('setVehicles',response.data.vehicles);
      }).catch(err => {
	       console.log("deleteVehicle failed:",err);
      });
    },
    selectVehicle(context,vehicle_name) {
      context.commit('setVehicle', vehicle_name);
      context.commit('setVehicleSelected', true);
    },
    diselectVehicle(context) {
      context.commit('setVehicle', '');
      context.commit('setVehicleSelected', false);
    },
    getRecords(context) {
      console.log("FROM STORE: " +context.state.vehicle+ "<<<");
      axios.get("/api/users/" + context.state.user.id + "/vehicles/" + context.state.vehicle_selected).then(response => {
        console.log("VEHICLE ID: (get)" + context.state.vehicle.id);
        context.commit('setRecords',response.data.records);
      }).catch(err => {
        console.log("getVehicles failed:",err);
      });
    },
    addRecord(context, record) {
      console.log("VEHICLE ID: (add)" + context.state.vehicle.id);
      axios.post("/api/users/" + context.state.user.id + "/vehicles/" + context.state.vehicle.id).then(response => {
	       return context.dispatch('getRecords', context.state.vehicle.id);
      }).catch(err => {
	       console.log("addRecord failed:",err);
      });
    },
  }
});
