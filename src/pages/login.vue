<script setup>
import { useGenerateImageVariant } from '@core/composable/useGenerateImageVariant'
import authV2LoginIllustrationBorderedDark from '@images/pages/auth-v2-login-illustration-bordered-dark.png'
import authV2LoginIllustrationBorderedLight from '@images/pages/auth-v2-login-illustration-bordered-light.png'
import authV2LoginIllustrationDark from '@images/pages/auth-v2-login-illustration-dark.png'
import authV2LoginIllustrationLight from '@images/pages/auth-v2-login-illustration-light.png'
import authV2MaskDark from '@images/pages/misc-mask-dark.png'
import authV2MaskLight from '@images/pages/misc-mask-light.png'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'

import authV1BottomShape from '@images/svg/auth-v1-bottom-shape.svg?raw'
import authV1TopShape from '@images/svg/auth-v1-top-shape.svg?raw'

const authThemeImg = useGenerateImageVariant(authV2LoginIllustrationLight, authV2LoginIllustrationDark, authV2LoginIllustrationBorderedLight, authV2LoginIllustrationBorderedDark, true)
const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark)

definePage({
  meta: {
    layout: 'blank',
    unauthenticatedOnly: true,
  },
})

const route = useRoute()
const router = useRouter()
const ability = useAbility()

// Discord OAuth Configuration
const DISCORD_AUTH_URL = `${import.meta.env.VITE_API_BASE_URL}/api/auth/discord`

const isLoading = ref(false)
const authError = ref('')

// Handle Discord login redirect
const loginWithDiscord = () => {
  // Store the intended destination
  if (route.query.to) {
    sessionStorage.setItem('discord_auth_redirect', String(route.query.to))
  }
  
  // Redirect to Discord OAuth
  window.location.href = DISCORD_AUTH_URL
}

// Handle Discord OAuth callback (when user returns from Discord)
const handleDiscordCallback = async () => {
  const urlParams = new URLSearchParams(window.location.search)
  const token = urlParams.get('token')
  const error = urlParams.get('error')

  if (error) {
    authError.value = 'Discord authentication failed. Please try again.'
    
    return
  }

  if (token) {
    try {
      isLoading.value = true
      
      // Verify token and get user data from your backend
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      })

      if (!response.ok) {
        throw new Error('Token verification failed')
      }

      const { user } = await response.json()

      // Define user abilities (you can customize this based on your needs)
      const userAbilityRules = [
        {
          action: 'manage',
          subject: 'all',
        },
      ]

      // Prepare user data in Vuexy format
      const userData = {
        id: user.discordId,
        fullName: user.username,
        username: user.username,
        avatar: user.avatar ? `https://cdn.discordapp.com/avatars/${user.discordId}/${user.avatar}.png` : null,
        email: user.email || `${user.username}@discord.local`,
        role: 'admin', // You can customize this
      }

      // Store data in cookies (Vuexy way)
      useCookie('userAbilityRules').value = userAbilityRules
      useCookie('userData').value = userData
      useCookie('accessToken').value = token

      // Update abilities
      ability.update(userAbilityRules)

      // Get redirect destination
      const redirectTo = sessionStorage.getItem('discord_auth_redirect') || route.query.to || '/'

      sessionStorage.removeItem('discord_auth_redirect')

      // Redirect to dashboard
      await nextTick(() => {
        router.replace(String(redirectTo))
      })

    } catch (err) {
      console.error('Discord auth error:', err)
      authError.value = 'Authentication failed. Please try again.'
    } finally {
      isLoading.value = false
    }
  }
}

// Check if this is a callback from Discord
onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search)
  if (urlParams.has('token') || urlParams.has('error')) {
    handleDiscordCallback()
  }
})
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <div class="position-relative my-sm-16">
      <!-- 👉 Top shape -->
      <VNodeRenderer
        :nodes="h('div', { innerHTML: authV1TopShape })"
        class="text-primary auth-v1-top-shape d-none d-sm-block"
      />
      <!-- 👉 Bottom shape -->
      <VNodeRenderer
        :nodes="h('div', { innerHTML: authV1BottomShape })"
        class="text-primary auth-v1-bottom-shape d-none d-sm-block"
      />
      <!-- 👉 Auth Card -->
      <VCard
        class="auth-card"
        max-width="460"
        :class="$vuetify.display.smAndUp ? 'pa-6' : 'pa-0'"
      >
        <VCardItem class="justify-center">
          <VCardTitle>
            <RouterLink to="/">
              <div class="app-logo">
                <VNodeRenderer :nodes="themeConfig.app.logo" />
                <h1 class="app-logo-title">
                  {{ themeConfig.app.title }}
                </h1>
              </div>
            </RouterLink>
          </VCardTitle>
        </VCardItem>
        
        <VCardText>
          <h4 class="text-h4 mb-1">
            Welcome to <span class="text-capitalize">{{ themeConfig.app.title }}</span>! 👋🏻
          </h4>
          <p class="mb-0">
            Sign in with Discord to access your account
          </p>
        </VCardText>

        <!-- Error Alert -->
        <VCardText v-if="authError">
          <VAlert
            color="error"
            variant="tonal"
            class="mb-4"
          >
            {{ authError }}
          </VAlert>
        </VCardText>

        <!-- Loading State -->
        <VCardText v-if="isLoading">
          <div class="d-flex align-center justify-center py-8">
            <VProgressCircular
              indeterminate
              color="primary"
              size="50"
            />
          </div>
        </VCardText>

        <!-- Discord Login Form -->
        <VCardText v-else>
          <VForm @submit.prevent="loginWithDiscord">
            <VRow>
              <VCol cols="12">
                <!-- Discord login button -->
                <VBtn
                  block
                  type="submit"
                  size="large"
                  color="primary"
                  :disabled="isLoading"
                >
                  <VIcon
                    icon="mdi-discord"
                    class="me-2"
                  />
                  Continue with Discord
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </div>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth";
</style>
