<script setup>
const route = useRoute()
const guildName = computed(() => route.params.guild)


definePage({
  meta: {
    layout: 'default',
    requiresAuth: true,
  },
})
</script>

<template>
  <VCard>
    <VCardText class="pa-6">
      <h5 class="text-h5 mb-4">
        Guild Home Dashboard
      </h5>
      <p>Welcome to the {{ guildName }} management dashboard!</p>
        
      <!-- Add your guild home content here -->
      <VRow>
        <VCol
          cols="12"
          md="4"
        >
          <VCard
            variant="tonal"
            color="primary"
          >
            <VCardText class="text-center pa-6">
              <VIcon
                icon="tabler-users"
                size="48"
                class="mb-4"
              />
              <h6 class="text-h6">
                Members
              </h6>
              <p class="text-body-2 mb-0">
                Manage server members
              </p>
            </VCardText>
          </VCard>
        </VCol>
          
        <VCol
          cols="12"
          md="4"
        >
          <VCard
            variant="tonal"
            color="success"
          >
            <VCardText class="text-center pa-6">
              <VIcon
                icon="tabler-message"
                size="48"
                class="mb-4"
              />
              <h6 class="text-h6">
                Messages
              </h6>
              <p class="text-body-2 mb-0">
                Monitor chat activity
              </p>
            </VCardText>
          </VCard>
        </VCol>
          
        <VCol
          cols="12"
          md="4"
        >
          <VCard
            variant="tonal"
            color="warning"
          >
            <VCardText class="text-center pa-6">
              <VIcon
                icon="tabler-settings"
                size="48"
                class="mb-4"
              />
              <h6 class="text-h6">
                Settings
              </h6>
              <p class="text-body-2 mb-0">
                Configure your server
              </p>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>
