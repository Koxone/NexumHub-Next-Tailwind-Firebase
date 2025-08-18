// hooks/useProjects.js
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

export function useProjects() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // /* Subscribe to projects ordered by createdAt desc */
    const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      setData(snap.docs.map((d) => ({ idDoc: d.id, ...d.data() })));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return { data, loading };
}
