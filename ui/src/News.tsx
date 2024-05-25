import React, { useEffect, useState } from 'react'

type Article = {
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
};

function News() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    console.log('useEffect')
    const eventSource = new EventSource('http://localhost:3001/news');

    eventSource.onmessage = (event) => {
      const newArticles = JSON.parse(event.data);
      setArticles((articles) => [...newArticles,...articles]);
    };

    return () => {
      eventSource.close();
    };
  }, []);
  return (
    <div>
        {articles.map((article, index) => (
            <div key={index} className='news-item'>
                <img src={article.urlToImage} alt={article.title} className="news-image"/>
                <div className='news-content'>
                    <h2 className='news-title'>{article.title}</h2>
                    <p className='news-description'>{article.description}</p>
                    <p className='news-author'>{article.author}</p>
                </div>
            </div>
        ))}
    </div>
  );
}

export default News
