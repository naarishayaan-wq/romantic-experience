import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { ChevronDown, Heart, Sparkles, Code2 } from 'lucide-react';
import AudioPlayer from './AudioPlayer';
import ParticleBackground from './ParticleBackground';
import Envelope from './Envelope';
import Gallery from './Gallery';
import developerImg from '../assets/developer_image.jpg';
import myWifeImg from '../assets/my_wife.jpg';
import bakaImg from '../assets/baka.jpg';

const loveTranslations = [
  "Te amo", "Je t'aime", "Ich liebe dich", "Ti amo", "Eu te amo", "Ik hou van jou", 
  "Ya tebya lyublyu", "Aishiteru", "Saranghae", "Wǒ ài nǐ", "Main tumse pyar karta hoon", 
  "Uhibbuka", "Seni seviyorum", "S' agapo", "Kocham cię", "Miluji tě", "Szeretlek", 
  "Jeg elsker dig", "Jag älskar dig", "Minä rakastan sinua", "Eg elskar deg", "Ljubim te", 
  "Volim te", "Te iubesc", "T'estimo", "Maite zaitut", "Bhalobashi", "Naan unnai kadhalikkiren", 
  "Nenu ninnu premistunnanu", "Njan ninne premikkunnu", "Ami tomake bhalobashi", "Ngiyakuthanda", 
  "Ndiyakuthanda", "Ke a go rata", "Ndinokuda", "Ndimakukonda", "Nakupenda", "Mi stimo bo", 
  "Mwen renmen ou", "Mi aime jou", "M'bi fe", "Aheri", "Inhobbok", "Rwy'n dy garu di", 
  "Tha gaol agam ort", "Ta gra agam ort", "Lubim ta", "Sakam te", "Obicham te", "Une te dua", 
  "Ma armastan sind", "Es tevi milu", "As tave myliu", "Kuv hlub koj", "Phom rak khun", 
  "Anh yeu em", "Soro ouy neng", "Bong salang oun", "Aku tresno kowe", "Abdi bogoh ka anjeun", 
  "Kulo tresno", "Saya cinta padamu", "Mahal kita", "Gihigugma tika", "Palangga ta ka", 
  "Pinaandangga ta kaw", "Kaluguran daka", "Ayoriko", "Mitaro", "Nalingi yo", "Ninapenda wewe", 
  "Mena Tanda Wena", "Seni söýýärin", "Men seni sevaman", "Men seni süyemin", "Khabar tura dust dorum", 
  "Nza kwagala", "Nda ku funa", "Ni ku rhandza", "Ndi a ni funa", "Ndiyakuthanda", "Ngiyakuthanda", 
  "Ndinokuda", "Ndimakukonda", "Mi stimo bo", "Mwen renmen ou", "Mi aime jou", "M'bi fe", 
  "Aheri", "Inhobbok", "Rwy'n dy garu di", "Tha gaol agam ort", "Ta gra agam ort", "Miluji te", 
  "Lubim ta", "Ljubim te", "Sakam te", "Obicham te", "Te iubesc", "Une te dua", "I love you"
];

interface ExperienceProps {
  /** When true, the ambient background music begins playing with a fade-in. */
  startBackgroundMusic?: boolean;
}

