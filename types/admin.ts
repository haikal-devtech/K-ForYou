export interface User {
  id: string;
  email: string;
  role: 'super_admin' | 'admin' | 'content_manager' | 'order_manager';
  displayName: string;
  createdAt: number;
}

export interface AiUsageLog {
  id: string;
  userId: string;
  featureName: string;
  model: string;
  inputText: string;
  outputText: string;
  inputTokens: number;
  outputTokens: number;
  createdAt: number;
}
