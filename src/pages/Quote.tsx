import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Zap, Info, Rotate3d, Loader2 } from 'lucide-react';

const QUOTE_API = (import.meta.env.VITE_QUOTE_API_URL as string | undefined)?.trim() || '/api/quote';
const MAX_STL_BYTES = 4 * 1024 * 1024;

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => {
      const data = r.result as string;
      const i = data.indexOf(',');
      resolve(i >= 0 ? data.slice(i + 1) : data);
    };
    r.onerror = () => reject(new Error('Dosya okunamadı'));
    r.readAsDataURL(file);
  });
}

export default function Quote() {
  const [quantity, setQuantity] = useState(1);
  const [material, setMaterial] = useState('PLA - Standart Prototipleme');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [stlFile, setStlFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState(false);

  const unitPrice = 450;
  const totalPrice = unitPrice * quantity;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(false);

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setFormError('Lütfen ad soyad, e-posta ve telefon alanlarını doldurun.');
      return;
    }

    setSubmitting(true);
    try {
      const messageBody = [
        `Malzeme: ${material}`,
        `Adet: ${quantity}`,
        `Tahmini birim fiyat (₺): ${unitPrice.toFixed(2)}`,
        `Toplam (₺): ${totalPrice.toFixed(2)}`,
        '',
        notes.trim() ? `Not: ${notes.trim()}` : 'Not: —',
      ].join('\n');

      let attachmentBase64: string | undefined;
      let attachmentName: string | undefined;
      if (stlFile) {
        if (stlFile.size > MAX_STL_BYTES) {
          setFormError(`STL en fazla ${MAX_STL_BYTES / (1024 * 1024)} MB olabilir.`);
          return;
        }
        attachmentBase64 = await fileToBase64(stlFile);
        attachmentName = stlFile.name;
      }

      const payload = {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        material,
        quantity: String(quantity),
        notes: notes.trim(),
        unitPrice: unitPrice.toFixed(2),
        totalPrice: totalPrice.toFixed(2),
        message: messageBody,
        ...(attachmentBase64
          ? { attachmentBase64, attachmentName: attachmentName ?? 'ek.stl' }
          : {}),
      };

      const ac = new AbortController();
      const timeout = setTimeout(() => ac.abort(), 120_000);
      let res: Response;
      try {
        res = await fetch(QUOTE_API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          signal: ac.signal,
        });
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          setFormError('İstek çok uzun sürdü (zaman aşımı). STL dosyasını küçültüp tekrar deneyin.');
        } else {
          setFormError('Bağlantı hatası. İnternetinizi kontrol edip tekrar deneyin.');
        }
        return;
      } finally {
        clearTimeout(timeout);
      }

      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };

      if (!res.ok || !data.ok) {
        setFormError(
          data.error ??
            (import.meta.env.DEV
              ? 'Yerelde /api yoksa .env içine VITE_QUOTE_API_URL=https://...vercel.app/api/quote ekleyin veya `npx vercel dev` kullanın.'
              : 'Gönderim başarısız oldu. Lütfen tekrar deneyin.')
        );
        return;
      }

      setFormSuccess(true);
      setName('');
      setEmail('');
      setPhone('');
      setNotes('');
      setStlFile(null);
    } catch {
      setFormError('Bağlantı hatası. İnternetinizi kontrol edip tekrar deneyin.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-12">
          <span className="text-brand-orange font-bold tracking-widest uppercase text-xs mb-3 block">Hızlı Üretim Hattı</span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6">
            Hızlı Teklif Al
          </h1>
          <p className="max-w-2xl text-gray-400 text-lg font-light leading-relaxed">
            3D modelinizi yükleyin, malzemeyi seçin ve anında ön fiyat teklifi alın. Endüstriyel standartlarda üretim için optimize edilmiş algoritma.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Form Section */}
          <section className="lg:col-span-8 space-y-8">
            <div className="bg-brand-gray p-8 rounded-2xl border border-brand-accent/50 shadow-xl">
              <form className="space-y-10" onSubmit={handleSubmit} noValidate>
                {/* STL Upload Area */}
                <div className="relative group">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-4 block font-bold">1. Model Yükleme (STL)</label>
                  <div className="border-2 border-dashed border-brand-accent hover:border-brand-orange/50 bg-brand-dark/50 transition-all cursor-pointer py-16 flex flex-col items-center justify-center gap-4 group rounded-xl">
                    <div className="w-16 h-16 bg-brand-orange/10 rounded-full flex items-center justify-center text-brand-orange group-hover:scale-110 transition-transform">
                      <Rotate3d size={32} />
                    </div>
                    <div className="text-center px-4">
                      <p className="font-medium text-white">STL Dosyanızı Sürükleyin veya Seçin</p>
                      <p className="text-xs text-gray-500 mt-1 uppercase tracking-tighter">Maksimum dosya boyutu: 50MB · İsteğe bağlı</p>
                      {stlFile && (
                        <p className="text-xs text-brand-orange mt-2 font-medium break-all">{stlFile.name}</p>
                      )}
                    </div>
                    <input
                      type="file"
                      accept=".stl,.STL"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        setStlFile(f ?? null);
                      }}
                    />
                  </div>
                </div>

                {/* Configuration Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  {/* Material Selection */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 block font-bold">2. Malzeme Seçimi</label>
                    <select 
                      value={material}
                      onChange={(e) => setMaterial(e.target.value)}
                      className="w-full bg-transparent border-b border-brand-accent focus:border-brand-orange text-white py-3 px-0 font-medium outline-none transition-colors appearance-none"
                    >
                      <option className="bg-brand-gray">PLA - Standart Prototipleme</option>
                      <option className="bg-brand-gray">ABS - Endüstriyel Dayanıklılık</option>
                      <option className="bg-brand-gray">PETG - Kimyasal Direnç</option>
                      <option className="bg-brand-gray">TPU - Esnek Yapı</option>
                      <option className="bg-brand-gray">Karbon Fiber Reçine - Yüksek Mukavemet</option>
                    </select>
                  </div>

                  {/* Quantity */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 block font-bold">3. Adet</label>
                    <input 
                      type="number" 
                      min="1" 
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                      className="w-full bg-transparent border-b border-brand-accent focus:border-brand-orange text-white py-3 px-0 font-medium outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Contact — teklif yanıtı için */}
                <div className="space-y-6 pt-4 border-t border-brand-accent/30">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 block font-bold">4. İletişim Bilgileri</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="quote-name" className="text-xs text-gray-400">Ad Soyad *</label>
                      <input
                        id="quote-name"
                        type="text"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-brand-dark border border-brand-accent rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-orange outline-none transition-all"
                        placeholder="Adınız Soyadınız"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="quote-email" className="text-xs text-gray-400">E-posta *</label>
                      <input
                        id="quote-email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-brand-dark border border-brand-accent rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-orange outline-none transition-all"
                        placeholder="ornek@email.com"
                        required
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label htmlFor="quote-phone" className="text-xs text-gray-400">Telefon *</label>
                      <input
                        id="quote-phone"
                        type="tel"
                        autoComplete="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-brand-dark border border-brand-accent rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-orange outline-none transition-all"
                        placeholder="+90 5xx xxx xx xx"
                        required
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label htmlFor="quote-notes" className="text-xs text-gray-400">Ek not (isteğe bağlı)</label>
                      <textarea
                        id="quote-notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={3}
                        className="w-full bg-brand-dark border border-brand-accent rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-orange outline-none transition-all resize-y min-h-[80px]"
                        placeholder="Özel istekler, teslimat adresi vb."
                      />
                    </div>
                  </div>
                </div>

                {/* Pricing Simulation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-8 border-t border-brand-accent/30">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 block font-bold">Tahmini Birim Fiyat (₺)</label>
                    <div className="relative">
                      <div className="text-brand-orange text-3xl font-black py-2">
                        {unitPrice.toFixed(2)}
                      </div>
                      <span className="absolute right-0 bottom-4 text-[10px] text-gray-500 font-bold">KDV DAHİL</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 block font-bold">Toplam Tutar</label>
                    <div className="text-white text-5xl font-black tracking-tighter">
                      ₺ {totalPrice.toFixed(2)}
                    </div>
                  </div>
                </div>

                {formError && (
                  <p className="text-sm text-red-400 bg-red-950/40 border border-red-900/50 rounded-xl px-4 py-3" role="alert">
                    {formError}
                  </p>
                )}
                {formSuccess && (
                  <p className="text-sm text-green-400 bg-green-950/40 border border-green-900/50 rounded-xl px-4 py-3" role="status">
                    Teklif talebiniz alındı. En kısa sürede size dönüş yapılacaktır.
                  </p>
                )}

                {/* Action Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-brand-orange hover:bg-orange-600 disabled:opacity-60 disabled:pointer-events-none text-white py-6 rounded-xl font-black text-xl uppercase tracking-tighter flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-lg shadow-orange-900/20"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={24} className="animate-spin" />
                      Gönderiliyor…
                    </>
                  ) : (
                    <>
                      Teklifi Onayla ve Gönder
                      <Zap size={24} fill="currentColor" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </section>

          {/* Right: Technical Specs & Build Progress */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Build Specs Card */}
            <div className="bg-brand-gray p-8 border-l-4 border-brand-orange rounded-r-2xl shadow-xl">
              <h3 className="font-bold text-lg uppercase tracking-tight mb-6">Teknik Parametreler</h3>
              <ul className="space-y-4">
                <SpecItem label="Baskı Kalitesi" value="100 Mikron" />
                <SpecItem label="Üretim Süresi" value="2-4 İş Günü" />
                <SpecItem label="Tolerans" value="± 0.1 mm" />
                <SpecItem label="Doluluk (Infill)" value="20% (Optimize)" />
              </ul>
            </div>

            {/* Capacity Visualizer */}
            <div className="bg-brand-gray p-8 space-y-6 rounded-2xl border border-brand-accent/50">
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase tracking-widest text-blue-400 font-bold">Üretim Hattı Kapasitesi</span>
                <span className="text-[10px] text-blue-300 font-bold">OPTIMAL</span>
              </div>
              <div className="relative h-1.5 w-full bg-brand-dark rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '65%' }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="absolute left-0 top-0 h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                />
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed uppercase font-medium">
                Şu anda 12 aktif yazıcı çevrimiçi. Yeni siparişler için öncelikli sıraya alım mevcuttur.
              </p>
            </div>

            {/* Engineering Tip */}
            <div className="bg-brand-orange/5 p-6 rounded-2xl border border-brand-orange/20">
              <div className="flex gap-4">
                <div className="text-brand-orange shrink-0">
                  <Info size={24} />
                </div>
                <div>
                  <p className="font-bold text-sm uppercase mb-1 text-brand-orange">Mühendis Notu</p>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Karbon fiber reçine seçimlerinde mekanik mukavemet %40 artar. Dişli çark projeleri için bu malzemeyi öneriyoruz.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function SpecItem({ label, value }: { label: string, value: string }) {
  return (
    <li className="flex justify-between items-end pb-2 border-b border-brand-accent/30">
      <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">{label}</span>
      <span className="text-sm font-bold text-white">{value}</span>
    </li>
  );
}
