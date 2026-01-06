
export type FileType = 'folder' | 'text' | 'image' | 'audio' | 'video' | 'pdf';

export interface PublishConfig {
  isPublished: boolean;
  textCost: number; // Credits per view/read
  audioCost: number; // Credits per listen
  permissions: {
    allowCopy: boolean;
    allowDownload: boolean;
    watermark: boolean;
  };
}

export interface FileNode {
  id: string;
  name: string;
  type: FileType;
  content?: string; // URL for media, string for text
  children?: FileNode[];
  isOpen?: boolean; // For folders
  // Creator specific properties
  publishConfig?: PublishConfig;
  lastModified?: Date;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  coverImage?: string;
  lastModified: string;
  status: 'published' | 'draft';
  stats: {
    views: number;
    sales: number;
  };
}

export interface UserQuestion {
  id: string;
  question: string;
  timestamp: string;
  fileReference?: string;
  count: number; // Number of times similar questions were asked
}

export interface CreatorAnalytics {
  totalRevenue: number;
  totalReaders: number;
  activeSubscribers: number;
  avgTimeSpent: string; // e.g., "15m"
  recentQuestions: UserQuestion[];
}

export interface CreatorProfile {
  id: string;
  name: string;
  avatar: string;
  knowledgeBaseName: string;
  bio: string;
  socials: {
    platform: 'twitter' | 'youtube' | 'instagram' | 'github';
    url: string;
    handle: string;
  }[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface AIState {
  isConnected: boolean;
  isSpeaking: boolean;
  mode: 'text' | 'voice';
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  joinDate: string;
  membershipTier: 'Free' | 'Pro' | 'Lifetime';
  membershipExpiresAt: string;
  credits: number;
}

export interface PurchasedKnowledge {
  id: string;
  title: string;
  creator: string;
  coverImage: string;
  progress: number;
  totalItems: number;
  lastAccessed: string;
}