<template>
  <div
    class="w-full h-full"
    :class="!store.changeStatus ? '' : 'change'"
    @click="store.changeStatus = false"
  >
    <div
      class="change-box d-flex flex-center-column p-xs pt-xxl glass"
      :class="!store.changeStatus ? '' : 'change-box__actv'"
      @click.prevent="$event.stopPropagation()"
    >
      <span @click="store.changeStatus = false" class="color-gray600 fs-m p-xxs"
        >X</span
      >
      <card class="mb-xxl" :data="store.task.data" />
      <label class="mb-s color-gray500" for="count">Изменить количество</label>
      <input type="number" min="0" id="count" v-model="count" />
      <button
        class="bg-success p-xs mt-s mb-xxs w-full color-gray100"
        @click="saveChanges"
      >
        Сохранить
      </button>
      <button @click="delTask" class="bg-danger p-xs w-full color-gray100">
        Удалить
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useStore } from "../store/store";
const store = useStore();

let count: Ref<number> = ref(0);

const saveChanges = () => {
  if (store.task.taskIndex !== null) {
    store.tasks[store.task.taskIndex].count = count.value;
    store.changeStatus = false;
    localStorage.setItem("Tasks", JSON.stringify(store.tasks));
  }
};

const delTask = () => {
  if (store.task.taskIndex !== null) {
    store.tasks.splice(store.task.taskIndex, 1);
    store.changeStatus = false;
    store.task = {
      taskIndex: null,
      data: {},
    };
    localStorage.setItem("Tasks", JSON.stringify(store.tasks));
  }
};
</script>
<style lang="scss" scoped>
.change {
  position: fixed;
  top: 0;
  right: 0;
}
.change-box {
  position: fixed;
  top: 0px;
  right: -1110px;
  width: 250px;
  height: 600px;
  transition: 0.3s all;
  span {
    position: absolute;
    top: 15px;
    right: 15px;
    cursor: pointer;
  }
}
.change-box__actv {
  top: 20px;
  right: 10px;
}
/* Основные стили для input */
input[type="text"],
input[type="number"] {
  width: 100%;
  padding: 10px;
  margin: 3px 0;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  outline: none;
  transition: background-color 0.3s;
  background-color: rgba(255, 255, 255, 0.8);
}

input[type="text"]:focus,
input[type="number"]:focus {
  background-color: rgba(255, 255, 255, 1);
}

/* Стили для удаления стрелок в input type="number" */

/* Удаление стрелок в Chrome, Safari, Edge, Opera */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Удаление стрелок в Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

/* Дополнительные стили для улучшения внешнего вида */
input[type="text"]::placeholder,
input[type="number"]::placeholder {
  color: #aaa;
  font-style: italic;
}

input[type="text"]:disabled,
input[type="number"]:disabled {
  background-color: #f5f5f5;
  color: #999;
  cursor: not-allowed;
}
</style>
