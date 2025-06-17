// ===== src/composables/useDiscordAuth.js (NEW FILE) =====
export const useDiscordAuth = () => {
  const router = useRouter()
  const ability = useAbility()

  const logout = async () => {
    try {
      // Clear all auth-related cookies
      const accessTokenCookie = useCookie('accessToken')
      const userDataCookie = useCookie('userData')
      const userAbilitiesCookie = useCookie('userAbilityRules')

      // Remove cookies
      accessTokenCookie.value = null
      userDataCookie.value = null
      userAbilitiesCookie.value = null

      // Reset abilities
      ability.update([])

      // Redirect to login
      await router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const isLoggedIn = computed(() => {
    const accessToken = useCookie('accessToken').value
    const userData = useCookie('userData').value
    
    return !!(accessToken && userData)
  })

  const user = computed(() => {
    return useCookie('userData').value
  })

  return {
    logout,
    isLoggedIn,
    user,
  }
}
