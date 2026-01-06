import React, { useState } from 'react';
import { FileNode, PublishConfig } from '../types';
import FileTree from './FileTree';
import { MOCK_PROJECTS, MOCK_ANALYTICS } from '../constants';
import { 
  FolderPlus, FilePlus, Upload, Save, Settings, 
  Eye, EyeOff, Check, X, DollarSign, Lock, ShieldAlert, Type, Mic,
  Layout, BarChart2, Briefcase, Plus, Users, Clock, MessageSquare, Book, HelpCircle, LogOut
} from 'lucide-react';

interface CreatorStudioProps {
  files: FileNode[];
  setFiles: React.Dispatch<React.SetStateAction<FileNode[]>>;
  onExitStudio: () => void;
}

type CreatorView = 'projects' | 'analytics' | 'editor';

const CreatorStudio: React.FC<CreatorStudioProps> = ({ files, setFiles, onExitStudio }) => {
  const [currentView, setCurrentView] = useState<CreatorView>('projects');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // Editor State
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [editorContent, setEditorContent] = useState('');
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [tempPublishConfig, setTempPublishConfig] = useState<PublishConfig>({
    isPublished: false,
    textCost: 5,
    audioCost: 10,
    permissions: { allowCopy: false, allowDownload: false, watermark: true }
  });

  // --- EDITOR LOGIC HELPERS ---
  const findFile = (nodes: FileNode[], id: string): FileNode | null => {
    for (const node of nodes) {
      if (node.id === id) return node;
      if (node.children) {
        const found = findFile(node.children, id);
        if (found) return found;
      }
    }
    return null;
  };
  const selectedFile = selectedFileId ? findFile(files, selectedFileId) : null;

  React.useEffect(() => {
    if (selectedFile && selectedFile.type === 'text') {
      setEditorContent(selectedFile.content || '');
      setTempPublishConfig(selectedFile.publishConfig || {
        isPublished: false,
        textCost: 5,
        audioCost: 10,
        permissions: { allowCopy: false, allowDownload: false, watermark: true }
      });
    }
  }, [selectedFileId, files]);

  const handleCreateFolder = () => {
    const newFolder: FileNode = { id: `folder_${Date.now()}`, name: '新建文件夹', type: 'folder', isOpen: true, children: [] };
    setFiles([...files, newFolder]);
  };
  const handleCreateDoc = () => {
    const newDoc: FileNode = { id: `doc_${Date.now()}`, name: '未命名文档.md', type: 'text', content: '# 新文档\n在此开始写作...', publishConfig: undefined };
    setFiles([...files, newDoc]);
    setSelectedFileId(newDoc.id);
  };
  const handleUpload = () => {
    const newImage: FileNode = { id: `img_${Date.now()}`, name: `图片_${Date.now()}.png`, type: 'image', content: 'https://picsum.photos/600/400' };
    setFiles([...files, newImage]);
  };
  const handleSaveContent = () => {
    if (!selectedFileId) return;
    const updateNodes = (nodes: FileNode[]): FileNode[] => nodes.map(node => {
        if (node.id === selectedFileId) return { ...node, content: editorContent };
        if (node.children) return { ...node, children: updateNodes(node.children) };
        return node;
      });
    setFiles(updateNodes(files));
    alert("保存成功!");
  };
  const handlePublish = () => {
    if (!selectedFileId) return;
    const configToSave = { ...tempPublishConfig, isPublished: true };
    const updateNodes = (nodes: FileNode[]): FileNode[] => nodes.map(node => {
        if (node.id === selectedFileId) return { ...node, publishConfig: configToSave };
        if (node.children) return { ...node, children: updateNodes(node.children) };
        return node;
      });
    setFiles(updateNodes(files));
    setIsPublishModalOpen(false);
    alert("发布设置已更新!");
  };

  // --- VIEW COMPONENTS ---

  const ProjectsView = () => (
    <div className="p-8 animate-fadeIn max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center mb-10">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">我的项目</h1>
                <p className="text-gray-500 mt-2 font-medium">管理你的知识库和数字产品。</p>
            </div>
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-blue-500/30 transition-all hover:scale-105 active:scale-95">
                <Plus size={20} /> 新建项目
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Create New Card (iOS 18 Style) */}
            <div className="border-2 border-dashed border-gray-300/60 rounded-[2.5rem] flex flex-col items-center justify-center p-8 text-gray-400 hover:border-blue-400 hover:bg-blue-50/50 cursor-pointer transition-all duration-300 h-80 group active:scale-95">
                <div className="w-16 h-16 bg-white/80 backdrop-blur rounded-full shadow-[0_8px_16px_rgba(0,0,0,0.05)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform group-hover:text-blue-500">
                    <Plus size={28} />
                </div>
                <span className="font-bold text-lg group-hover:text-blue-600 transition-colors">创建新项目</span>
            </div>

            {/* Existing Projects (iOS 18 Style) */}
            {MOCK_PROJECTS.map(project => (
                <div 
                    key={project.id} 
                    onClick={() => {
                        setSelectedProjectId(project.id);
                        setCurrentView('editor');
                    }}
                    className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-500 cursor-pointer overflow-hidden flex flex-col h-80 group relative"
                >
                    <div className="h-40 bg-gradient-to-br from-blue-100/80 via-indigo-50/50 to-white/20 p-8 flex flex-col justify-between relative">
                         {project.status === 'published' ? (
                             <span className="absolute top-6 right-6 bg-white/80 backdrop-blur-md text-green-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                                 已发布
                             </span>
                         ) : (
                             <span className="absolute top-6 right-6 bg-white/80 backdrop-blur-md text-gray-500 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                                 草稿
                             </span>
                         )}
                         <div className="w-12 h-12 bg-white rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.05)] flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform duration-300">
                             <Book size={24} />
                         </div>
                    </div>
                    <div className="p-8 flex-1 flex flex-col justify-between">
                        <div>
                            <h3 className="font-bold text-gray-900 text-xl leading-tight mb-3 truncate group-hover:text-blue-600 transition-colors">{project.title}</h3>
                            <p className="text-gray-500 text-sm line-clamp-2 font-medium">{project.description}</p>
                        </div>
                        <div className="flex items-center justify-between text-xs font-semibold text-gray-400 mt-4">
                            <span>{project.lastModified}</span>
                            <div className="flex items-center gap-4">
                                <span className="flex items-center gap-1.5"><Eye size={14}/> {project.stats.views}</span>
                                <span className="flex items-center gap-1.5 text-green-600 bg-green-50 px-2 py-0.5 rounded-full"><DollarSign size={12}/> {project.stats.sales}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );

  const AnalyticsView = () => {
      const sortedQuestions = [...MOCK_ANALYTICS.recentQuestions].sort((a, b) => b.count - a.count);

      return (
        <div className="p-8 animate-fadeIn max-w-7xl mx-auto w-full h-full overflow-y-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight">数据仪表盘</h1>
            
            {/* Stats Grid (iOS 18 Cards) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {[
                  { title: "总收入", val: `$${MOCK_ANALYTICS.totalRevenue.toLocaleString()}`, change: "本月增长 12%", icon: DollarSign, color: "text-green-500" },
                  { title: "总读者", val: MOCK_ANALYTICS.totalReaders.toLocaleString(), change: "今日新增 54", icon: Users, color: "text-blue-500" },
                  { title: "活跃订阅", val: MOCK_ANALYTICS.activeSubscribers, change: "留存率 92%", icon: Briefcase, color: "text-amber-500" },
                  { title: "平均阅读时长", val: MOCK_ANALYTICS.avgTimeSpent, change: "较上周 +2m", icon: Clock, color: "text-purple-500" }
                ].map((stat, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col hover:scale-105 transition-transform duration-300">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`p-2 rounded-full bg-gray-50 ${stat.color.replace('text', 'bg').replace('500', '100')}`}>
                           <stat.icon size={16} className={stat.color} />
                        </div>
                        <span className="text-gray-500 text-sm font-bold">{stat.title}</span>
                      </div>
                      <span className="text-3xl font-extrabold text-gray-900 tracking-tight">{stat.val}</span>
                      <span className={`text-xs font-bold mt-2 ${stat.color}`}>{stat.change}</span>
                  </div>
                ))}
            </div>

            {/* FAQs (iOS 18 List Card) */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h2 className="font-bold text-gray-800 flex items-center gap-3 text-lg">
                        <div className="bg-blue-100 p-2 rounded-xl text-blue-600">
                           <MessageSquare size={20} />
                        </div>
                        读者常见问题
                    </h2>
                    <button className="text-xs font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-full hover:bg-blue-100 transition-colors">查看全部</button>
                </div>
                <div className="divide-y divide-gray-100/50">
                    {sortedQuestions.map(q => (
                        <div key={q.id} className="p-8 hover:bg-blue-50/30 transition-colors cursor-pointer group">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-4">
                                     <div className="bg-blue-100/80 text-blue-700 font-bold px-4 py-1.5 rounded-full text-xs border border-blue-200/50 shadow-sm flex items-center gap-1.5 min-w-[110px] justify-center backdrop-blur-sm">
                                        <HelpCircle size={14} />
                                        <span>{q.count} 提问</span>
                                     </div>
                                     <span className="text-xs font-medium text-gray-400">{q.timestamp}</span>
                                </div>
                                <span className="text-xs font-bold text-blue-600 bg-blue-50/80 px-3 py-1.5 rounded-lg border border-blue-100/50">
                                    {q.fileReference}
                                </span>
                            </div>
                            <p className="text-gray-800 mt-3 font-semibold text-xl leading-snug">{q.question}</p>
                            <div className="mt-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                <button className="text-xs bg-blue-600 text-white px-4 py-2 rounded-full font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all">全局回答</button>
                                <button className="text-xs bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-full font-bold hover:bg-gray-50 active:scale-95 transition-all">固定到 FAQ</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      );
  };

  const EditorView = () => (
    <div className="flex h-full w-full">
         {/* Sub-Sidebar for Editor (File Tree) */}
        <aside className="w-72 border-r border-gray-200/60 bg-white flex flex-col shrink-0">
            <div className="p-5 border-b border-gray-200/60 flex items-center justify-between">
                <h2 className="text-xs font-extrabold text-gray-500 uppercase tracking-widest">资源</h2>
                <div className="flex gap-2">
                   <button onClick={handleCreateFolder} className="p-2 hover:bg-blue-100 hover:text-blue-600 rounded-lg text-gray-400 transition-colors"><FolderPlus size={18}/></button>
                   <button onClick={handleCreateDoc} className="p-2 hover:bg-blue-100 hover:text-blue-600 rounded-lg text-gray-400 transition-colors"><FilePlus size={18}/></button>
                   <button onClick={handleUpload} className="p-2 hover:bg-blue-100 hover:text-blue-600 rounded-lg text-gray-400 transition-colors"><Upload size={18}/></button>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto py-4 px-2">
                <FileTree 
                    files={files} 
                    selectedFileId={selectedFileId} 
                    onSelect={(node) => setSelectedFileId(node.id)} 
                    onToggleFolder={() => {}} 
                    theme="blue"
                />
            </div>
        </aside>

        {/* Main Editor Canvas */}
        <main className="flex-1 flex flex-col min-w-0 bg-white">
            {selectedFile ? (
            <>
                {/* Toolbar */}
                <div className="h-16 border-b border-gray-200/60 flex items-center justify-between px-8 bg-white/60 backdrop-blur-md shrink-0 sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                        <span className="font-bold text-gray-800 text-lg">{selectedFile.name}</span>
                        {selectedFile.publishConfig?.isPublished && (
                        <span className="px-3 py-1 bg-green-100/80 text-green-700 text-[10px] rounded-full font-bold uppercase tracking-wider">已发布</span>
                        )}
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <button onClick={handleSaveContent} className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 px-4 py-2 rounded-full hover:bg-gray-100/80 transition-colors">
                            <Save size={18} /> 保存
                        </button>
                        <button 
                        onClick={() => setIsPublishModalOpen(true)}
                        className="flex items-center gap-2 text-sm bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full font-bold shadow-lg shadow-blue-200 transition-all hover:scale-105 active:scale-95"
                        >
                            <Settings size={18} /> 发布
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                {selectedFile.type === 'text' ? (
                    <div className="flex-1 flex flex-col md:flex-row h-full overflow-hidden">
                        <textarea 
                            className="flex-1 p-10 resize-none focus:outline-none font-mono text-sm text-gray-700 leading-relaxed border-r border-gray-100/50 bg-transparent"
                            value={editorContent}
                            onChange={(e) => setEditorContent(e.target.value)}
                            placeholder="在此使用 Markdown 编写内容..."
                        />
                        {/* Live Preview */}
                        <div className="flex-1 p-10 bg-gray-50/30 overflow-y-auto prose prose-sm max-w-none prose-blue prose-headings:font-bold">
                            <h3 className="text-gray-400 uppercase text-xs font-bold mb-6 tracking-widest">预览</h3>
                            <div className="text-gray-800 whitespace-pre-wrap">{editorContent}</div>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                        <div className="bg-gray-50 p-6 rounded-[2rem]">
                            <Eye size={48} className="mb-4 text-gray-300" />
                        </div>
                        <p className="mt-4 font-medium">{selectedFile.type} 类型暂不支持在编辑器中预览。</p>
                    </div>
                )}
            </>
            ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 bg-blue-50/10">
                <div className="w-24 h-24 bg-white rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex items-center justify-center mb-6">
                   <FilePlus size={40} className="text-blue-300" />
                </div>
                <p className="font-bold text-lg text-gray-500">从左侧栏选择一个文件进行编辑。</p>
            </div>
            )}
        </main>

        {/* iOS 18 Style Modal */}
        {isPublishModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/20 backdrop-blur-sm">
                <div className="bg-white/90 backdrop-blur-2xl w-full max-w-lg rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.1)] overflow-hidden animate-fadeIn scale-100 ring-1 ring-white/50">
                    <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-white/50">
                    <h3 className="font-bold text-xl text-gray-900 flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-xl text-blue-600">
                            <Settings size={22} />
                        </div>
                        发布设置
                    </h3>
                    <button onClick={() => setIsPublishModalOpen(false)} className="bg-gray-100 p-2 rounded-full text-gray-500 hover:bg-gray-200 transition-colors">
                        <X size={20} />
                    </button>
                    </div>
                    
                    <div className="p-8 space-y-8">
                    {/* Pricing */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                            <DollarSign size={14} /> 定价 (积分)
                        </h4>
                        <div className="grid grid-cols-2 gap-5">
                            <div className="space-y-2 group">
                                <label className="text-sm font-bold text-gray-700 flex items-center gap-2 group-hover:text-blue-600 transition-colors"><Type size={16} /> 文本阅读</label>
                                <input type="number" value={tempPublishConfig.textCost} onChange={(e) => setTempPublishConfig({...tempPublishConfig, textCost: Number(e.target.value)})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all font-semibold text-gray-800" />
                            </div>
                            <div className="space-y-2 group">
                                <label className="text-sm font-bold text-gray-700 flex items-center gap-2 group-hover:text-blue-600 transition-colors"><Mic size={16} /> AI 语音</label>
                                <input type="number" value={tempPublishConfig.audioCost} onChange={(e) => setTempPublishConfig({...tempPublishConfig, audioCost: Number(e.target.value)})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all font-semibold text-gray-800" />
                            </div>
                        </div>
                    </div>
                    <div className="h-px bg-gray-100" />
                    {/* Privacy */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest flex items-center gap-2"><ShieldAlert size={14} /> 隐私与版权</h4>
                        <label className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 bg-white hover:bg-gray-50 cursor-pointer transition-all hover:scale-[1.02] shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className={`p-2 rounded-full ${tempPublishConfig.permissions.allowCopy ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'}`}>{tempPublishConfig.permissions.allowCopy ? <Check size={16} /> : <Lock size={16} />}</div>
                                <span className="font-bold text-gray-700">允许复制文本</span>
                            </div>
                            <input type="checkbox" checked={tempPublishConfig.permissions.allowCopy} onChange={(e) => setTempPublishConfig({...tempPublishConfig, permissions: { ...tempPublishConfig.permissions, allowCopy: e.target.checked }})} className="w-6 h-6 accent-blue-600 rounded-md" />
                        </label>
                        <label className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 bg-white hover:bg-gray-50 cursor-pointer transition-all hover:scale-[1.02] shadow-sm">
                            <div className="flex items-center gap-4">
                                <div className={`p-2 rounded-full ${tempPublishConfig.permissions.allowDownload ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'}`}>{tempPublishConfig.permissions.allowDownload ? <Check size={16} /> : <Lock size={16} />}</div>
                                <span className="font-bold text-gray-700">允许下载</span>
                            </div>
                            <input type="checkbox" checked={tempPublishConfig.permissions.allowDownload} onChange={(e) => setTempPublishConfig({...tempPublishConfig, permissions: { ...tempPublishConfig.permissions, allowDownload: e.target.checked }})} className="w-6 h-6 accent-blue-600 rounded-md" />
                        </label>
                    </div>
                    </div>

                    <div className="p-8 border-t border-gray-100 bg-gray-50/80 flex justify-end gap-4">
                        <button onClick={() => setIsPublishModalOpen(false)} className="px-6 py-3 text-gray-600 font-bold hover:text-gray-900 text-sm hover:bg-gray-200/50 rounded-full transition-colors">取消</button>
                        <button onClick={handlePublish} className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-sm shadow-lg shadow-blue-200 transition-all hover:scale-105 active:scale-95">发布内容</button>
                    </div>
                </div>
            </div>
        )}
    </div>
  );

  return (
    <div className="flex h-full bg-white">
      {/* Main Left Navigation Bar */}
      <nav className="w-24 bg-white border-r border-gray-100 flex flex-col items-center py-8 gap-8 shrink-0 z-20 shadow-sm">
         <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200 mb-2">
             <Layout size={26} />
         </div>
         
         <div className="flex flex-col w-full gap-4 px-4 flex-1">
            <button 
                onClick={() => setCurrentView('projects')}
                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-3xl transition-all duration-300 ${currentView === 'projects' || currentView === 'editor' ? 'bg-blue-50 text-blue-700 font-bold shadow-sm' : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600 hover:shadow-sm'}`}
            >
                <Briefcase size={22} />
                <span className="text-[10px] font-bold">项目</span>
            </button>
            <button 
                onClick={() => setCurrentView('analytics')}
                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-3xl transition-all duration-300 ${currentView === 'analytics' ? 'bg-blue-50 text-blue-700 font-bold shadow-sm' : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600 hover:shadow-sm'}`}
            >
                <BarChart2 size={22} />
                <span className="text-[10px] font-bold">数据</span>
            </button>
         </div>

         {/* Exit Studio Button */}
         <div className="px-4 w-full">
            <button 
                onClick={onExitStudio}
                className="flex flex-col items-center justify-center gap-2 p-4 rounded-3xl text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all duration-300 w-full hover:shadow-sm"
                title="退出工作室"
            >
                <LogOut size={22} />
                <span className="text-[10px] font-bold">退出</span>
            </button>
         </div>
      </nav>

      {/* Content Area */}
      <div className="flex-1 flex overflow-hidden relative bg-slate-50">
          <div className="relative z-10 w-full h-full flex flex-col">
            {currentView === 'projects' && <ProjectsView />}
            {currentView === 'analytics' && <AnalyticsView />}
            {currentView === 'editor' && <EditorView />}
          </div>
      </div>
    </div>
  );
};

export default CreatorStudio;