<template>
  <div class="row">
    <card type="plain">
      <h3 slot="header" class="card-title">DASHBOARD</h3>
    </card>
  </div>
</template>
<script>
export default {
  name: "dashboard",
  middleware: ["check-auth", "auth"],
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
  mounted() {},
};
</script>
<style></style>
