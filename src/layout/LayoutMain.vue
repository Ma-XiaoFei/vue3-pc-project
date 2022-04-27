<script lang="ts" setup></script>

<template>
  <router-view v-slot="{ Component }">
  
    <transition name="fade">
      <keep-alive>
        <component :is="Component"></component>
      </keep-alive>
    </transition>
  </router-view>
</template>

<style scoped>

.fade-enter-from{
  transform: translateY(-100px);
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  overflow: hidden;
  transition: all .5s ease;
}
.fade-enter-to{
  transform: translateY(0px);
  opacity: 1;
}

.fade-leave-from{
   transform: translateY(0px);
   display: none;
}
.fade-leave-to{
    display: none;
    transform: translateY(-100px);
}

</style>