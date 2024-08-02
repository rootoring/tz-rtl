<template>
  <div class="glass d-flex flex-center-column p-xs gap-xs">
    <card class="mb-l" :data="newCard" />
    <div>
      <label class="color-gray500" for="count">Количество:</label>
      <input
        type="number"
        min="0"
        id="count"
        class="styled-input mt-xs"
        v-model="newCard.count"
      />
    </div>
    <div class="w-full">
      <label class="color-gray500" for="type">Тип:</label>
      <select
        class="styled-select mt-xs"
        name=""
        id="type"
        v-model="newCard.type"
      >
        <option :value="cardType" v-for="cardType in cardTypes" :key="cardType">
          {{ cardType }}
        </option>
      </select>
    </div>
    <button
      class="bg-success p-xs mt-s mb-xxs w-full color-gray100"
      :disabled="store.tasks.length >= store.cells.length"
      @click="addCard"
    >
      Добавить
    </button>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "../store/store";
import { type taskType } from "../types";

const store = useStore();
const cardTypes = ["primary", "warning", "info"];

const newCard = ref<taskType>({
  id: 0,
  categoryId: 0,
  count: 1,
  type: "primary",
});

const addCard = () => {
  newCard.value.id = Date.now();
  newCard.value.categoryId = findFreeCell();
  store.tasks.push({ ...newCard.value });
  localStorage.setItem("Tasks", JSON.stringify(store.tasks));
  resetNewCard();
};

const findFreeCell = (): number => {
  for (const cell of store.cells) {
    if (!store.tasks.some((task) => task.categoryId === cell.id)) {
      localStorage.setItem("Tasks", JSON.stringify(store.tasks));
      return cell.id;
    }
  }
  return 0;
};

const resetNewCard = () => {
  newCard.value = {
    id: 0,
    categoryId: 0,
    count: 1,
    type: "primary",
  };
};
</script>

<style scoped>
.styled-input {
  width: 100%;
  padding: 10px 15px;

  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  font-size: 16px;
  color: #333;
  transition: border-color 0.3s ease;
}

.styled-input:focus {
  border-color: #66afe9;
  outline: none;
  background-color: #fff;
}

/* Удаление стрелок для input type="number" */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

/* Стили для select */
.styled-select {
  width: 100%;
  padding: 10px 15px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  font-size: 16px;
  color: #333;
  transition: border-color 0.3s ease;
  appearance: none; /* Удаляет стандартную стрелку у select */
  background-image: url('data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16"><path d="M7.247 11.14 2.451 5.658c-.6-.707-.106-1.658.753-1.658h9.592c.86 0 1.354.95.753 1.658L8.753 11.14c-.4.472-1.106.472-1.506 0z"/></svg>');
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 16px 16px;
}

.styled-select:focus {
  border-color: #66afe9;
  outline: none;
  background-color: #fff;
}

.styled-select option {
  padding: 10px;
  background-color: #fff;
  color: #333;
  font-size: 16px;
}
</style>
