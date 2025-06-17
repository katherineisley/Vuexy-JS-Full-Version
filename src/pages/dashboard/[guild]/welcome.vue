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
  <GuildLayout>
    <VCard>
      <VCardText class="pa-6">
        <h5 class="text-h5 mb-4">
          Welcome Message Settings
        </h5>
        <p>Configure welcome messages for {{ guildName }}</p>
        
        <!-- Welcome message configuration form -->
        <VForm>
          <VRow>
            <VCol cols="12">
              <AppTextField
                label="Welcome Channel"
                placeholder="Select a channel..."
              />
            </VCol>
            
            <VCol cols="12">
              <AppTextarea
                label="Welcome Message"
                placeholder="Welcome to the server, {user}!"
                rows="4"
              />
            </VCol>
            
            <VCol cols="12">
              <VSwitch
                label="Enable welcome messages"
                color="primary"
              />
            </VCol>
            
            <VCol cols="12">
              <VBtn color="primary">
                Save Settings
              </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </GuildLayout>
</template>
