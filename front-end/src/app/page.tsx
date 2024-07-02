import qs from "qs";
import { Button } from "@/components/ui/button";
import { flattenAttributes } from "@/lib/utils";
import { HeroSection } from "@/components/custom/heroSection";

const homePageQuery = qs.stringify({
  populate: {
    blocks: {
      populate: {
        image: {
          fields: ["url", "alternativeText"],
        },
        link: {
          populate: true,
        },
      },
    },
  },
});

async function getHomeData(path: string): Promise<any> {
  const baseUrl = "http://localhost:1337";
  const url = new URL(path, baseUrl);

  url.search = homePageQuery;

  try {
    const response = await fetch(url.href, {
      method: "GET",
      next: { revalidate: 10 },
    });
    const data = await response.json();
    const flattenData = flattenAttributes(data);
    console.log(data);

    return flattenData;
  } catch (error) {
    console.error(error);
  }
}

export default async function Home() {
  const { title, description, blocks } = await getHomeData("/api/home-page");
  return (
    <main>
      <HeroSection data={blocks[0]} />
    </main>
  );
}
