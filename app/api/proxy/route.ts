// app/api/proxy/route.ts
import { NextRequest, NextResponse } from 'next/server';

const LIZEX_API_KEY = process.env.API_KEY || '';
const LIZEX_BASE_URL = 'https://api.lizex.io';

export async function GET(request: NextRequest) {
  console.log('🔥 PROXY ROUTE HIT! -----------------------------------');

  try {
    const searchParams = request.nextUrl.searchParams;
    const endpoint = searchParams.get('endpoint');

    console.log('📋 All params:', Object.fromEntries(searchParams.entries()));
    console.log('🎯 Endpoint:', endpoint);
    console.log('📨 Headers received from frontend:', Object.fromEntries(request.headers.entries()));

    if (!endpoint) {
      console.log('❌ No endpoint provided');
      return NextResponse.json({ error: 'Missing endpoint parameter' }, { status: 400 });
    }

    // Get all other query parameters except 'endpoint'
    const otherParams = Object.fromEntries(
      Array.from(searchParams.entries()).filter(([key]) => key !== 'endpoint')
    );

    // Construct full URL
    const cleanEndpoint = endpoint.replace(/^\/+/, '');
    const fullUrl = `${LIZEX_BASE_URL}/${cleanEndpoint}`;

    // Build query string
    const queryString = new URLSearchParams(otherParams).toString();
    const urlWithParams = queryString ? `${fullUrl}?${queryString}` : fullUrl;

    console.log('🌐 Final URL:', urlWithParams);

    // Get Authorization header from the request
    const authHeader = request.headers.get('authorization');
    console.log('🔐 Authorization header from frontend:', authHeader);

    // Headers to send to external API
    const headersToSend: Record<string, string> = {
      'Api-Key': LIZEX_API_KEY,
      Accept: '*/*',
      'User-Agent': 'PostmanRuntime/7.44.1',
      'Accept-Encoding': 'gzip, deflate, br',
      Connection: 'keep-alive',
    };

    // Add Authorization header if present
    if (authHeader) {
      headersToSend.Authorization = authHeader;
    }

    console.log('🔑 EXACT Headers being sent to external API:');
    console.log(JSON.stringify(headersToSend, null, 2));
    console.log('🔑 API Key value:', LIZEX_API_KEY);
    console.log('🔑 API Key length:', LIZEX_API_KEY.length);

    const response = await fetch(urlWithParams, {
      method: 'GET',
      headers: headersToSend,
    });

    console.log('📊 Response status:', response.status);
    console.log('📊 Response headers:', Object.fromEntries(response.headers.entries()));

    const responseText = await response.text();
    console.log('📄 Raw response text:', responseText);

    // Try to parse as JSON
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error('❌ Response is not valid JSON:', e);
      return NextResponse.json(
        { error: 'Invalid JSON response', rawResponse: responseText },
        { status: response.status || 500 }
      );
    }

    // Check if the external API returned an error status code
    if (!response.ok) {
      console.log(`❌ API returned error status: ${response.status}`);

      // Handle specific error status codes
      if (response.status === 403) {
        console.log('❌ Permission denied (403)');
        return NextResponse.json(
          {
            error: 'Permission denied',
            detail: data.detail || 'You do not have permission to perform this action.',
            ...data,
          },
          { status: 403 }
        );
      }

      if (response.status === 401) {
        console.log('❌ Unauthorized (401)');
        return NextResponse.json(
          {
            error: 'Unauthorized',
            detail: data.detail || 'Authentication failed.',
            ...data,
          },
          { status: 401 }
        );
      }

      if (response.status === 404) {
        console.log('❌ Not Found (404)');
        return NextResponse.json(
          {
            error: 'Not Found',
            detail: data.detail || 'The requested resource was not found.',
            ...data,
          },
          { status: 404 }
        );
      }

      // Handle other error status codes
      return NextResponse.json(
        {
          error: data.error || data.detail || data.message || 'API request failed',
          ...data,
        },
        { status: response.status }
      );
    }

    console.log('✅ Returning data successfully');
    return NextResponse.json(data);
  } catch (error) {
    console.error('❌ Proxy error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  console.log('🔥 POST PROXY ROUTE HIT!');

  try {
    const searchParams = request.nextUrl.searchParams;
    const endpoint = searchParams.get('endpoint');

    if (!endpoint) {
      return NextResponse.json({ error: 'Missing endpoint parameter' }, { status: 400 });
    }

    const body = await request.json().catch(() => null);
    const cleanEndpoint = endpoint.replace(/^\/+/, '');
    const fullUrl = `${LIZEX_BASE_URL}/${cleanEndpoint}`;

    // Get Authorization header from the request
    const authHeader = request.headers.get('authorization');
    console.log('🔐 POST Authorization header from frontend:', authHeader);

    const headersToSend: Record<string, string> = {
      'Api-Key': LIZEX_API_KEY,
      Accept: '*/*',
      'Content-Type': 'application/json',
      'User-Agent': 'PostmanRuntime/7.44.1',
    };

    // Add Authorization header if present
    if (authHeader) {
      headersToSend.Authorization = authHeader;
    }

    console.log('🔑 POST Headers being sent:', JSON.stringify(headersToSend, null, 2));

    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: headersToSend,
      body: body ? JSON.stringify(body) : undefined,
    });

    const responseText = await response.text();
    let data;

    try {
      data = JSON.parse(responseText);
    } catch (e) {
      return NextResponse.json(
        { error: `Invalid JSON response - ${e}`, rawResponse: responseText },
        { status: response.status || 500 }
      );
    }

    // Check if the external API returned an error status code
    if (!response.ok) {
      console.log(`❌ POST API returned error status: ${response.status}`);

      // Handle specific error status codes
      if (response.status === 403) {
        console.log('❌ POST Permission denied (403)');
        return NextResponse.json(
          {
            error: 'Permission denied',
            detail: data.detail || 'You do not have permission to perform this action.',
            ...data,
          },
          { status: 403 }
        );
      }

      if (response.status === 401) {
        console.log('❌ POST Unauthorized (401)');
        return NextResponse.json(
          {
            error: 'Unauthorized',
            detail: data.detail || 'Authentication failed.',
            ...data,
          },
          { status: 401 }
        );
      }

      if (response.status === 404) {
        console.log('❌ POST Not Found (404)');
        return NextResponse.json(
          {
            error: 'Not Found',
            detail: data.detail || 'The requested resource was not found.',
            ...data,
          },
          { status: 404 }
        );
      }

      // Handle other error status codes
      return NextResponse.json(
        {
          error: data.error || data.detail || data.message || 'API request failed',
          ...data,
        },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('❌ POST Proxy error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
