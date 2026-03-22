import React from 'react';
import { motion } from 'motion/react';
import { Cpu, DraftingCompass, Settings, CheckCircle, Zap, Layers } from 'lucide-react';

export default function Services() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[450px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOAwXV7RqOXMnjwoNCJaXvczCBhAC6PdGGBzPa4OQxCCr9L8gVFGu7RpwGhKISjuecmSXuFoG2vZnnGo6i8G0D0HYuStyoKeK2eR5vhm1xmlPywSSe_71Dn_9f27wEpyVUGc3LImHk1PhDKQiB6W5QwpZWstu5pMSrAwUtRGTZmBd21gQnIrBtIc3jxHvPYDkKvkH4FZPU0EJS2voRjTJnaevWgfWJS84Mzq9IzVlGE4_lfGj3yj5hq4uyEFBdGqs255IliJde9fiR" 
            alt="Industrial workshop" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 hero-gradient-v"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl pt-20">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight"
          >
            Hizmetlerimiz
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            3D Baskı ve yedek parça üretiminde endüstriyel standartlarda, yüksek hassasiyetli çözümler.
          </motion.p>
        </div>
      </section>

      {/* Detailed Services */}
      <section className="py-24 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
          
          {/* Service 1: 3D Printing */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 text-brand-orange font-bold uppercase tracking-widest text-sm mb-4">
                <Cpu size={18} />
                Teknoloji
              </div>
              <h2 className="text-4xl font-extrabold mb-6">3D Baskı (FDM & SLA)</h2>
              <p className="text-gray-400 mb-8 leading-relaxed text-lg">
                En karmaşık geometrileri bile hayata geçiren modern üretim teknolojilerimizle yanınızdayız. Hem dayanıklı mühendislik parçaları hem de ultra detaylı görsel modeller için optimize edilmiş makine parkurumuz mevcuttur.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-brand-gray border border-brand-accent hover:border-brand-orange transition-colors">
                  <h3 className="font-bold text-brand-orange mb-3 text-lg">FDM Teknolojisi</h3>
                  <ul className="text-sm space-y-3 text-gray-400">
                    <li className="flex items-center gap-2"><span className="text-brand-orange">✔</span> Materyaller: PLA, ABS, PETG, TPU</li>
                    <li className="flex items-center gap-2"><span className="text-brand-orange">✔</span> Endüstriyel Dayanıklılık</li>
                    <li className="flex items-center gap-2"><span className="text-brand-orange">✔</span> Geniş Baskı Alanı</li>
                  </ul>
                </div>
                <div className="p-6 rounded-2xl bg-brand-gray border border-brand-accent hover:border-brand-orange transition-colors">
                  <h3 className="font-bold text-brand-orange mb-3 text-lg">SLA (Reçine)</h3>
                  <ul className="text-sm space-y-3 text-gray-400">
                    <li className="flex items-center gap-2"><span className="text-brand-orange">✔</span> 0.05mm Katman Hassasiyeti</li>
                    <li className="flex items-center gap-2"><span className="text-brand-orange">✔</span> Pürüzsüz Yüzey Kalitesi</li>
                    <li className="flex items-center gap-2"><span className="text-brand-orange">✔</span> Dental & Kuyumculuk</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 group">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-orange to-orange-400 rounded-2xl blur opacity-10 group-hover:opacity-30 transition duration-1000"></div>
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCn-FJxW31mkq25becZV47A6FHdLtr-Rlg5EgKSCL73e0vLuL3jNn0fCw9GEKOumx26jOXzH3UYXiY6encct508Yivjh9iBdiEMWWrfIo2UFf11Lm4AzCJAZfoKUm9Fhpfc2hml1CgfZOiXWG0AJFLYzws6qghev4I9JhLqXVGT6V14hReQUM4E0y4OwgPQSP4WyBg-NnHLrKwJ8DT4Os3nNMoxyczXFgBHH6jJvq6ii-kwx3_UzR_y0CjCc5GzfGfvqaq0kpVV4ult" 
                  alt="3D Print Detail" 
                  className="relative rounded-2xl border border-brand-accent w-full grayscale group-hover:grayscale-0 transition duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

          {/* Service 2: Prototyping */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="group">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-orange to-orange-400 rounded-2xl blur opacity-10 group-hover:opacity-30 transition duration-1000"></div>
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMTsmmvV1K5WkkenuHgIHI0TsLTa4G8Fgr2iU5KaDQZHViC1INpGJoWGjhkGbZmWN6PXwIrriKSZSva6BNnsD8I4nDlOxWk4Rsi1eJQxOa9x_Ey5HAi6GWBDCiwORG9Y7whzoGEXh9kgJFkBaFQyPly8V4Foh4ll3dFFnNHRk2u494EbN7rR2jFDrHIGt0xZ2y0DQEljEGIaRroeFpy2JEXwq6_RNle_t4OMXSsg6XKplpOJzPAfM3N-CZ33t1oUVUmsW6cR6vbQg_" 
                  alt="CAD Design" 
                  className="relative rounded-2xl border border-brand-accent w-full grayscale group-hover:grayscale-0 transition duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 text-brand-orange font-bold uppercase tracking-widest text-sm mb-4">
                <DraftingCompass size={18} />
                AR-GE
              </div>
              <h2 className="text-4xl font-extrabold mb-6">Hızlı Prototipleme</h2>
              <p className="text-gray-400 mb-8 leading-relaxed text-lg">
                Fikirlerinizi saatler içinde fiziksel modellere dönüştürüyoruz. CAD tasarımlarınızdan yola çıkarak, seri üretim öncesi hataları minimize eden ve AR-GE süreçlerinizi hızlandıran prototipler üretiyoruz.
              </p>
              <div className="space-y-6">
                <StepItem number="1" title="CAD & Model Hazırlığı" description="2D taslakların veya fikirlerin 3D ortama hassas aktarılması." />
                <StepItem number="2" title="Dilimleme & Optimizasyon" description="Üretim parametrelerinin malzeme ve geometriye göre ayarlanması." />
                <StepItem number="3" title="Fiziksel Üretim" description="Seçilen teknoloji ile dakikalar içinde somut, test edilebilir çıktı." />
              </div>
            </div>
          </div>

          {/* Service 3: Spare Parts */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 text-brand-orange font-bold uppercase tracking-widest text-sm mb-4">
                <Settings size={18} />
                İmalat
              </div>
              <h2 className="text-4xl font-extrabold mb-6">Özel Yedek Parça</h2>
              <p className="text-gray-400 mb-8 leading-relaxed text-lg">
                Piyasada bulunmayan veya üretimi durdurulmuş mekanik parçalar için tersine mühendislik (Reverse Engineering) çözümleri. Kırılan parçalarınızı aslına uygun veya daha dayanıklı materyallerle yeniden üretiyoruz.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge text="Tersine Mühendislik" />
                <Badge text="Yüksek Mukavemet" />
                <Badge text="Parça Modifikasyonu" />
              </div>
            </div>
            <div className="order-1 lg:order-2 group">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-orange to-orange-400 rounded-2xl blur opacity-10 group-hover:opacity-30 transition duration-1000"></div>
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuKr_Uyy1anjL4xCaJygSUSPzMZtBQAvfJvzaci_DRZdKaIlunnC9_wEYZbNUI5QesVthIwGC4IDkdaLkwsZpXEoppwN1kIFNDz94wVGesahvjY4Pi-wg9hC83Fd4OT4VGefFDtZSpayIEke8Dp7FNqfZ4WcNrfUEb4tH4Ts62-wTqRF2g8Ay6iQl-BttZrBVtvJW2WAsYbgbHCunLodMDyXtDgvTLsMSU2ZymLxmkZCsoVjI7RCZBC4tYLrpfDTUkAB01bhABzqRt" 
                  alt="Spare Parts" 
                  className="relative rounded-2xl border border-brand-accent w-full grayscale group-hover:grayscale-0 transition duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-brand-gray border-y border-brand-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-brand-orange font-bold tracking-widest uppercase text-sm mb-2">Neden Biz?</h2>
            <p className="text-4xl font-extrabold">Hassasiyet ve Hızın Buluştuğu Nokta</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<CheckCircle size={40} />}
              title="Maksimum Kalite"
              description="Endüstriyel sınıf makinelerimiz ve uzman ekibimizle her baskıda teknik ölçülere tam uyum garantisi."
            />
            <FeatureCard 
              icon={<Zap size={40} />}
              title="Hızlı Teslimat"
              description="Acil projeleriniz için 24 saat içinde üretime başlama ve hızlı teslimat seçenekleri sunuyoruz."
            />
            <FeatureCard 
              icon={<Layers size={40} />}
              title="Malzeme Çeşitliliği"
              description="PLA, ABS, PETG, Karbon Fiber ve Esnek TPU gibi 20'den fazla endüstriyel materyal seçeneği."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function StepItem({ number, title, description }: { number: string, title: string, description: string }) {
  return (
    <div className="flex gap-5 group/item">
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-orange text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-orange-900/20 group-hover/item:scale-110 transition-transform">
        {number}
      </div>
      <div>
        <h4 className="font-bold text-white text-lg">{title}</h4>
        <p className="text-gray-500">{description}</p>
      </div>
    </div>
  );
}

function Badge({ text }: { text: string }) {
  return (
    <span className="px-5 py-2.5 rounded-lg bg-brand-accent text-brand-orange text-xs font-bold uppercase tracking-widest border border-brand-orange/20">
      {text}
    </span>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-brand-dark p-10 rounded-2xl border border-brand-accent hover:border-brand-orange transition-all group">
      <div className="text-brand-orange mb-6 block group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}
