<template>
  <AudioPlayer :songlist="songlist"></AudioPlayer>
</template>

<script setup lang="ts">
import AudioPlayer from '@/components/AudioPlayer/Main.vue'
import songlist from '@/assets/data'
</script>

<style scoped lang="scss"></style>
