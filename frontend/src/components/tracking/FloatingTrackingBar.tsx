import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, X, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from '@/hooks/useLocale';
import logoImg from '@/assets/logo.png';

const FloatingTrackingBar = () => {
  const { lang } = useLocale();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [mobile, setMobile] = useState('');
  const [trackingId, setTrackingId] = useState('');
  const [error, setError] = useState('');

  const isAr = lang === 'ar';

  const handleTrack = () => {
    if (!mobile.trim() || !trackingId.trim()) {
      setError(isAr ? 'يرجى إدخال رقم الجوال ورقم التتبع' : 'Please enter mobile number and tracking ID');
      return;
    }
    setError('');
    navigate(`/track-order?mobile=${encodeURIComponent(mobile.trim())}&id=${encodeURIComponent(trackingId.trim())}`);
    setExpanded(false);
    setMobile('');
    setTrackingId('');
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md">
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-2 bg-card border border-border rounded-2xl shadow-xl p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <img src={logoImg} alt="Mayar" className="h-6 w-auto" />
                <h3 className="text-sm font-semibold text-foreground font-display">
                  {isAr ? 'تتبع الطرد' : 'Track Package'}
                </h3>
              </div>
              <button onClick={() => setExpanded(false)} className="p-1 text-muted-foreground hover:text-foreground transition-colors">
                <X size={16} />
              </button>
            </div>

            <p className="text-xs text-muted-foreground mb-4">
              {isAr ? 'تتبع طلبك في الوقت الحقيقي بأمان' : 'Safe & secure real-time order tracking'}
            </p>

            <div className="space-y-3">
              <input
                type="tel"
                placeholder={isAr ? 'رقم الجوال' : 'Mobile Number'}
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full h-10 px-3 bg-secondary border-0 rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                type="text"
                placeholder={isAr ? 'رقم التتبع (مثال: MYR-2024-001)' : 'Tracking ID (e.g. MYR-2024-001)'}
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="w-full h-10 px-3 bg-secondary border-0 rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              {error && <p className="text-xs text-destructive">{error}</p>}
              <button
                onClick={handleTrack}
                className="w-full h-10 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                {isAr ? 'تتبع' : 'Track'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!expanded && (
        <motion.button
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          onClick={() => setExpanded(true)}
          className="w-full flex items-center justify-center gap-3 px-5 py-3.5 bg-primary text-primary-foreground rounded-2xl shadow-lg hover:bg-primary/90 transition-colors"
        >
          <Package size={18} className="flex-shrink-0" />
          <span className="text-sm font-medium leading-none">{isAr ? 'تتبع الطرد' : 'Track Package'}</span>
          <ChevronUp size={16} className="flex-shrink-0" />
        </motion.button>
      )}
    </div>
  );
};

export default FloatingTrackingBar;
