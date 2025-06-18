<!-- src/layouts/components/DefaultLayoutWithVerticalNav.vue -->
<script setup>
import navItems from '@/navigation/vertical'
import { themeConfig } from '@themeConfig'

// Components
import Footer from '@/layouts/components/Footer.vue'
import NavBarNotifications from '@/layouts/components/NavBarNotifications.vue'
import NavSearchBar from '@/layouts/components/NavSearchBar.vue'
import NavbarShortcuts from '@/layouts/components/NavbarShortcuts.vue'
import NavbarThemeSwitcher from '@/layouts/components/NavbarThemeSwitcher.vue'
import UserProfile from '@/layouts/components/UserProfile.vue'
import NavBarI18n from '@core/components/I18n.vue'
import { VerticalNavLayout } from '@layouts'

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
  <VerticalNavLayout :nav-items="navItems">
    <!-- 👉 navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <!-- 👉 Vertical nav toggle in overlay mode -->
        <IconBtn
          class="ms-n3 d-lg-none"
          @click="toggleVerticalOverlayNavActive(true)"
        >
          <VIcon icon="tabler-menu-2" />
        </IconBtn>

        <!-- 👉 Search bar or Guild name -->
        <div
          v-if="!isInGuildContext"
          class="d-flex align-center"
        >
          <NavSearchBar />
        </div>
        
        <!-- Guild context info -->
        <div
          v-else
          class="d-flex align-center"
        >
          <h6 class="text-h6 font-weight-medium">
            {{ route.params.guild }}
          </h6>
        </div>

        <VSpacer />

        <NavBarI18n
          v-if="themeConfig.app.i18n.enable && themeConfig.app.i18n.langConfig?.length"
          :languages="themeConfig.app.i18n.langConfig"
        />
        <NavbarThemeSwitcher />
        <NavbarShortcuts />
        <NavBarNotifications class="me-2" />
        <UserProfile />
      </div>
    </template>

    <!-- 👉 Before nav items (Select Server Button) -->
    <template #before-vertical-nav-items>
      <!-- Select Server Button - Only show in guild context -->
      <div
        v-if="isInGuildContext"
        class="pa-4"
      >
        <VBtn
          block
          variant="outlined"
          color="primary"
          @click="selectServer"
        >
          <VIcon
            icon="tabler-server"
            class="me-2"
          />
          Select Server
        </VBtn>
      </div>
    </template>

    <!-- 👉 Pages -->
    <slot />

    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>

    <!-- 👉 Customizer -->
    <TheCustomizer />
  </VerticalNavLayout>
</template>
