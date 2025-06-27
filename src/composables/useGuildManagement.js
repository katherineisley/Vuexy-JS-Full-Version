export const useGuildManagement = () => {
  const guilds = ref([])
  const currentGuild = ref(null)
  const loading = ref(false)
  const error = ref('')

  const fetchUserGuilds = async () => {
    try {
      loading.value = true
      error.value = ''
      
      const token = useCookie('accessToken').value

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/guilds/admin-guilds`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      
      if (!response.ok) {
        throw new Error('Failed to fetch guilds')
      }
      
      const data = await response.json()

      guilds.value = data.guilds
      
      return data.guilds
    } catch (err) {
      console.error('Error fetching guilds:', err)
      error.value = 'Failed to load Discord servers'
      throw err
    } finally {
      loading.value = false
    }
  }

  const getGuildByName = guildName => {
    return guilds.value.find(guild => 
      guild.name.toLowerCase().replace(/\s+/g, '-') === guildName.toLowerCase(),
    )
  }

  const getGuildIcon = guild => {
    if (guild?.icon) {
      return `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`
    }
    
    return null
  }

  return {
    guilds: readonly(guilds),
    currentGuild: readonly(currentGuild),
    loading: readonly(loading),
    error: readonly(error),
    fetchUserGuilds,
    getGuildByName,
    getGuildIcon,
  }
}
