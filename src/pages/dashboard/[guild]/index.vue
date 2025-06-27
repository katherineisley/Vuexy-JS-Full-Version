
<script setup>
const route = useRoute()
const router = useRouter()

const guildId = computed(() => route.params.guild)

definePage({
  meta: {
    requiresAuth: true,
  },
})

// Immediately redirect to home
onMounted(() => {
  router.replace(`/dashboard/${guildId.value}/home`)
})
</script>

<template>
  <div
    class="d-flex justify-center align-center"
    style="min-block-size: 50vh;"
  >
    <VProgressCircular
      indeterminate
      color="primary"
      size="48"
    />
  </div>
</template>
