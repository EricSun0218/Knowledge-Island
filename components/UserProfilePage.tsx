import React from 'react';
import { User, PurchasedKnowledge } from '../types';
import { 
  ArrowRight, PenTool, Layers,
  Crown, Plus, History, Compass
} from 'lucide-react';

interface UserProfilePageProps {
  user: User;
  items: PurchasedKnowledge[];
  onBack: () => void;
  onSelectKnowledge: (id: string) => void;
  onSwitchToCreator: () => void;
}

const UserProfilePage: React.FC<UserProfilePageProps> = ({ user, items, onBack, onSelectKnowledge, onSwitchToCreator }) => {
  return (
    <div className="flex-1 h-full bg-white overflow-hidden flex flex-col">
      <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-6 md:py-8 flex flex-col lg:flex-row gap-8 overflow-hidden">
        
        {/* Mobile Back Button (Visible only on small screens) */}
        <div className="md:hidden shrink-0 pb-4">
             <button onClick={onBack} className="flex items-center gap-2 text-gray-500 font-bold hover:text-gray-900 transition-colors bg-gray-50 px-4 py-2 rounded-full"><ArrowRight size={18} className="rotate-180" /> 返回</button>
        </div>

          {/* LEFT SIDEBAR - FULL HEIGHT & FILL SCREEN */}
          <aside className="w-full lg:w-[24rem] shrink-0 flex flex-col gap-6 h-full overflow-hidden">
            
            {/* 1. Identity Section - Minimalist (No Card, No Online Status) */}
            <div className="flex flex-col items-center gap-2 shrink-0 pt-2 pb-2">
               <div className="relative group">
                  <div className="w-20 h-20 rounded-full p-1 bg-white border border-gray-100 shadow-sm">
                    <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="w-full h-full rounded-full object-cover"
                    />
                  </div>
               </div>

               <div className="text-center">
                  <h1 className="text-xl font-black text-gray-900 tracking-tight">{user.name}</h1>
                  <div className="flex items-center justify-center gap-2 mt-1">
                      <span className="text-xs text-gray-400 font-semibold">@{user.email.split('@')[0]}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">{user.joinDate}</span>
                  </div>
               </div>
            </div>

            {/* 2. Widgets Container - EXPANDS TO FILL SCREEN */}
            <div className="flex-1 flex flex-col gap-4 min-h-0">
                
                {/* WIDGET 1: VIP & Wallet (Flex-1 to expand) */}
                <div className="flex-1 relative overflow-hidden rounded-[2.5rem] p-8 bg-[#FFFCF5] border border-amber-100/60 shadow-[0_8px_20px_-6px_rgba(251,191,36,0.08)] group hover:scale-[1.02] transition-transform duration-500 ease-out flex flex-col justify-between">
                    {/* Background Decor */}
                    <div className="absolute -right-8 -top-8 text-amber-500/5 transform rotate-12 group-hover:rotate-6 transition-transform duration-1000 ease-in-out">
                         <Crown size={180} strokeWidth={1.5} />
                    </div>
                    
                    <div className="relative z-10 flex flex-col gap-4">
                        <div className="flex justify-between items-start">
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center gap-2">
                                    <span className="inline-flex items-center gap-1 bg-amber-100/80 text-amber-700 text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm backdrop-blur-sm">
                                        <Crown size={12} strokeWidth={3} /> {user.membershipTier}
                                    </span>
                                </div>
                                <span className="text-[10px] text-amber-900/40 font-bold ml-1">有效期至 {user.membershipExpiresAt}</span>
                            </div>
                            <button className="w-10 h-10 rounded-full bg-white/60 hover:bg-white border border-amber-100/50 flex items-center justify-center text-amber-400 hover:text-amber-600 transition-all shadow-sm active:scale-95">
                                <History size={16} />
                            </button>
                        </div>

                        <div>
                            <div className="text-xs font-extrabold text-amber-900/30 uppercase tracking-widest mb-1 pl-1">钱包余额</div>
                            <div className="flex items-baseline gap-1.5">
                                <span className="text-5xl font-black text-gray-900 tracking-tighter drop-shadow-sm">{user.credits}</span>
                                <span className="text-xl font-bold text-amber-500">积分</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10">
                        <button className="w-full py-4 bg-white text-amber-600 border border-amber-100/50 rounded-2xl text-sm font-bold shadow-sm hover:shadow-lg hover:shadow-amber-100 transition-all active:scale-95 flex items-center justify-center gap-2 group-hover:bg-amber-600 group-hover:text-white group-hover:border-transparent duration-300">
                            <span>管理账户</span>
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </div>

                {/* WIDGET 2: Creator Studio (Flex-1 to expand) */}
                <div 
                    onClick={onSwitchToCreator}
                    className="flex-1 relative overflow-hidden rounded-[2.5rem] p-8 bg-[#F4F5FF] border border-indigo-100/60 shadow-[0_20px_40px_-12px_rgba(99,102,241,0.15)] cursor-pointer group hover:scale-[1.02] transition-transform duration-500 ease-out flex flex-col justify-between"
                >
                     {/* Background Decor */}
                     <div className="absolute -right-8 -bottom-8 text-indigo-500/5 transform -rotate-6 group-hover:rotate-0 transition-transform duration-1000 ease-in-out">
                         <PenTool size={180} strokeWidth={1.5} />
                     </div>

                     <div className="relative z-10 flex flex-col gap-4">
                         <div className="flex justify-between items-start">
                             <div>
                                 <h3 className="text-2xl font-black text-gray-900 tracking-tight leading-none mb-2">创作者<br/>工作室</h3>
                                 <p className="text-xs text-indigo-400 font-bold tracking-wide">仪表盘 & 数据分析</p>
                             </div>
                             <div className="w-12 h-12 rounded-full bg-indigo-100/50 flex items-center justify-center text-indigo-600 backdrop-blur-sm">
                                 <PenTool size={20} />
                             </div>
                         </div>

                         <div className="flex items-center gap-2 bg-white/40 w-fit px-4 py-2 rounded-xl border border-white/40 backdrop-blur-sm">
                             <div className="relative flex h-2.5 w-2.5">
                                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                 <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                             </div>
                             <span className="text-sm font-bold text-gray-700">账户活跃</span>
                         </div>
                     </div>

                     <div className="relative z-10">
                         <button className="w-full py-4 bg-white text-indigo-600 border border-indigo-100/50 rounded-2xl text-sm font-bold shadow-sm hover:shadow-lg hover:shadow-indigo-100 transition-all active:scale-95 flex items-center justify-center gap-2 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-transparent duration-300">
                             打开工作台 <ArrowRight size={18} />
                         </button>
                     </div>
                </div>

            </div>
          </aside>


          {/* RIGHT MAIN CONTENT - SCROLLABLE with Hidden Scrollbar */}
          <main className="flex-1 min-w-0 h-full overflow-y-auto [&::-webkit-scrollbar]:hidden pb-20 pr-1" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
             
             {/* Header */}
             <div className="flex items-center justify-between mb-8 mt-2 sticky top-0 bg-white/90 backdrop-blur-xl z-20 py-4 border-b border-gray-50">
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">我的知识库</h2>
                <div className="flex gap-2">
                    <button className="text-xs font-bold text-gray-400 hover:text-gray-900 px-3 py-1.5 transition-colors">排序</button>
                    <button className="text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-full transition-colors flex items-center gap-1">
                        查看全部 <ArrowRight size={12} />
                    </button>
                </div>
             </div>

             {/* Course Grid - Original Sizes */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {items.map(item => (
                    <div 
                        key={item.id}
                        onClick={() => onSelectKnowledge(item.id)}
                        className="group bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] transition-all duration-500 cursor-pointer flex flex-col h-[320px] overflow-hidden hover:-translate-y-1"
                    >
                        {/* Cover Image */}
                        <div className="h-44 bg-gray-100 relative overflow-hidden shrink-0">
                             <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                             
                             {/* Floating Badges */}
                             <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold text-white flex items-center gap-1 border border-white/10 shadow-sm">
                                 <Layers size={10} /> {item.totalItems} 节内容
                             </div>
                             
                             {/* Play Overlay */}
                             <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                 <div className="w-12 h-12 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg transform scale-50 group-hover:scale-100 transition-transform duration-300">
                                     <ArrowRight size={20} className="text-gray-900 ml-0.5" />
                                 </div>
                             </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex-1 flex flex-col justify-between">
                            <div>
                                <h3 className="font-extrabold text-gray-900 text-xl leading-tight mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                                <div className="flex items-center gap-2">
                                   <div className="w-5 h-5 rounded-full bg-gray-100 border border-gray-200">
                                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.creator}`} alt="" className="w-full h-full rounded-full" />
                                   </div>
                                   <p className="text-xs text-gray-500 font-bold">{item.creator}</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between items-end">
                                    <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest">学习进度</span>
                                    <span className="text-sm font-black text-gray-900">{item.progress}%</span>
                                </div>
                                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.3)]"
                                        style={{ width: `${item.progress}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                
                {/* Explore Card / Add New */}
                 <button className="border-3 border-dashed border-gray-200 hover:border-blue-300 rounded-[2.5rem] flex flex-col items-center justify-center p-8 gap-5 text-gray-400 hover:bg-blue-50/30 transition-all group h-[320px] active:scale-[0.98]">
                     <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:bg-blue-100 group-hover:text-blue-600 shadow-sm">
                         <Compass size={32} />
                     </div>
                     <div className="text-center">
                         <span className="block font-black text-lg text-gray-500 group-hover:text-blue-600 transition-colors">探索更多</span>
                         <span className="text-xs font-bold text-gray-400 mt-2">浏览 500+ 精品课程</span>
                     </div>
                 </button>
             </div>
          </main>
      </div>
    </div>
  );
};

export default UserProfilePage;