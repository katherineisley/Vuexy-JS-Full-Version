// ===== Update to src/composables/useAPI.js =====
import { createFetch } from '@vueuse/core'
import { destr } from 'destr'

export const useApi = createFetch({
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  fetchOptions: {
    headers: {
      Accept: 'application/json',
    },
  },
  options: {
    refetch: true,
    async beforeFetch({ options }) {
      const accessToken = useCookie('accessToken').value
      if (accessToken) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${accessToken}`,
        }
      }
      
      return { options }
    },
    afterFetch(ctx) {
      const { data, response } = ctx
      
      // Handle unauthorized responses
      if (response.status === 401) {
        // Clear auth data and redirect to login
        useCookie('accessToken').value = null
        useCookie('userData').value = null
        useCookie('userAbilityRules').value = null
        
        // Redirect to login if not already there
        const router = useRouter()
        if (router.currentRoute.value.name !== 'login') {
          router.push('/login')
        }
      }

      // Parse data if it's JSON
      let parsedData = null
      try {
        parsedData = destr(data)
      } catch (error) {
        console.error('JSON parse error:', error)
      }
      
      return { data: parsedData, response }
    },
    onFetchError(ctx) {
      // Handle network errors
      console.error('API Fetch Error:', ctx.error)
      
      return ctx
    },
  },
})
