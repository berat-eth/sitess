import Link from 'next/link';

export default function GizlilikPolitikasiPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="mb-8">
            <Link
              href="/login"
              className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center mb-6"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Geri Dön
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Gizlilik Politikası</h1>
            <p className="text-gray-600">Son güncelleme: {new Date().toLocaleDateString('tr-TR')}</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Giriş</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Mik Araştırma olarak, kullanıcılarımızın gizliliğini korumaya büyük önem veriyoruz. Bu gizlilik politikası, 
                kişisel bilgilerinizin nasıl toplandığını, kullanıldığını, paylaşıldığını ve korunduğunu açıklamaktadır.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Bu politikayı kabul ederek, bilgilerinizin bu politika kapsamında işlenmesine izin vermiş olursunuz.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Toplanan Bilgiler</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Aşağıdaki bilgileri topluyoruz:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li><strong>Kişisel Bilgiler:</strong> Ad, soyad, e-posta adresi, telefon numarası</li>
                <li><strong>Hesap Bilgileri:</strong> Kullanıcı adı, şifre (şifrelenmiş olarak saklanır)</li>
                <li><strong>Kullanım Bilgileri:</strong> IP adresi, tarayıcı türü, işletim sistemi, sayfa görüntüleme verileri</li>
                <li><strong>Proje Bilgileri:</strong> Oluşturduğunuz projeler, raporlar ve analizler</li>
                <li><strong>Ödeme Bilgileri:</strong> Ödeme işlemleri için gerekli bilgiler (kredi kartı bilgileri doğrudan saklanmaz)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Bilgilerin Kullanım Amacı</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Toplanan bilgileriniz aşağıdaki amaçlarla kullanılmaktadır:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Platform hizmetlerini sağlamak ve iyileştirmek</li>
                <li>Kullanıcı hesaplarını yönetmek</li>
                <li>Müşteri desteği sağlamak</li>
                <li>Ödeme işlemlerini gerçekleştirmek</li>
                <li>Yasal yükümlülükleri yerine getirmek</li>
                <li>Güvenlik önlemleri almak</li>
                <li>Kullanıcı deneyimini geliştirmek için analiz yapmak</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Bilgilerin Paylaşımı</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Kişisel bilgilerinizi aşağıdaki durumlar dışında üçüncü taraflarla paylaşmıyoruz:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Yasal zorunluluklar gereği</li>
                <li>Güvenlik amaçlı olarak</li>
                <li>Hizmet sağlayıcılarımız (bulut sunucu, ödeme işlemcisi vb.) - yalnızca hizmet sağlama amaçlı</li>
                <li>İş ortaklarımız - yalnızca açıkça izin verdiğiniz durumlarda</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Veri Güvenliği</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Bilgilerinizin güvenliğini sağlamak için:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>SSL şifreleme kullanıyoruz</li>
                <li>Şifreler hash'lenerek saklanıyor</li>
                <li>Düzenli güvenlik güncellemeleri yapıyoruz</li>
                <li>Erişim kontrolü ve izleme sistemleri kuruyoruz</li>
                <li>Düzenli yedekleme yapıyoruz</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Ancak hiçbir veri aktarım yöntemi veya elektronik depolama sistemi %100 güvenli değildir.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Çerezler (Cookies)</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Platform, kullanıcı deneyimini geliştirmek için çerezler kullanmaktadır. Çerez türleri:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li><strong>Zorunlu Çerezler:</strong> Platformun çalışması için gerekli</li>
                <li><strong>Analitik Çerezler:</strong> Kullanım istatistikleri için</li>
                <li><strong>Fonksiyonel Çerezler:</strong> Kullanıcı tercihlerini hatırlamak için</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Tarayıcı ayarlarınızdan çerezleri kontrol edebilirsiniz, ancak bu durumda bazı özellikler çalışmayabilir.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Kullanıcı Hakları</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                KVKK kapsamında aşağıdaki haklara sahipsiniz:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                <li>İşlenen verileriniz hakkında bilgi talep etme</li>
                <li>Verilerinizin düzeltilmesini talep etme</li>
                <li>Verilerinizin silinmesini talep etme</li>
                <li>Verilerinizin üçüncü taraflara aktarılmasını önleme</li>
                <li>Verilerinize itiraz etme</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Veri Saklama</h2>
              <p className="text-gray-700 leading-relaxed">
                Kişisel verileriniz, hesabınız aktif olduğu sürece veya yasal saklama süreleri boyunca saklanmaktadır. 
                Hesabınızı sildiğinizde veya veri silme talebinde bulunduğunuzda, verileriniz yasal saklama süreleri hariç silinecektir.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Politika Değişiklikleri</h2>
              <p className="text-gray-700 leading-relaxed">
                Bu gizlilik politikasını güncelleyebiliriz. Önemli değişiklikler durumunda e-posta ile bilgilendirileceksiniz. 
                Güncel politika her zaman bu sayfada yayınlanmaktadır.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. İletişim</h2>
              <p className="text-gray-700 leading-relaxed">
                Gizlilik politikası ile ilgili sorularınız veya haklarınızı kullanmak için{' '}
                <Link href="/iletisim" className="text-blue-600 hover:text-blue-700 underline">
                  iletişime
                </Link>
                {' '}geçebilirsiniz.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

