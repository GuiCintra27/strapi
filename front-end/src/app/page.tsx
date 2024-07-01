import { Button } from "@/components/ui/button";

async function getStrapiData(url: string) {
  const baseUrl = "http://localhost:1337";
  try {
    const response = await fetch(`${baseUrl}${url}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export default async function Home() {
  const data = await getStrapiData("/api/home-page");
  console.log(data);
  return (
    <div>
      <Button>Click me</Button>
    </div>
  );
}
