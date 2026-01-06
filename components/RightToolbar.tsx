import React from 'react';
import { FileText, Network, PanelRightClose, Bot, ArrowUp, Radio } from 'lucide-react';

interface RightToolbarProps {
  isChatOpen: boolean;
  onToggleChat: () => void;
  onSummary: () => void;
  onMindMap: () => void;
  onPodcast?: () => void;
  className?: string;
}

const RightToolbar: React.FC<RightToolbarProps> = ({ 
  isChatOpen, 
  onToggleChat, 
  onSummary, 
  onMindMap,
  onPodcast,
  className = ""
}) => {
  const handleScrollTop = () => {
    const container = document.getElementById('content-viewer-container');
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
       {/* AI Chat Toggle */}
       <div className="relative group">
          <button 
            onClick={onToggleChat}
            className={`
              w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:scale-110 active:scale-95 border border-white/50 backdrop-blur-md
              ${isChatOpen 
                ? 'bg-blue-600 text-white shadow-blue-200 ring-4 ring-blue-50' 
                : 'bg-white text-gray-500 hover:text-blue-600 hover:bg-white'
              }
            `}
          >
            {isChatOpen ? <PanelRightClose size={22} /> : <Bot size={22} />}
          </button>
          <div className="absolute right-full top-1/2 -translate-y-1/2 mr-4 px-3 py-1.5 bg-gray-900/90 text-white text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all transform translate-x-2 group-hover:translate-x-0 whitespace-nowrap z-50 backdrop-blur">
             {isChatOpen ? '关闭 AI 聊天' : '询问 AI 伴侣'}
          </div>
       </div>

       {/* Tools Separator */}
       <div className="h-px w-8 bg-gray-200/50 mx-auto my-1" />

       {/* Summary Tool */}
       <div className="relative group">
            <button 
                onClick={onSummary}
                className="w-12 h-12 rounded-2xl bg-white text-violet-500 hover:bg-white hover:text-violet-600 hover:scale-110 border border-white/50 flex items-center justify-center transition-all duration-300 shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:shadow-violet-100 active:scale-95"
            >
                <FileText size={20} />
            </button>
            <div className="absolute right-full top-1/2 -translate-y-1/2 mr-4 px-3 py-1.5 bg-gray-900/90 text-white text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all transform translate-x-2 group-hover:translate-x-0 whitespace-nowrap z-50 backdrop-blur">
                生成摘要
            </div>
       </div>

       {/* Mind Map Tool */}
       <div className="relative group">
            <button 
                onClick={onMindMap}
                className="w-12 h-12 rounded-2xl bg-white text-emerald-500 hover:bg-white hover:text-emerald-600 hover:scale-110 border border-white/50 flex items-center justify-center transition-all duration-300 shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:shadow-emerald-100 active:scale-95"
            >
                <Network size={20} />
            </button>
             <div className="absolute right-full top-1/2 -translate-y-1/2 mr-4 px-3 py-1.5 bg-gray-900/90 text-white text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all transform translate-x-2 group-hover:translate-x-0 whitespace-nowrap z-50 backdrop-blur">
                创建思维导图
            </div>
       </div>

       {/* Podcast Tool */}
       {onPodcast && (
           <div className="relative group">
                <button 
                    onClick={onPodcast}
                    className="w-12 h-12 rounded-2xl bg-white text-orange-500 hover:bg-white hover:text-orange-600 hover:scale-110 border border-white/50 flex items-center justify-center transition-all duration-300 shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:shadow-orange-100 active:scale-95"
                >
                    <Radio size={20} />
                </button>
                 <div className="absolute right-full top-1/2 -translate-y-1/2 mr-4 px-3 py-1.5 bg-gray-900/90 text-white text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all transform translate-x-2 group-hover:translate-x-0 whitespace-nowrap z-50 backdrop-blur">
                    生成播客
                </div>
           </div>
       )}

       {/* Scroll to Top */}
       <div className="relative group">
            <button 
                onClick={handleScrollTop}
                className="w-12 h-12 rounded-2xl bg-white text-gray-400 hover:bg-white hover:text-gray-900 hover:scale-110 border border-white/50 flex items-center justify-center transition-all duration-300 shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:shadow-gray-200 active:scale-95"
            >
                <ArrowUp size={20} />
            </button>
             <div className="absolute right-full top-1/2 -translate-y-1/2 mr-4 px-3 py-1.5 bg-gray-900/90 text-white text-xs font-bold rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all transform translate-x-2 group-hover:translate-x-0 whitespace-nowrap z-50 backdrop-blur">
                回到顶部
            </div>
       </div>
    </div>
  );
};

export default RightToolbar;