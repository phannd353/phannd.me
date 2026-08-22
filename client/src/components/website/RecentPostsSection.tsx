import { getPublicPosts } from "@/services/post.service";
import Link from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

export default async function RecentPostsSection() {
  const locale = await getLocale();
  const [response, t] = await Promise.all([
    getPublicPosts({
      limit: "3",
      page: "1",
      sortBy: "createdAt",
      sortOrder: "desc",
    }),
    getTranslations({ locale, namespace: "BlogPage" }),
  ]);
  const posts = response?.data ?? [];

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="py-12" aria-labelledby="recent-posts-heading">
      <div className="mb-8 flex items-center justify-between gap-4">
        <h2 id="recent-posts-heading" className="text-2xl font-bold sm:text-3xl">
          {t("recent-posts")}
        </h2>
        <Button asChild variant="outline">
          <Link
            href="/blog"
            className="text-sm font-semibold text-primary hover:underline"
          >
            {t("read-more")}
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <Link key={post.title} href={`/posts/${post.slug}`} className="group">
            <Card className="h-full bg-secondary-background transition-transform group-hover:-translate-y-1">
              <CardHeader>
                <div className="relative aspect-video overflow-hidden rounded-lg">
                  <Image
                    src={post.thumbnail || "/assets/image/not-found.webp"}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    width={600}
                    height={400}
                  />
                </div>

                <CardTitle className="mt-4 line-clamp-2 text-xl font-bold dark:font-black sm:text-2xl">
                  {post.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="line-clamp-3 text-sm sm:text-base">
                {post.summary}
              </CardContent>

              {/* Categories */}
              {/*<CardFooter>
                          {post.tech.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm font-semibold bg-yellow-300 dark:text-black"
                              style={{
                                border: '2px solid black',
                              }}
                            >
                              {tech}
                            </span>
                          ))}
            </CardFooter>*/}
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
