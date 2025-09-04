import React from 'react'
import { Box, Typography, styled, Chip } from '@mui/material'
import { addElipsis } from '../../../utils/common-utils';

const Container = styled(Box)`
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    overflow: hidden;
    transition: all 0.3s ease;
    height: 420px;
    display: flex;
    flex-direction: column;
    border: 1px solid #f1f5f9;
    
    &:hover {
        transform: translateY(-8px);
        box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
        border-color: #e2e8f0;
    }
`;

const ImageContainer = styled(Box)`
    position: relative;
    overflow: hidden;
`;

const Image = styled('img')({
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    transition: 'transform 0.3s ease',
    
    '&:hover': {
        transform: 'scale(1.05)',
    }
});

const ContentContainer = styled(Box)`
    padding: 1.5rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

const CategoryChip = styled(Chip)`
    background-color: #eff6ff;
    color: #2563eb;
    font-size: 0.75rem;
    font-weight: 500;
    height: 24px;
    border-radius: 12px;
    align-self: flex-start;
    
    &:hover {
        background-color: #dbeafe;
    }
`;

const Title = styled(Typography)`
    font-size: 1.125rem;
    font-weight: 600;
    color: #1e293b;
    line-height: 1.4;
    margin: 0.5rem 0;
    flex: 1;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

const AuthorText = styled(Typography)`
    color: #64748b;
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
`;

const Description = styled(Typography)`
    color: #64748b;
    font-size: 0.875rem;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-top: auto;
`;

const PostMeta = styled(Box)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #f1f5f9;
`;

const ReadTime = styled(Typography)`
    color: #94a3b8;
    font-size: 0.75rem;
    font-weight: 500;
`;

const Post = ({ post }) => {
    const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';

    return (
        <Container className="card-hover">
            <ImageContainer>
                <Image src={url} alt="blog post" />
            </ImageContainer>
            
            <ContentContainer>
                <CategoryChip 
                    label={post.categories || 'General'} 
                    size="small"
                />
                
                <Title variant="h6">
                    {addElipsis(post.title, 50)}
                </Title>
                
                <AuthorText>
                    by {post.username || 'Anonymous'}
                </AuthorText>
                
                <Description>
                    {addElipsis(post.description, 120)}
                </Description>
                
                <PostMeta>
                    <ReadTime>
                        {Math.ceil(post.description?.length / 200) || 2} min read
                    </ReadTime>
                </PostMeta>
            </ContentContainer>
        </Container>
    )
}

export default Post;