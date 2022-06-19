<template>
  <div class="row">
    <card type="plain">
      <h3 slot="header" class="card-title">Data Admin</h3>
      <nuxt-link to="/superadmin/tambahAdmin">
        <base-button type="info" class="btn-fill mb-4">
          Tambahkan Admin
        </base-button>
      </nuxt-link>
    </card>
  </div>
</template>

<script>
export default {
  layout: "super-admin-layout",
  middleware: ["check-auth", "auth"],
};
</script>

<style>
</style>