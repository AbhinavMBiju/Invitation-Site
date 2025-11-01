import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer() {
  const weddingDate = new Date('2025-12-28T12:00:00').getTime();
  
  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date().getTime();
    const difference = weddingDate - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      };
    }

    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Minutes' },
    { value: timeLeft.seconds, label: 'Seconds' }
  ];

  return (
    <div className="space-y-8">
      <motion.h3 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center text-[#4B3B33]" 
        style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', serif", fontSize: '1.875rem' }}
      >
        Counting Down to Forever
      </motion.h3>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto"
      >
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
            className="bg-[#FFFEFB] rounded-2xl shadow-md border border-[#E8E0D8] p-6 flex flex-col items-center justify-center space-y-2"
          >
            <div 
              className="text-[#4B3B33] tabular-nums"
              style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', serif", fontSize: '3rem', lineHeight: '1' }}
            >
              {String(unit.value).padStart(2, '0')}
            </div>
            <div 
              className="text-[#8B7B73] tracking-wider uppercase"
              style={{ fontSize: '0.75rem' }}
            >
              {unit.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
