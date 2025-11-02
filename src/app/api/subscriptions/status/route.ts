import { NextRequest, NextResponse } from 'next/server';
import { mockSubscriptions } from '@/data/subscriptionData';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    const subscriptionId = searchParams.get('subscriptionId');

    if (!userId && !subscriptionId) {
      return NextResponse.json(
        { error: 'userId veya subscriptionId gereklidir' },
        { status: 400 }
      );
    }

    // In production, fetch from database
    let subscription;
    
    if (subscriptionId) {
      subscription = mockSubscriptions.find(s => s.id === subscriptionId);
    } else if (userId) {
      subscription = mockSubscriptions.find(s => s.userId === userId);
    }

    if (!subscription) {
      return NextResponse.json(
        { error: 'Abonelik bulunamadı' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      subscription: subscription
    });

  } catch (error: any) {
    console.error('Subscription status error:', error);
    return NextResponse.json(
      { error: 'Bir hata oluştu', details: error.message },
      { status: 500 }
    );
  }
}

