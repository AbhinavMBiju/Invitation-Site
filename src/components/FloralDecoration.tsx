export function FloralDecoration({ position }: { position: 'top-right' | 'bottom-left' }) {
  const positionClasses = position === 'top-right' 
    ? 'top-0 right-0' 
    : 'bottom-0 left-0';
  
  const rotation = position === 'top-right' ? '' : 'rotate-180';

  return (
    <div className={`absolute ${positionClasses} w-48 h-48 md:w-64 md:h-64 opacity-30 pointer-events-none ${rotation}`}>
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Floral illustration with pastel colors */}
        
        {/* Leaves */}
        <path d="M150 50 Q165 35, 180 40 Q175 55, 160 60 Z" fill="#D4A5A5" opacity="0.6"/>
        <path d="M140 30 Q150 15, 165 18 Q162 33, 150 38 Z" fill="#C9B8A8" opacity="0.7"/>
        <path d="M160 70 Q175 65, 185 75 Q178 85, 165 82 Z" fill="#B8C9A8" opacity="0.6"/>
        
        {/* Main flower 1 */}
        <circle cx="145" cy="55" r="8" fill="#E8C4C4" opacity="0.8"/>
        <circle cx="155" cy="50" r="8" fill="#E8C4C4" opacity="0.8"/>
        <circle cx="160" cy="60" r="8" fill="#E8C4C4" opacity="0.8"/>
        <circle cx="155" cy="68" r="8" fill="#E8C4C4" opacity="0.8"/>
        <circle cx="145" cy="65" r="8" fill="#E8C4C4" opacity="0.8"/>
        <circle cx="152" cy="58" r="6" fill="#D4A5A5" opacity="0.9"/>
        
        {/* Small flower 2 */}
        <circle cx="120" cy="40" r="6" fill="#DBC8B8" opacity="0.8"/>
        <circle cx="128" cy="37" r="6" fill="#DBC8B8" opacity="0.8"/>
        <circle cx="132" cy="45" r="6" fill="#DBC8B8" opacity="0.8"/>
        <circle cx="128" cy="52" r="6" fill="#DBC8B8" opacity="0.8"/>
        <circle cx="120" cy="48" r="6" fill="#DBC8B8" opacity="0.8"/>
        <circle cx="125" cy="44" r="4" fill="#C9A89B" opacity="0.9"/>
        
        {/* Small flower 3 */}
        <circle cx="165" cy="85" r="5" fill="#D4C4B8" opacity="0.8"/>
        <circle cx="172" cy="83" r="5" fill="#D4C4B8" opacity="0.8"/>
        <circle cx="175" cy="90" r="5" fill="#D4C4B8" opacity="0.8"/>
        <circle cx="172" cy="96" r="5" fill="#D4C4B8" opacity="0.8"/>
        <circle cx="165" cy="94" r="5" fill="#D4C4B8" opacity="0.8"/>
        <circle cx="169" cy="89" r="3" fill="#C4A89B" opacity="0.9"/>
        
        {/* Decorative dots and small elements */}
        <circle cx="135" cy="25" r="2" fill="#D4A5A5" opacity="0.6"/>
        <circle cx="145" cy="20" r="2" fill="#C9B8A8" opacity="0.6"/>
        <circle cx="170" cy="95" r="2" fill="#B8C9A8" opacity="0.6"/>
        <circle cx="180" cy="88" r="2" fill="#D4A5A5" opacity="0.6"/>
        
        {/* Stems */}
        <path d="M152 58 Q140 70, 135 85" stroke="#B8A89B" strokeWidth="1.5" opacity="0.4" fill="none"/>
        <path d="M125 44 Q115 55, 110 70" stroke="#B8A89B" strokeWidth="1.5" opacity="0.4" fill="none"/>
        <path d="M169 89 Q175 100, 178 115" stroke="#B8A89B" strokeWidth="1.5" opacity="0.4" fill="none"/>
      </svg>
    </div>
  );
}
