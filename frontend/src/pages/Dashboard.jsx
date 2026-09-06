import { useState } from 'react';
import { Sidebar } from '../app/components/Sidebar';
import { MainContent } from '../app/components/MainContent';

export default function Dashboard() {
  const [weights, setWeights] = useState({
    skill: 50,
    experience: 15,
    project: 15,
    education: 20
  });

  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [maxShortlist, setMaxShortlist] = useState(5);

  return (
    <div className="min-h-screen font-['Inter',sans-serif] bg-gradient-to-br from-black via-[#1a1a1a] to-[#0a0a0a] overflow-hidden">
      {/* Decorative background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#d4a574]/10 rounded-full blur-[120px] animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#c9a068]/10 rounded-full blur-[120px] animate-[pulse_10s_ease-in-out_infinite]" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#f5deb3]/5 rounded-full blur-[100px] animate-[pulse_12s_ease-in-out_infinite]" />
      </div>

      {/* Main layout */}
      <div className="relative flex h-screen">
        <Sidebar />
        <MainContent
          weights={weights}
          setWeights={setWeights}
          jobTitle={jobTitle}
          setJobTitle={setJobTitle}
          jobDescription={jobDescription}
          setJobDescription={setJobDescription}
          maxShortlist={maxShortlist}
          setMaxShortlist={setMaxShortlist} 
        />
      </div>
    </div>
  );
}
