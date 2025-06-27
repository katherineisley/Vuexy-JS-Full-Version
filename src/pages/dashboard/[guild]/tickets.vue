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
        Ticket System
      </h5>
      <p>Manage support tickets for {{ guildName }}</p>
        
      <!-- Ticket system interface -->
      <VRow>
        <VCol
          cols="12"
          md="8"
        >
          <h6 class="text-h6 mb-4">
            Recent Tickets
          </h6>
          <!-- Ticket list would go here -->
          <VCard
            variant="outlined"
            class="mb-4"
          >
            <VCardText>
              <div class="d-flex justify-space-between align-center">
                <div>
                  <h6 class="text-h6">
                    #ticket-001
                  </h6>
                  <p class="text-body-2 mb-0">
                    Support request from User123
                  </p>
                </div>
                <VChip
                  color="warning"
                  size="small"
                >
                  Open
                </VChip>
              </div>
            </VCardText>
          </VCard>
        </VCol>
          
        <VCol
          cols="12"
          md="4"
        >
          <VCard variant="tonal">
            <VCardText>
              <h6 class="text-h6 mb-4">
                Ticket Settings
              </h6>
              <VForm>
                <VSwitch
                  label="Enable ticket system"
                  color="primary"
                  class="mb-4"
                />
                <AppTextField
                  label="Ticket Category"
                  placeholder="Support"
                  class="mb-4"
                />
                <VBtn
                  color="primary"
                  block
                >
                  Update Settings
                </VBtn>
              </VForm>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>
