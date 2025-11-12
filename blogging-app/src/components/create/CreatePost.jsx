import React, { useState, useEffect, useContext } from 'react';
import { 
    Box, 
    styled, 
    TextField, 
    Button, 
    Typography, 
    Container,
    Paper,
    IconButton,
    Chip
} from '@mui/material';
import { 
    CloudUpload as UploadIcon, 
    Image as ImageIcon,
    Create as CreateIcon 
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { DataContext } from '../../context/DataProvider';

const CreateContainer = styled(Container)`
    padding: 2rem 1rem;
    max-width: 900px;
    margin-top: 2rem;
`;

const CreatePaper = styled(Paper)`
    padding: 3rem;
    border-radius: 20px;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    background: #ffffff;
    
    @media (max-width: 768px) {
        padding: 2rem;
        margin: 1rem;
    }
`;

const PageTitle = styled(Typography)`
    font-size: 2rem;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 2rem;
    text-align: center;
    
    @media (max-width: 768px) {
        font-size: 1.75rem;
        margin-bottom: 1.5rem;
    }
`;

const ImageUploadSection = styled(Box)`
    border: 2px dashed #e2e8f0;
    border-radius: 16px;
    padding: 3rem 2rem;
    text-align: center;
    margin-bottom: 2rem;
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
        border-color: #2563eb;
        background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
    }
    
    &.has-image {
        padding: 0;
        border: none;
        background: none;
    }
`;

const PreviewImage = styled('img')`
    width: 100%;
    max-height: 400px;
    object-fit: cover;
    border-radius: 16px;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
`;

const UploadContent = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    color: #64748b;
`;

const UploadButton = styled(Button)`
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 0.75rem 2rem;
    border-radius: 12px;
    font-weight: 600;
    text-transform: none;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    
    &:hover {
        background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
        transform: translateY(-2px);
        box-shadow: 0 8px 15px -3px rgb(0 0 0 / 0.1);
    }
`;

const StyledTextField = styled(TextField)`
    margin-bottom: 2rem;
    
    .MuiOutlinedInput-root {
        border-radius: 12px;
        background-color: #f8fafc;
        
        &:hover .MuiOutlinedInput-notchedOutline {
            border-color: #2563eb;
        }
        
        &.Mui-focused .MuiOutlinedInput-notchedOutline {
            border-color: #2563eb;
            border-width: 2px;
        }
    }
    
    .MuiInputLabel-root {
        color: #64748b;
        font-weight: 500;
        
        &.Mui-focused {
            color: #2563eb;
        }
    }
`;

const TitleField = styled(StyledTextField)`
    .MuiOutlinedInput-input {
        font-size: 1.5rem;
        font-weight: 600;
        color: #1e293b;
    }
`;

const ContentField = styled(StyledTextField)`
    .MuiOutlinedInput-input {
        font-size: 1rem;
        line-height: 1.6;
    }
`;

const ActionSection = styled(Box)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid #e2e8f0;
    
    @media (max-width: 768px) {
        flex-direction: column;
        gap: 1rem;
        align-items: stretch;
    }
`;

const CategoryChip = styled(Chip)`
    background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
    color: #2563eb;
    font-weight: 600;
    border: 1px solid #bfdbfe;
`;

const PublishButton = styled(Button)`
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    padding: 1rem 3rem;
    border-radius: 12px;
    font-weight: 600;
    font-size: 1rem;
    text-transform: none;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    
    &:hover {
        background: linear-gradient(135deg, #059669 0%, #047857 100%);
        transform: translateY(-2px);
        box-shadow: 0 8px 15px -3px rgb(0 0 0 / 0.1);
    }
    
    &:disabled {
        opacity: 0.7;
        transform: none;
    }
`;

const MetaInfo = styled(Box)`
    display: flex;
    gap: 1rem;
    align-items: center;
    
    @media (max-width: 768px) {
        flex-direction: column;
        align-items: stretch;
        gap: 0.5rem;
    }
`;

const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createdDate: new Date(),
};

