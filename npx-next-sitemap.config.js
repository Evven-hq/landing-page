// next-sitemap.config.js
/** @type = require('next-sitemap configuration */
module.exports = {
  siteUrl: 'https://evven.xyz',
  generateRobotsTxt: false, // We already created our own
  exclude: ['/dev-*', '/admin/*', '/private/*'],
  outDir: './public',
  sitemapSize: 5000
}