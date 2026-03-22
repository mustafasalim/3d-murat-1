import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { CheckCircle, Box, Layout, Building, Brush, Rocket, Settings2 } from 'lucide-react';
import { cn } from '../lib/utils';

const projects = [
  {
    id: 1,
    title: "Otomotiv Dişli Takımı",
    category: "Endüstriyel Parçalar",
    tech: "FDM",
    material: "Carbon Fiber Nylon",
    precision: "0.1mm",
    icon: <Settings2 size={24} />,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNujz6mRRyL6TcvzE4V77j50HEBOxVlqbrzF5blGZeMVptI9FCwlZAE6rLYvROuwUUYNW9gRqRQciTUsSbMgMxNkm9FmHWIkhhCXevNmKlv9QZEpTFBUAbrwqQFeAWSp52NLclMHLYkXGzBz9TCnHzqUypOtS-nHu47OYcnfmz4s2KsHnnTsroiO2YC4jm5UiCT9lQ7lp3A67Ow9A4V33by1aE421xt27T-i5Gj1rwrO-9VK0Do9UC6hA--T0V-YKAfaYCvmoz2BTU"
  },
  {
    id: 2,
    title: "Kişiselleştirilmiş Protez",
    category: "Medikal",
    tech: "SLA",
    material: "Biyo-uyumlu Reçine",
    precision: "0.05mm",
    icon: <Box size={24} />,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAyqJaOgU8lOcNBpoJjpynQ6BddQMJ5wd5Q05baY0wvK3a8_AH6eeCVdVVQBAc-qGsd0hxUfMPvsIfPWPQLEFAhSj6XSx0qbLzh-loftj7Dg4u4a3i67PG3g9EzW_cQxiciDLjtcoXTNoRtFsym2SL_bb-GyqfYmBEDcupwjF4_OPSvyPXmMeNejA3gkZ8G1fhcugzHLE46p-mZTRs_CDpuhcRQznCICX1U_tMnmPzlhdFKEo1V30LSNn1I1rirO193fCq29Ts7r3_1"
  },
  {
    id: 3,
    title: "Mimari Maket",
    category: "Hızlı Prototipleme",
    tech: "FDM / Large Format",
    material: "Premium PLA+",
    precision: "0.2mm",
    icon: <Building size={24} />,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBUcNNjT3oX04jdiBaM6fMcmP1hTE9jsUWRR0N7bsjjxTwssQ3zpEnc6H7kSU7thVLOSBQDtc6y92JQjoaExM_Hp0QiqOUhPQxtIOkiZamqF16ROKaeaZxfhIq5KSl1Ph9eDJBTNM0v_aNCktUfkcQ9ujrh_Hk_AVldqSSYcarHrbt5ZwB12IUA744_6XtguzY0YhTdBXZuOjWd3wZiRzAkgacBBrzSn8LEzpN3QH2pmbXa7V92oD4l09cN4qmdVfL9XL8id6RtOXXU"
  },
  {
    id: 4,
    title: "Havacılık Türbin Kanadı",
    category: "Endüstriyel Parçalar",
    tech: "Metal 3D",
    material: "Titanyum Alaşımı",
    precision: "0.08mm",
    icon: <Rocket size={24} />,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuApLticyuSv-H-zYCMrW-J_0JaKSnJHB78QKvnC29owT-OtDH1KJ_mKyQKhvlKf2lfYPxNJMbbzwxonRBxT42UGW_4Oh5mJFaZ9_bbWV2SodkxvBhVKtYITUcFSqi9zT7_V696JY7TVdjIL1yrMYEfB6sdXa0Gy4hyKjC7Z1_U-4NH7q2GzhpBf20_N9R4b0l3LK_RhPCbNXgfNvIGk-YeR0IIT0KJAnzcrAiJyhmX2zCMcfpBiQRAuVo7YEoSKVZmd-TKUaqP1UbFO"
  },
  {
    id: 5,
    title: "Endüstriyel Braket",
    category: "Endüstriyel Parçalar",
    tech: "MJF",
    material: "PA12 Nylon",
    precision: "0.12mm",
    icon: <Layout size={24} />,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqjgJ3Ey_0sH_w-lQX26-MzJcSJoi4CUIPMyGzgHgNCY-gNy5fkI6AuxAIG0cd_dovqBJM46lnbPyVSFGBkuX3cEMEIwriZZaHWCqYxM9fbZvK5edTtQQMU5JC2p9b1H3JGcMH24sMfnHFeFRIYnUOJ_gfUsNptn9XyLyro1aBJ7Vs3-73AqQcZpdA6qpVHn5IZpMrSzgGnaglqtgVQwmeVJ_PGEQ2ks6vyK325tx7M6qKaLzU6tl-NwJfqHQVcVUFM2WtoxtqR2ev"
  },
  {
    id: 6,
    title: "Modern Sanat Heykeli",
    category: "Sanat & Tasarım",
    tech: "DLP",
    material: "Yüksek Çözünürlüklü Reçine",
    precision: "0.03mm",
    icon: <Brush size={24} />,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwwYFna4j1jFScf7A7SdHG6ZFvdKNAe1qPrFbt5g7bP_LJHczwslHXzQDddo7EwFt6sa-GwN_OtbBMWA4L4n20zKYDqoJABLvsoIXrg7YDQDomqYcyc67O_8jE-vgyq47XGC_V8vDXZo67EYofwgiLlzMPYyiiBJYylLMNzUGaCMMFVjppRlxlB5DOzj0Stkxp_oWNvqoY4IvIRFXKzVK4ZkeKj97_pdFqKZXRewUPo5lwnPxxL8lL4uolW38MgQfAvERMjiMjiq2S"
  }
];

