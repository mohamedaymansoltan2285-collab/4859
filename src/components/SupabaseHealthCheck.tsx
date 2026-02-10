import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AlertCircle, CheckCircle, Loader } from 'lucide-react';

interface HealthCheckResult {
  supabaseUrl: boolean;
  supabaseKey: boolean;
  canConnect: boolean;
  error?: string;
}

export const SupabaseHealthCheck: React.FC = () => {
  const [health, setHealth] = useState<HealthCheckResult | null>(null);

  useEffect(() => {
    const checkHealth = async () => {
      console.log('[v0] Starting Supabase health check...');
      
      const url = import.meta.env.VITE_SUPABASE_URL || 
                  import.meta.env.VITE_PUBLIC_SUPABASE_URL ||
                  import.meta.env.NEXT_PUBLIC_SUPABASE_URL;
      
      const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
                  import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY ||
                  import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      const result: HealthCheckResult = {
        supabaseUrl: !!url && !url.includes('placeholder'),
        supabaseKey: !!key && !key.includes('placeholder'),
        canConnect: false,
      };

      console.log('[v0] Supabase URL configured:', result.supabaseUrl);
      console.log('[v0] Supabase Key configured:', result.supabaseKey);

      // Try to connect
      try {
        if (result.supabaseUrl && result.supabaseKey) {
          const { data, error } = await supabase.auth.getSession();
          result.canConnect = !error;
          if (error) result.error = error.message;
          console.log('[v0] Connection test:', result.canConnect ? '✓ Success' : '✗ Failed', error?.message);
        } else {
          result.error = 'Missing Supabase configuration';
        }
      } catch (err: any) {
        result.error = err?.message || 'Connection failed';
        console.error('[v0] Health check error:', err);
      }

      setHealth(result);
    };

    checkHealth();
  }, []);

  if (!health) {
    return (
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-2">
        <Loader className="w-4 h-4 animate-spin text-blue-600" />
        <span className="text-sm text-blue-700">جاري فحص الاتصال...</span>
      </div>
    );
  }

  if (health.supabaseUrl && health.supabaseKey && health.canConnect) {
    return (
      <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
        <CheckCircle className="w-4 h-4 text-green-600" />
        <span className="text-sm text-green-700">✓ متصل بـ Supabase بنجاح</span>
      </div>
    );
  }

  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
      <div className="flex items-start gap-2">
        <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
        <div className="text-sm text-red-700">
          <p className="font-semibold mb-2">❌ مشكلة في الاتصال بـ Supabase:</p>
          <ul className="list-disc list-inside space-y-1">
            {!health.supabaseUrl && <li>VITE_SUPABASE_URL غير مكتمل</li>}
            {!health.supabaseKey && <li>VITE_SUPABASE_PUBLISHABLE_KEY غير مكتمل</li>}
            {!health.canConnect && <li>لا يمكن الاتصال بـ Supabase: {health.error}</li>}
          </ul>
          <p className="mt-3 text-xs opacity-70">
            📖 اقرأ AUTH_DEBUG_GUIDE.md لحل المشكلة
          </p>
        </div>
      </div>
    </div>
  );
};
