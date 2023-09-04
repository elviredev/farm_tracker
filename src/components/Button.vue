<template>
  <button :class="type">{{ text }}</button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    text: String,
    type: String,
  }
}
</script>
