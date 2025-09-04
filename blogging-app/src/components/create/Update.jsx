
import React, { useState, useEffect, useContext } from 'react';
import { Box, styled, FormControl, InputBase, Button, TextareaAutosize } from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import { DataContext } from '../../context/DataProvider';
import { API } from '../../service/api';

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0,
    }
}));

const StyledFormControl = styled(FormControl)`
    margin-top: 10px;
    display: flex;
    flex-direction: row;
`;

const Textarea = styled(TextareaAutosize)`
    width: 100%;
    margin-top: 50px;
    font-size: 18px;
    border: none;
    &:focus-visible {
        outline: none;
    }
`;

const InputTextField = styled(InputBase)`
    flex: 1;
    margin: 0 30px;
    font-size: 25px;
`;

const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createdDate: new Date(),
};

const Update = () => {
    const [post, setPost] = useState(initialPost);
    const [preview, setPreview] = useState('');

        console.log(post);
    
    const location = useLocation();
    const navigate = useNavigate();
    const { account } = useContext(DataContext);
    const { id } = useParams();

    // Function to convert image to Base64 and store in state
    const convertToBase64 = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreview(reader.result); // Set preview image
            setPost(prevPost => ({
                ...prevPost,
                picture: reader.result // Store Base64 image in post.picture
            }));
        };
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            convertToBase64(file);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getPostById(id);
            if(response.isSuccess){
                setPost(response.data);
            }
        }
        fetchData();
    }, [id]);

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

    const token = localStorage.getItem('accessToken'); 
    console.log(token);
    // Fetch token from storage

    const updateBlogPost = async () => {
        try {
            const token = localStorage.getItem("accessToken"); // 🔥 Ensure token exists
            if (!token) {
                alert("❌ No token found! Please log in again.");
                navigate("/login"); // Redirect to login page
                return;
            }

            const res = await axios.put(`http://localhost:8000/api/update/${id}`, post, {
                headers: {
                    Authorization: `Bearer ${token}`, // Ensure "Bearer " prefix is included
                },
            });
            console.log(res);
            if(res.data.success){
                navigate(`/details/${id}`);
                alert("Blog Updated Successfully")
            }
        } catch (error) {
            console.error("Error updating post:", error.response?.data || error.message);
        }
    };
    

    return (
        <Container>
            {preview && <img src={preview} alt="Preview" style={{ width: '100%', height: '50vh', objectFit: 'cover' }} />}

            <StyledFormControl>
                <label htmlFor="fileInput">
                    <Add fontSize="large" color="action" />
                </label>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: 'none' }}
                    accept="image/*"
                    onChange={handleFileChange}
                />

                <InputTextField placeholder="Title" onChange={handleChange} name="title" value={post.title} />
                <Button variant="contained" onClick={updateBlogPost}>
                    Update
                </Button>
            </StyledFormControl>

            <Textarea 
                minRows={5} 
                placeholder="Tell your story..." 
                onChange={handleChange} 
                name="description" 
                value={post.description} 
            />
        </Container>
    );
};

export default Update;
