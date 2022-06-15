<template>
  <div class="container h-100">
    <div class="row align-items-center h-100">
      <div class="col-12 mx-auto">
        <login-form> </login-form>
        <content-footer></content-footer>
      </div>
    </div>
  </div>
</template>

<script>
import ContentFooter from "@/components/Layout/ContentFooter.vue";
import loginForm from "../components/UserProfile/loginForm.vue";
export default {
  layout: "login-layout",
  components: { loginForm, ContentFooter },
};
</script>

<style lang="scss">
[v-cloak] .loader::before {
  display: none !important;
}
.intro-enter-active,
.intro-leave-active {
  -webkit-transition-duration: 1600ms;
  transition-duration: 1600ms;
}

.intro-enter-active::before,
.intro-enter-active::after,
.intro-leave-active::before,
.intro-leave-active::after {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  display: block;
  width: 100%;
  height: 50%;
  -webkit-transition-property: opacity, -webkit-transform;
  transition-property: opacity, -webkit-transform;
  transition-property: opacity, transform;
  transition-property: opacity, transform, -webkit-transform;
  -webkit-transition-timing-function: ease-in-out;
  transition-timing-function: ease-in-out;
}

.intro-enter-active::before,
.intro-leave-active::before {
  background-color: white;
  background-size: 50%;
  background-position: top;
  background-repeat: no-repeat;
}

.intro-enter-active::after,
.intro-leave-active::after {
  top: 50%;
  background-color: white;
  background-size: 50%;
  background-position: bottom;
  background-repeat: no-repeat;
}

.intro-leave::before,
.intro-leave::after {
  -webkit-transform: scaleX(0);
  transform: scaleX(0);
}

.intro-leave-active::before {
  -webkit-transition-duration: 800ms;
  transition-duration: 800ms;
}

.intro-leave-active::after {
  -webkit-transition-duration: 500ms;
  transition-duration: 500ms;
  -webkit-transition-delay: 300ms;
  transition-delay: 300ms;
}

.intro-leave-to::before,
.intro-leave-to::after {
  -webkit-transform: scale(1);
  transform: scale(1);
  -webkit-transform-origin: left;
  transform-origin: left;
}

.intro-enter::before,
.intro-enter::after {
  -webkit-transform: scaleX(1);
  transform: scaleX(1);
}

.intro-enter-active::before {
  -webkit-transition-duration: 800ms;
  transition-duration: 800ms;
}

.intro-enter-active::after {
  -webkit-transition-duration: 500ms;
  transition-duration: 500ms;
  -webkit-transition-delay: 300ms;
  transition-delay: 300ms;
}

.intro-enter-to::before,
.intro-enter-to::after {
  -webkit-transform: scaleX(0);
  transform: scaleX(0);
  -webkit-transform-origin: right;
  transform-origin: right;
}
</style>