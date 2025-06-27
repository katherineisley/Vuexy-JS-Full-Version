
export default [
  { heading: 'COMPONENTS' },
  {
    title: 'Welcome',
    icon: { icon: 'tabler-shopping-cart' },
    to: { 
      name: 'dashboard-guild-welcome', 
      params: {  guild: null }, 
    },
  },
  {
    title: 'Tickets',
    icon: { icon: 'tabler-school' },
    to: { 
      name: 'dashboard-guild-tickets', 
      params: {  guild: null }, 
    },
  },
]
