import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { getLoginUrl } from '@/const';

interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function LoginDialog({ open, onClose }: LoginDialogProps) {
  if (!open) return null;

  const handleLogin = () => {
    window.location.href = getLoginUrl();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-sm mx-4 rounded-lg border border-border bg-card p-6 shadow-2xl">
        <button onClick={onClose} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground">
          <X size={18} />
        </button>
        <h2 className="text-lg font-semibold mb-1">登录</h2>
        <p className="text-sm text-muted-foreground mb-4">登录后可使用收藏和更多功能</p>
        
        <div className="space-y-3">
          <Button onClick={handleLogin} className="w-full">使用 Manus 账号登录</Button>
          <p className="text-xs text-center text-muted-foreground">
            登录即表示您同意我们的服务条款和隐私政策
          </p>
        </div>
      </div>
    </div>
  );
}
