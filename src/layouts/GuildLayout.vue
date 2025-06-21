<script setup>
const route = useRoute()
const router = useRouter()

// Extract guild ID from route
const guildId = computed(() => route.params.guild)

// Current guild info
const currentGuild = ref(null)
const loading = ref(true)

// Fetch guild information by ID
const fetchGuildInfo = async () => {
  try {
    loading.value = true

    const token = useCookie('accessToken').value
    
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/guilds/${guildId.value}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    
    if (!response.ok) {
      throw new Error('Guild not found or no access')
    }
    
    const data = await response.json()

    currentGuild.value = data.guild
  } catch (err) {
    console.error('Error fetching guild:', err)
    router.push('/dashboard')
  } finally {
    loading.value = false
  }
}

watch(() => route.params.guild, () => {
  if (route.params.guild) {
    fetchGuildInfo()
  }
}, { immediate: true })
</script>

<template>
  <div
    v-if="loading"
    class="d-flex justify-center align-center"
    style="block-size: 200px;"
  >
    <VProgressCircular
      indeterminate
      color="primary"
    />
  </div>
  
  <div v-else-if="currentGuild">
    <!-- Guild Header -->
    <VCard class="mb-6">
      <VCardText class="pa-6">
        <div class="d-flex align-center">
          <VBtn
            icon
            variant="text"
            class="me-3"
            @click="$router.push('/dashboard')"
          >
            <VIcon icon="tabler-arrow-left" />
          </VBtn>
          
          <VAvatar
            class="me-4"
            size="48"
          >
            <VImg
              v-if="currentGuild.icon"
              :src="`https://cdn.discordapp.com/icons/${currentGuild.id}/${currentGuild.icon}.png`"
              :alt="currentGuild.name"
            />
            <span
              v-else
              class="text-h6"
            >
              {{ currentGuild.name?.charAt(0) }}
            </span>
          </VAvatar>
          
          <div>
            <h5 class="text-h5 mb-1">
              {{ currentGuild.name }}
            </h5>
            <p class="text-body-2 mb-0">
              {{ currentGuild.memberCount || 0 }} members
            </p>
          </div>
        </div>
      </VCardText>
    </VCard>

    <!-- Page Content -->
    <slot />
  </div>
  
  <!-- Error state -->
  <div v-else>
    <VCard>
      <VCardText class="text-center pa-6">
        <h6 class="text-h6 mb-2">
          Guild not found
        </h6>
        <VBtn
          color="primary"
          @click="$router.push('/dashboard')"
        >
          Go back to Guild Selection
        </VBtn>
      </VCardText>
    </VCard>
  </div>
</template>
