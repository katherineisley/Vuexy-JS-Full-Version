<!-- src/layouts/components/DefaultLayoutWithHorizontalNav.vue -->
<script setup>
import navItems from '@/navigation/horizontal'
import { themeConfig } from '@themeConfig'

// Components
import Footer from '@/layouts/components/Footer.vue'
import NavBarNotifications from '@/layouts/components/NavBarNotifications.vue'
import NavSearchBar from '@/layouts/components/NavSearchBar.vue'
import NavbarShortcuts from '@/layouts/components/NavbarShortcuts.vue'
import NavbarThemeSwitcher from '@/layouts/components/NavbarThemeSwitcher.vue'
import UserProfile from '@/layouts/components/UserProfile.vue'
import NavBarI18n from '@core/components/I18n.vue'
import { HorizontalNavLayout } from '@layouts'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'

const route = useRoute()
const router = useRouter()

// Check if we're in a guild context
const isInGuildContext = computed(() => {
  return route.path.includes('/dashboard/') && route.params.guild
})

// Navigate to server selection
const selectServer = () => {
  router.push('/dashboard')
}
</script>

<template>
  <HorizontalNavLayout :nav-items="navItems">
    <!-- 👉 navbar -->
    <template #navbar>
      <RouterLink
        to="/"
        class="app-logo d-flex align-center gap-x-3"
      >
        <VNodeRenderer :nodes="themeConfig.app.logo" />

        <h1 class="app-title font-weight-bold leading-normal text-xl text-capitalize">
          {{ themeConfig.app.title }}
        </h1>
      </RouterLink>
      
      <VSpacer />

      <!-- Search bar or Guild name -->
      <div v-if="!isInGuildContext">
        <NavSearchBar trigger-btn-class="ms-lg-n3" />
      </div>
      
      <!-- Guild context info -->
      <div
        v-else
        class="d-flex align-center me-4"
      >
        <h6 class="text-h6 font-weight-medium">
          {{ route.params.guild }}
        </h6>
      </div>

      <NavBarI18n
        v-if="themeConfig.app.i18n.enable && themeConfig.app.i18n.langConfig?.length"
        :languages="themeConfig.app.i18n.langConfig"
      />

      <NavbarThemeSwitcher />
      <NavbarShortcuts />
      <NavBarNotifications class="me-2" />
      
      <!-- Select Server Button - Only show in guild context -->
      <VBtn
        v-if="isInGuildContext"
        variant="outlined"
        color="primary"
        class="me-2"
        @click="selectServer"
      >
        <VIcon
          icon="tabler-server"
          class="me-2"
        />
        Select Server
      </VBtn>
      
      <UserProfile />
    </template>

    <!-- 👉 Pages -->
    <slot />

    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>

    <!-- 👉 Customizer -->
    <TheCustomizer />
  </HorizontalNavLayout>
</template>
