import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Package, MapPin, Phone, Truck, ArrowLeft, FileText, ShieldCheck, Clock, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocale } from '@/hooks/useLocale';
import { trackingService } from '@/services/api/trackingService';
import type { TrackingShipment } from '@/types/tracking';
import TrackingTimeline from '@/components/tracking/TrackingTimeline';
import TopBar from '@/components/layout/TopBar';
import MainHeader from '@/components/layout/MainHeader';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';

const TrackingPage = () => {
  const { lang } = useLocale();
  const [searchParams] = useSearchParams();
  const isAr = lang === 'ar';

  const [shipment, setShipment] = useState<TrackingShipment | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const trackingId = searchParams.get('id') || '';
  const mobileNumber = searchParams.get('mobile') || '';

  useEffect(() => {
    if (!trackingId) {
      setLoading(false);
      setNotFound(true);
      return;
    }
    setLoading(true);
    trackingService.trackShipment(mobileNumber, trackingId).then((data) => {
      if (data) {
        setShipment(data);
        setNotFound(false);
      } else {
        setNotFound(true);
      }
      setLoading(false);
    });
  }, [trackingId, mobileNumber]);

  const formatDate = (d?: string) => {
    if (!d) return '—';
    return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const Section = ({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) => (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-card border border-border rounded-2xl p-5 md:p-6"
    >
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center">
          <Icon size={16} className="text-foreground" />
        </div>
        <h3 className="text-sm font-semibold text-foreground font-display">{title}</h3>
      </div>
      {children}
    </motion.div>
  );

  const InfoRow = ({ label, value }: { label: string; value?: string | number | null }) => (
    <div className="flex justify-between py-2 border-b border-border last:border-0">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-xs font-medium text-foreground text-end">{value || '—'}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <MainHeader />
      <NavBar />

      {/* Hero banner */}
      <div className="relative bg-gradient-to-br from-primary/5 via-secondary to-brand/5 py-10 md:py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '24px 24px' }} />
        <div className="container relative z-10 text-center max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full mb-4">
            <ShieldCheck size={14} className="text-primary" />
            <span className="text-xs font-medium text-primary">{isAr ? 'توصيل آمن ومضمون' : 'Safe & Secure Delivery'}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground font-display mb-2">
            {isAr ? 'تتبع طلبك' : 'Track Your Order'}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isAr ? 'تتبع شحنتك بثقة. تحديثات موثوقة من التغليف حتى التوصيل' : 'Track your shipment with confidence. Reliable updates from packing to delivery.'}
          </p>
        </div>
      </div>

      <main className="container py-8 md:py-12 max-w-3xl mx-auto">
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <RefreshCw size={24} className="text-muted-foreground animate-spin" />
            <p className="text-sm text-muted-foreground">{isAr ? 'جاري البحث...' : 'Looking up your shipment...'}</p>
          </div>
        )}

        {!loading && notFound && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <Package size={48} className="mx-auto text-muted-foreground/40 mb-4" />
            <h2 className="text-lg font-semibold text-foreground mb-2 font-display">
              {isAr ? 'لم يتم العثور على تفاصيل التتبع' : 'Tracking Details Not Found'}
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              {isAr ? 'يرجى التحقق من رقم الجوال ورقم التتبع' : 'Please check your mobile number and tracking ID'}
            </p>
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
              <ArrowLeft size={14} />
              {isAr ? 'العودة للرئيسية' : 'Back to Home'}
            </Link>
          </motion.div>
        )}

        {!loading && shipment && (
          <div className="space-y-5">
            {/* Summary card */}
            <Section icon={Package} title={isAr ? 'ملخص الشحنة' : 'Shipment Summary'}>
              <InfoRow label={isAr ? 'رقم التتبع' : 'Tracking ID'} value={shipment.trackingId} />
              {shipment.orderId && <InfoRow label={isAr ? 'رقم الطلب' : 'Order ID'} value={shipment.orderId} />}
              <InfoRow label={isAr ? 'الحالة الحالية' : 'Current Status'} value={isAr ? shipment.currentStatus.ar : shipment.currentStatus.en} />
              <InfoRow label={isAr ? 'التوصيل المتوقع' : 'Estimated Delivery'} value={formatDate(shipment.estimatedDelivery)} />
              <InfoRow label={isAr ? 'آخر تحديث' : 'Last Updated'} value={shipment.lastUpdated ? new Date(shipment.lastUpdated).toLocaleString('en-GB') : '—'} />
            </Section>

            {/* Timeline */}
            <Section icon={Clock} title={isAr ? 'مراحل التوصيل' : 'Delivery Progress'}>
              <TrackingTimeline steps={shipment.steps} />
            </Section>

            {/* Address */}
            <Section icon={MapPin} title={isAr ? 'عنوان التوصيل' : 'Delivery Address'}>
              <InfoRow label={isAr ? 'الاسم' : 'Name'} value={shipment.address.fullName} />
              <InfoRow label={isAr ? 'العنوان' : 'Address'} value={[shipment.address.addressLine1, shipment.address.addressLine2].filter(Boolean).join(', ')} />
              <InfoRow label={isAr ? 'المنطقة' : 'Area'} value={shipment.address.area} />
              <InfoRow label={isAr ? 'المدينة' : 'City'} value={shipment.address.city} />
              <InfoRow label={isAr ? 'الدولة' : 'Country'} value={shipment.address.country} />
              {shipment.address.pinCode && <InfoRow label={isAr ? 'الرمز البريدي' : 'Pin Code'} value={shipment.address.pinCode} />}
            </Section>

            {/* Contact */}
            <Section icon={Phone} title={isAr ? 'معلومات الاتصال' : 'Contact Details'}>
              <InfoRow label={isAr ? 'الشخص المسؤول' : 'Contact Person'} value={shipment.contact.contactPerson} />
              <InfoRow label={isAr ? 'رقم الجوال' : 'Mobile'} value={shipment.contact.mobileNumber} />
              {shipment.contact.alternateNumber && <InfoRow label={isAr ? 'رقم بديل' : 'Alternate'} value={shipment.contact.alternateNumber} />}
            </Section>

            {/* Shipment info */}
            <Section icon={Truck} title={isAr ? 'معلومات الشحن' : 'Shipment Information'}>
              {shipment.courierName && <InfoRow label={isAr ? 'شركة التوصيل' : 'Courier'} value={shipment.courierName} />}
              {shipment.packageType && <InfoRow label={isAr ? 'نوع الطرد' : 'Package Type'} value={shipment.packageType} />}
              {shipment.paymentType && <InfoRow label={isAr ? 'طريقة الدفع' : 'Payment'} value={shipment.paymentType} />}
              {shipment.itemCount && <InfoRow label={isAr ? 'عدد العناصر' : 'Items'} value={shipment.itemCount} />}
              {shipment.orderDate && <InfoRow label={isAr ? 'تاريخ الطلب' : 'Order Date'} value={formatDate(shipment.orderDate)} />}
              {shipment.dispatchDate && <InfoRow label={isAr ? 'تاريخ الشحن' : 'Dispatch Date'} value={formatDate(shipment.dispatchDate)} />}
            </Section>

            {/* Delivery notes */}
            {shipment.deliveryNotes && (
              <Section icon={FileText} title={isAr ? 'ملاحظات التوصيل' : 'Delivery Notes'}>
                <p className="text-sm text-foreground">{shipment.deliveryNotes}</p>
              </Section>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                to="/"
                className="flex-1 flex items-center justify-center gap-2 h-11 border border-border rounded-xl text-sm font-medium text-foreground hover:bg-secondary transition-colors"
              >
                <ArrowLeft size={14} />
                {isAr ? 'العودة للرئيسية' : 'Back to Home'}
              </Link>
              <button
                onClick={() => window.history.back()}
                className="flex-1 h-11 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                {isAr ? 'تتبع طرد آخر' : 'Track Another Package'}
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default TrackingPage;
