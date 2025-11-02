'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { subscriptionPlans, SubscriptionPlan } from '@/data/subscriptionData';

interface SubscriptionCardProps {
  plan: SubscriptionPlan;
  onSelect: (planId: string) => void;
  selected: boolean;
}

const SubscriptionCard = ({ plan, onSelect, selected }: SubscriptionCardProps) => {
  return (
    <div
      className={`relative bg-white rounded-lg border-2 p-6 transition-all duration-200 cursor-pointer ${
        selected 
          ? 'border-blue-600 shadow-md' 
          : plan.popular
          ? 'border-blue-300 shadow-sm'
          : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={() => onSelect(plan.id)}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
            En Popüler
          </span>
        </div>
      )}
      
      <div className="text-center mb-6 pt-2">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
        <div className="flex items-baseline justify-center">
          <span className="text-4xl font-bold text-gray-900">₺{plan.price}</span>
          <span className="text-gray-500 ml-2">/ay</span>
        </div>
      </div>

      <ul className="space-y-3 mb-6">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <svg className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-gray-700 text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onSelect(plan.id);
        }}
        className={`w-full py-3 rounded-lg font-medium transition-colors duration-200 ${
          selected
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : plan.popular
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
        }`}
      >
        {selected ? 'Seçildi' : 'Planı Seç'}
      </button>
    </div>
  );
};

type Step = 'plan' | 'personal' | 'payment' | 'review';

export default function SubscriptionPage() {
  const [currentStep, setCurrentStep] = useState<Step>('plan');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolderName: ''
  });

  const steps: { id: Step; title: string }[] = [
    { id: 'plan', title: 'Plan Seçimi' },
    { id: 'personal', title: 'Kişisel Bilgiler' },
    { id: 'payment', title: 'Ödeme Bilgileri' },
    { id: 'review', title: 'Özet' }
  ];

  const currentStepIndex = steps.findIndex(s => s.id === currentStep);

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    setTimeout(() => setCurrentStep('personal'), 300);
  };

  const handleNext = () => {
    if (currentStep === 'personal') {
      setCurrentStep('payment');
    } else if (currentStep === 'payment') {
      setCurrentStep('review');
    }
  };

  const handleBack = () => {
    if (currentStep === 'personal') {
      setCurrentStep('plan');
    } else if (currentStep === 'payment') {
      setCurrentStep('personal');
    } else if (currentStep === 'review') {
      setCurrentStep('payment');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData({ ...formData, cardNumber: formatted });
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    setFormData({ ...formData, expiryDate: formatted });
  };

  const isPersonalFormValid = formData.name && formData.email && formData.phone;
  const isPaymentFormValid = formData.cardHolderName && formData.cardNumber && formData.expiryDate && formData.cvv;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPlan) {
      alert('Lütfen bir plan seçiniz');
      return;
    }

    setIsProcessing(true);

    try {
      const response = await fetch('/api/subscriptions/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId: selectedPlan,
          ...formData,
          cardNumber: formData.cardNumber.replace(/\s/g, '')
        }),
      });

      const data = await response.json();

      if (response.ok && data.checkoutFormContent) {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = data.checkoutFormAction;
        form.innerHTML = data.checkoutFormContent;
        document.body.appendChild(form);
        form.submit();
      } else {
        alert(data.error || 'Ödeme işlemi başlatılamadı');
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Subscription error:', error);
      alert('Bir hata oluştu. Lütfen tekrar deneyiniz.');
      setIsProcessing(false);
    }
  };

  const selectedPlanData = subscriptionPlans.find(p => p.id === selectedPlan);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Abonelik Planları
          </h1>
          <p className="text-gray-600">
            Adım adım abonelik oluşturun
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors duration-200 ${
                    index <= currentStepIndex
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'bg-white border-gray-300 text-gray-400'
                  }`}>
                    {index < currentStepIndex ? (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span className="font-semibold">{index + 1}</span>
                    )}
                  </div>
                  <span className={`mt-2 text-xs font-medium ${
                    index <= currentStepIndex ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 ${
                    index < currentStepIndex ? 'bg-blue-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <AnimatePresence mode="wait">
            {/* Step 1: Plan Selection */}
            {currentStep === 'plan' && (
              <motion.div
                key="plan"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6">Planınızı Seçin</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {subscriptionPlans.map((plan) => (
                    <SubscriptionCard
                      key={plan.id}
                      plan={plan}
                      onSelect={handlePlanSelect}
                      selected={selectedPlan === plan.id}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Personal Information */}
            {currentStep === 'personal' && (
              <motion.div
                key="personal"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6">Kişisel Bilgiler</h2>
                
                {selectedPlanData && (
                  <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-gray-600">Seçilen Plan</p>
                    <p className="text-lg font-semibold text-gray-900">{selectedPlanData.name} - ₺{selectedPlanData.price}/ay</p>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Ad Soyad *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Adınız Soyadınız"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      E-posta *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="ornek@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Telefon *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="05XX XXX XX XX"
                    />
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Geri
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!isPersonalFormValid}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Devam Et
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Payment Information */}
            {currentStep === 'payment' && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6">Ödeme Bilgileri</h2>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="cardHolderName" className="block text-sm font-medium text-gray-700 mb-1">
                      Kart Üzerindeki İsim *
                    </label>
                    <input
                      type="text"
                      id="cardHolderName"
                      name="cardHolderName"
                      required
                      value={formData.cardHolderName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Kart üzerindeki isim"
                    />
                  </div>

                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Kart Numarası *
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      required
                      value={formData.cardNumber}
                      onChange={handleCardNumberChange}
                      maxLength={19}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Son Kullanma *
                      </label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        required
                        value={formData.expiryDate}
                        onChange={handleExpiryDateChange}
                        maxLength={5}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="MM/YY"
                      />
                    </div>

                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                        CVV *
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        required
                        value={formData.cvv}
                        onChange={handleInputChange}
                        maxLength={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 bg-blue-50 border border-blue-200 rounded-md p-4 flex items-start">
                  <svg className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <p className="text-sm text-gray-700">
                    Ödeme işlemi SSL ile şifrelenir ve iyzico güvenli ödeme altyapısı üzerinden işlenir.
                  </p>
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Geri
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!isPaymentFormValid}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Devam Et
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Review */}
            {currentStep === 'review' && (
              <motion.div
                key="review"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6">Özet</h2>

                <div className="space-y-6">
                  {/* Plan Summary */}
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-3">Plan Bilgileri</h3>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{selectedPlanData?.name}</span>
                      <span className="font-semibold text-gray-900">₺{selectedPlanData?.price}/ay</span>
                    </div>
                  </div>

                  {/* Personal Info Summary */}
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-3">Kişisel Bilgiler</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Ad Soyad:</span>
                        <span className="text-gray-900">{formData.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">E-posta:</span>
                        <span className="text-gray-900">{formData.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Telefon:</span>
                        <span className="text-gray-900">{formData.phone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Summary */}
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-3">Ödeme Bilgileri</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Kart:</span>
                        <span className="text-gray-900">**** **** **** {formData.cardNumber.slice(-4)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Son Kullanma:</span>
                        <span className="text-gray-900">{formData.expiryDate}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="mt-8">
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Geri
                    </button>
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="px-8 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                      {isProcessing ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          İşleniyor...
                        </>
                      ) : (
                        `₺${selectedPlanData?.price} ile Ödemeyi Tamamla`
                      )}
                    </button>
                  </div>
                </form>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Kart bilgileriniz kaydedilmemektedir. İstediğiniz zaman aboneliğinizi iptal edebilirsiniz.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
