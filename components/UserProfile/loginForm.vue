<template>
  <card>
    <div class="row">
      <div class="col-lg-6">
        <img src="img/bg1.jpg" alt="" />
      </div>
      <div class="col-lg-6">
        <div class="col-md-12">
          <h3 slot="header" class="title">Enterbiner Creative</h3>
        </div>
        <form @submit.prevent="updateProfile">
          <div class="col-md-12">
            <base-input type="email" label="Alamat Email" v-model="email">
            </base-input>
          </div>
          <div class="col-md-12">
            <base-input type="password" label="Password" v-model="password">
            </base-input>
          </div>
          <div class="col-md-12 mt-4">
            <nuxt-link to="/">
              <base-button type="info" class="btn-fill"> Masuk </base-button>
            </nuxt-link>
          </div>
        </form>
      </div>
    </div>
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
  methods: {},
};
</script>
<style></style>