const CreatePost = () => {
    const [post, setPost] = useState(initialPost);
    const [preview, setPreview] = useState('');
    const [loading, setLoading] = useState(false);
    
    const location = useLocation();
    const navigate = useNavigate();
    const { account } = useContext(DataContext);

    // Function to compress and convert image to Base64
    const convertToBase64 = (file) => {
        // Check file size (limit to 10MB)
        if (file.size > 10 * 1024 * 1024) {
            alert("Image size should be less than 10MB. Please choose a smaller image.");
            return;
        }

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        
        img.onload = () => {
            // Calculate new dimensions (max width: 1200px, maintain aspect ratio)
            const maxWidth = 1200;
            const maxHeight = 800;
            let { width, height } = img;
            
            if (width > maxWidth) {
                height = (height * maxWidth) / width;
                width = maxWidth;
            }
            
            if (height > maxHeight) {
                width = (width * maxHeight) / height;
                height = maxHeight;
            }
            
            canvas.width = width;
            canvas.height = height;
            
            // Draw and compress image
            ctx.drawImage(img, 0, 0, width, height);
            const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8); // 80% quality
            
            setPreview(compressedDataUrl);
            setPost(prevPost => ({
                ...prevPost,
                picture: compressedDataUrl
            }));
        };
        
        img.src = URL.createObjectURL(file);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            convertToBase64(file);
        }
    };

    useEffect(() => {
        setPost(prevPost => ({
            ...prevPost,
            categories: location.search.split('=')[1] || 'All',
            username: account.username,
        }));
    }, [location.search, account.username]);

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    const savePost = async () => {
        if (!post.title.trim()) {
            alert("Please enter a title for your post.");
            return;
        }
        
        if (!post.description.trim()) {
            alert("Please write some content for your post.");
            return;
        }

        setLoading(true);
        try {
            const token = sessionStorage.getItem('accessToken');
            const res = await axios.post("http://localhost:8000/api/create", post, {
                headers: {
                    Authorization: token,
                },
            });
            
            if(res.data.success){
                navigate("/");
                alert("Blog Created Successfully");
            }
        } catch (error) {
            console.error("Error creating post:", error.response);
            alert("Error creating post. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <CreateContainer>
            <CreatePaper elevation={0}>
                <PageTitle variant="h4">
                    Create New Post
                </PageTitle>

                <ImageUploadSection 
                    className={preview ? 'has-image' : ''}
                    onClick={() => !preview && document.getElementById('fileInput').click()}
                >
                    {preview ? (
                        <Box position="relative">
                            <PreviewImage src={preview} alt="Preview" />
                            <IconButton
                                onClick={(e) => {
                                    e.stopPropagation();
                                    document.getElementById('fileInput').click();
                                }}
                                sx={{
                                    position: 'absolute',
                                    top: 16,
                                    right: 16,
                                    background: 'rgba(255, 255, 255, 0.9)',
                                    '&:hover': { background: 'rgba(255, 255, 255, 1)' }
                                }}
                            >
                                <ImageIcon />
                            </IconButton>
                        </Box>
                    ) : (
                        <UploadContent>
                            <UploadIcon sx={{ fontSize: 48, color: '#94a3b8' }} />
                            <Typography variant="h6" color="#64748b" fontWeight={600}>
                                Upload Cover Image
                            </Typography>
                            <Typography variant="body2" color="#94a3b8">
                                Click here or drag and drop your image
                            </Typography>
                            <UploadButton
                                variant="contained"
                                startIcon={<UploadIcon />}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    document.getElementById('fileInput').click();
                                }}
                            >
                                Choose Image
                            </UploadButton>
                        </UploadContent>
                    )}
                </ImageUploadSection>

                <input
                    type="file"
                    id="fileInput"
                    style={{ display: 'none' }}
                    accept="image/*"
                    onChange={handleFileChange}
                />

                <TitleField
                    fullWidth
                    variant="outlined"
                    placeholder="Enter your post title..."
                    name="title"
                    value={post.title}
                    onChange={handleChange}
                    InputProps={{
                        style: { fontSize: '1.5rem', fontWeight: 600 }
                    }}
                />

                <ContentField
                    fullWidth
                    variant="outlined"
                    placeholder="Tell your story..."
                    name="description"
                    value={post.description}
                    onChange={handleChange}
                    multiline
                    rows={12}
                    InputProps={{
                        style: { fontSize: '1rem', lineHeight: 1.6 }
                    }}
                />

                <ActionSection>
                    <MetaInfo>
                        <CategoryChip 
                            label={`Category: ${post.categories || 'All'}`}
                            variant="outlined"
                        />
                        <Typography variant="body2" color="#64748b">
                            Author: {post.username || 'Unknown'}
                        </Typography>
                    </MetaInfo>

                    <PublishButton
                        variant="contained"
                        onClick={savePost}
                        disabled={loading || !post.title.trim() || !post.description.trim()}
                        startIcon={<CreateIcon />}
                    >
                        {loading ? 'Publishing...' : 'Publish Post'}
                    </PublishButton>
                </ActionSection>
            </CreatePaper>
        </CreateContainer>
    );
};

export default CreatePost;
