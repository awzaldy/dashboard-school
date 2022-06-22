<template>
  <div class="row">
    <card type="plain">
      <h3 slot="header" class="card-title">Galeri</h3>
      <nuxt-link to="/superadmin/galeri/tambahGaleri">
        <base-button type="info" class="btn-fill mb-4">
          Tambahkan Foto
        </base-button>
      </nuxt-link>
      <nuxt-link to="/superadmin/galeri/editGaleri">
        <base-button type="success" class="btn-fill mb-4">
          Edit Galeri
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