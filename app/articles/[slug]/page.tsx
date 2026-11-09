import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EditorialArticle from "@/components/EditorialArticle";
import { ARTICLES, articlePath, articleUrl, getArticle } from "@/lib/articles";

export const dynamicParams = false;

export function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  const title = `${article.title} | Which Food Is Killing You?`;
  return {
    title,
    description: article.description,
    alternates: { canonical: articlePath(article) },
    openGraph: {
      title,
      description: article.description,
      url: articleUrl(article),
      type: "article",
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  return <EditorialArticle article={article} />;
}
