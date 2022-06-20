<template>
  <div class="row">
    <card type="plain">
      <h3 slot="header" class="card-title">INFORMASI & AGENDA</h3>
      <nuxt-link to="/info/tambahInfo">
        <base-button type="info" class="btn-fill mb-4">
          Tambahkan Informasi
        </base-button>
      </nuxt-link>
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
