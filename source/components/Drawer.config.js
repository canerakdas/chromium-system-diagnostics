const config = {
  DATA: {
    PATH: '/',
    HREF: {
      DATA: '#system-data',
      CPU: '#cpu',
      MEMORY: '#memory',
      DISK: '#disk',
      NETWORK: '#network',
      SYSTEM: '#system',
      DISPLAY: '#display',
    },
  },
  DIAGNOSTIC: {
    PATH: '/SystemDiagnostics',
    HREF: {
      DIAGNOSTIC: '#system-diagnostics',
      CPU: '#cpu',
      BATTERY: '#battery',
      DISK: '#disk',
    },
  },
  STATE: {
    PATH: '/SystemState',
    HREF: {
      STATE: '#state',
    },
  },
}

const drawer = [
  {
    title: 'System Data',
    seperator: false,
    items: [
      {
        title: 'CPU History',
        alt: '',
        target: `${config.DATA.PATH}${config.DATA.HREF.CPU}`,
        icon: 'laptop_chromebook',
        active: true,
      },
      {
        title: 'Memory',
        alt: '',
        target: `${config.DATA.PATH}${config.DATA.HREF.MEMORY}`,
        icon: 'memory',
      },
      {
        title: 'Disk',
        alt: '',
        target: `${config.DATA.PATH}${config.DATA.HREF.DISK}`,
        icon: 'storage',
      },
      {
        title: 'Display',
        alt: '',
        target: `${config.DATA.PATH}${config.DATA.HREF.DISPLAY}`,
        icon: 'tv',
      },
      {
        title: 'Network',
        alt: '',
        target: `${config.DATA.PATH}${config.DATA.HREF.NETWORK}`,
        icon: 'network_wifi',
      },
      {
        title: 'System',
        alt: '',
        target: `${config.DATA.PATH}${config.DATA.HREF.SYSTEM}`,
        icon: 'settings',
      },
    ],
  },
  {
    title: 'System Diagnostic',
    seperator: true,
    items: [
      {
        title: 'CPU stress test',
        alt: '',
        target: `${config.DIAGNOSTIC.PATH}${config.DIAGNOSTIC.HREF.CPU}`,
        icon: 'whatshot',
      },
      {
        title: 'Battery charge test',
        alt: '',
        target: `${config.DIAGNOSTIC.PATH}${config.DIAGNOSTIC.HREF.BATTERY}`,
        icon: 'battery_std',
      },
      {
        title: 'Screen test',
        alt: '',
        target: `${config.DIAGNOSTIC.PATH}${config.DIAGNOSTIC.HREF.DISK}`,
        icon: 'tv',
      },
    ],
  },
  {
    title: 'System State',
    seperator: true,
    items: [
      {
        title: 'Screen test',
        alt: '',
        target: `${config.STATE.PATH}${config.STATE.HREF.STATE}`,
        icon: 'tv',
      },
    ],
  },
]

export { drawer, config }
