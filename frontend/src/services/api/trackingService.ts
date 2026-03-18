import type { TrackingShipment } from '@/types/tracking';
import { mockTrackingData } from '@/data/mock/tracking';

const delay = <T>(data: T, ms = 600): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(data), ms));

export const trackingService = {
  /**
   * Look up a shipment by tracking ID.
   * Future: POST /api/tracking/lookup
   */
  trackShipment: async (
    _mobileNumber: string,
    trackingId: string
  ): Promise<TrackingShipment | null> => {
    const normalized = trackingId.trim().toUpperCase();
    const shipment = mockTrackingData[normalized] ?? null;
    return delay(shipment);
  },

  /**
   * Get tracking by ID alone.
   * Future: GET /api/tracking/{trackingId}
   */
  getTrackingById: async (
    trackingId: string
  ): Promise<TrackingShipment | null> => {
    const normalized = trackingId.trim().toUpperCase();
    return delay(mockTrackingData[normalized] ?? null);
  },
};
