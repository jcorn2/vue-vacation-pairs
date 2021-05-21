<template>
  <div class="person-card">
    <img 
      :src="person.avatar.images.original.url" 
      height="150"
      width="150"
      alt="person avatar"
    >
    {{person.name}}
  </div>
</template>

<script>
export default {
  props: {
    person: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.person-card {
  width: 25rem;
  background-color: #eee;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.5rem;
  font-size: 1.5rem;
}
</style>