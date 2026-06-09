# MİD-DEC | Omuz Distosisi Risk Öngörü Sistemi (Web & PWA)

MİD-DEC, klinik profesyonelleri (hekimler, ebeler ve hemşireler) için omuz distosisi riskini doğum öncesinde öngörmek ve doğum sonrasında ciddiyet kategorisini derecelendirmek amacıyla geliştirilmiş tıbbi bir karar destek aracıdır.

Bu depo, MİD-DEC mobil uygulamasının web arayüzünü, tanıtım/açılış sayfasını, interaktif demo hesaplayıcılarını ve PWA (İlerici Web Uygulaması) dağıtım dosyalarını içermektedir.

---

## 🌟 Özellikler

- **Çift Modlu İnteraktif Hesaplayıcı (Demo):**
  - **Doğum Öncesi (Pre-Birth):** BMI, tahmini fetal ağırlık (Warsof EFW formülü), AC/BPD oranları ve obstetrik geçmiş faktörlerine dayalı omuz distosisi risk yüzdesi hesaplama.
  - **Doğum Sonrası (Post-Birth):** APGAR skorları, neonatal bulgular ve maternal komplikasyon parametrelerine dayanarak omuz distosisi ciddiyet derecesini (Hafif, Orta, Ağır) sınıflandırma.
- **PWA (Progressive Web App) Desteği:**
  - Mobil cihazlarda ve tarayıcılarda ana ekrana eklenebilir, standalone (uygulama gibi) modda çalışabilir.
  - Çevrimdışı (offline) önbellekleme desteği sunan kayıtlı Servis Yönlendirici (`sw.js`) entegrasyonu.
- **Çift Dil Desteği:** Türkçe ve İngilizce dilleri arasında dinamik ve anlık geçiş imkanı.
- **Tıbbi Sorumluluk Reddi (Disclaimer):** Tüm klinik karar destek araçlarında olması gereken medikal sorumluluk beyanını içerir.

---

## 🚀 Yerel Önizleme ve Çalıştırma

Bu depo tamamen statik istemci taraflı (client-side) dosyalardan oluşmaktadır. Bilgisayarınızda test etmek için herhangi bir statik web sunucusu kullanabilirsiniz.

### 1. Seçenek: Node.js (npx) ile Çalıştırma
Bilgisayarınızda Node.js yüklüyse, hiçbir paket yüklemeden doğrudan şu komutu çalıştırabilirsiniz:
```bash
npx -y serve .
```

### 2. Seçenek: Python ile Çalıştırma
Sisteminizde Python yüklüyse, şu komutla anında yerel sunucu başlatabilirsiniz:
```bash
# Python 3
python3 -m http.server 3000

# Python 2
python -m SimpleHTTPServer 3000
```
Ardından tarayıcınızdan `http://localhost:3000` adresine giderek uygulamayı test edebilirsiniz.

---

## 🌐 GitHub Pages Üzerinde Yayınlama

Bu deponun GitHub Pages üzerinden sunumu için aşağıdaki adımları izleyebilirsiniz:

1. Depo ayarlarından **Settings -> Pages** sekmesine gidin.
2. **Build and deployment** başlığı altındaki **Source** alanında `Deploy from a branch` seçeneğini belirleyin.
3. **Branch** kısmında `main` (veya yayınlamak istediğiniz dalı) seçip dizin olarak `/ (root)` seçeneğini işaretleyin ve **Save** butonuna tıklayın.
4. Birkaç dakika içinde web siteniz `https://<kullanici-adi>.github.io/<depo-adi>/` adresinde yayına alınacaktır.

---

## 🛠️ Teknik Bilgiler

Bu depo içerisindeki `index.html` ve JS paketleri, ana React Native / Expo projesinin `npm run build` komutuyla derlenip ardından `scripts/patch-pwa.js` scripti ile optimize edilmiş çıktılarıdır. 

### PWA ve Servis Yönlendirici Yapısı
- **`manifest.json`**: Uygulamanın mobil cihazlarda ve masaüstünde yüklenebilir bir uygulama simgesi olarak tanınmasını sağlar. Bağıl (relative) yollar kullanılarak GitHub Pages alt dizin yapılarına uyumlu hale getirilmiştir.
- **`register-service-worker.js`**: Sayfa yüklendiğinde servis yönlendiriciyi arka planda kaydeder.
- **`sw.js`**: Uygulamanın temel statik varlıklarını (logo, manifest, HTML vb.) tarayıcı önbelleğinde saklayarak hızlı yüklenmesini sağlar.