import { Button } from "@/components/ui/button";
type HomeData = {
  data: {
    attributes: {
      Title: string;
      description: string;
    };
  };
};

async function getHomeData(
  url: string
): Promise<{ Title: string; description: string } | undefined> {
  const baseUrl = "http://localhost:1337";
  try {
    const response = await fetch(`${baseUrl}${url}`);
    const data: HomeData = await response.json();

    if (!data) return undefined;

    return {
      Title: data.data.attributes.Title,
      description: data.data.attributes.description,
    };
  } catch (error) {
    console.error(error);
  }
}

export default async function Home() {
  const data = await getHomeData("/api/home-page");
  return (
    <div>
      <h1>{data?.Title}</h1>
      <p>{data?.description}</p>
      <Button>Click me</Button>
    </div>
  );
}
