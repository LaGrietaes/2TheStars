import { Star } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Logo({ size = 'md', className = '' }: LogoProps) {
  const sizes = {
    sm: {
      text: 'text-lg',
      star: 'w-4 h-4',
      spacing: 'gap-1'
    },
    md: {
      text: 'text-2xl',
      star: 'w-6 h-6',
      spacing: 'gap-2'
    },
    lg: {
      text: 'text-4xl',
      star: 'w-8 h-8',
      spacing: 'gap-3'
    }
  };

  return (
    <div className={`flex items-center justify-center ${sizes[size].spacing} ${className}`}>
      <Star 
        className={`${sizes[size].star} text-yellow-400 fill-yellow-400 animate-pulse`} 
        style={{ animationDelay: '0ms' }}
      />
      <span className={`${sizes[size].text} font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent`}>
        2TheStars
      </span>
      <Star 
        className={`${sizes[size].star} text-yellow-400 fill-yellow-400 animate-pulse`} 
        style={{ animationDelay: '500ms' }}
      />
    </div>
  );
}

// Alternative version with more decorative elements
export function LogoDecorative({ size = 'md', className = '' }: LogoProps) {
  const sizes = {
    sm: {
      text: 'text-lg',
      star: 'w-3 h-3',
      bigStar: 'w-5 h-5',
      spacing: 'gap-1'
    },
    md: {
      text: 'text-2xl',
      star: 'w-4 h-4',
      bigStar: 'w-7 h-7',
      spacing: 'gap-2'
    },
    lg: {
      text: 'text-4xl',
      star: 'w-6 h-6',
      bigStar: 'w-10 h-10',
      spacing: 'gap-3'
    }
  };

  return (
    <div className={`relative flex items-center justify-center ${sizes[size].spacing} ${className}`}>
      {/* Background decoration stars */}
      <div className="absolute -top-2 -left-2">
        <Star className={`${sizes[size].star} text-yellow-300 fill-yellow-300 opacity-50 animate-ping`} />
      </div>
      <div className="absolute -bottom-2 -right-2">
        <Star className={`${sizes[size].star} text-pink-300 fill-pink-300 opacity-50 animate-ping`} style={{ animationDelay: '1s' }} />
      </div>
      
      {/* Main logo */}
      <Star 
        className={`${sizes[size].bigStar} text-yellow-400 fill-yellow-400 animate-pulse drop-shadow-lg`} 
        style={{ animationDelay: '0ms' }}
      />
      <span className={`${sizes[size].text} font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent drop-shadow-sm`}>
        2TheStars
      </span>
      <Star 
        className={`${sizes[size].bigStar} text-yellow-400 fill-yellow-400 animate-pulse drop-shadow-lg`} 
        style={{ animationDelay: '500ms' }}
      />
    </div>
  );
} 