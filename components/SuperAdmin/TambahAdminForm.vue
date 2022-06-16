<template>
  <card type="chart">
    <template slot="header">
      <div class="col-lg-6">
        <div class="col-md-12">
          <h4 slot="header" class="title">Tambah Artikel</h4>
        </div>
        <form @submit.prevent="updateProfile">
          <div class="col-md-12">
            <base-input type="text" label="Nama"> </base-input>
          </div>
          <div class="col-md-12">
            <base-input type="email" label="Email"> </base-input>
          </div>
          <div class="col-md-12">
            <base-input type="password" label="Password"> </base-input>
          </div>
          <div class="col-md-12">
            <base-input type="text" label="Role"> </base-input>
          </div>
          <div class="col-md-12">
            <base-input type="jabatan" label="Jabatan"> </base-input>
          </div>
          <div class="col-md-12 mt-4 mb-4">
            <base-button type="info" class="btn-fill"> Tambahkan </base-button>
          </div>
        </form>
      </div>
    </template>
  </card>
</template>
<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      uid: "",
    };
  },
  methods: {
    async onSubmit() {
      await this.$store
        .dispatch("authAdmin", {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$router.push({ path: `/`, force: true });
        });
    },
  },
};
</script>
<style></style>
