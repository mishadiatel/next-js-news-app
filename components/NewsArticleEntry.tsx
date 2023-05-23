import React from 'react';
import {NewsArticle} from "@/model/NewsArticles";
import {Card} from "react-bootstrap";
import Image from "next/image";
import placeholderImage from '@/assets/images/newsarticle_placeholder.jpg'
import styles from "@/styles/NewsArticleEntry.module.css";


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
                {/*<Card.Img variant={'top'} src={validImageURL || placeholderImage} alt={'News article image'}/>*/}
                <Image
                    src={validImageURL || placeholderImage}
                    width={500}
                    height={200}
                    alt="News article image"
                    className={`card-img-top ${styles.image}`}
                />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>{description}</Card.Text>
                </Card.Body>
            </Card>
        </a>
    );
};

export default NewsArticleEntry;
