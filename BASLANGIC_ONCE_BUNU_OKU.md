# İbrahim Türkel Portfolio — V6

Bu paket, önceki önizleme klasörlerinden bağımsız yeni bir sürümdür. Ana sayfa yapısı yeniden düzenlendi; önceki yerel sunucuyla karışmaması için V6 varsayılan olarak `5175` portunu kullanır.

## Windows'ta çalıştırma

1. Bu ZIP dosyasını **yeni ve ayrı bir klasöre** çıkart. Eski V4/V5 klasörünün üzerine yazma.
2. `start.bat` dosyasına çift tıkla.
3. Tarayıcıda **http://127.0.0.1:5175** adresini aç.

Alternatif olarak proje klasöründe terminal açıp `node scripts/serve.mjs . 5175` komutunu çalıştırabilirsin. Harici paket kurmana gerek yoktur.

## V6'da gözle görülür tasarım değişiklikleri

- Büyük dikey portre hero düzeni kaldırıldı. Gerçek profil fotoğrafı 300×220 px yatay kart olarak kullanılır.
- Ana sayfa başlığı tek satıra yaklaştırıldı; kısa açıklama ve iki net eylem eklendi.
- Odak alanları 3 ayrı renkli yatay kutuda gösterilir.
- Öne çıkan projeler ana girişin hemen altına taşındı; masaüstünde üç sütunlu kart düzeni bulunur.
- Hakkımda, yetkinlikler, deneyim, sertifikalar ve iletişim bölümleri birbirinden farklı ama yumuşak renk yüzeyleriyle ayrılır.
- Tam isimli wordmark ve açıkça seçilen aktif navigasyon bağlantısı kullanılır.
- Üst ilerleme çizgisi ve o anki bölüm etiketi kaydırma sırasında güncellenir.
- Menü tıklamaları sabit header yüksekliğini tek bir hesapla dikkate alır; tarayıcı geri/ileri hareketi desteklenir.
- Mobil menü, kartlar ve sütunlar küçük ekranlara uyarlanır.

## Üretim / GitHub Pages

```bash
npm run build
npm run preview
```

`docs/` klasörü yayın çıktısıdır. Önizleme `http://127.0.0.1:4176` adresinde açılır.

## Önemli notlar

- Bu paket canlı web sitesine otomatik yükleme yapmaz.
- İletişim formu, endpoint yapılandırılmadıysa kullanıcının e-posta uygulamasında taslak açar. Gerçek web gönderimi için `public/contact-config.js` dosyasına form servis endpoint'i eklenmelidir.
- Gizli tutulması istenen proje site içeriğine, proje kartlarına ve GitHub bağlantılarına eklenmemiştir.
- İçeriklerde yalnızca kaynak ZIP ve kullanıcı tarafından doğrulanmış bilgiler esas alınmıştır.
