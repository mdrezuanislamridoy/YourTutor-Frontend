
import HeroSection from "./sections/HeroSection";
import OurSuccess from "./sections/OurSuccess";
import PopularCourses from "./sections/PopularCourses";
import FeaturedCourses from "./sections/FeaturedCourses";


export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <OurSuccess />
      <PopularCourses />
      <FeaturedCourses />
    </div>
  );
}
