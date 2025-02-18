module.exports = {
  title: '江能智能运维系统',

  /**
   * @type {boolean} true | false
   * @description Whether show the settings right-panel
   */
  showSettings: true,

  /**
   * @type {boolean} true | false
   * @description Whether need tagsView
   */
  tagsView: true,

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: false,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: true,

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description Need show err logs component.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['production', 'development']
   */
  sysConfig: {
    sysVersion: 'V3.3',
    copyright: 'Copyright @ 2022 宏安四维科技有限公司版权所有',
    navigationIcon: '',
    logoIcon: '',
    loginIcon: '',
    sysName: '江能智能运维系统'
  },
  themeClass: 'blue',
  layoutType: 'classic',
  slideClass: 'dark',
  tagsIcon: false,
  showLanguage: true,
  showSearch: true,
  useCache: false,
  errorLog: 'production'
}