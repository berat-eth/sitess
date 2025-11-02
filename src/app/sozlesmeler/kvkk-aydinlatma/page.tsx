import Link from 'next/link';

export default function KvkkAydinlatmaPage() {
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
            <h1 className="text-4xl font-bold text-gray-900 mb-4">KVKK Aydınlatma Metni</h1>
            <p className="text-gray-600">6698 sayılı Kişisel Verilerin Korunması Kanunu uyarınca</p>
            <p className="text-gray-600">Son güncelleme: {new Date().toLocaleDateString('tr-TR')}</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Veri Sorumlusu</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                <strong>Mik Araştırma</strong> olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca 
                veri sorumlusu sıfatıyla kişisel verileriniz aşağıda açıklanan kapsamda işlenecektir.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="text-gray-700 font-medium mb-2">İletişim Bilgileri:</p>
                <p className="text-gray-700">Adres: Aliçetinkaya mahallesi 3076 sk no:6/6, Ayvalık, Balıkesir</p>
                <p className="text-gray-700">E-posta: info@mikarastirma.com</p>
                <p className="text-gray-700">Telefon: 0538 798 99 10</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. İşlenen Kişisel Veriler</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                İşlenen kişisel veriler kategorileri:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li><strong>Kimlik Bilgileri:</strong> Ad, soyad, T.C. kimlik numarası (gerekli durumlarda)</li>
                <li><strong>İletişim Bilgileri:</strong> E-posta adresi, telefon numarası, adres bilgisi</li>
                <li><strong>Hesap Bilgileri:</strong> Kullanıcı adı, şifre (şifrelenmiş), kullanıcı ID</li>
                <li><strong>İşlem Bilgileri:</strong> Ödeme bilgileri, sipariş geçmişi, fatura bilgileri</li>
                <li><strong>Kullanım Bilgileri:</strong> IP adresi, çerez bilgileri, tarayıcı türü, işletim sistemi</li>
                <li><strong>Proje Bilgileri:</strong> Oluşturulan projeler, raporlar, analiz sonuçları</li>
                <li><strong>Müşteri Hizmetleri:</strong> Destek talepleri, görüşmeler, yorumlar</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Kişisel Verilerin İşlenme Amaçları</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Platform hizmetlerinin sunulması ve yönetimi</li>
                <li>Kullanıcı hesaplarının oluşturulması ve yönetimi</li>
                <li>Müşteri ilişkilerinin yürütülmesi</li>
                <li>Ödeme işlemlerinin gerçekleştirilmesi</li>
                <li>Yasal yükümlülüklerin yerine getirilmesi</li>
                <li>Güvenlik önlemlerinin alınması</li>
                <li>Hizmet kalitesinin artırılması ve geliştirilmesi</li>
                <li>Pazarlama ve tanıtım faaliyetlerinin yürütülmesi (açık rıza ile)</li>
                <li>İstatistiksel analizlerin yapılması</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Kişisel Verilerin İşlenme Hukuki Sebepleri</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Kişisel verileriniz KVKK'nın 5. ve 6. maddelerinde belirtilen aşağıdaki hukuki sebeplere dayanarak işlenmektedir:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Kanunun açıkça öngördüğü durumlar</li>
                <li>Sözleşmenin kurulması veya ifasıyla doğrudan doğruya ilgili olması kaydıyla</li>
                <li>Veri sorumlusunun hukuki yükümlülüğünü yerine getirmesi</li>
                <li>İlgili kişinin kendisi tarafından alenileştirilmiş olması</li>
                <li>Bir hakkın tesisi, kullanılması veya korunması için veri işlemenin zorunlu olması</li>
                <li>İlgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla veri sorumlusunun meşru menfaatleri için işlenmesi</li>
                <li>Açık rıza (pazarlama faaliyetleri için)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Kişisel Verilerin Aktarılması</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Kişisel verileriniz, yukarıda belirtilen amaçların gerçekleştirilmesi için aşağıdaki kategorideki 
                gerçek ve tüzel kişilerle paylaşılabilir:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Yasal yükümlülüklerin yerine getirilmesi için yetkili kamu kurum ve kuruluşları</li>
                <li>Hizmet sağlayıcılar (bulut sunucu, ödeme işlemcisi, e-posta servisi vb.)</li>
                <li>İş ortakları ve tedarikçiler (yalnızca açık rıza ile)</li>
                <li>Yasal danışmanlar ve denetim firmaları</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Verileriniz yurt dışına aktarılmamaktadır. Aktarım gerekli olması halinde KVKK hükümlerine uygun olarak yapılacaktır.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Kişisel Verilerin Toplanma Yöntemi</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Kişisel verileriniz aşağıdaki yöntemlerle toplanmaktadır:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Platform üzerinden kayıt formu doldurulması</li>
                <li>Müşteri hizmetleri iletişim kanalları</li>
                <li>E-posta, telefon, sosyal medya iletişimleri</li>
                <li>Otomatik yollarla (çerezler, log dosyaları, tarayıcı bilgileri)</li>
                <li>Fiziksel ve elektronik ortamda düzenlenen etkinlikler, anketler</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. İlgili Kişinin Hakları</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                KVKK'nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                <li>İşlenen kişisel verileriniz hakkında bilgi talep etme</li>
                <li>Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
                <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
                <li>Kişisel verilerinizin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme</li>
                <li>Kişisel verilerinizin silinmesini veya yok edilmesini isteme</li>
                <li>Düzeltme, silme, yok etme işlemlerinin, verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme</li>
                <li>İşlenen verilerin münhasıran otomatik sistemler ile analiz edilmesi suretiyle kişinin kendisi aleyhine bir sonucun ortaya çıkmasına itiraz etme</li>
                <li>Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğraması hâlinde zararın giderilmesini talep etme</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Başvuru Hakkı</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Haklarınızın ihlal edildiğini düşünüyorsanız:
              </p>
              <ol className="list-decimal pl-6 text-gray-700 space-y-2 mb-4">
                <li>Öncelikle bizimle{' '}
                  <Link href="/iletisim" className="text-blue-600 hover:text-blue-700 underline">
                    iletişime
                  </Link>
                  {' '}geçerek başvurabilirsiniz</li>
                <li>Yanıt alamaz veya memnun kalmazsanız, Kişisel Verileri Koruma Kurulu'na şikayette bulunabilirsiniz</li>
              </ol>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 font-medium mb-2">Kişisel Verileri Koruma Kurulu:</p>
                <p className="text-gray-700">Web: www.kvkk.gov.tr</p>
                <p className="text-gray-700">E-posta: kvkk@kvkk.gov.tr</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Veri Güvenliği</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Kişisel verilerinizin güvenliğini sağlamak için teknik ve idari önlemler alınmaktadır:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>SSL şifreleme protokolü kullanımı</li>
                <li>Güvenlik duvarları ve erişim kontrol sistemleri</li>
                <li>Düzenli güvenlik güncellemeleri</li>
                <li>Yetkisiz erişim önleme sistemleri</li>
                <li>Personel eğitimleri ve gizlilik anlaşmaları</li>
                <li>Düzenli yedekleme ve kurtarma prosedürleri</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Veri Saklama Süresi</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Kişisel verileriniz, işlenme amacının gerektirdiği süre boyunca ve ilgili mevzuatta öngörülen saklama sürelerine 
                uygun olarak saklanmaktadır.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Veri saklama süreleri sona erdiğinde, verileriniz yasal saklama süreleri hariç silinir, yok edilir veya anonim hale getirilir.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Değişiklikler</h2>
              <p className="text-gray-700 leading-relaxed">
                Bu aydınlatma metni, yasal düzenlemelerdeki değişiklikler veya iş faaliyetlerimizdeki güncellemeler nedeniyle 
                güncellenebilir. Güncel versiyon her zaman bu sayfada yayınlanmaktadır.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. İletişim</h2>
              <p className="text-gray-700 leading-relaxed">
                KVKK kapsamındaki haklarınızı kullanmak veya sorularınız için{' '}
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

