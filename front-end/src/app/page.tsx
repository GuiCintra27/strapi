import { getHomePageData } from "@/data/loaders";
import { HeroSection } from "@/components/custom/heroSection";
import { FeatureSection } from "@/components/custom/featuresSection";

function blockRenderer(block: any) {
  switch (block.__component) {
    case "layout.hero-section":
      return <HeroSection key={block.id} data={block} />;
    case "layout.features-section":
      return <FeatureSection key={block.id} data={block} />;
    default:
      return null;
  }
}

export default async function Home() {
  const { blocks } = await getHomePageData();

  if (!blocks) return <div>No data found</div>;

  return <main>{blocks.map((block: any) => blockRenderer(block))}</main>;
}
