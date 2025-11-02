declare module 'iyzipay' {
  export interface IyzipayConfig {
    apiKey: string;
    secretKey: string;
    uri: string;
  }

  export interface PaymentRequest {
    locale?: string;
    conversationId?: string;
    price?: string;
    paidPrice?: string;
    currency?: string;
    basketId?: string;
    paymentCard?: any;
    buyer?: any;
    shippingAddress?: any;
    billingAddress?: any;
    basketItems?: any[];
    callbackUrl?: string;
  }

  export interface Iyzipay {
    payment: {
      create(request: PaymentRequest, callback: (err: any, result: any) => void): void;
      retrieve(request: any, callback: (err: any, result: any) => void): void;
    };
  }

  class IyzipayClass implements Iyzipay {
    constructor(config: IyzipayConfig);
    payment: {
      create(request: PaymentRequest, callback: (err: any, result: any) => void): void;
      retrieve(request: any, callback: (err: any, result: any) => void): void;
    };
  }

  export default IyzipayClass;
}

