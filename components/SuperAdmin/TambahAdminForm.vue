<template>
  <card type="chart">
    <template slot="header">
      <div class="col-lg-6">
        <div class="col-md-12">
          <h4 slot="header" class="title">Tambah Admin</h4>
        </div>
        <form @submit.prevent="updateProfile">
          <div class="col-md-12">
            <base-input type="text" label="Nama" v-model="formAdmin.nama">
            </base-input>
          </div>
          <div class="col-md-12">
            <base-input type="email" label="Email" v-model="formAdmin.email">
            </base-input>
          </div>
          <div class="col-md-12">
            <base-input
              type="password"
              label="Password"
              v-model="formAdmin.password"
            >
            </base-input>
          </div>
          <div class="col-md-12">
            <div class="input-group-prepend">Role</div>
            <select
              v-model="formAdmin.role"
              class="custom-select"
              id="inputGroupSelect01"
            >
              <option class="dropdown-item" value="" selected>Pilih...</option>
              <option class="dropdown-item" value="SuperAdmin">
                Super Admin
              </option>
              <option class="dropdown-item" value="Admin">Admin</option>
            </select>
          </div>

          <div class="col-md-12">
            <base-input
              type="jabatan"
              label="Jabatan"
              v-model="formAdmin.jabatan"
            >
            </base-input>
          </div>
          <div class="col-md-12 mt-4 mb-4">
            <base-button type="info" class="btn-fill" @click="onSubmit">
              Tambahkan
            </base-button>
          </div>
        </form>
        <card class="mt-3" header="Form Data Result">
          <pre class="m-0">{{ formAdmin }}</pre>
        </card>
      </div>
    </template>
  </card>
</template>
<script>
export default {
  data() {
    return {
      formAdmin: {
        email: "",
        password: "",
        nama: "",
        role: "",
        jabatan: "",
      },
    };
  },
  methods: {
    onSubmit() {
      this.$store.dispatch("daftarAdmin", this.formAdmin);
    },
  },
};
</script>
<style>
</style>
