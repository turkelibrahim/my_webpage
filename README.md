# İbrahim Türkel — Kişisel Portfolyo & AI Geliştirici Web Sitesi 🚀

Bu repository, **İbrahim Türkel**'e ait kişisel web sitesi ve portfolyo platformunun kaynak kodlarını ve Technical SEO mimarisini barındırmaktadır. 

**Canlı Site:** [ibrahimturkel.com.tr](https://ibrahimturkel.com.tr/)

---

## 👤 Geliştirici & Kişisel Kimlik (Verified Identity)

* **Adı:** İbrahim Türkel
* **Unvan / Rol:** AI Developer & Bilgisayar Mühendisliği Öğrencisi
* **Eğitim:** Ankara Bilim Üniversitesi — Bilgisayar Mühendisliği (%100 İngilizce), 3. Sınıf Öğrencisi (2022 - Günümüz)
* **Uzmanlık Alanları:** Yapay Zekâ Geliştirme, Python, Otonom Ajanlar (Autonomous Agents), Büyük Dil Modelleri (LLM), Lokal Yapay Zekâ Sistemleri (Ollama), Gemini API & NVIDIA API Entegrasyonları
* **LinkedIn:** [linkedin.com/in/ibrahim-türkel](https://linkedin.com/in/ibrahim-t%C3%BCrkel)
* **GitHub:** [github.com/turkelibrahim](https://github.com/turkelibrahim)
* **E-posta:** ibrahimturkel18@gmail.com

---

## 🎯 Hedeflenen Organik Arama Varlığı (Personal Brand & Technical SEO)

Web sitesinin mimarisi, arama motorlarında (özellikle Google) İbrahim Türkel'in gerçek akademik ve teknik kimliğini net şekilde doğrulamak ve isim çakışmalarını önlemek üzere optimize edilmiştir:
* `İbrahim Türkel`
* `İbrahim Türkel AI Developer`
* `İbrahim Türkel Artificial Intelligence`
* `İbrahim Türkel Computer Engineering`
* `İbrahim Türkel AI Projects`

---

## 🔬 Öne Çıkan Bağımsız Projeler

Projeler birbirinden bağımsız teknik mimariler ve hedefler doğrultusunda geliştirilmektedir:

### 1. `AI_COMPANY_OS`
* **Tanım:** Çoklu yapay zekâ ajanlarının (multi-agent) koordinasyonu, görev dağıtımı ve ortak bellek yönetimi üzerine tasarlanan sistem mimarisi.
* **Teknik Odak:** Python, Multi-Agent Karar Mekanizmaları, CEO Orkestrasyon Modeli, Paylaşılan Bağlam & Bellek Protokolleri, LLM Destekli Otonom Yürütme.

### 2. `Intelligent Ottoman Turkish Assistant`
* **Tanım:** Tarihi Osmanlı arşivlerini, matbu eserleri ve el yazmalarını modern Türkçeye aktarma ve analiz etme hedefine sahip bağımsız bir NLP ve yapay zekâ araştırma projesi.
* **Teknik Odak:** Belge İşleme, OCR Hata Düzeltme, Latin Harflerine Transkripsiyon, Günümüz Türkçesine Çeviri, Tarihsel Metinlerde Anlamsal (Semantic) Arama.
* **GitHub:** [turkelibrahim/INTELLIGENT-OTTOMAN-TURKISH-ASSISTANT](https://github.com/turkelibrahim/INTELLIGENT-OTTOMAN-TURKISH-ASSISTANT)

### 3. `Lokal LLM & AI Ajan Entegrasyon Çalışmaları`
* **Tanım:** Bulut bağımlılığı olmadan yerel donanımda çalışan açık kaynak LLM çıkarım (inference) ve hibrit yapay zekâ modelleri.
* **Teknik Odak:** Ollama, LM Studio, Hugging Face Transformers, Llama 3.2, Mistral, Phi-3, Gemini API, NVIDIA API.

---

## 🛠️ Technical SEO ve Sayfa Mimarisi

* **Semantik HTML5 Hiyerarşisi:** `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>` etiketleri kullanılarak açık ve taranabilir doküman ağacı oluşturulmuştur.
* **Başlık Düzeni (Heading Hierarchy):** Ana sayfada tek, açık ve kimliği tanımlayan `<h1>` etiketi yer almakta, bölümler `<h2>` ve `<h3>` hiyerarşisinde ilerlemektedir.
* **Yapılandırılmış Veri (Schema.org JSON-LD):** 
  * `ProfilePage` ve `Person` şemaları Ankara Bilim Üniversitesi (`affiliation`), `knowsAbout`, `sameAs` (GitHub & LinkedIn) alanlarıyla Google kurallarına uygun biçimde tanımlanmıştır.
* **SPA Crawler Fallback:** İlk HTML yanıtında arama motoru botlarının JavaScript çalıştırmadan doğrudan kimlik, eğitim ve projeleri okuyabilmesi için `<noscript>` semantik fallback gömülmüştür.
* **Meta Etiketleri & Sosyal Medya:** Dinamik React Helmet Async ve statik `index.html` uyumlu `title`, `meta description`, `canonical` (`https://ibrahimturkel.com.tr/`), OpenGraph (`profile`), ve Twitter Card kartları eklenmiştir.
* **Tarama Dosyaları:** `robots.txt` ve güncel tarihli `sitemap.xml` dosyaları GitHub Pages deployment yapısına (`/docs`) entegre edilmiştir.

---

## 💻 Kullanılan Teknolojiler

* **Çekirdek:** React 19, Vite
* **3D Görselleştirme:** Three.js, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`
* **Animasyon & İkonografi:** Framer Motion, Lucide React
* **SEO:** React Helmet Async, Schema.org JSON-LD
* **Çoklu Dil (i18n):** Özel hook tabanlı Türkçe & İngilizce dil desteği

---

## 🚀 Kurulum ve Yerel Çalıştırma

1. **Depoyu Klonlayın:**
   ```bash
   git clone https://github.com/turkelibrahim/my_webpage.git
   cd my_webpage
   ```

2. **Bağımlılıkları Yükleyin:**
   ```bash
   npm install
   ```

3. **Geliştirme Sunucusunu Başlatın:**
   ```bash
   npm run dev
   ```

4. **Production Build & Lint:**
   ```bash
   npm run lint
   npm run build
   ```
   *Not: Build çıktısı GitHub Pages yayını için `docs/` klasörüne derlenmektedir.*
