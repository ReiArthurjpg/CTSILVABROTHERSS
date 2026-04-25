import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Pillars from '@/components/Pillars';
import Sport from '@/components/Sport';
import Academy from '@/components/Academy';
import Differentials from '@/components/Differentials';
import Schedule from '@/components/Schedule';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-red-600 selection:text-white">
      <Navigation />
      <Hero />
      <Pillars />
      <Sport />
      <Academy />
      <Differentials />
      <Schedule />
      <Testimonials />
      <Footer />
    </div>
  );
}
