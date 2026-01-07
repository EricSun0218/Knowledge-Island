import React from 'react';
import { X, FileText, Radio, Presentation, ClipboardCheck, Network } from 'lucide-react';

export interface GeneratedContent {
  id: string;
  type: 'ppt' | 'podcast' | 'quiz' | 'summary' | 'mindmap';
  title: string;
  createdAt: string;
  preview?: string;
}

interface MyContentProps {
  contents: GeneratedContent[];
  onClose: () => void;
  onSelectContent: (content: GeneratedContent) => void;
  isOpen: boolean;
}

const MyContent: React.FC<MyContentProps> = ({ contents, onClose, onSelectContent, isOpen }) => {
  const getIcon = (type: GeneratedContent['type']) => {
    switch (type) {
      case 'ppt':
        return <Presentation size={20} className="text-pink-600" />;
      case 'podcast':
        return <Radio size={20} className="text-orange-600" />;
      case 'quiz':
        return <ClipboardCheck size={20} className="text-cyan-600" />;
      case 'summary':
        return <FileText size={20} className="text-purple-600" />;
      case 'mindmap':
        return <Network size={20} className="text-emerald-600" />;
      default:
        return <FileText size={20} className="text-gray-600" />;
    }
  };

  const getTypeName = (type: GeneratedContent['type']) => {
    switch (type) {
      case 'ppt':
        return 'AI PPT';
      case 'podcast':
        return 'AI 播客';
      case 'quiz':
        return 'AI 测验';
      case 'summary':
        return 'AI 总结';
      case 'mindmap':
        return '思维导图';
      default:
        return '内容';
    }
  };

  return (
    <div className="flex flex-col h-full relative bg-transparent">
      {/* Header */}
      <div className="px-6 py-2 flex items-center justify-between bg-white/80 backdrop-blur-xl border-b border-gray-100/60 z-20 shrink-0 sticky top-0 shadow-sm">
        <h3 className="font-extrabold text-gray-800 text-sm tracking-tight">我的内容</h3>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* Content List */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {contents.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <FileText size={48} className="mb-4 opacity-50" />
            <p className="text-sm font-medium">暂无生成的内容</p>
            <p className="text-xs mt-1 opacity-70">使用 AI 工具生成内容后，会显示在这里</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {contents.map((content) => (
              <button
                key={content.id}
                onClick={() => onSelectContent(content)}
                className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-200/60 hover:border-gray-300/80 hover:shadow-md transition-all text-left group"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                  {getIcon(content.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-gray-500">{getTypeName(content.type)}</span>
                    <span className="text-xs text-gray-400">·</span>
                    <span className="text-xs text-gray-400">{content.createdAt}</span>
                  </div>
                  <h4 className="font-semibold text-sm text-gray-800 mb-1 line-clamp-2">{content.title}</h4>
                  {content.preview && (
                    <p className="text-xs text-gray-500 line-clamp-2 mt-1">{content.preview}</p>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyContent;

