<template>
  <div class="card glass">
    <div
      class="card-inner d-flex items-center justify-center color-gray100 font-ubuntu"
      :class="'bg-' + data.type"
    >
      {{ data.count }}
    </div>
  </div>
</template>
<script setup>
defineProps({
  data: Object,
});
</script>
<style>
.card {
  width: 120px;
  height: 90px;
  transition: all 0.2s;
  position: relative;
  cursor: pointer;
  border-radius: 8px;
}
.card:hover {
  cursor: pointer;
}
.card-inner {
  width: inherit;
  height: inherit;

  border-radius: 8px;
}

.card:hover {
  transform: scale(1.04) rotate(1deg);
  -webkit-box-shadow: 8px 8px 24px 0px rgba(66, 90, 69, 1);
  -moz-box-shadow: 8px 8px 24px 0px rgba(66, 90, 69, 1);
  box-shadow: 8px 8px 24px 0px rgb(44, 9, 36);
}

@keyframes move-up6 {
  to {
    transform: translateY(-10px) scale(1);
  }
}

@keyframes move-down1 {
  to {
    transform: translateY(10px) scale();
  }
}
</style>
