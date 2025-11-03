import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar, ChevronDown } from 'lucide-react';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { FloralDecoration } from './components/FloralDecoration';
import { QRCodeBox } from './components/QRCodeBox';
import { CountdownTimer } from './components/CountdownTimer';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

export default function App() {
  const [isSection2Visible, setIsSection2Visible] = useState(false);

  const scrollToSection2 = () => {
    document.getElementById('wedding-details')?.scrollIntoView({ behavior: 'smooth' });
    setIsSection2Visible(true);
  };

  // Refs for background parallax
  const sectionRef = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);

  // Subtle parallax / motion for the background while scrolling
  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      if (!sectionRef.current || !bgRef.current) return;
      const el = sectionRef.current;
      const sectionTop = el.offsetTop;
      const sectionHeight = el.offsetHeight || window.innerHeight;
      const scrollY = window.scrollY || window.pageYOffset;

      // progress 0..1 as the user scrolls past the section top
      const raw = (scrollY - sectionTop) / sectionHeight;
      const progress = Math.min(Math.max(raw, 0), 1);

      const translate = progress * 30; // move up to 30px
      const scale = 1 + progress * 0.02; // slight scale up to 1.02

      bgRef.current.style.transform = `translateY(${translate}px) scale(${scale})`;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    // initial update
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Using local image files (place these in the project root or preferably in `public/`)
  const engagementPhotos = [
    '/cardnew1.jpg',
    '/Cardimg2.png',
    '/card3new.jpg',
    '/Cardimg4.png',
  ];

  return (
    <div className="min-h-screen bg-[#F8F4F0]" style={{ fontFamily: "'Lato', 'Open Sans', sans-serif" }}>
      {/* Section 1: Home - Bride & Groom Introduction */}
      <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center px-4 py-16 overflow-hidden" style={{
        backgroundImage: `url("/cardbg.jpg")`,
        backgroundSize: 'cover',
        backgroundPosition: '50% 50%',
        backgroundRepeat: 'no-repeat',
        color: '#F9F5F1'
      }}>
        {/* Background layer (will animate with scroll) */}
        <div ref={bgRef} className="absolute inset-0" style={{
          backgroundImage: `url("/cardbg.jpg")`,
          backgroundSize: 'cover',
          backgroundPosition: '50% 50%',
          backgroundRepeat: 'no-repeat',
          willChange: 'transform',
          transform: 'translateY(0px) scale(1)'
        }} />

        {/* Slightly lighter overlay so ivory text reads bright */}
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Floral decorations */}
        <FloralDecoration position="top-right" />
        <FloralDecoration position="bottom-left" />
        
        {/* Main content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-2xl text-[#F9F5F1]"
        >
          <div className="space-y-8">
            {/* Header */}
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="tracking-[0.3em] text-[#F9F5F1] opacity-90"
              style={{ fontSize: '0.875rem', fontWeight: '400' }}
            >
              WE'RE GETTING MARRIED
            </motion.h1>
            
            {/* Names */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="space-y-6"
            >
              <div style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', serif" }}>
                <div style={{ fontSize: '3.5rem', lineHeight: '1.2', color: '#F9F5F1' }}>Aparna</div>
                <div className="w-32 h-px bg-[#F9F5F1] mx-auto my-6 opacity-40"></div>
                <div style={{ fontSize: '3.5rem', lineHeight: '1.2', color: '#F9F5F1' }}>Ashith</div>
              </div>
            </motion.div>
            
            {/* Subtext */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-[#F9F5F1] max-w-md mx-auto px-4"
              style={{ fontSize: '1rem', lineHeight: '1.7' }}
            >
              Together with our families, we invite you to celebrate our union.
            </motion.p>
          </div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.button
          onClick={scrollToSection2}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#F9F5F1] opacity-90 hover:opacity-100 transition-opacity cursor-pointer group"
          aria-label="Scroll to wedding details"
        >
          
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.button>
      </section>

      {/* Section 2: Wedding Details */}
      <section id="wedding-details" className="relative min-h-screen px-4 py-16 md:py-24">
        <div className="max-w-5xl mx-auto space-y-16">
          {/* Section Title */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center text-[#4B3B33]"
            style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', serif", fontSize: '2.5rem', lineHeight: '1.3' }}
          >
            Wedding Details
          </motion.h2>

          {/* Date & Time Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Card className="bg-[#FFFEFB] rounded-2xl shadow-md border border-[#E8E0D8] overflow-hidden">
              <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#E8E0D8]">
                {/* Date */}
                <div className="p-8 flex flex-col items-center justify-center text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#D4A5A5] bg-opacity-20 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-[#4B3B33]" />
                  </div>
                  <div className="text-[#8B7B73] tracking-wide" style={{ fontSize: '0.875rem' }}>DATE</div>
                  <div className="text-[#4B3B33]" style={{ fontSize: '1.25rem', fontFamily: "'Playfair Display', 'Cormorant Garamond', serif" }}>
                    28 December 2025
                    <div style={{ fontSize: '1rem' }}>(Sunday)</div>
                  </div>
                </div>
                
                {/* Time */}
                <div className="p-8 flex flex-col items-center justify-center text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#D4A5A5] bg-opacity-20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#4B3B33]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                      <path strokeWidth="2" strokeLinecap="round" d="M12 6v6l4 2"/>
                    </svg>
                  </div>
                  <div className="text-[#8B7B73] tracking-wide" style={{ fontSize: '0.875rem' }}>TIME</div>
                  <div className="text-[#4B3B33]" style={{ fontSize: '1.25rem', fontFamily: "'Playfair Display', 'Cormorant Garamond', serif" }}>
                    Between 12:05 & 12:30 PM 
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Venue Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <h3 className="text-[#4B3B33]" style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', serif", fontSize: '1.875rem' }}>
                Venue Location
              </h3>
              <p className="text-[#4B3B33] max-w-2xl mx-auto" style={{ fontSize: '1.125rem' }}>
                River Banks Madapparambil Resort
              </p>
              <p className="text-[#6B5B53] text-sm max-w-xl mx-auto">
                Idukki Road, Thodupuzha, Idukki, Kerala 685587
              </p>
            </div>

            {/* Action Buttons and QR Code */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <Button 
                onClick={() => window.open('https://maps.app.goo.gl/dxffgSQuP4AEacFo8', '_blank')}
                className="bg-[#4B3B33] hover:bg-[#3B2B23] text-white px-8 py-6 rounded-full shadow-md transition-all hover:shadow-lg"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Get Directions
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => {
                  const event = {
                    title: 'Aparna & Ashith Wedding',
                    description: 'Wedding ceremony at River Banks Madapparambil Resort',
                    location: 'River Banks Madapparambil Resort, Idukki Road, Thodupuzha, Idukki, Kerala 685587',
                    start: '2025-12-28T11:00:00',
                    end: '2025-12-28T16:00:00'
                  };
                  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.start.replace(/[-:]/g, '')}/${event.end.replace(/[-:]/g, '')}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
                  window.open(googleCalendarUrl, '_blank');
                }}
                className="border-[#4B3B33] text-[#4B3B33] hover:bg-[#4B3B33] hover:text-white px-8 py-6 rounded-full shadow-sm transition-all"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Add to Calendar
              </Button>
            </div>

            {/* QR Code */}
            <div className="flex justify-center">
              <QRCodeBox />
            </div>
          </motion.div>

          {/* Google Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="rounded-2xl overflow-hidden shadow-lg border border-[#E8E0D8]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.6218371620084!2d76.72402507427691!3d9.867194275307346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b07c42ea483f57b%3A0xd056edfb2bf2a8d9!2sRiver%20Banks%20Madapparambil%20Resort!5e1!3m2!1sen!2sin!4v1761990714141!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Wedding venue location"
            ></iframe>
          </motion.div>

          {/* Engagement Memories Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="space-y-8"
          >
            <h3 className="text-center text-[#4B3B33]" style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', serif", fontSize: '1.875rem' }}>
              Gallery
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {engagementPhotos.map((photo, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group"
                >
                  <ImageWithFallback
                    src={photo}
                    alt={`Engagement memory ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#4B3B33]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Countdown Timer */}
          <CountdownTimer />

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-center pt-8 pb-4"
          >
            <div className="w-32 h-px bg-[#4B3B33] mx-auto mb-6 opacity-30"></div>
            <p className="text-[#8B7B73] text-sm">
              We can't wait to celebrate with you
            </p>
            <div className="mt-4 text-[#4B3B33]" style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', serif", fontSize: '1.5rem' }}>
              Aparna & Ashith
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
