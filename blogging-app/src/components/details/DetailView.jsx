import React, { useEffect, useState, useContext } from 'react'
import { 
    Box, 
    Typography, 
    styled, 
    Container, 
    Paper, 
    IconButton, 
    Chip,
    Divider,
    Button
} from '@mui/material'
import { Edit, Delete, ArrowBack, Schedule, Person } from '@mui/icons-material';
import { useParams, Link, useNavigate} from 'react-router-dom';

import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

//component
import Comments from './comments/Comments';

const DetailContainer = styled(Container)`
    max-width: 900px;
    padding: 2rem 1rem;
    margin-top: 2rem;
`;

const DetailPaper = styled(Paper)`
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    background: #ffffff;
`;

const HeaderSection = styled(Box)`
    position: relative;
    margin-bottom: 2rem;
`;

const BackButton = styled(Button)`
    position: absolute;
    top: 1rem;
    left: 1rem;
    z-index: 10;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    color: #1e293b;
    font-weight: 600;
    border-radius: 12px;
    padding: 0.5rem 1rem;
    
    &:hover {
        background: rgba(255, 255, 255, 1);
        transform: translateX(-2px);
    }
`;

const ActionButtons = styled(Box)`
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 10;
    display: flex;
    gap: 0.5rem;
`;

const ActionButton = styled(IconButton)`
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    box-shadow: 0 2px 4px -1px rgb(0 0 0 / 0.1);
    
    &:hover {
        background: rgba(255, 255, 255, 1);
        transform: translateY(-2px);
    }
    
    &.edit {
        color: #2563eb;
        
        &:hover {
            background: #eff6ff;
        }
    }
    
    &.delete {
        color: #dc2626;
        
        &:hover {
            background: #fef2f2;
        }
    }
`;

const HeroImage = styled('img')`
    width: 100%;
    height: 400px;
    object-fit: cover;
    
    @media (max-width: 768px) {
        height: 250px;
    }
`;

const ContentSection = styled(Box)`
    padding: 3rem;
    
    @media (max-width: 768px) {
        padding: 2rem;
    }
`;

const PostTitle = styled(Typography)`
    font-size: 2.5rem;
    font-weight: 800;
    color: #1e293b;
    line-height: 1.2;
    margin-bottom: 2rem;
    
    @media (max-width: 768px) {
        font-size: 2rem;
        margin-bottom: 1.5rem;
    }
`;

const MetaSection = styled(Box)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid #e2e8f0;
    
    @media (max-width: 768px) {
        flex-direction: column;
        align-items: stretch;
        gap: 1rem;
    }
`;

const AuthorInfo = styled(Box)`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

const AuthorAvatar = styled(Box)`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    font-size: 1.25rem;
`;

const AuthorDetails = styled(Box)`
    display: flex;
    flex-direction: column;
`;

const AuthorName = styled(Typography)`
    font-weight: 600;
    color: #1e293b;
    font-size: 1rem;
`;

const PostDate = styled(Typography)`
    color: #64748b;
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const CategoryChip = styled(Chip)`
    background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
    color: #2563eb;
    font-weight: 600;
    border: 1px solid #bfdbfe;
`;

const PostContent = styled(Typography)`
    font-size: 1.125rem;
    line-height: 1.8;
    color: #374151;
    white-space: pre-wrap;
    margin-bottom: 3rem;
    
    @media (max-width: 768px) {
        font-size: 1rem;
        margin-bottom: 2rem;
    }
`;

const CommentsSection = styled(Box)`
    margin-top: 3rem;
    padding-top: 3rem;
    border-top: 1px solid #e2e8f0;
`;

const DetailView = () => {
    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(true);

    const { id } = useParams();
    const { account } = useContext(DataContext);
    const navigate = useNavigate();

    const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await API.getPostById(id);
                if(response.isSuccess){
                    setPost(response.data);
                }
            } catch (error) {
                console.error('Error fetching post:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [id]);

    const deleteBlog = async () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                let response = await API.deletePost(post._id);
                if(response.isSuccess){
                    navigate('/');
                }
            } catch (error) {
                console.error('Error deleting post:', error);
                alert('Error deleting post. Please try again.');
            }
        }
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getAuthorInitials = (username) => {
        return username ? username.charAt(0).toUpperCase() : 'U';
    };

    if (loading) {
        return (
            <DetailContainer>
                <Box className="loading">
                    Loading post...
                </Box>
            </DetailContainer>
        );
    }

    return (
        <DetailContainer>
            <DetailPaper elevation={0}>
                <HeaderSection>
                    <BackButton
                        startIcon={<ArrowBack />}
                        onClick={() => navigate(-1)}
                    >
                        Back
                    </BackButton>

                    <ActionButtons>
                        <Link to={`/update/${post._id}`} style={{ textDecoration: 'none' }}>
                            <ActionButton className="edit" size="medium">
                                <Edit />
                            </ActionButton>
                        </Link>
                        <ActionButton 
                            className="delete" 
                            size="medium"
                            onClick={deleteBlog}
                        >
                            <Delete />
                        </ActionButton>
                    </ActionButtons>

                    <HeroImage src={url} alt={post.title || "Blog post"} />
                </HeaderSection>

                <ContentSection>
                    <PostTitle variant="h3">
                        {post.title}
                    </PostTitle>

                    <MetaSection>
                        <AuthorInfo>
                            <AuthorAvatar>
                                {getAuthorInitials(post.username)}
                            </AuthorAvatar>
                            <AuthorDetails>
                                <AuthorName>
                                    {post.username || 'Anonymous'}
                                </AuthorName>
                                <PostDate>
                                    <Schedule fontSize="small" />
                                    {post.createdDate ? formatDate(post.createdDate) : 'Unknown date'}
                                </PostDate>
                            </AuthorDetails>
                        </AuthorInfo>

                        {post.categories && (
                            <CategoryChip 
                                label={post.categories}
                                variant="outlined"
                            />
                        )}
                    </MetaSection>

                    <PostContent variant="body1">
                        {post.description}
                    </PostContent>

                    <CommentsSection>
                        <Comments post={post} />
                    </CommentsSection>
                </ContentSection>
            </DetailPaper>
        </DetailContainer>
    )
}

export default DetailView;