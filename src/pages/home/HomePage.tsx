import OurOnlineServices from "./sections/OurOnlineServices";
import HeroSection from "./sections/HeroSection";
import OurSuccess from "./sections/OurSuccess";
import PopularCourses from "./sections/PopularCourses";
import FeaturedCourses from "./sections/FeaturedCourses";
import MostSellingProducts from "./sections/MostSellingProducts";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <OurSuccess />
      <PopularCourses />
      <FeaturedCourses />
      <MostSellingProducts />
      <OurOnlineServices />
    </div>
  );
}
