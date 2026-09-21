import About from "@/components/layouts/About";
import Contact from "@/components/layouts/Contact";
import Footer from "@/components/layouts/Footer";
import Hero from "@/components/layouts/Hero";
import Projects from "@/components/layouts/Projects.";
import StackMarquee from "@/components/layouts/StackMarquee";
import TechStack from "@/components/layouts/TechStack";

export default function Home() {
  return (
    <div>
      <Hero />
      <StackMarquee />
      <About />
      <TechStack />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}
