<template>
  <div class="col-md-12">
    <b-table
      striped
      hover
      :items="content"
      :fields="fields"
      :filter="filter"
      :per-page="perPage"
      :current-page="currentPage"
      :responsive="true"
      show-empty
    >
      <template #cell(index)="data">
        {{ data.index + 1 }}
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      filter: null,
      perPage: 10,
      currentPage: 1,
      fields: [
        { key: "index", label: "No" },

        { key: "judul_artikel", label: "Judul Artikel" },

        { key: "tanggal_terbit", label: "Tanggal Terbit" },

        { key: "nama_admin", label: "Admin" },
      ],
    };
  },
};
</script>

<style>
</style>