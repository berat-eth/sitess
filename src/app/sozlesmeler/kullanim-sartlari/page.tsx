import Link from 'next/link';

export default function KullanimSartlariPage() {
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Kullanım Şartları</h1>
            <p className="text-gray-600">Son güncelleme: {new Date().toLocaleDateString('tr-TR')}</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Genel Hükümler</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Bu kullanım şartları, Mik Araştırma platformunu kullanırken geçerli olacak tüm hak ve yükümlülükleri belirlemektedir. 
                Platforma kayıt olarak veya platformu kullanarak bu şartları kabul etmiş sayılırsınız.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Platform, araştırma hizmetleri sunmak amacıyla tasarlanmıştır. Kullanıcılar, platformu yalnızca yasal amaçlar için 
                kullanabilir ve platformun işleyişini bozmaya yönelik herhangi bir faaliyetten kaçınmalıdır.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Hesap Güvenliği</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Kullanıcılar, hesap bilgilerinin gizliliğinden sorumludur. Şifrenizi güvenli tutmalı ve başkalarıyla paylaşmamalısınız.
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Güçlü ve benzersiz bir şifre seçmelisiniz</li>
                <li>Şifrenizi düzenli olarak değiştirmelisiniz</li>
                <li>Hesabınızda şüpheli bir aktivite fark ederseniz derhal bize bildirmelisiniz</li>
                <li>Hesabınızın güvenliğinden tamamen sorumlusunuz</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Kullanıcı Yükümlülükleri</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Platformu kullanırken aşağıdaki kurallara uymalısınız:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Doğru, güncel ve eksiksiz bilgi sağlamalısınız</li>
                <li>Başkalarının haklarını ihlal edecek içerik paylaşmamalısınız</li>
                <li>Yasa dışı faaliyetlerde bulunmamalısınız</li>
                <li>Sistemin güvenliğini tehdit edecek işlemler yapmamalısınız</li>
                <li>Diğer kullanıcıları rahatsız edecek davranışlarda bulunmamalısınız</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Hizmet Kullanımı</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Platform üzerinden sunulan araştırma hizmetleri, profesyonel amaçlarla kullanılmak üzere tasarlanmıştır.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Hizmetlerden yararlanırken:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Sunduğumuz hizmetlerin tarifesine ve kullanım koşullarına uymalısınız</li>
                <li>API kullanım limitlerine uymalısınız</li>
                <li>Otomatik sistemler veya botlar kullanıyorsanız bunu önceden bildirmelisiniz</li>
                <li>Hizmetlerin ticari kullanımı için gerekli izinleri almalısınız</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Fikri Mülkiyet Hakları</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Platform üzerindeki tüm içerikler, tasarımlar, yazılımlar ve markalar Mik Araştırma'ya aittir ve telif hakları ile korunmaktadır.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Platform içeriğini izin almadan kopyalayamaz, dağıtamaz veya ticari amaçlarla kullanamazsınız.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Hizmet Kesintileri</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Teknik bakım, güncelleme veya beklenmeyen durumlar nedeniyle hizmetlerimiz geçici olarak kesintiye uğrayabilir. 
                Bu durumlardan kaynaklanan sorumluluğumuz bulunmamaktadır.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Hesap İptali</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Hesabınızı istediğiniz zaman iptal edebilirsiniz. Ancak:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Devam eden projelerin durumu hakkında bilgilendirileceksiniz</li>
                <li>Ödenmemiş faturalar varsa bunlar tahsil edilecektir</li>
                <li>Hesap iptali geri alınamaz</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Değişiklikler</h2>
              <p className="text-gray-700 leading-relaxed">
                Bu kullanım şartlarını istediğimiz zaman değiştirme hakkını saklı tutarız. Önemli değişiklikler durumunda 
                kullanıcıları e-posta ile bilgilendireceğiz. Değişikliklerden sonra platformu kullanmaya devam ederseniz, 
                yeni şartları kabul etmiş sayılırsınız.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Sorumluluk Sınırlamaları</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Platform "olduğu gibi" sunulmaktadır. Hizmetlerimizin kesintisiz, hatasız veya güvenli olacağını garanti etmiyoruz.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Platformun kullanımından kaynaklanan herhangi bir zarardan sorumlu tutulamayız.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. İletişim</h2>
              <p className="text-gray-700 leading-relaxed">
                Kullanım şartları ile ilgili sorularınız için bizimle{' '}
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

