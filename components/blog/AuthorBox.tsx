import Link from 'next/link';

const authorProfiles: Record<string, { bio: string; role: string; expertise: string[] }> = {
  'Sarah Kim': {
    role: 'Senior Finance Writer',
    bio: 'Certified Financial Planner (CFP) with 8+ years of experience in personal finance education. Sarah has helped thousands of readers build better financial habits through actionable, research-backed advice.',
    expertise: ['Budgeting', 'Investing', 'Tax Planning', 'Debt Management'],
  },
  'Michael Chen': {
    role: 'Lead Finance Editor',
    bio: 'Former investment analyst turned financial educator with a decade of experience in wealth management. Michael specializes in making complex financial concepts accessible to everyday readers.',
    expertise: ['Investment Strategy', 'Retirement Planning', 'Credit Optimization', 'Salary Negotiation'],
  },
  'David Park': {
    role: 'Senior Tech Writer',
    bio: 'Software engineer and technology journalist covering AI, productivity tools, and digital transformation. David reviews and tests hundreds of tools annually to deliver honest, practical recommendations.',
    expertise: ['AI Tools', 'Productivity Software', 'Cybersecurity', 'Remote Work'],
  },
  'Emma Rodriguez': {
    role: 'Wellness Editor',
    bio: 'Certified Health Coach (NBHWC) and fitness instructor with expertise in evidence-based wellness strategies. Emma translates complex health research into practical daily routines.',
    expertise: ['Nutrition', 'Exercise Science', 'Sleep Health', 'Stress Management'],
  },
  'James Lee': {
    role: 'Tech Contributor',
    bio: 'Full-stack developer and tech educator specializing in cloud computing, web development, and digital tools. James brings hands-on experience from building production applications.',
    expertise: ['Web Development', 'Cloud Computing', 'Developer Tools', 'Browser Extensions'],
  },
};

const defaultProfile = {
  role: 'Contributing Writer',
  bio: 'Expert contributor covering personal finance, technology, and wellness topics with a focus on actionable, research-backed insights.',
  expertise: ['Research', 'Analysis'],
};

interface AuthorBoxProps {
  author: string;
  date: string;
}

export default function AuthorBox({ author, date }: AuthorBoxProps) {
  const profile = authorProfiles[author] || defaultProfile;
  const initials = author.split(' ').map(n => n[0]).join('');

  return (
    <div className="mt-12 p-6 bg-neutral-50 rounded-2xl border border-neutral-200">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-neutral-700 to-neutral-900 flex items-center justify-center text-white font-bold text-lg shrink-0">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-bold text-neutral-900">{author}</h4>
            <span className="text-xs px-2 py-0.5 bg-neutral-200 text-neutral-600 rounded-full">{profile.role}</span>
          </div>
          <p className="text-sm text-neutral-600 mt-1 leading-relaxed">{profile.bio}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {profile.expertise.map((tag) => (
              <span key={tag} className="text-xs px-2 py-1 bg-white border border-neutral-200 rounded-md text-neutral-500">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-3 text-xs text-neutral-400">
            <span>Published: {date}</span>
            <span>|</span>
            <Link href="/about" className="hover:text-neutral-600 transition-colors underline">
              Meet Our Team
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
