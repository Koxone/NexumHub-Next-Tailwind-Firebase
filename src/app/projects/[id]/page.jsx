'use client';

import PendingAnimatedList from '@/Components/Features/Dashboard/Custom/PendingAnimatedList';
import TasksAnimatedList from '@/Components/Features/Dashboard/Custom/TasksAnimatedList';
import ProjectCard from '@/Components/Features/Dashboard/Sections/CurrentFeedback/Components/ProjectCard';
import TopBar from '@/Components/Features/Dashboard/Sections/Topbar/TopBar';
import StatsCard from '@/Components/Features/OpenProject/Cards/InfoCard';
import Title from '@/Components/Text/Title';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { db } from '@/lib/firebase';
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';

export default function Projects() {
  const params = useParams();
  const slug = params?.id; // /projects/[id]

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    let unsub = null;

    (async () => {
      const q = query(collection(db, 'projects'), where('id', '==', slug));
      const snap = await getDocs(q);

      if (!snap.empty) {
        const d = snap.docs[0];
        unsub = onSnapshot(doc(db, 'projects', d.id), (docSnap) => {
          setProject(
            docSnap.exists() ? { idDoc: docSnap.id, ...docSnap.data() } : null
          );
          setLoading(false);
        });
      } else {
        unsub = onSnapshot(doc(db, 'projects', slug), (docSnap) => {
          setProject(
            docSnap.exists() ? { idDoc: docSnap.id, ...docSnap.data() } : null
          );
          setLoading(false);
        });
      }
    })();

    return () => unsub?.();
  }, [slug]);

  // Loading state
  if (loading) {
    return (
      <div className="flex w-full flex-col gap-4 justify-self-center px-8">
        <TopBar padding="pt-8 pb-4" />
        <p className="text-gray-300">Loading project…</p>
      </div>
    );
  }

  // Not found
  if (!project) {
    return (
      <div className="flex w-full flex-col gap-4 justify-self-center px-8">
        <TopBar padding="pt-8 pb-4" />
        <p className="text-gray-300">Project not found.</p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-4 justify-self-center px-8">
      <TopBar padding="pt-8 pb-4" />

      <div className="flex flex-col gap-7">
        {/* Hero */}
        <div className="no-scrollbar flex flex-col gap-4 [scroll-behavior:smooth]">
          <Title title={project.name || 'Project'} />
          <div className="mx-auto grid w-full flex-1 grid-cols-2 gap-4 md:grid-cols-3 md:grid-rows-1 xl:grid-cols-4">
            {/* Project card del proyecto actual (sin navegación) */}
            <ProjectCard
              imageUrl={project.imageUrl}
              color="border-gray-700"
              path="#"
              alt={project.name}
              blockClick={true}
            />

            {/* Analytics (placeholder) */}
            <StatsCard
              title="Project Analytics"
              onLinkClick={() => console.log('go to analytics')}
              items={[
                { label: 'Visitors', value: 0, color: 'bg-blue-600' },
                { label: 'Bounce Rate', value: '0%', color: 'bg-blue-600' },
                { label: 'Active Users', value: 0, color: 'bg-blue-600' },
                { label: 'Users Online', value: 0, color: 'bg-green-600' },
              ]}
            />

            {/* Pending (placeholder) */}
            <StatsCard
              title="Pending"
              items={[
                { label: 'Total Tasks', value: 0, color: 'bg-green-600' },
                { label: 'Pending Tasks', value: 0, color: 'bg-blue-600' },
                { label: 'Completed Tasks', value: 0, color: 'bg-blue-600' },
                { label: 'Community Approvals', value: 0, color: 'bg-red-500' },
              ]}
            />
          </div>
        </div>

        {/* Listas (placeholder; cuando quieras las filtramos por project.id) */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            <Title title="Tasks for this Project" />
            <TasksAnimatedList type="task" />
          </div>
          <div className="flex flex-col gap-4">
            <Title title="Pending on this Project" />
            <PendingAnimatedList
              collectionNames={['objects', 'reportLost', 'reportMissing']}
              showGradients={false}
              enableArrowNavigation={true}
              displayScrollbar={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
