<template>
  <div class="row">
    <card type="plain">
      <h3 slot="header" class="card-title">Data Admin</h3>
        <tambah-admin-form></tambah-admin-form>
    </card>
  </div>
</template>

<script>
import TambahAdminForm from '@/components/SuperAdmin/TambahAdminForm.vue'
export default {
  layout: "super-admin-layout",
  components:{
    TambahAdminForm
  }
};
</script>

<style>
</style>