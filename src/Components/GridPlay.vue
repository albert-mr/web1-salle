<template>
  <div class="grid-container">
    <div v-for="row in rows" :key="row" class="grid-row">
      <div v-for="col in columns" :key="col" class="grid-item">
        <div class="blue-box"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: 4,
      rows: 4,
    };
  },
};
</script>

<style scoped>

.grid-container {
  display: grid;
  grid-template-columns: repeat(var(--columns), 1fr);
  width: min(50vw, 50vh);
  height: min(50vw, 50vh);
  margin: auto;
  margin-top: 10%;
  gap: 2%, 2%;
}

.grid-row {
  display: flex;
  flex: 1;
}

.grid-item {
  position: relative;
  flex: 1;
  aspect-ratio: 1;
  text-align: center;
  margin: 5px;
}

.blue-box {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ffffff;
  border: 2px solid #000;
}
</style>
