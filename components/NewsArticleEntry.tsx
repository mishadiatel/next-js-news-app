import React from 'react';
import {NewsArticle} from "@/model/NewsArticles";
import {Card} from "react-bootstrap";

interface NewsArticleEntryProps {
    article: NewsArticle;
}

const NewsArticleEntry: React.FC<NewsArticleEntryProps> = ({article}) => {
    const {title, description, url, urlToImage} = article;
    const validImageURL =
        (urlToImage?.startsWith('http://') ||
            urlToImage?.startsWith('https://')) ?
            urlToImage : undefined;
    return (
        <a href={url}>
            <Card className={'h-100'}>
                <Card.Img variant={'top'} src={validImageURL}/>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>{description}</Card.Text>
                </Card.Body>
            </Card>
        </a>
    );
};

export default NewsArticleEntry;
