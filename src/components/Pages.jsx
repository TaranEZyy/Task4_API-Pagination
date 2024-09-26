import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Pagination,Grid} from '@mui/material/';

function ImgMediaCard({ news }) {
    return (
        <>
         <Grid container spacing={2}>
            {news.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card key={index} sx={{ maxWidth: 345, marginBottom: 2 }}>
                    <CardMedia
                        component="img"
                        alt="news image"
                        height="140"
                        image={item.image_url || 'https://via.placeholder.com/140'}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {item.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {item.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" href={item.link} target="_blank" rel="noopener noreferrer">
                            Read More
                        </Button>
                    </CardActions>
                </Card>
                </Grid>
            ))}
            </Grid>
        </>
    );
}

function Pages() {
    const [news, setNews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch('https://newsdata.io/api/1/news?apikey=pub_5452935aa601f9c02cb10778b1b308c8c0d0a&country=in&language=en&category=science,sports,entertainment');
                const data = await response.json(); // Parse the response as JSON
                setNews(data.results); // Assuming the results are in the 'results' key
                console.log(data.results);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        fetchNews();
    }, []);

    // Calculate the number of pages
    const totalPages = Math.ceil(news.length / itemsPerPage);

    // Slice the news data for the current page
    const currentNews = news.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Handle page change
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    return (
        <div>
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                shape="rounded"
                sx={{ marginTop: 2 }}
                color='primary'
            />
    <br />
            <ImgMediaCard news={currentNews} />
        </div>
    );
}

export default Pages;
