import Head from 'next/head'
import {GetServerSideProps} from "next";
import {NewsArticle, NewsResponse} from "@/model/NewsArticles";
import NewsArticleEntry from "@/components/NewsArticleEntry";
import NewsArticlesGrid from "@/components/NewsArticlesGrid";
import {Alert} from "react-bootstrap";

interface  BreakingNewsPageProps {
    newsArticles: NewsArticle[];
}
export const getServerSideProps: GetServerSideProps<BreakingNewsPageProps> = async () => {
    // await new Promise(r => setTimeout(r, 3000))
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`);
    const newsResponse: NewsResponse = await response.json();
    return {
        props: {
            newsArticles: newsResponse.articles,
        }
    }
}

export default function BreakingNewsPage({newsArticles}: BreakingNewsPageProps) {
    return (
        <>
            <Head>
                <title key={'title'}>Breaking News - NestJs News App</title>
            </Head>
            <main>
                <h1>Breaking News</h1>
                <Alert>
                    This page uses <strong>getServerSideProps</strong> to fetch data server-side on every request.
                    This allows search engines to crawl the page content and <strong>improves SEO</strong>.
                </Alert>
                <NewsArticlesGrid articles={newsArticles} />
            </main>
        </>
    )
}
