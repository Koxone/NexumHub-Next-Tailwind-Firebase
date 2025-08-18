'use client';

import { useEffect, useState } from 'react';
import { AlarmClock } from 'lucide-react';

// comments in English
function timeAgo(iso) {
  if (!iso) return 'N/A';
  const date = new Date(iso);
  const s = Math.floor((Date.now() - date.getTime()) / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d`;
  const mo = Math.floor(d / 30);
  if (mo < 12) return `${mo}mo`;
  const y = Math.floor(mo / 12);
  return `${y}y`;
}

export default function OwnerLastLogin() {
  const [data, setData] = useState({ lastSignInAt: null });
  const [err, setErr] = useState('');

  const load = async () => {
    try {
      setErr('');
      const res = await fetch('/api/admin/last-login', { cache: 'no-store' });
      if (!res.ok) throw new Error(await res.text());
      const json = await res.json();
      setData(json);
    } catch (e) {
      setErr('No se pudo cargar el último inicio del creador.');
      console.error(e);
    }
  };

  useEffect(() => {
    load();
    const t = setInterval(load, 60_000); // refresh every minute
    return () => clearInterval(t);
  }, []);

  const label = data.lastSignInAt ? timeAgo(data.lastSignInAt) : 'N/A';

  return (
    <div className="flex items-center gap-1 text-xs text-green-600">
      <AlarmClock className="h-3 w-3 text-green-600" />
      <span>{label}</span>
      {err && <span className="text-[10px] text-green-600">{err}</span>}
    </div>
  );
}
