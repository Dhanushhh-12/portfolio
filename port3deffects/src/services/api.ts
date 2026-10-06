/**
 * Frontend API Service Layer
 * Isolated data fetching contracts - completely decoupled from animation logic.
 */

export interface ApiResponse<T> {
  data: T | null;
  error?: string;
  status: number;
}

export const apiService = {
  /**
   * Health check / ping endpoint
   */
  async checkHealth(): Promise<ApiResponse<{ status: string }>> {
    try {
      return { data: { status: 'healthy' }, status: 200 };
    } catch (err) {
      return { data: null, error: 'Network error', status: 500 };
    }
  },
};

export default apiService;
