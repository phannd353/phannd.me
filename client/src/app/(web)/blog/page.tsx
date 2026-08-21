import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { BlogHeader, BlogSearch } from "@/components/website/blog";
import { getMetadata } from "@/content/landing/metadata";
import { genMetadata } from "@/lib/metadata.lib";
import { PostsLayout } from "@/components/website/blog/posts-layout";

interface BlogPageProps {
  params: Promise<{}>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const locale = "vi"; // Default locale, you can change this based on your needs
  const t = await getTranslations({ locale, namespace: "BlogPage" });
  const metadata = await getMetadata({ locale });

  return genMetadata({
    title: `${t("title")} - ${metadata.title}`,
    description: t("description"),
    locale,
    path: "/blog",
    logo: metadata.logo,
  });
}

export default async function HomePage({
  params,
  searchParams,
}: BlogPageProps) {
  const locale = "vi"; // Default locale, you can change this based on your needs
  const resolvedSearchParams = searchParams ? await searchParams : undefined;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/50">
      {/* Header Section */}
      <BlogHeader locale={locale} />

      {/* Main Content */}
      <div className="container pb-8 md:pb-12">
        {/* Search Bar */}
        <div className="mx-auto mb-8 max-w-4xl">
          <BlogSearch />
        </div>

        <PostsLayout locale={locale} searchParams={resolvedSearchParams} />
      </div>
    </div>
  );
}
