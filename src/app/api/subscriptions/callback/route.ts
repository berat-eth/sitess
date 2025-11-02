import { NextRequest, NextResponse } from 'next/server';

// iyzico configuration - use dynamic import for CommonJS module
let iyzipay: any;
let Iyzipay: any;

async function getIyzipay() {
  if (!Iyzipay) {
    const iyzipayModule = await import('iyzipay');
    Iyzipay = iyzipayModule.default || iyzipayModule;
    iyzipay = new Iyzipay({
      apiKey: process.env.IYZICO_API_KEY || 'sandbox-api-key',
      secretKey: process.env.IYZICO_SECRET_KEY || 'sandbox-secret-key',
      uri: process.env.IYZICO_URI || 'https://sandbox-api.iyzipay.com'
    });
  }
  return iyzipay;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { token, conversationId, status } = body;

    if (!token || !conversationId) {
      return NextResponse.json(
        { error: 'Geçersiz callback verisi' },
        { status: 400 }
      );
    }

    const iyzipayInstance = await getIyzipay();

    // Retrieve payment result from iyzico
    const retrieveRequest = {
      locale: 'tr',
      conversationId: conversationId,
      token: token
    };

    return new Promise<NextResponse>((resolve) => {
      iyzipayInstance.payment.retrieve(retrieveRequest, (err: any, result: any) => {
        if (err) {
          console.error('iyzico Callback Error:', err);
          resolve(NextResponse.redirect(
            new URL(`/dashboard/abonelik/hata?error=${encodeURIComponent(err.message)}`, request.url)
          ));
          return;
        }

        if (result.status === 'success' && result.paymentStatus === 'SUCCESS') {
          // Payment successful - Save subscription to database
          // In production, save subscription here:
          // - Create subscription record
          // - Update user subscription status
          // - Send confirmation email
          // - Log payment history

          resolve(NextResponse.redirect(
            new URL(`/dashboard/abonelik/basarili?paymentId=${result.paymentId}`, request.url)
          ));
        } else {
          // Payment failed
          resolve(NextResponse.redirect(
            new URL(`/dashboard/abonelik/hata?error=${encodeURIComponent(result.errorMessage || 'Ödeme başarısız')}`, request.url)
          ));
        }
      });
    });

  } catch (error: any) {
    console.error('Subscription callback error:', error);
    return NextResponse.redirect(
      new URL('/dashboard/abonelik/hata', request.url)
    );
  }
}

// Also handle GET requests (in case iyzico redirects)
export async function GET(request: NextRequest): Promise<NextResponse> {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get('token');
  const conversationId = searchParams.get('conversationId');

  if (!token || !conversationId) {
    return NextResponse.redirect(
      new URL('/dashboard/abonelik/hata', request.url)
    );
  }

  const iyzipayInstance = await getIyzipay();

  // Retrieve payment result
  const retrieveRequest = {
    locale: 'tr',
    conversationId: conversationId,
    token: token
  };

  return new Promise<NextResponse>((resolve) => {
    iyzipayInstance.payment.retrieve(retrieveRequest, (err: any, result: any) => {
      if (err || result.status !== 'success' || result.paymentStatus !== 'SUCCESS') {
        resolve(NextResponse.redirect(
          new URL('/dashboard/abonelik/hata', request.url)
        ));
        return;
      }

      // Payment successful
      resolve(NextResponse.redirect(
        new URL(`/dashboard/abonelik/basarili?paymentId=${result.paymentId}`, request.url)
      ));
    });
  });
}

