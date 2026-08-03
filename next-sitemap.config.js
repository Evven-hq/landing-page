/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://evven.xyz',
  generateRobotsTxt: true, // This will generate our robots.txt
  exclude: ['/admin*', '/private*'],
  changefreq: 'weekly',
  priority: 0.7,
  // Additional settings for better SEO
  filename: 'sitemap.xml',
  createRobotsTxt: true, // Create robots.txt automatically
};