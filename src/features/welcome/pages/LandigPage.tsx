import { GuestRoute } from "~/components/layouts/GuestRoute";
import { Header } from "~/components/layouts/Header";
import { SectionContainer } from "~/components/layouts/SectionContainer";
import {motion} from "framer-motion"
import HeroScetion from "../components/HeroScetion";
import FeaturesSection from "../components/FeaturesSection";
import { useRef } from "react";

const LandigPage = () => {
  const constraintsRef = useRef<HTMLDivElement> (null); ;
  return (
      <GuestRoute>
        <Header className="fixed top-0 z-50 w-full bg-white/1 backdrop-blur-md" />
        <motion.div ref={constraintsRef} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {/* hero section */}
          <HeroScetion constraintsRef={constraintsRef}/>

          {/* Sesi Fitur Unggulan 🚀 */}
          <FeaturesSection/>

          {/* Sesi "Untuk Siapa?" (Target Pengguna) 🎯 */}
          <SectionContainer
            padded
            className="flex min-h-screen flex-col content-center items-center justify-center border-b"
          ></SectionContainer>

          {/* Sesi Testimonial (Bukti Sosial) ❤️ */}
          <SectionContainer
            padded
            className="flex min-h-screen flex-col content-center items-center justify-center border-b"
          ></SectionContainer>

          {/* Final Call to Action (CTA) */}
          <SectionContainer
            padded
            className="flex min-h-screen flex-col content-center items-center justify-center border-b"
          ></SectionContainer>
        </motion.div>
      </GuestRoute>
  );
};

export default LandigPage;
