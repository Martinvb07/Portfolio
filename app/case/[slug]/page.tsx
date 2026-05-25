import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PROJECTS } from '@/lib/projects';
import CaseStudy from '@/components/CaseStudy';

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.key }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = PROJECTS.find((p) => p.key === params.slug);
  if (!project) return {};
  return {
    title: `${project.name} — Caso · MARTIN.DEV`,
    description: project.desc.es,
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const project = PROJECTS.find((p) => p.key === params.slug);
  if (!project) notFound();
  return <CaseStudy project={project} />;
}