const categories = ["Tümü", "Endüstriyel Parçalar", "Medikal", "Sanat & Tasarım", "Hızlı Prototipleme"];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("Tümü");

  const filteredProjects = activeCategory === "Tümü" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-16 md:py-24 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-white"
            >
              Geleceği <span className="text-brand-orange">Katman Katman</span> İnşa Ediyoruz
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-400 leading-relaxed mb-8"
            >
              Üretimde hassasiyet, dayanıklılık ve yüksek kalite standartlarıyla hayata geçirdiğimiz projelerimiz. Endüstriyel yedek parçalardan sanatsal prototiplere kadar geniş bir yelpazede hizmet sunuyoruz.
            </motion.p>
            <div className="flex flex-wrap gap-4">
              <FeatureTag text="0.05mm Hassasiyet" />
              <FeatureTag text="Endüstriyel Materyaller" />
              <FeatureTag text="Hızlı Teslimat" />
            </div>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-8 bg-white/5 sticky top-16 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "whitespace-nowrap px-6 py-2 rounded-full text-sm font-bold transition-all border",
                  activeCategory === cat 
                    ? "bg-brand-orange text-white border-brand-orange" 
                    : "bg-brand-gray text-gray-300 border-brand-accent hover:border-brand-orange"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Project Grid */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-brand-gray rounded-xl overflow-hidden border border-brand-accent transition-all hover:shadow-2xl hover:shadow-brand-orange/10"
              >
                <div className="aspect-video w-full overflow-hidden">
                  <img 
                    src={project.img} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                      <span className="inline-block px-2 py-1 rounded bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-wider">
                        {project.tech}
                      </span>
                    </div>
                    <div className="text-gray-500">
                      {project.icon}
                    </div>
                  </div>
                  <div className="space-y-2 border-t border-white/10 pt-4 mt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Malzeme:</span>
                      <span className="font-semibold">{project.material}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Hassasiyet:</span>
                      <span className="font-semibold">{project.precision}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-16 flex justify-center">
            <button className="px-8 py-3 rounded-xl border border-brand-orange text-brand-orange font-bold hover:bg-brand-orange hover:text-white transition-all">
              Daha Fazla Yükle
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand-orange/10 border-y border-brand-orange/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-6 text-white">Hayalinizdeki Projeyi Gerçeğe Dönüştürelim</h2>
          <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto">
            Endüstriyel çözümlerimiz ve uzman ekibimizle projelerinizin her aşamasında yanınızdayız. En karmaşık parçaları bile yüksek doğrulukla üretiyoruz.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/teklif-al" className="bg-brand-orange text-white px-10 py-4 rounded-xl font-black text-lg hover:scale-105 transition-transform text-center">
              Hemen Teklif Alın
            </Link>
            <Link to="/iletisim" className="bg-white text-brand-dark px-10 py-4 rounded-xl font-black text-lg hover:scale-105 transition-transform text-center">
              Bizimle İletişime Geçin
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureTag({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 text-sm font-medium text-gray-400">
      <CheckCircle className="text-brand-orange" size={18} />
      {text}
    </div>
  );
}
