import React from 'react';
import { Box, Lightbulb, Settings, CheckCircle, MapPin, Mail, Phone } from 'lucide-react';
import { motion } from 'motion/react';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRR_xoqR1VGXcw1BpZV_Kr-66cZRylOCBOdHnSYQS0PVrD7oMHE6_4F1ihkL6lXi2O6qRL9T3asMoTbKulDaM5x3UG4W0nSYAd2yIXucQ7MFLnbtKXNSgt-exrvPjmtiKVXGgMFBm2OablUs6Uz_lDzRpwC9QwbvOfhdEpvasbqpGBpkmdpvVNIpBCl0iXnQX-dS70qFSkcObNXPuhmSV72DQfKpD--XroXpPB6N2xl_FMj4N0gT23X9h8wrZSfa3DdHrxRsS2DkKH" 
            alt="3D Printer" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 hero-gradient"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
              3D MURAT:<br />
              <span className="text-brand-orange">Geleceği Şekillendiriyoruz</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed">
              Endüstriyel kalitede 3D baskı çözümleri, hassas prototipleme ve dayanıklı yedek parça üretimi ile fikirlerinizi gerçeğe dönüştürüyoruz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/teklif-al" className="px-8 py-4 bg-brand-orange hover:bg-orange-600 text-white font-bold rounded-lg transition-all text-center">
                Hemen Teklif Al
              </a>
              <a href="/hizmetler" className="px-8 py-4 border border-white/20 hover:bg-white/10 text-white font-bold rounded-lg transition-all text-center">
                Hizmetlerimizi İnceleyin
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-brand-orange font-bold tracking-widest uppercase text-sm mb-2">Uzmanlık Alanlarımız</h2>
            <p className="text-4xl font-extrabold">Üretim Çözümlerimiz</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceCard 
              icon={<Box size={32} />}
              title="3D Baskı (FDM & SLA)"
              description="Geniş filament yelpazesi ve hassas reçine baskı teknolojileri ile her türlü ihtiyaca uygun yüksek kaliteli üretim."
            />
            <ServiceCard 
              icon={<Lightbulb size={32} />}
              title="Hızlı Prototipleme"
              description="Ürün geliştirme süreçlerinizi hızlandırın. Tasarımlarınızı birkaç gün içinde fiziksel modellere dönüştürüyoruz."
            />
            <ServiceCard 
              icon={<Settings size={32} />}
              title="Özel Yedek Parça"
              description="Artık üretilmeyen veya temini zor olan endüstriyel parçaları, yüksek mukavemetli malzemelerle yeniden üretiyoruz."
            />
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-brand-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-brand-orange font-bold tracking-widest uppercase text-sm mb-2">Çalışmalarımız</h2>
              <p className="text-4xl font-extrabold">Üretim Galerisi</p>
            </div>
            <div className="hidden md:block">
              <p className="text-gray-400 max-w-xs text-right">Farklı endüstriler için ürettiğimiz bazı örnek parçalar.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <GalleryItem 
              img="https://lh3.googleusercontent.com/aida-public/AB6AXuDeHQt-cYz6i2lV5FzqcPKSRW2vM4jHwuAiRcB7h6BDWSG51AepdThVrS9gWVAQ1kdHmwO4scG3pZjEGaXV0ZH0nQiz0K71EG2Wx2cettChPtcR8MFf05rnoCLMbAkzRunLZihH-KMus2yojdDxd9qWghg3dDQSKQtbE5RuRaLfZ0ttPWMDE3U0qNzlfH4DywfzucQ1hk9NTQF2Jnvj5MIE3JUayHo6ZgX3AGjTqJVOhBjyqmzBJsyI8wWGRSFy7-kMF9COwEP0mqBi"
              title="Endüstriyel Dişli"
            />
            <GalleryItem 
              img="https://lh3.googleusercontent.com/aida-public/AB6AXuD9THJnvB1n_Fj_8DQ6IFJmP3TIeSaT2sgwgA7_TK9ietYBdoeMpU8OTszTFbVbxu_BO1JQLkuYGgbM-uxSTsRiKJH5iM4eHWvzExQKEGnKPgs8GwtaFzjHvP917SRY1NhcOuD9KpwXRUcRm6Y5EnvRDw1xLz2yB5oMDiUGqOROjqvbzgQMNnvxE32KrFy8AcoxDtxUQqGC8-P7PVK-FI1UXRTcBoT35vuQtqu7zbIshG_LtSDOXW5ikvCY5pQCQldnfoLYvnhtq_GG"
              title="Kompleks Prototip"
            />
            <GalleryItem 
              img="https://lh3.googleusercontent.com/aida-public/AB6AXuDbTPaQiJup4VdeRaQyocUvLSLM0s3aD_WT0emIBhrm1VZXQBIk4NlXp2RzCGM6TMnY73QOy4ijpy58QDbV6P5sEQnPs6XsMkTNy0KPq-pWVaZBC7cRBAFPH7f3-ZmoUM0mnsMMAMCR1sjsPsOmht8q6p9pyl4xbm5NecsH-XqJa0nSQaQQvn_esJ93nO9t1Az4XWluFAJMNMNHjlVk2vi3SowAl2oxBm9U3ePevd-OYhBzbMXufD0B4AnWWyFnn0h6k38Cir0kRsj8"
              title="Hassas Parça"
            />
            <GalleryItem 
              img="https://lh3.googleusercontent.com/aida-public/AB6AXuDMW44MNKNjRemegkwkLtDF_eRNOd5JVAGWJ-nIwgcn2bNiZr8_ccdRWQkW3RRX-OCTC1NpFtWyuAjsDfrWLhmJkx2fulP1sRyQfXPG1z--R3qLJGb9nRNl2NIfApeqzhvTKRhLkihqljauyCrxCoLPrl9boYPqMl_LhyfCq1OtFBF-FjPouPbB5ZZxg7Qcf-mc385I2cmYuTEfhpTj2UOsWRW_EfC071QMEki9SIhFvVxTlPTCFp-Ogq5elhU0vseyIoMJrz_-ui5j"
              title="Sanatsal Tasarım"
            />
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-24 bg-brand-dark border-y border-brand-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-brand-orange font-bold tracking-widest uppercase text-sm mb-2">Neden Biz?</h2>
              <h3 className="text-4xl font-extrabold mb-6">Hassasiyet ve Hızın Buluştuğu Nokta</h3>
              <p className="text-gray-400 text-lg mb-8">3D MURAT olarak sadece baskı yapmıyoruz, mühendislik yaklaşımlarımızla parçalarınızın dayanıklılığını ve işlevselliğini optimize ediyoruz.</p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-brand-orange shrink-0 mt-1" size={20} />
                  <div>
                    <span className="font-bold text-white">Yüksek Hassasiyet:</span>
                    <span className="text-gray-400 block">±0.1mm tolerans değerleri ile teknik ölçülere tam uyum.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-brand-orange shrink-0 mt-1" size={20} />
                  <div>
                    <span className="font-bold text-white">Hızlı Teslimat:</span>
                    <span className="text-gray-400 block">24 saat içerisinde üretime başlama ve hızlı lojistik ağı.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-brand-orange shrink-0 mt-1" size={20} />
                  <div>
                    <span className="font-bold text-white">Malzeme Çeşitliliği:</span>
                    <span className="text-gray-400 block">PLA, ABS, PETG, Karbon Fiber ve Esnek TPU seçenekleri.</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-orange to-orange-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative bg-brand-gray p-4 rounded-2xl border border-brand-accent">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmPfx7xYGrtJiga8K1GghJmCAJ_oOPVB3NTUlwbt-SkC2jsOSeRNaF_o1WOClwizcF8ibRX9W-9rYDaUN9nsH1UD9_vSnm8-x6E-eumFSJrD8hofeU-bqcvyso0I6eUWDKTGVE2JclUgF9VZxcdpw9jxvwD4BMlyL70i_zahaPl7FPZdS3C-a5-TmTw7wdVlDw8IMef4xINJ6O4FNdxsVuDfy3PQwAuTqbqXwaFEFANwYE68AAGAPjTvsWStcV71aO5CALlevImIMw" 
                  alt="3D Printing Detail" 
                  className="rounded-xl w-full grayscale hover:grayscale-0 transition duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-gray rounded-3xl overflow-hidden border border-brand-accent shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-12 lg:p-16 bg-brand-accent">
                <h2 className="text-4xl font-extrabold mb-8">İletişime Geçin</h2>
                <p className="text-gray-400 mb-12">Projeniz için hemen fiyat teklifi almak veya teknik detayları konuşmak için formu doldurun. Uzman ekibimiz 2 saat içinde size dönecektir.</p>
                <div className="space-y-6">
                  <ContactInfoItem icon={<MapPin size={24} />} text="İkitelli OSB, İMSAN Sanayi Sitesi, İstanbul / Türkiye" />
                  <ContactInfoItem icon={<Mail size={24} />} text="bilgi@3dmurat.com" />
                  <ContactInfoItem icon={<Phone size={24} />} text="+90 (212) 555 00 00" />
                </div>
              </div>
              <div className="p-12 lg:p-16">
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Ad Soyad</label>
                    <input type="text" className="w-full bg-brand-dark border border-brand-accent rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all outline-none" placeholder="Ahmet Yılmaz" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">E-posta</label>
                    <input type="email" className="w-full bg-brand-dark border border-brand-accent rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all outline-none" placeholder="ahmet@sirket.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Hizmet Seçin</label>
                    <select className="w-full bg-brand-dark border border-brand-accent rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all outline-none appearance-none">
                      <option>3D Baskı</option>
                      <option>Prototipleme</option>
                      <option>Yedek Parça İmalatı</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Mesajınız</label>
                    <textarea className="w-full bg-brand-dark border border-brand-accent rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all outline-none" placeholder="Projeniz hakkında kısa bir bilgi verin..." rows={4}></textarea>
                  </div>
                  <button type="submit" className="w-full bg-brand-orange hover:bg-orange-600 text-white font-bold py-4 rounded-lg transition-all shadow-lg shadow-orange-900/20">
                    Teklif İsteğini Gönder
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ServiceCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 bg-brand-gray border border-brand-accent rounded-2xl transition-all duration-300 hover:border-brand-orange hover:-translate-y-1">
      <div className="w-14 h-14 bg-brand-orange/10 rounded-lg flex items-center justify-center mb-6 text-brand-orange">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}

function GalleryItem({ img, title }: { img: string, title: string }) {
  return (
    <div className="group relative overflow-hidden rounded-xl aspect-square bg-brand-dark border border-brand-accent">
      <img 
        src={img} 
        alt={title} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-70 group-hover:opacity-100"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <span className="text-sm font-semibold">{title}</span>
      </div>
    </div>
  );
}

function ContactInfoItem({ icon, text }: { icon: React.ReactNode, text: string }) {
  return (
    <div className="flex items-center">
      <div className="w-12 h-12 bg-brand-dark rounded-full flex items-center justify-center mr-4 text-brand-orange">
        {icon}
      </div>
      <span className="text-gray-300">{text}</span>
    </div>
  );
}
