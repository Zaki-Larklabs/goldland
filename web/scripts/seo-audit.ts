import * as cheerio from 'cheerio';
import { parseStringPromise } from 'xml2js';

// Assumes the local Next.js dev server is running
const BASE_URL = 'http://localhost:3000';

async function fetchSitemapUrls(): Promise<string[]> {
  try {
    const res = await fetch(`${BASE_URL}/sitemap.xml`);
    if (!res.ok) throw new Error("Could not fetch sitemap. Is the dev server running?");
    
    const xml = await res.text();
    const result = await parseStringPromise(xml);
    
    if (!result.urlset || !result.urlset.url) return [];
    
    // The sitemap returns production URLs (goldlandcontracting.ae), 
    // so we map them back to localhost for the audit.
    return result.urlset.url.map((u: any) => {
      const prodUrl = u.loc[0];
      return prodUrl.replace('https://goldlandcontracting.ae', BASE_URL);
    });
  } catch (err) {
    console.error("Failed to parse sitemap:", err);
    return [];
  }
}

async function auditPage(url: string) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`❌ [${res.status}] ${url} - Dead link or error`);
      return;
    }

    const html = await res.text();
    const $ = cheerio.load(html);

    let errors = 0;

    // 1. Missing Title
    const title = $('title').text();
    if (!title) {
      console.error(`❌ Missing <title> on ${url}`);
      errors++;
    }

    // 2. Missing Description
    const description = $('meta[name="description"]').attr('content');
    if (!description) {
      console.error(`❌ Missing description on ${url}`);
      errors++;
    }

    // 3. Missing H1
    const h1Count = $('h1').length;
    if (h1Count === 0) {
      console.error(`❌ Missing <h1> on ${url}`);
      errors++;
    } else if (h1Count > 1) {
      console.error(`⚠️ Multiple <h1> tags on ${url} (${h1Count} found)`);
    }

    // 4. Missing Canonical
    const canonical = $('link[rel="canonical"]').attr('href');
    if (!canonical) {
      console.error(`❌ Missing canonical link on ${url}`);
      errors++;
    }

    // 5. Missing Alt Text on Images
    $('img').each((i, el) => {
      const alt = $(el).attr('alt');
      // Skip tracking pixels or extremely tiny UI icons if they explicitly have empty alt=""
      if (alt === undefined || alt.trim() === '') {
        const src = $(el).attr('src');
        // Only warn for actual images that likely need alt text
        if (src && !src.startsWith('data:image') && !src.includes('.svg')) {
           console.error(`⚠️ Missing alt text on image: ${src} on ${url}`);
        }
      }
    });

    if (errors === 0) {
      console.log(`✅ Passed: ${url}`);
    }

  } catch (err) {
    console.error(`Failed to audit ${url}:`, err);
  }
}

async function runAudit() {
  console.log("🔍 Starting Automated SEO Audit...");
  const urls = await fetchSitemapUrls();
  
  if (urls.length === 0) {
    console.log("No URLs found in sitemap. Ensure server is running and database is seeded.");
    return;
  }

  console.log(`Found ${urls.length} pages to audit.`);

  for (const url of urls) {
    await auditPage(url);
  }
  
  console.log("🏁 Audit Complete.");
}

runAudit();
