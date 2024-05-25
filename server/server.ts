import express from 'express';
import fs from 'fs';

const app = express();
const PORT = 3001;

type Article = {
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

type News = {
    articles: Article[];
}; 


// read data from news.json and send to client as server sent events one by one
app.get('/news', (req, res) => {
    const newsJson = fs.readFileSync('news.json','utf-8');
    const news:News = JSON.parse(newsJson);

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('serverCache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');

    let i=0;
    const interval = setInterval(()=>{
        if(i>=news.articles.length){
            clearInterval(interval);
            res.end();
        }
        else{
            res.write(`data: ${JSON.stringify(news.articles.slice(i, i + 3))}\n\n`);
            i+=3;
        }
    },1000);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});