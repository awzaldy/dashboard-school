<template>
    <div class="row">
    <card type="plain">
      <h3 slot="header" class="card-title">Galeri</h3>
    </card>
  </div>
</template>

<script>
export default {
layout: "super-admin-layout",
middleware: ["check-auth", "auth"],
}
</script>

<style>

</style>