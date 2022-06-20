<template>
  <div>
    <tambah-info-form></tambah-info-form>
  </div>
</template>

<script>
import TambahInfoForm from "~/components/TambahInfoForm.vue";

export default {
  components: { TambahInfoForm },
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