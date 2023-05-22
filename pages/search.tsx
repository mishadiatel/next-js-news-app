import React, {FormEvent, useState} from 'react';
import {NewsArticle} from "@/model/NewsArticles";
import {Button, Form, Spinner, Alert} from "react-bootstrap";
import NewsArticlesGrid from "@/components/NewsArticlesGrid";
import Head from "next/head";

const SearchNewsPage = () => {
    const [searchResults, setSearchResults] = useState<NewsArticle[] | null>(null);
    const [searchResultsLoading, setSearchResultsLoading] = useState<boolean>(false);
    const [searchResultsLoadingIsError, setSearchResultsLoadingIsError] = useState<boolean>(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const searchQuery = formData.get('searchQuery')?.toString().trim();
        if(searchQuery) {
            try {
                setSearchResults(null);
                setSearchResultsLoadingIsError(false);
                setSearchResultsLoading(true);
                console.log(searchQuery);
                const response = await fetch(`/api/search-news?q=${searchQuery}`);
                const articles: NewsArticle[] = await response.json();
                setSearchResults(articles);
                console.log(searchResults);


            }catch (error) {
                console.error(error);
                setSearchResultsLoadingIsError(true);
            }finally {
                setSearchResultsLoading(false);

            }
        }


    }

    return (
        <>
            <Head>
                <title key={'title'}>Search News - NextJS News App</title>
            </Head>
            <main>
                <h1>Search news</h1>
                <Alert>
                    This is page uses <strong>client-side data fetching</strong> to show fresh data for every search.
                    Requests are handled by our backend via <strong>API routes</strong>.
                </Alert>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className={'mb-3'} controlId={'searchInput'}>
                        <Form.Label>Search query</Form.Label>
                        <Form.Control
                            name={'searchQuery'}
                            placeholder={'E.g. politics, sport, ...'}
                        />
                    </Form.Group>
                    <Button type={'submit'} className={'mb-3'} disabled={searchResultsLoading}>Search</Button>
                </Form>
                <div className="d-flex flex-column align-items-center">
                    {searchResultsLoading && <Spinner animation={'border'} />}
                    {searchResultsLoadingIsError && <p>Something went wrong. Please try again</p>}
                    {searchResults?.length === 0 && <p>Nothing found. Try a different query</p>}
                    {searchResults && <NewsArticlesGrid articles={Array.from(searchResults)} />}
                </div>
            </main>
        </>

    );
};

export default SearchNewsPage;
