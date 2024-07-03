import qs from "qs";
import { unstable_noStore as noStore } from "next/cache";

import { flattenAttributes, getStrapiURL } from "@/lib/utils";

const baseUrl = getStrapiURL();

interface FetchDataProps {
  url: string;
  cache?: RequestCache;
  revalidate?: number;
}

async function fetchData({ url, cache, revalidate }: FetchDataProps) {
  const authToken = null; // we will implement this later getAuthToken() later
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authToken}`,
  };

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: authToken ? headers : {},
      cache,
      next: {
        revalidate,
      },
    });
    const data = await response.json();
    return flattenAttributes(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // or return null;
  }
}

export async function getHomePageData() {
  const url = new URL("/api/home-page", baseUrl);

  url.search = qs.stringify({
    populate: {
      blocks: {
        populate: {
          image: {
            fields: ["url", "alternativeText"],
          },
          link: {
            populate: true,
          },
          feature: {
            populate: true,
          },
        },
      },
    },
  });

  return await fetchData({ url: url.href, revalidate: 60 * 60 });
}

export async function getGlobalPageData() {
  const url = new URL("/api/global", baseUrl);

  url.search = qs.stringify({
    populate: [
      "header.logoText",
      "header.ctaButton",
      "footer.logoText",
      "footer.socialLink",
    ],
  });

  return await fetchData({ url: url.href });
}

export async function getGlobalPageMetadata() {
  const url = new URL("/api/global", baseUrl);

  url.search = qs.stringify({
    fields: ["title", "description"],
  });

  return await fetchData({ url: url.href });
}
