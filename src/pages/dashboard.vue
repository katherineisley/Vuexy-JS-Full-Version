<script setup>
import { useDiscordAuth } from '@/composables/useDiscordAuth'
import NavbarThemeSwitcher from '@/layouts/components/NavbarThemeSwitcher.vue'

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
  router.push(`/dashboard/${guild.id}`)
}

// Get guild icon URL
const getGuildIcon = guild => {
  if (guild.icon) {
    return `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`
  }
  
  return null
}

// Get user avatar URL
const getUserAvatar = () => {
  if (user.value?.avatar) {
    return `${user.value.avatar}`
  }
  
  return null
}

onMounted(() => {
  fetchAdminGuilds()
})
</script>

<template>
  <div class="min-h-screen d-flex flex-column">
    <!-- Container to center everything vertically and horizontally -->
    <div class="flex-grow-1 d-flex align-center justify-center pa-16">
      <div
        class="w-100"
        style="max-inline-size: 1200px;"
      >
        <!-- User Profile Section -->
        <div class="d-flex flex-column align-center mb-8">
          <VAvatar
            :size="100"
            class="mb-4"
          >
            <VImg
              v-if="getUserAvatar()"
              :src="getUserAvatar()"
              :alt="user?.username"
            />
          </VAvatar>
          
          <h3 class="text-h3 font-weight-medium mb-2">
            Hi, {{ user?.username || 'User' }}
          </h3>
          
          <p class="text-h6 text-medium-emphasis mb-0">
            @{{ user?.username || 'username' }}
          </p>
        </div>

        <!-- Page Header -->
        <div class="d-flex flex-wrap justify-space-between align-center mb-6">
          <div class="text-center w-100">
            <p class="text-body-1 mb-0">
              Choose a server to manage
            </p>
          </div>
          
          <!-- Theme Switcher -->
          <div
            class="position-absolute"
            style="inset-block-start: 24px; inset-inline-end: 24px;"
          >
            <NavbarThemeSwitcher />
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
              class="me-4"
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
          <VRow
            v-if="guilds.length > 0"
            justify="center"
          >
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
                      :size="80"
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
                      <h6 class="text-h6 mb-3">
                        {{ guild.name }}
                      </h6>
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
                    </div>
                  </div>
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
