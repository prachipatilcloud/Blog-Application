import { useState, useEffect } from 'react';
import { Box, Grid, styled } from '@mui/material';
import { API } from '../../../service/api';
import { useSearchParams, Link } from 'react-router-dom';
 

//components
import Post from './Post';

const Posts = () => {
    const [posts, setPosts] = useState([]);

    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getAllPosts({ category: category || '' });
            if (response.isSuccess) {
                setPosts(response.data);
            }
            // console.log(fetchData);
            
        };
        fetchData();
    }, [category]);

    
    

    return (
        <Grid container spacing={2}>
            {posts && posts.length > 0 ? (
                posts.map((post) => (
                    <Grid item lg={3} sm={4} xs={12} key={post._id}>
                        <Link to={`/details/${post._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Post post={post} />
                        </Link>
                    </Grid>
                ))
            ) : (
                <Box style={{ color: '#878787', margin: '30px 80px', fontSize: 18 }}>
                    No posts available to display
                </Box>
            )}
        </Grid>
    );
};

export default Posts;
