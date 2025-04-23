import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, CardActionArea } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

function SubredditList() {
  const [subreddits, setSubreddits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubreddits = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/subreddits');
        setSubreddits(response.data.subreddits);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching subreddits:', error);
        setLoading(false);
      }
    };

    fetchSubreddits();
  }, []);

  if (loading) {
    return (
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        AI-Related Subreddits
      </Typography>
      <Grid container spacing={3}>
        {subreddits.map((subreddit) => (
          <Grid item xs={12} sm={6} md={4} key={subreddit}>
            <Card>
              <CardActionArea component={RouterLink} to={`/r/${subreddit}`}>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    r/{subreddit}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default SubredditList; 