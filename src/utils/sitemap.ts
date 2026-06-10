/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Dynamically generates a valid XML sitemap of all primary service sections
 * and anchor navigation zones on the Destiny Branding Solutions portal.
 */
export function generateXMLSitemap(): string {
  const domain = "https://destinybranding.co.ke";
  const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

  const urls = [
    { loc: `${domain}/`, priority: "1.0", changefreq: "daily" },
    { loc: `${domain}/#hero`, priority: "0.9", changefreq: "weekly" },
    { loc: `${domain}/#flagship-signage`, priority: "0.8", changefreq: "weekly" },
    { loc: `${domain}/#other-branding-services`, priority: "0.8", changefreq: "weekly" },
    { loc: `${domain}/#estimator-workspace`, priority: "0.8", changefreq: "weekly" },
    { loc: `${domain}/#contact-showroom`, priority: "0.9", changefreq: "weekly" }
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  urls.forEach(url => {
    xml += `  <url>\n`;
    xml += `    <loc>${url.loc}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
    xml += `    <priority>${url.priority}</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>`;
  return xml;
}

/**
 * Generates a Data URL from the dynamically generated Sitemap XML
 * so it can be safely linked or referenced directly inside client anchors.
 */
export function getSitemapDataUri(): string {
  const xml = generateXMLSitemap();
  return `data:text/xml;charset=utf-8,${encodeURIComponent(xml)}`;
}
