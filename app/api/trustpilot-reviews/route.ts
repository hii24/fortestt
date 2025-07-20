// app/api/trustpilot-reviews/route.ts (for App Router)

import { JSDOM } from 'jsdom';
import { NextResponse } from 'next/server';

interface TrustpilotResponse {
  count: number;
  lastUpdated: string;
  error?: string;
}

export async function GET(): Promise<NextResponse<TrustpilotResponse>> {
  try {
    // Fetch the Trustpilot page
    const response = await fetch('https://www.trustpilot.com/review/lizex.io', {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();

    // Parse HTML using JSDOM
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Get the review count using your specific selector
    const reviewElement = document.querySelector('p.styles_reviewCount__NXlel');

    let reviewCount = 13; // fallback
    if (reviewElement && reviewElement.textContent) {
      const reviewText = reviewElement.textContent.trim(); // "14 reviews"
      const match = reviewText.match(/(\d+)/);
      if (match) {
        reviewCount = parseInt(match[1]);
      }
    }

    return NextResponse.json(
      {
        reviewElement: reviewElement,
        html: html,
        count: reviewCount,
        lastUpdated: new Date().toISOString(),
      },
      {
        headers: {
          'Cache-Control': 's-maxage=3600, stale-while-revalidate',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching Trustpilot data:', error);

    // Return fallback data on error
    return NextResponse.json({
      count: 58,
      error: 'Failed to fetch live data',
      lastUpdated: new Date().toISOString(),
    });
  }
}
