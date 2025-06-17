<script setup>
import { useDiscordAuth } from '@/composables/useDiscordAuth'

definePage({
  meta: {
    requiresAuth: true,
  },
})

const { user } = useDiscordAuth()
const router = useRouter()

const guilds = ref([])
const loading = ref(true)
const error = ref('')

// Fetch user's admin guilds
const fetchAdminGuilds = async () => {
  try {
    loading.value = true

    const token = useCookie('accessToken').value
    
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}/api/guilds/admin-guilds`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch guilds')
    }
    
    const data = await response.json()

    guilds.value = data.guilds
  } catch (err) {
    console.error('Error fetching guilds:', err)
    error.value = 'Failed to load your Discord servers. Please try again.'
  } finally {
    loading.value = false
  }
}

// Navigate to guild dashboard
const selectGuild = guild => {
  router.push(`/dashboard/${guild.name.toLowerCase().replace(/\s+/g, '-')}`)
}

// Get guild icon URL
const getGuildIcon = guild => {
  if (guild.icon) {

    return `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`
  }

  return null
}

onMounted(() => {
  fetchAdminGuilds()
})
</script>

<template>
  <div>
    <!-- Page Header -->
    <div class="d-flex flex-wrap justify-space-between align-center mb-6">
      <div>
        <h4 class="text-h4 font-weight-medium mb-1">
          Welcome back, {{ user?.username }}! 👋🏻
        </h4>
        <p class="text-body-1 mb-0">
          Select a Discord server to manage
        </p>
      </div>
    </div>

    <!-- Loading State -->
    <VCard
      v-if="loading"
      class="pa-6"
    >
      <div class="d-flex justify-center align-center">
        <VProgressCircular
          indeterminate
          color="primary"
          size="40"
        />
        <span>Loading your Discord servers...</span>
      </div>
    </VCard>

    <!-- Error State -->
    <VAlert
      v-else-if="error"
      type="error"
      variant="tonal"
      class="mb-6"
    >
      {{ error }}
      <template #append>
        <VBtn
          size="small"
          variant="text"
          @click="fetchAdminGuilds"
        >
          Retry
        </VBtn>
      </template>
    </VAlert>

    <!-- Guilds Grid -->
    <div v-else>
      <VRow v-if="guilds.length > 0">
        <VCol
          v-for="guild in guilds"
          :key="guild.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <VCard
            class="guild-card"
            :ripple="false"
            @click="selectGuild(guild)"
          >
            <VCardText class="pa-6">
              <div class="d-flex align-center mb-4">
                <VAvatar
                  :size="48"
                  class="me-3"
                >
                  <VImg
                    v-if="getGuildIcon(guild)"
                    :src="getGuildIcon(guild)"
                    :alt="guild.name"
                  />
                  <VIcon
                    v-else
                    icon="tabler-users"
                    size="24"
                  />
                </VAvatar>
                <div class="flex-grow-1">
                  <h6 class="text-h6 mb-1">
                    {{ guild.name }}
                  </h6>
                  <span class="text-body-2 text-medium-emphasis">
                    {{ guild.memberCount ? `${guild.memberCount} members` : 'Discord Server' }}
                  </span>
                </div>
              </div>
              
              <VChip
                v-if="guild.owner"
                size="small"
                color="success"
                variant="tonal"
              >
                Owner
              </VChip>
              <VChip
                v-else
                size="small"
                color="primary"
                variant="tonal"
              >
                Admin
              </VChip>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>

      <!-- Empty State -->
      <VCard
        v-else
        class="pa-6"
      >
        <div class="text-center">
          <VIcon
            icon="tabler-server-off"
            size="48"
            class="mb-4 text-disabled"
          />
          <h5 class="text-h5 mb-2">
            No servers found
          </h5>
          <p class="text-body-1 text-medium-emphasis mb-4">
            You don't have admin permissions in any Discord servers, or you need to authorize the guilds scope.
          </p>
          <VBtn
            color="primary"
            @click="fetchAdminGuilds"
          >
            Refresh
          </VBtn>
        </div>
      </VCard>
    </div>
  </div>
</template>

<style scoped>
.guild-card {
  cursor: pointer;
  transition: all 0.2s ease;
}

.guild-card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 10%);
  transform: translateY(-2px);
}
</style>
