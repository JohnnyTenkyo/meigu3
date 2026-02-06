import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function LoginDialog({ open, onClose }: LoginDialogProps) {
  const { login } = useAuth();
  const [username, setUsername] = useState('');

  if (!open) return null;

  const handleLogin = () => {
    if (username.trim()) {
      login(username);
      setUsername('');
      onClose();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleKeyPress(e);
      handleLogin();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-sm mx-4 rounded-lg border border-border bg-card p-6 shadow-2xl">
        <button onClick={onClose} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground">
          <X size={18} />
        </button>
        <h2 className="text-lg font-semibold mb-1">登录</h2>
        <p className="text-sm text-muted-foreground mb-4">输入用户名以使用收藏功能</p>
        
        <div className="space-y-3">
          <input
            type="text"
            placeholder="请输入用户名"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            autoFocus
          />
          <Button 
            onClick={handleLogin} 
            className="w-full"
            disabled={!username.trim()}
          >
            登录
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            无需密码，输入用户名即可登录
          </p>
        </div>
      </div>
    </div>
  );
}
