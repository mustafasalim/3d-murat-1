import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Instagram, Share2, Globe, MapPin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-dark border-t border-brand-accent py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl font-extrabold tracking-tighter text-white">
                3D <span className="text-brand-orange">MURAT</span>
              </span>
            </div>
            <p className="text-gray-400 max-w-sm mb-6">
              Geleceğin üretim teknolojilerini bugünden sunuyoruz. Endüstriyel 3D baskı, prototipleme ve yedek parça üretiminde güvenilir çözüm ortağınız.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-gray text-gray-400 hover:bg-brand-orange hover:text-white transition-all">
                <Linkedin size={20} />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-gray text-gray-400 hover:bg-brand-orange hover:text-white transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-brand-gray text-gray-400 hover:bg-brand-orange hover:text-white transition-all">
                <Share2 size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Hızlı Linkler</h4>
            <ul className="space-y-4 text-gray-400">
              <li><Link to="/" className="hover:text-brand-orange transition-colors">Ana Sayfa</Link></li>
              <li><Link to="/hizmetler" className="hover:text-brand-orange transition-colors">Hizmetler</Link></li>
              <li><Link to="/portfolyo" className="hover:text-brand-orange transition-colors">Portfolyo</Link></li>
              <li><Link to="/teklif-al" className="hover:text-brand-orange transition-colors font-bold">Teklif Al</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-white">İletişim</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-brand-orange shrink-0" />
                <span className="text-sm">İkitelli OSB, İMSAN Sanayi Sitesi, İstanbul / Türkiye</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={20} className="text-brand-orange shrink-0" />
                <span className="text-sm">bilgi@3dmurat.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={20} className="text-brand-orange shrink-0" />
                <span className="text-sm">+90 (212) 555 00 00</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-brand-accent text-center text-gray-500 text-sm">
          © 2024 3D MURAT Mühendislik ve Tasarım. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
}
