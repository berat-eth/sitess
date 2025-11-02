import { NextRequest, NextResponse } from 'next/server';
import { subscriptionPlans } from '@/data/subscriptionData';

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
    const { planId, name, email, phone, cardNumber, expiryDate, cvv, cardHolderName } = body;

    // Validate plan
    const plan = subscriptionPlans.find(p => p.id === planId);
    if (!plan) {
      return NextResponse.json(
        { error: 'Geçersiz plan seçildi' },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!name || !email || !phone || !cardNumber || !expiryDate || !cvv || !cardHolderName) {
      return NextResponse.json(
        { error: 'Tüm alanlar doldurulmalıdır' },
        { status: 400 }
      );
    }

    // Parse expiry date
    const [expiryMonth, expiryYear] = expiryDate.split('/');
    const expiryYearFull = `20${expiryYear}`;

    // Generate unique conversation ID
    const conversationId = `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Create payment request
    const paymentRequest = {
      locale: 'tr',
      conversationId: conversationId,
      price: plan.price.toString(),
      paidPrice: plan.price.toString(),
      currency: 'TRY',
      basketId: `BASKET_${conversationId}`,
      paymentCard: {
        cardHolderName: cardHolderName,
        cardNumber: cardNumber.replace(/\s/g, ''),
        expireMonth: expiryMonth,
        expireYear: expiryYearFull,
        cvc: cvv,
        registerCard: '0'
      },
      buyer: {
        id: `BUYER_${Date.now()}`,
        name: name,
        surname: name.split(' ')[1] || '',
        gsmNumber: phone,
        email: email,
        identityNumber: '11111111111', // In production, get from user
        lastLoginDate: new Date().toISOString().split('T')[0],
        registrationDate: new Date().toISOString().split('T')[0],
        registrationAddress: 'N/A',
        ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '127.0.0.1',
        city: 'Istanbul',
        country: 'Turkey',
        zipCode: '34000'
      },
      shippingAddress: {
        contactName: name,
        city: 'Istanbul',
        country: 'Turkey',
        address: 'N/A',
        zipCode: '34000'
      },
      billingAddress: {
        contactName: name,
        city: 'Istanbul',
        country: 'Turkey',
        address: 'N/A',
        zipCode: '34000'
      },
      basketItems: [
        {
          id: `BI${planId}`,
          name: plan.name,
          category1: 'Abonelik',
          category2: 'Aylık Plan',
          itemType: 'VIRTUAL',
          price: plan.price.toString()
        }
      ],
      callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/subscriptions/callback`
    };

    // Make payment request to iyzico
    const iyzipayInstance = await getIyzipay();
    
    return new Promise<NextResponse>((resolve) => {
      iyzipayInstance.payment.create(paymentRequest, (err: any, result: any) => {
        if (err) {
          console.error('iyzico Payment Error:', err);
          resolve(NextResponse.json(
            { error: 'Ödeme işlemi başlatılamadı', details: err.message },
            { status: 500 }
          ));
          return;
        }

        if (result.status === 'success') {
          // Payment successful
          // In production, save subscription to database here
          resolve(NextResponse.json({
            success: true,
            paymentId: result.paymentId,
            conversationId: conversationId,
            status: result.status,
            message: 'Ödeme başarıyla tamamlandı'
          }));
        } else {
          // Payment failed
          resolve(NextResponse.json(
            {
              error: 'Ödeme işlemi başarısız',
              errorMessage: result.errorMessage,
              status: result.status
            },
            { status: 400 }
          ));
        }
      });
    });

  } catch (error: any) {
    console.error('Subscription creation error:', error);
    return NextResponse.json(
      { error: 'Bir hata oluştu', details: error.message },
      { status: 500 }
    );
  }
}

