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
    },
  },
  STATE: {
    PATH: '/SystemState',
    HREF: {
      STATE: '#state',
    },
  },
}

/**
 * @namespace
 * @property {string}  title            List header of drawer
 * @property {boolean} separator        Separator of lists
 * @property {object}  items            List
 * @property {string}  items.title      List item title
 * @property {string}  items.alt        List item anchor alt text
 * @property {string}  items.target     List item anchor href
 * @property {string}  items.icon       List item icon
 * https://material.io/resources/icons/?style=baseline
 * @property {boolean} items.active     Set default active
 */
const drawer = [
  {
    title: 'System Data',
    separator: false,
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
      }
    ],
  },
  {
    title: 'System Diagnostic',
    separator: true,
    items: [
      {
        title: 'CPU test',
        alt: '',
        target: `${config.DIAGNOSTIC.PATH}#1`,
        icon: 'whatshot',
      },
      {
        title: 'Storage test',
        alt: '',
        target: `${config.DIAGNOSTIC.PATH}#2`,
        icon: 'storage',
      },
      {
        title: 'Battery test',
        alt: '',
        target: `${config.DIAGNOSTIC.PATH}#3`,
        icon: 'battery_alert',
      },
      {
        title: 'Memory test',
        alt: '',
        target: `${config.DIAGNOSTIC.PATH}#4`,
        icon: 'memory',
      },
    ],
  },
  {
    title: 'System State',
    separator: true,
    items: [
      {
        title: 'Network',
        alt: '',
        target: `${config.STATE.PATH}#0`,
        icon: 'public',
      },
      {
        title: 'Bluetooth Devices',
        alt: '',
        target: `${config.STATE.PATH}#1`,
        icon: 'bluetooth',
      },
      {
        title: 'Removable Media',
        alt: '',
        target: `${config.STATE.PATH}#2`,
        icon: 'usb',
      },
      {
        title: 'Power',
        alt: '',
        target: `${config.STATE.PATH}#3`,
        icon: 'power',
      },
      {
        title: 'Display',
        alt: '',
        target: `${config.STATE.PATH}#4`,
        icon: 'tv',
      },
      {
        title: 'Mouse & Touchpad',
        alt: '',
        target: `${config.STATE.PATH}#5`,
        icon: 'mouse',
      },
    ],
  },
]

export { drawer, config }
