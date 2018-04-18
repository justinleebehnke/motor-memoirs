<template>
  <div class="records">
    <div v-for="item in feed" class="item">
      <p class="idline">
        <span class="user">
          {{item.name}}
        </span>
        <span
          class="handle">@{{item.username}}
        </span>
        <span
          class="time">{{item.created | since}}
        </span>
      </p>
      <p v-html="formatTweet(item.tweet)" class="tweet"></p>
    </div>
    <img src="static/ryanlerch-Red-Lamborghini-2400px.png" alt="red-car">
  </div>
</template>
<script>
name: 'RecordList',
 filters: {
 },
 computed: {
    records: function() {
     return this.$store.getters.records;
   },
 },
 methods: {
   formatTweet: function(text) {
     return linkify(text, {
       defaultProtocol: 'https'
     });
   },
 },
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
</style>