export default function Experience({ startBackgroundMusic = false }: ExperienceProps) {
  const [openedPhoto, setOpenedPhoto] = useState<string | null>(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity1 = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="relative w-full">
      <ParticleBackground />
      <AudioPlayer autoStart={startBackgroundMusic} />
      
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center relative px-6">
          <motion.div 
            style={{ y: y1, opacity: opacity1 }}
            className="flex flex-col items-center text-center max-w-4xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs tracking-[0.2em] uppercase text-purple-300/80"
            >
              <Sparkles className="w-3 h-3" />
              <span>Untukmu</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
              className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight text-glow"
            >
              Momen dalam Waktu,<br />
              <span className="italic text-purple-200/90">Terabadikan</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 1 }}
              className="flex flex-col gap-6 items-center text-center mt-8 p-6 md:p-10 glass-card rounded-3xl border border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.15)] max-w-3xl relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
              
              <p className="text-white/95 font-sans text-xl md:text-2xl font-light tracking-wide leading-relaxed drop-shadow-sm relative z-10">
                "Aku telah mencari di antara seratus pesona keindahan, tetapi bagaimana aku bisa memujimu? Tidak ada kata yang pernah diciptakan yang benar-benar dapat menangkap kesempurnaanmu."
              </p>
              
              <div className="w-16 h-px bg-purple-500/30 mx-auto relative z-10" />
              
              <p className="text-purple-300 font-serif italic text-2xl md:text-3xl font-light tracking-wide leading-relaxed drop-shadow-[0_0_15px_rgba(216,180,226,0.4)] relative z-10">
                "Dari ribuan bahasa di dunia, tidak ada yang bisa menyamai kecantikanmu."
              </p>
              
              <div className="w-16 h-px bg-purple-500/30 mx-auto relative z-10" />
              
              <p className="text-white/70 font-sans text-sm md:text-base font-light tracking-widest uppercase leading-relaxed mt-2 relative z-10">
                Beberapa hal terlalu indah untuk tidak diungkapkan.<br/> Luangkan waktumu, bernapaslah, dan biarkan ini terungkap.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
            className="absolute bottom-12 flex flex-col items-center gap-4 text-white/40"
          >
            <span className="text-[10px] tracking-[0.3em] uppercase">Gulir perlahan</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </motion.div>
        </section>

        {/* Content Section 1 */}
        <section className="min-h-screen flex items-center justify-center px-6 py-24">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2 }}
            className="glass-card max-w-2xl w-full p-10 md:p-16 rounded-[2rem] text-center relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-300/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="mb-12 space-y-6">
              <p className="font-serif italic text-2xl md:text-3xl text-purple-300 drop-shadow-[0_0_10px_rgba(216,180,226,0.3)]">
                "100 nuansa aku mencintaimu..."
              </p>
              
              {/* Translations Background Texture */}
              <div className="relative max-w-2xl mx-auto h-[120px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(20,10,30,0.8)] z-10 pointer-events-none" />
                <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[10px] md:text-xs text-white/20 italic font-light opacity-80">
                  {loveTranslations.map((phrase, i) => (
                    <span key={i} className="whitespace-nowrap">
                      {phrase} <span className="text-purple-500/30 ml-2">•</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="w-24 h-px bg-purple-500/30 mx-auto mb-12" />

            <h2 className="font-serif text-3xl md:text-4xl text-white/90 mb-8 italic">Alasannya</h2>
            <p className="font-sans text-white/70 leading-relaxed text-lg md:text-xl font-light mb-12">
              Di dunia yang terus bergegas, menemukan ruang yang terasa seperti embusan napas lega sangatlah langka. Kamulah ruang itu. Ini bukan hanya sekumpulan kata atau warna; ini adalah cerminan kehangatan yang kamu bawa di hari-hari biasa.
            </p>
            
            <div className="space-y-4">
              <p className="font-sans text-white/80 text-lg md:text-xl font-light leading-relaxed max-w-xl mx-auto">
                Dari semua orang yang pernah kutemui dalam hidupku, kamu adalah yang terbaik.
              </p>
              <p className="font-sans text-fuchsia-200/90 font-medium tracking-widest uppercase text-sm md:text-base drop-shadow-md">
                Kamu adalah orang favoritku.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Code of Love Section */}
        <section className="min-h-screen flex items-center justify-center px-6 py-24">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2 }}
            className="w-full max-w-4xl"
          >
            <div className="flex flex-col items-center mb-12">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <Code2 className="w-8 h-8 text-purple-400 mb-6 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
              </motion.div>
              <h2 className="font-serif text-3xl md:text-4xl text-white/90 italic text-glow text-center">
                Tertulis di Bintang (dan Kode)
              </h2>
            </div>
            
            <div className="glass-card rounded-[2rem] overflow-hidden border border-purple-500/20 shadow-2xl relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Fake IDE Header */}
              <div className="bg-black/40 border-b border-white/5 px-4 py-3 flex items-center gap-2">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="ml-4 text-xs font-mono text-white/40">heart.ts</div>
              </div>
              
              {/* Romantic Content */}
              <div className="p-6 md:p-8 font-serif text-lg md:text-xl overflow-x-auto text-center italic text-white/80 leading-relaxed">
                "Di lautan manusia, mataku akan selalu mencarimu. Kamu adalah puisi yang tak pernah kutahu cara menulisnya, dan lagu yang akan selalu dinyanyikan hatiku."
              </div>
            </div>
          </motion.div>
        </section>

        {/* Gallery Section */}
        <section className="min-h-screen py-24 px-6 flex flex-col items-center justify-center">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-4xl text-white/90 mb-16 text-center italic"
          >
            Ini untukmu istriku
          </motion.h2>
          <Gallery />
        </section>

        {/* Beautiful Person Section */}
        <section className="min-h-screen py-24 px-6 flex flex-col items-center justify-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-white/40 text-sm tracking-[0.2em] uppercase mb-6"
          >
            Keajaiban Itu Sendiri
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-serif text-3xl md:text-5xl text-white/90 mb-14 text-center italic"
          >
            Orang Paling Cantik
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1 }}
            className="glass-card max-w-lg w-full aspect-square rounded-[2rem] overflow-hidden relative mx-auto border border-purple-500/30 shadow-[0_0_40px_rgba(168,85,247,0.2)] bg-black/40"
          >
            <img
              src={myWifeImg}
              alt="My Wife"
              className="w-full h-full object-contain p-4"
              loading="lazy"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="max-w-xl mt-12 text-center"
          >
            <p className="font-sans text-white/40 text-xs tracking-[0.2em] uppercase mb-4">
              ISTRIKU
            </p>
            <p className="font-sans text-white/70 leading-relaxed text-lg md:text-xl font-light">
              Setiap momen indah dalam hidupku selalu ada kamu di dalamnya. Kamu adalah cahaya yang membimbingku dan kehangatan yang mengelilingiku. Senyummu adalah mahakarya favoritku, dan cintamu adalah harta terbesarku.
            </p>
          </motion.div>
        </section>

        {/* Flirty Pickup Line Section */}
        <section className="min-h-[60vh] flex items-center justify-center px-6 py-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1 }}
            className="glass-card max-w-2xl w-full p-8 md:p-12 rounded-[2rem] text-center relative overflow-hidden group border border-purple-500/20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <motion.div
              animate={{ rotate: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="mb-6 inline-block"
            >
              <Sparkles className="w-8 h-8 text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
            </motion.div>
            
            <h3 className="font-serif text-2xl md:text-3xl text-white/90 mb-6 italic">Sekadar pikiran...</h3>
            <p className="font-sans text-white/70 leading-relaxed text-lg md:text-xl font-light">
              Aku ingin mencari kata-kata yang sempurna untuk menggambarkan perasaanku, tetapi setiap kali aku menatap matamu, aku melupakan segalanya.
            </p>
            <div className="w-12 h-px bg-white/20 mx-auto my-6" />
            <p className="font-serif text-purple-200/90 leading-relaxed text-xl md:text-2xl italic">
              "Apakah kamu seorang pesulap? Karena setiap kali aku melihatmu, semua orang menghilang."
            </p>
          </motion.div>
        </section>

        {/* Envelope Section */}
        <section className="min-h-[80vh] flex items-center justify-center px-6 py-24 perspective-1000">
          <div className="max-w-3xl w-full flex flex-col items-center">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-white/40 text-sm tracking-[0.2em] uppercase mb-12"
            >
              Sepucuk surat untukmu
            </motion.p>
            <Envelope />
          </div>
        </section>

        {/* Credits Section */}
        <section className="py-32 px-6 flex justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="glass-card rounded-[2rem] p-8 md:p-12 text-center max-w-md w-full relative"
          >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 glass rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.3)]">
              <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            
            <h3 className="font-serif text-2xl text-white/90 mb-8 italic">Simfoni Kode & Seni</h3>
            
            <div className="space-y-6 font-sans text-sm tracking-[0.1em]">
              <div className="flex flex-col items-center gap-1">
                <span className="text-white/40 uppercase text-[10px]">Pemilik</span>
                <span className="text-white/90 font-medium tracking-widest">ISTRIKU</span>
                <p className="text-white/50 text-xs mt-3 italic font-serif tracking-wider">Ini adalah foto pemilik:</p>
                <div 
                  className="mt-2 w-32 h-32 md:w-40 md:h-40 shrink-0 rounded-2xl overflow-hidden cursor-pointer border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:scale-105 transition-all duration-300 relative group"
                  onClick={() => setOpenedPhoto(myWifeImg)}
                >
                  <img src={myWifeImg} alt="Owner" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                </div>
              </div>
              
              <div className="w-12 h-px bg-white/10 mx-auto" />
              
              <div className="flex flex-col items-center gap-1">
                <span className="text-white/40 uppercase text-[10px]">Rekan Pemilik</span>
                <span className="text-white/90 font-medium tracking-widest">BAKA</span>
                <p className="text-white/50 text-xs mt-3 italic font-serif tracking-wider">Ini adalah foto rekan pemilik:</p>
                <div 
                  className="mt-2 w-32 h-32 md:w-40 md:h-40 shrink-0 rounded-2xl overflow-hidden cursor-pointer border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:scale-105 transition-all duration-300 relative group"
                  onClick={() => setOpenedPhoto(bakaImg)}
                >
                  <img src={bakaImg} alt="Co-Owner" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Magical Closing Section */}
        <section className="h-[100vh] relative flex items-center justify-center overflow-hidden">
          {/* Night sky overlay specific to this section */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050508] pointer-events-none" />
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 2 }}
            className="text-center relative z-10 px-6"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="mb-8"
            >
              <Heart className="w-8 h-8 mx-auto text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" strokeWidth={1.5} fill="rgba(168,85,247,0.2)" />
            </motion.div>
            
            <h2 className="font-serif text-4xl md:text-6xl text-white/90 italic text-glow">
              Terima kasih telah berkunjung
            </h2>
            <p className="mt-6 text-white/40 font-sans tracking-[0.2em] text-xs uppercase">
              Kamu sangat berarti bagiku
            </p>
          </motion.div>
        </section>
      </main>

      <AnimatePresence>
        {openedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-4 md:p-8"
            onClick={() => setOpenedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-[90vw] max-w-2xl aspect-square max-h-[85vh] rounded-3xl overflow-hidden border border-purple-500/30 shadow-[0_0_40px_rgba(168,85,247,0.3)] shrink-0 bg-black/40 flex items-center justify-center"
            >
              <img 
                src={openedPhoto} 
                alt="Full Photo" 
                className="w-full h-full object-contain p-2 md:p-4"
              />
              <button 
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-colors"
                onClick={(e) => { e.stopPropagation(); setOpenedPhoto(null); }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
