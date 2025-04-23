import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Link,
  Chip,
  Collapse,
  IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { formatDistanceToNow } from 'date-fns';
import axios from 'axios';

function PostList() {
  const { subreddit } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('hot');
  const [expandedPosts, setExpandedPosts] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8000/api/posts/${subreddit}`, {
          params: { sort_by: sortBy }
        });
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [subreddit, sortBy]);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const toggleExpand = (postId) => {
    setExpandedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  if (loading) {
    return (
      <Container>
        <Typography>Loading posts...</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          r/{subreddit}
        </Typography>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy}
            label="Sort By"
            onChange={handleSortChange}
          >
            <MenuItem value="hot">Hot</MenuItem>
            <MenuItem value="new">New</MenuItem>
            <MenuItem value="top">Top</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {posts.map((post) => (
        <Card key={post.id} sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {post.title}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <Chip
                label={`${post.score} points`}
                size="small"
                color="primary"
              />
              <Chip
                label={`${post.num_comments} comments`}
                size="small"
              />
              <Chip
                label={`Posted by u/${post.author}`}
                size="small"
              />
              <Chip
                label={formatDistanceToNow(new Date(post.created_utc * 1000), { addSuffix: true })}
                size="small"
              />
            </Box>
            {post.content && (
              <>
                <Typography variant="body2" color="text.secondary">
                  {expandedPosts[post.id] 
                    ? post.content 
                    : post.content.length > 300 
                      ? `${post.content.substring(0, 300)}...` 
                      : post.content}
                </Typography>
                {post.content.length > 300 && (
                  <IconButton 
                    onClick={() => toggleExpand(post.id)}
                    size="small"
                    sx={{ mt: 1 }}
                  >
                    {expandedPosts[post.id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                )}
              </>
            )}
          </CardContent>
          <CardActions>
            <Button
              size="small"
              component={Link}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Reddit
            </Button>
          </CardActions>
        </Card>
      ))}
    </Container>
  );
}

export default PostList; 