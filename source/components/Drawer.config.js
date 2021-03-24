const config = {
  DATA: {
    PATH: '/SystemData',
    HREF: {
      DATA: '#system-data',
      CPU: '#cpu',
      MEMORY: '#memory',
      DISK: '#disk',
      NETWORK: '#network',
      SYSTEM: '#system',
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
        alt: 'rerw',
        target: `${config.DATA.PATH}${config.DATA.HREF.CPU}`,
        Icon: 'laptop_chromebook',
      },
      {
        title: 'Memory',
        alt: '',
        target: `${config.DATA.PATH}${config.DATA.HREF.MEMORY}`,
        Icon: 'memory',
      },
      {
        title: 'Disk',
        alt: '',
        target: `${config.DATA.PATH}${config.DATA.HREF.DISK}`,
        Icon: 'storage',
      },
      {
        title: 'Network',
        alt: '',
        target: `${config.DATA.PATH}${config.DATA.HREF.NETWORK}`,
        Icon: 'network_wifi',
      },
      {
        title: 'System',
        alt: '',
        target: `${config.DATA.PATH}${config.DATA.HREF.SYSTEM}`,
        Icon: 'settings',
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
        Icon: 'whatshot',
      },
      {
        title: 'Battery charge test',
        alt: '',
        target: `${config.DIAGNOSTIC.PATH}${config.DIAGNOSTIC.HREF.BATTERY}`,
        Icon: 'battery_std',
      },
      {
        title: 'Screen test',
        alt: '',
        target: `${config.DIAGNOSTIC.PATH}${config.DIAGNOSTIC.HREF.DISK}`,
        Icon: 'tv',
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
        Icon: 'monitor',
      },
    ],
  },
]

export { drawer, config }
