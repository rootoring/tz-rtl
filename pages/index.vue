<template>
  <div
    class="d-flex p-xs w-full h-full gap-xs items-center justify-center mobile"
  >
    <div class="box"></div>
    <addCard />
    <div class="table">
      <div
        class="p-xxs glass d-flex flex-center-column cards-block gap-s cell"
        v-for="cell of store.cells"
        :key="cell.id"
        @drop="onDrop($event, cell.id)"
        @dragover.prevent
        @dragenter.prevent
      >
        <card
          class=""
          draggable="true"
          @dragstart="startDrag($event, task)"
          @click="changeCardStatus(task)"
          v-for="task of filteredTasks(cell.id)"
          :data="task"
          :key="task.id"
        />
      </div>
    </div>
    <transition name="slide">
      <changeCard v-if="store.changeStatus" />
    </transition>
  </div>
</template>
<script setup lang="ts">
import { useStore } from "../store/store";
import { type taskType } from "../types";

const store = useStore();

onMounted(() => {
  store.setSaveTasks();
});

const filteredTasks = (id: Number): taskType[] => {
  return store.tasks.filter((task) => task.categoryId === id);
};

const startDrag = (evt: DragEvent, item: taskType) => {
  if (evt.dataTransfer) {
    evt.dataTransfer.dropEffect = "move";
    evt.dataTransfer.effectAllowed = "move";
    evt.dataTransfer.setData("itemID", String(item.id));
  }
};

const onDrop = (evt: DragEvent, list: number) => {
  if (evt.dataTransfer) {
    const itemID = evt.dataTransfer.getData("itemID");
    if (!itemID) return;
    const item = store.tasks.find((item) => item.id === Number(itemID));
    if (!item) return;
    const check = store.tasks.find((i) => i.categoryId == list);
    if (check) {
      if (item.type === check.type) {
        check.count += item.count;

        store.tasks.splice(
          store.tasks.findIndex((i) => i.id == item.id),
          1
        );
        localStorage.setItem("Tasks", JSON.stringify(store.tasks));
      }

      return;
    }
    item.categoryId = list;
    localStorage.setItem("Tasks", JSON.stringify(store.tasks));
  }
};
const changeCardStatus = (task: taskType) => {
  store.task.data = JSON.parse(JSON.stringify(task));
  store.task.taskIndex = store.tasks.findIndex((i) => i.id == task.id);
  store.changeStatus = true;
};
</script>
<style scoped>
.box {
  height: 100%;
  margin: 0;
  background: linear-gradient(45deg, #250116, #11070f93, #333333);
  background-size: 200% 200%;
  animation: moveGradient 30s infinite;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: -12;
}
.table {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 5px;
  grid-row-gap: 5px;
}
@media (max-width: 718px) {
  .table {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(5, 1fr);
    grid-column-gap: 5px;
    grid-row-gap: 5px;
  }
}
/* Анимация перемещения фона */
@keyframes moveGradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
