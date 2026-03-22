import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Mail, Phone, Clock, Send, MessageSquare } from 'lucide-react';

export default function Contact() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_5W6U6i8G0D0HYuStyoKeK2eR5vhm1xmlPywSSe_71Dn_9f27wEpyVUGc3LImHk1PhDKQiB6W5QwpZWstu5pMSrAwUtRGTZmBd21gQnIrBtIc3jxHvPYDkKvkH4FZPU0EJS2voRjTJnaevWgfWJS84Mzq9IzVlGE4_lfGj3yj5hq4uyEFBdGqs255IliJde9fiR" 
            alt="Contact background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 hero-gradient-v"></div>
        </div>
        <div className="relative z-10 text-center px-4 pt-20">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight"
          >
            İletişim
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            Projeniz için teknik destek almak veya fiyat teklifi istemek için bize ulaşın.
          </motion.p>
        </div>
      </section>

      <section className="py-24 bg-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">İletişim Bilgileri</h2>
                <p className="text-gray-400 mb-8">Sorularınız için bizimle her zaman iletişime geçebilirsiniz. Uzman ekibimiz size en kısa sürede yardımcı olacaktır.</p>
              </div>

              <div className="space-y-6">
                <ContactCard 
                  icon={<MapPin size={24} />} 
                  title="Adres" 
                  content="İkitelli OSB, İMSAN Sanayi Sitesi, E Blok No: 12, Başakşehir / İstanbul" 
                />
                <ContactCard 
                  icon={<Mail size={24} />} 
                  title="E-posta" 
                  content="bilgi@3dmurat.com" 
                />
                <ContactCard 
                  icon={<Phone size={24} />} 
                  title="Telefon" 
                  content="+90 (212) 555 00 00" 
                />
                <ContactCard 
                  icon={<Clock size={24} />} 
                  title="Çalışma Saatleri" 
                  content="Pzt - Cmt: 09:00 - 19:00" 
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-brand-gray p-8 md:p-12 rounded-3xl border border-brand-accent shadow-xl">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-brand-orange/10 rounded-lg flex items-center justify-center text-brand-orange">
                    <MessageSquare size={20} />
                  </div>
                  <h3 className="text-2xl font-bold">Teklif Formu</h3>
                </div>
                
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Ad Soyad</label>
                    <input type="text" className="w-full bg-brand-dark border border-brand-accent rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-orange outline-none transition-all" placeholder="Ahmet Yılmaz" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">E-posta</label>
                    <input type="email" className="w-full bg-brand-dark border border-brand-accent rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-orange outline-none transition-all" placeholder="ahmet@sirket.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Telefon</label>
                    <input type="tel" className="w-full bg-brand-dark border border-brand-accent rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-orange outline-none transition-all" placeholder="+90 5xx xxx xx xx" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Hizmet Türü</label>
                    <select className="w-full bg-brand-dark border border-brand-accent rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-orange outline-none transition-all appearance-none">
                      <option>3D Baskı</option>
                      <option>Hızlı Prototipleme</option>
                      <option>Yedek Parça Üretimi</option>
                      <option>Tasarım & Modelleme</option>
                    </select>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-medium text-gray-400">Mesajınız</label>
                    <textarea className="w-full bg-brand-dark border border-brand-accent rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-orange outline-none transition-all min-h-[150px]" placeholder="Projeniz hakkında detaylı bilgi verin..."></textarea>
                  </div>
                  <div className="md:col-span-2">
                    <button type="submit" className="w-full bg-brand-orange hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-900/20">
                      <Send size={20} />
                      Gönder ve Teklif Al
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="h-[400px] bg-brand-accent relative">
        <div className="absolute inset-0 flex items-center justify-center text-gray-500">
          <div className="text-center">
            <MapPin size={48} className="mx-auto mb-4 opacity-20" />
            <p className="font-bold">Harita Yükleniyor...</p>
            <p className="text-sm">İkitelli OSB, İstanbul</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactCard({ icon, title, content }: { icon: React.ReactNode, title: string, content: string }) {
  return (
    <div className="flex gap-4 p-6 rounded-2xl bg-brand-gray border border-brand-accent hover:border-brand-orange/50 transition-colors group">
      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-dark flex items-center justify-center text-brand-orange group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-white mb-1">{title}</h4>
        <p className="text-sm text-gray-400 leading-relaxed">{content}</p>
      </div>
    </div>
  );
}
