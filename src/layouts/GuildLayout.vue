<script setup>
const route = useRoute()
const router = useRouter()

// Extract guild name from route
const guildName = computed(() => route.params.guild)

// Current guild info
const currentGuild = ref(null)
const loading = ref(true)

// Fetch guild information
const fetchGuildInfo = async () => {
  try {
    loading.value = true

    const token = useCookie('accessToken').value
    
    // You'll need to implement a way to get guild ID from name
    // For now, we'll store it in a composable or use route meta
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}/api/guilds/${guildName.value}`, {
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

// Navigation items for guild dashboard
const guildNavigation = computed(() => [
  {
    title: 'Home',
    icon: 'tabler-home',
    to: `/dashboard/${guildName.value}/home`,
  },
  {
    title: 'Welcome',
    icon: 'tabler-hand-wave',
    to: `/dashboard/${guildName.value}/welcome`,
  },
  {
    title: 'Tickets',
    icon: 'tabler-ticket',
    to: `/dashboard/${guildName.value}/tickets`,
  },
  {
    title: 'Settings',
    icon: 'tabler-settings',
    to: `/dashboard/${guildName.value}/settings`,
  },
])
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
            />
            <VIcon
              v-else
              icon="tabler-users"
            />
          </VAvatar>
          
          <div>
            <h4 class="text-h4 mb-1">
              {{ currentGuild.name }}
            </h4>
            <p class="text-body-2 mb-0 text-medium-emphasis">
              {{ currentGuild.memberCount }} members
            </p>
          </div>
        </div>
      </VCardText>
    </VCard>

    <!-- Guild Navigation -->
    <VCard class="mb-6">
      <VCardText class="pa-0">
        <VTabs
          :model-value="route.path"
          color="primary"
          slider-color="primary"
        >
          <VTab
            v-for="item in guildNavigation"
            :key="item.to"
            :value="item.to"
            :to="item.to"
          >
            <VIcon
              :icon="item.icon"
              class="me-2"
            />
            {{ item.title }}
          </VTab>
        </VTabs>
      </VCardText>
    </VCard>

    <!-- Content -->
    <slot />
  </div>
</template>
