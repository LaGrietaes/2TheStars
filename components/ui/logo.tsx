import { Star, Sparkles } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  variant?: 'standard' | 'decorative';
}

export function Logo({ size = 'md', className = '', variant = 'standard' }: LogoProps) {
  const sizes = {
    sm: {
      text: 'text-xl',
      star: 'w-5 h-5',
      container: 'h-8',
      spacing: 'gap-2'
    },
    md: {
      text: 'text-3xl',
      star: 'w-7 h-7',
      container: 'h-12',
      spacing: 'gap-3'
    },
    lg: {
      text: 'text-5xl',
      star: 'w-10 h-10',
      container: 'h-16',
      spacing: 'gap-4'
    }
  };

  if (variant === 'decorative') {
    return <LogoDecorative size={size} className={className} />;
  }

  return (
    <div className={`flex items-center justify-center ${sizes[size].spacing} ${sizes[size].container} ${className}`}>
      {/* Left Star with sophisticated glow */}
      <div className="relative">
        <Star 
          className={`${sizes[size].star} text-yellow-300 fill-yellow-300 animate-pulse drop-shadow-2xl`}
          style={{ 
            animationDelay: '0ms',
            filter: 'drop-shadow(0 0 8px rgba(253, 224, 71, 0.6))'
          }}
        />
        <div className={`absolute inset-0 ${sizes[size].star} text-yellow-200 fill-yellow-200 animate-ping opacity-30`}>
          <Star className="w-full h-full" />
        </div>
      </div>

      {/* Enhanced Typography */}
      <div className="relative">
        <span className={`${sizes[size].text} font-black tracking-tight bg-gradient-to-r from-yellow-200 via-pink-300 to-purple-300 bg-clip-text text-transparent`}>
          2The
        </span>
        <span className={`${sizes[size].text} font-black tracking-tight bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent`}>
          Stars
        </span>
        {/* Subtle text glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 via-pink-300 to-purple-300 bg-clip-text text-transparent opacity-20 blur-sm pointer-events-none">
          <span className={`${sizes[size].text} font-black tracking-tight`}>
            2TheStars
          </span>
        </div>
      </div>

      {/* Right Star with sophisticated glow */}
      <div className="relative">
        <Star 
          className={`${sizes[size].star} text-pink-300 fill-pink-300 animate-pulse drop-shadow-2xl`}
          style={{ 
            animationDelay: '600ms',
            filter: 'drop-shadow(0 0 8px rgba(249, 168, 212, 0.6))'
          }}
        />
        <div className={`absolute inset-0 ${sizes[size].star} text-pink-200 fill-pink-200 animate-ping opacity-30`} style={{ animationDelay: '600ms' }}>
          <Star className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}

// Professional decorative version with constellation theme
export function LogoDecorative({ size = 'md', className = '' }: LogoProps) {
  const sizes = {
    sm: {
      text: 'text-xl',
      star: 'w-4 h-4',
      bigStar: 'w-6 h-6',
      sparkle: 'w-3 h-3',
      container: 'h-12',
      spacing: 'gap-2'
    },
    md: {
      text: 'text-3xl',
      star: 'w-5 h-5',
      bigStar: 'w-8 h-8',
      sparkle: 'w-4 h-4',
      container: 'h-16',
      spacing: 'gap-3'
    },
    lg: {
      text: 'text-5xl',
      star: 'w-7 h-7',
      bigStar: 'w-12 h-12',
      sparkle: 'w-6 h-6',
      container: 'h-20',
      spacing: 'gap-4'
    }
  };

  return (
    <div className={`relative flex items-center justify-center ${sizes[size].spacing} ${sizes[size].container} ${className}`}>
      {/* Constellation background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Top sparkles */}
        <Sparkles className={`absolute top-0 left-1/4 ${sizes[size].sparkle} text-yellow-200 opacity-40 animate-pulse`} style={{ animationDelay: '1s' }} />
        <Sparkles className={`absolute top-1 right-1/4 ${sizes[size].sparkle} text-blue-200 opacity-40 animate-pulse`} style={{ animationDelay: '2s' }} />
        
        {/* Bottom sparkles */}
        <Star className={`absolute bottom-0 left-1/3 ${sizes[size].star} text-purple-200 fill-purple-200 opacity-30 animate-ping`} style={{ animationDelay: '1.5s' }} />
        <Star className={`absolute bottom-1 right-1/3 ${sizes[size].star} text-pink-200 fill-pink-200 opacity-30 animate-ping`} style={{ animationDelay: '2.5s' }} />
      </div>
      
      {/* Main Stars with enhanced effects */}
      <div className="relative">
        <Star 
          className={`${sizes[size].bigStar} text-yellow-300 fill-yellow-300 animate-pulse`}
          style={{ 
            animationDelay: '0ms',
            filter: 'drop-shadow(0 0 12px rgba(253, 224, 71, 0.7)) drop-shadow(0 0 24px rgba(253, 224, 71, 0.3))'
          }}
        />
        {/* Rotating glow effect */}
        <div className={`absolute inset-0 ${sizes[size].bigStar} text-yellow-200 fill-yellow-200 opacity-20 animate-spin`} style={{ animationDuration: '8s' }}>
          <Star className="w-full h-full" />
        </div>
      </div>

      {/* Premium Typography with letter spacing */}
      <div className="relative px-2">
        <div className={`${sizes[size].text} font-black tracking-wide relative`}>
          {/* Main text with sophisticated gradient */}
          <span className="bg-gradient-to-r from-yellow-200 via-pink-300 to-purple-300 bg-clip-text text-transparent">
            2The
          </span>
          <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            Stars
          </span>
          
          {/* Animated shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent bg-clip-text text-transparent opacity-0 animate-pulse" style={{ animationDelay: '3s', animationDuration: '2s' }}>
            <span className={`${sizes[size].text} font-black tracking-wide`}>
              2TheStars
            </span>
          </div>
        </div>
        
        {/* Subtle text shadow */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 via-pink-300 to-purple-300 bg-clip-text text-transparent opacity-10 blur-lg pointer-events-none">
          <span className={`${sizes[size].text} font-black tracking-wide`}>
            2TheStars
          </span>
        </div>
      </div>

      {/* Right Star with enhanced effects */}
      <div className="relative">
        <Star 
          className={`${sizes[size].bigStar} text-pink-300 fill-pink-300 animate-pulse`}
          style={{ 
            animationDelay: '600ms',
            filter: 'drop-shadow(0 0 12px rgba(249, 168, 212, 0.7)) drop-shadow(0 0 24px rgba(249, 168, 212, 0.3))'
          }}
        />
        {/* Rotating glow effect */}
        <div className={`absolute inset-0 ${sizes[size].bigStar} text-pink-200 fill-pink-200 opacity-20 animate-spin`} style={{ animationDuration: '8s', animationDirection: 'reverse', animationDelay: '600ms' }}>
          <Star className="w-full h-full" />
        </div>
      </div>
    </div>
  );
} 