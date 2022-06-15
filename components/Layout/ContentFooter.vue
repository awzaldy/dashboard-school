<template>
  <footer class="footer">
    <div class="container-fluid">
      <div class="copyright">
        &copy; {{ year }}, Created By
        
        <a
          href="https://www.instagram.com/enterbiner/"
          target="_blank"
          rel="noopener"
          >Enterbiner Creative</a
        >
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>
<style></style>
