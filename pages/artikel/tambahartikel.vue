<template>
  <div>
    <tambah-artikel-form @submit="onSimpan"></tambah-artikel-form>
  </div>
</template>

<script>
import TambahArtikelForm from "~/components/artikel/TambahArtikelForm.vue";

export default {
  scrollToTop: true,
  components: { TambahArtikelForm },
  middleware: ["check-auth", "auth"],
  data() {
    return {};
  },
  methods: {
    async onSimpan(post) {
      await this.$store.dispatch("addPosts", post);
    },
  },
};
</script>

<style>
</style>