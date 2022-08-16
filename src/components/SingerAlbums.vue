<template>
  <section class="SingerAlbums">
    <div>
      <h1 class="text-[3.6rem] font-bold mt-[2rem]">{{ singerName }}的专辑</h1>
      <n-carousel slides-per-view="auto" :space-between="20" :loop="false" draggable show-arrow>
        <n-carousel-item v-for="item in albumslist" :key="item.id" style="width: 50rem">
          <div class="cursor-pointer" @click="goDetail(item.id)">
            <img :src="item.picUrl" alt="" class="w-[50rem] h-[50rem]" />
            <div class="flex justify-between items-center">
              <p class="text-[2.4rem]">{{ item.name }}</p>
              <p class="text-[1.64rem]">{{ item.singer }}</p>
            </div>
          </div>
        </n-carousel-item>
        <template #arrow="{ prev, next }">
          <div class="custom-arrow">
            <button type="button" class="curtom-arrow--left" @click="prev">
              <span> &lt; </span>
            </button>
            <button type="button" class="curtom-arrow--right" @click="next">
              <span> > </span>
            </button>
          </div>
        </template>
        <template #dots="{ total, currentIndex, to }">
          <ul class="custom-dots">
            <li
              v-for="index of total"
              :key="index"
              :class="{ ['is-active']: currentIndex === index - 1 }"
              @click="to(index - 1)"
            />
          </ul>
        </template>
      </n-carousel>
    </div>
  </section>
</template>

<script setup lang="ts">
import { getAlbumsShow } from '@/hooks/singer/useSingerID'
import { onBeforeMount, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{ singerId: string; singerName: string }>()
const { singerId, singerName } = toRefs(props)
const albumslist = ref<any>([])
console.log(singerId)
onBeforeMount(async () => {
  albumslist.value = await getAlbumsShow(singerId.value)
})
const router = useRouter()
const goDetail = (id: string) => {
  router.push({
    name: 'AlbumsDetail',
    params: {
      albumsID: id,
    },
  })
}
</script>

<style scoped lang="scss"></style>

<style scoped>
.carousel-img {
  width: 100%;
  height: 240px;
  object-fit: cover;
}

.custom-arrow {
  display: flex;
  position: absolute;
  bottom: 25px;
  right: 10px;
}

.custom-arrow button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  margin-right: 12px;
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
  border-width: 0;
  border-radius: 8px;
  transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.custom-arrow button:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.custom-arrow button:active {
  transform: scale(0.95);
  transform-origin: center;
}

.custom-dots {
  display: flex;
  margin: 0;
  padding: 0;
  position: absolute;
  bottom: 6rem;
  left: 3rem;
}

.custom-dots li {
  display: inline-block;
  width: 12px;
  height: 4px;
  margin: 0 3px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.4);
  transition: width 0.3s, background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.custom-dots li.is-active {
  width: 40px;
  background: #fff;
}
</style>
