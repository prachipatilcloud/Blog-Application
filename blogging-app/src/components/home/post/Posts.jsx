import { useState, useEffect } from 'react';
import { Box, Grid, styled, Typography, Container } from '@mui/material';
import { API } from '../../../service/api';
import { useSearchParams, Link } from 'react-router-dom';

//components
import Post from './Post';

const PostsContainer = styled(Container)`
    padding: 2rem 1rem;
    
    @media (max-width: 768px) {
        padding: 1.5rem 0.5rem;
    }
`;

const NoPostsContainer = styled(Box)`
    text-align: center;
    padding: 4rem 2rem;
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
    margin: 2rem;
`;

const NoPostsText = styled(Typography)`
    color: #64748b;
    font-size: 1.125rem;
    margin-bottom: 0.5rem;
`;

const NoPostsSubtext = styled(Typography)`
    color: #94a3b8;
    font-size: 0.95rem;
`;

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let response = await API.getAllPosts({ category: category || '' });
                if (response.isSuccess) {
                    setPosts(response.data);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [category]);

    if (loading) {
        return (
            <PostsContainer maxWidth="lg">
                <Box className="loading">
                    Loading amazing posts...
                </Box>
            </PostsContainer>
        );
    }

    return (
        <PostsContainer maxWidth="lg">
            <Grid container spacing={3}>
                {posts && posts.length > 0 ? (
                    posts.map((post) => (
                        <Grid item lg={4} md={6} sm={6} xs={12} key={post._id}>
                            <Link 
                                to={`/details/${post._id}`} 
                                style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                                <Post post={post} />
                            </Link>
                        </Grid>
                    ))
                ) : (
                    <Grid item xs={12}>
                        <NoPostsContainer>
                            <NoPostsText variant="h6">
                                No posts found
                            </NoPostsText>
                            <NoPostsSubtext>
                                {category 
                                    ? `No posts in "${category}" category yet.`
                                    : 'Be the first to share your story!'
                                }
                            </NoPostsSubtext>
                        </NoPostsContainer>
                    </Grid>
                )}
            </Grid>
        </PostsContainer>
    );
};

export default Posts;
