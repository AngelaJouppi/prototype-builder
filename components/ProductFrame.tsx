import { Monitor } from 'lucide-react';

interface ProductFrameProps {
  children: React.ReactNode;
}

export function ProductFrame({ children }: ProductFrameProps) {
  return (
    <div className="bg-[#e5e5e5] px-8 py-6">
      <div className="max-w-[1600px] mx-auto">
        {/* Browser Chrome */}
        <div className="bg-[#f0f0f0] rounded-t-lg border-b border-[#d0d0d0] px-4 py-3 flex items-center gap-3 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57]"></div>
            <div className="w-3 h-3 rounded-full bg-[#FEBC2E]"></div>
            <div className="w-3 h-3 rounded-full bg-[#28C840]"></div>
          </div>
          <div className="flex-1 flex items-center justify-center gap-2">
            <Monitor className="w-3.5 h-3.5 text-[#888]" />
            <span className="text-xs text-[#888] font-[--font-weight-semibold]">
              STAHLS.com - Team Builder Artwork Dashboard (Prototype)
            </span>
          </div>
          <div className="w-[60px]"></div> {/* Spacer for centering */}
        </div>
        
        {/* Product Screen Content */}
        <div className="bg-white rounded-b-lg shadow-2xl overflow-hidden border-x border-b border-[#d0d0d0]">
          {children}
        </div>
      </div>
    </div>
  );
}
