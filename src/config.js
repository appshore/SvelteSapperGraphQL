import pjson from '../package.json'

// const pjson = require(process.env.CLIENT_ENV ? '../package.json' : '../../package.json')

// Global Static parameters
const config = {
  APP_NAME: '_APS',
  API_VERSION: 'api', // `api/${pjson.version.split('-')[0]}`,
  APP_VERSION: pjson.version,
  BRAND: 'Svelte and Sapper',
  COMPANY: 'SvelteSapper',
  LOGO: 'SvelteSapper.png',
  WEBSITE: 'https://sveltesapper.com',
  EMAIL: {
    WEBMASTER: 'webmaster@sveltesapper.com',
    LEGAL: 'legal@sveltesapper.com',
    SALES: 'sales@sveltesapper.com',
    SUPPORT: 'support@sveltesapper.com'
  },
  LICENSE: pjson.license,
  MOBILE_WIDTH: '960px', // upper limit to switch between mobile and web interfaces 
  AUTH_CHECK: 1000 * 60 * 60, // 1000 milliseconds * 60 seconds * 60 minutes = 1 hour
  COOKIE_TIMEOUT: 7, // 7 days
  DATA_SERVER: process.env.NODE_ENV === 'development' ? 'http://localhost:4000/api/2.1.0' : 'https://localhost:4000/api/2.1.0'
}

export default config
