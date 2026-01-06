import React from 'react';
import { CreatorProfile, Project } from '../types';
import { Twitter, Youtube, Github, ArrowRight, Star, Users, Book, Globe } from 'lucide-react';

interface CreatorPublicProfileProps {
  creator: CreatorProfile;
  projects: Project[];
  onBack: () => void;
}

const CreatorPublicProfile: React.FC<CreatorPublicProfileProps> = ({ creator, projects, onBack }) => {
  return (
    <div className="flex-1 h-full bg-white overflow-y-auto relative">
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 pb-24">
        
        {/* Header / Hero Section */}
        <div className="mb-16 animate-fadeIn">
            <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm p-10 md:p-14 flex flex-col md:flex-row items-start gap-10 md:gap-14 relative overflow-hidden group">
                
                {/* Close/Back Button */}
                <button 
                    onClick={onBack}
                    className="absolute top-8 right-8 text-xs font-bold text-gray-400 hover:text-gray-800 bg-gray-50 hover:bg-white px-4 py-2 rounded-full transition-all border border-transparent hover:border-gray-200"
                >
                    关闭主页
                </button>

                {/* Avatar with Ring */}
                <div className="relative shrink-0 mx-auto md:mx-0">
                    <div className="w-40 h-40 rounded-full p-2 bg-gradient-to-br from-white/80 to-white/20 backdrop-blur-md shadow-lg border border-gray-100">
                        <img 
                            src={creator.avatar} 
                            alt={creator.name} 
                            className="w-full h-full rounded-full object-cover shadow-inner"
                        />
                    </div>
                    <div className="absolute bottom-2 right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white shadow-md" title="在线"></div>
                </div>

                {/* Text Content */}
                <div className="flex-1 text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-2">{creator.name}</h1>
                    <p className="text-lg text-gray-500 font-medium mb-6">@{creator.id}</p>
                    
                    <p className="text-xl text-gray-700 leading-relaxed max-w-2xl mb-8 font-light mx-auto md:mx-0">
                        {creator.bio}
                    </p>

                    {/* Socials & Actions */}
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                        {creator.socials.map(social => (
                            <a 
                                key={social.platform} 
                                href={social.url} 
                                className="flex items-center gap-2 px-5 py-3 rounded-full bg-gray-50 hover:bg-white border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md transition-all group/social"
                            >
                                {social.platform === 'twitter' && <Twitter size={18} className="text-gray-400 group-hover/social:text-blue-400 transition-colors" />}
                                {social.platform === 'youtube' && <Youtube size={18} className="text-gray-400 group-hover/social:text-red-500 transition-colors" />}
                                {social.platform === 'github' && <Github size={18} className="text-gray-400 group-hover/social:text-gray-900 transition-colors" />}
                                <span className="text-sm font-bold text-gray-600 group-hover/social:text-gray-900 capitalize">{social.platform}</span>
                            </a>
                        ))}
                         <div className="w-px h-8 bg-gray-300 mx-2 hidden md:block"></div>
                         <button className="px-6 py-3 bg-gray-900 text-white rounded-full font-bold text-sm hover:scale-105 active:scale-95 transition-transform shadow-lg shadow-gray-200">
                             关注
                         </button>
                    </div>
                </div>
            </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
             {[
                 { label: "订阅者", value: "12.5k", icon: Users },
                 { label: "知识库", value: projects.length, icon: Book },
                 { label: "平均评分", value: "4.9/5", icon: Star },
                 { label: "个人网站", value: "alex.dev", icon: Globe },
             ].map((stat, i) => (
                 <div key={i} className="bg-gray-50 border border-gray-100 p-6 rounded-[2rem] text-center flex flex-col items-center justify-center hover:bg-white transition-colors">
                     <stat.icon size={20} className="text-gray-400 mb-2" />
                     <span className="text-2xl font-extrabold text-gray-800">{stat.value}</span>
                     <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.label}</span>
                 </div>
             ))}
        </div>

        {/* Works / Projects Section */}
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <span className="bg-amber-100 text-amber-600 p-2 rounded-xl"><Book size={20} /></span>
                全部知识库
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map(project => (
                    <div key={project.id} className="group bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-500 overflow-hidden flex flex-col hover:-translate-y-1 cursor-pointer">
                        <div className="h-48 bg-gradient-to-br from-gray-50 to-gray-100 relative p-8">
                             {/* Decorative patterns */}
                             <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
                             
                             <div className="relative z-10 h-full flex flex-col justify-between">
                                 <span className={`self-start px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm border border-white/20 shadow-sm ${project.status === 'published' ? 'bg-green-100/80 text-green-700' : 'bg-gray-100/80 text-gray-600'}`}>
                                     {project.status === 'published' ? '可订阅' : '即将推出'}
                                 </span>
                                 <h3 className="text-2xl font-bold text-gray-800 leading-tight group-hover:text-amber-600 transition-colors">{project.title}</h3>
                             </div>
                        </div>
                        
                        <div className="p-8 flex-1 flex flex-col justify-between">
                            <p className="text-gray-500 text-sm font-medium leading-relaxed mb-6">{project.description}</p>
                            
                            <div className="flex items-center justify-between border-t border-gray-100 pt-6">
                                <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                                    <Star size={12} className="text-amber-400 fill-amber-400" />
                                    <span>{project.stats.sales > 0 ? '4.8' : 'New'}</span>
                                    <span>•</span>
                                    <span>{project.stats.views > 1000 ? '1k+' : project.stats.views} 浏览</span>
                                </div>
                                <button className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center group-hover:bg-amber-500 transition-colors shadow-lg shadow-gray-200">
                                    <ArrowRight size={18} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
};

export default CreatorPublicProfile;