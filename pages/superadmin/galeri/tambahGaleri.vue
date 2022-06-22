<template>
  <div>
    <tambah-galeri></tambah-galeri>
  </div>
</template>

<script>
import TambahGaleri from "~/components/TambahGaleri.vue";
export default {
  components: {
    TambahGaleri,
  },
  layout: "super-admin-layout",
  middleware: ["check-auth", "auth"],
};
</script>

<style>
</style>