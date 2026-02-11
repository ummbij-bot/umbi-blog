import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - Umbi',
  description: 'Get in touch with the Umbi team. Send us your questions, feedback, error reports, or business inquiries. We typically respond within 24-48 hours.',
  alternates: {
    canonical: 'https://umbi-blog.vercel.app/contact',
  },
  openGraph: {
    title: 'Contact Us - Umbi',
    description: 'Get in touch with the Umbi team for questions, feedback, or business inquiries.',
    url: 'https://umbi-blog.vercel.app/contact',
    type: 'website',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
