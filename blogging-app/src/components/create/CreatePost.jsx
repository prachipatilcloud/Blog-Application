// import React from 'react'

// import { useState, useEffect, useContext } from 'react';

// import { Box, styled, FormControl, InputBase, Button, TextareaAutosize } from '@mui/material';
// import { AddCircle as Add } from '@mui/icons-material';

// import { useLocation, useNavigate } from 'react-router-dom';

// import { DataContext } from '../../context/DataProvider';
// import { API } from '../../service/api';

// const Container = styled(Box)`
//     margin: 50px 100px;
// `

// const Image = styled('img')({
//     width: '100%',
//     height: '50vh',
//     objectFit: 'cover',
// })

// const StyledFormControl = styled(FormControl)`
//     margin-top: 10px;
//     display: flex;
//     flex-direction: row;
// `;

// const Textarea = styled(TextareaAutosize)`
//     width: 100%;
//     margin-top: 50px;
//     fontSize: 18px;
//     border: none;
//     &:focus-visible {
//         outline: none;
//     }
// `;


// const InputTextField = styled(InputBase)`
//     flex: 1;
//     margin: 0 30px;
//     font-size: 25px;
// `

// const initialPost = {
//     title: '',
//     description: '',
//     picture: '',
//     username: '',
//     categories: '',
//     createdDate: new Date()
// }

// const CreatePost = () => {

//     const [post, setPost] = useState(initialPost);
//     const [file, setFile] = useState('');
//     const [preview, setPreview] = useState('');
//     console.log(preview);
    

//     const { account } = useContext(DataContext);

//     const location = useLocation();
//     const navigate = useNavigate();
//     console.log(file);
    

//     // const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80'


//     // useEffect(() => {
//     //     const getImage = async () => {
//     //         if (file) {
//     //             const data = new FormData();
//     //             data.append('name', file.name);
//     //             data.append('file', file);

//     //             //API call
//     //             const response = await API.uploadFile(data);
//     //             setPost(prevPost => ({
//     //                 ...prevPost,
//     //                 picture: response?.data?.imageUrl
//     //             }));
//     //         }
//     //     }
//     //     getImage();
//     //     post.categories = location.search.split('=')[1] || 'All';
//     //     post.username = account.username;
//     // }, [file])


//     useEffect(() => {
//         if (file) {
//             const objectUrl = URL.createObjectURL(file);
//             setPreview(objectUrl);
//             console.log(objectUrl);
            

//             const getImage = async () => {
//                 const data = new FormData();
//                 data.append('name', file.name);
//                 data.append('file', file);

//                 // API call
//                 const response = await API.uploadFile(data);
//                 setPost(prevPost => ({
//                     ...prevPost,
//                     picture: response?.data?.imageUrl
//                 }));
//             };

//             getImage();
//         }
//         post.categories = location.search.split('=')[1] || 'All';
//         post.username = account.username;

//         // Cleanup object URL on component unmount
//         return () => {
//             if (preview) URL.revokeObjectURL(preview);
//         };
//     }, [file]);

//     const handleChange = (e) => {
//         setPost({ ...post, [e.target.name]: e.target.value })
//     }

//     const savePost = async () => {
//         let response = await API.createPost(post);
//         if (response.isSuccess) {
//             navigate('/');
//         }
//     }

//     return (
//         <Container>
//             {/* <Image src={url} alt='Banner' /> */}

//             <StyledFormControl>
//                 <label htmlFor='fileInput'>
//                     <Add fontSize='large' color='action' />
//                 </label>
//                 <input name='' value={} type='file' id='fileInput' style={{ display: 'none' }}
//                     onChange={(e) => setFile(e.target.files[0])}
//                 />

//                 <InputTextField placeholder='Title' onChange={(e) => handleChange(e)} name='title' />
//                 <Button variant='contained' onClick={() => savePost()}>Publish</Button>

//             </StyledFormControl>

//             <Textarea
//                 minRows={5}
//                 placeholder='Tell your story...'
//                 onChange={(e) => handleChange(e)}
//                 name='description'
//             />
//         </Container>
//     )
// }


// export default CreatePost;



// import React, { useState, useEffect, useContext } from 'react';
// import { Box, styled, FormControl, InputBase, Button, TextareaAutosize } from '@mui/material';
// import { AddCircle as Add } from '@mui/icons-material';
// import { useLocation, useNavigate } from 'react-router-dom';

// import { DataContext } from '../../context/DataProvider';
// import { API } from '../../service/api';

// const Container = styled(Box)`
//     margin: 50px 100px;
// `;

// const StyledFormControl = styled(FormControl)`
//     margin-top: 10px;
//     display: flex;
//     flex-direction: row;
// `;

// const Textarea = styled(TextareaAutosize)`
//     width: 100%;
//     margin-top: 50px;
//     font-size: 18px;
//     border: none;
//     &:focus-visible {
//         outline: none;
//     }
// `;

// const InputTextField = styled(InputBase)`
//     flex: 1;
//     margin: 0 30px;
//     font-size: 25px;
// `;

// const initialPost = {
//     title: '',
//     description: '',
//     picture: '',
//     username: '',
//     categories: '',
//     createdDate: new Date(),
// };

// const CreatePost = () => {
//     const [post, setPost] = useState(initialPost);
//     const [file, setFile] = useState('');
//     const [preview, setPreview] = useState('');
//     const [isImageUploading, setIsImageUploading] = useState(false);
//     console.log(post);
//     console.log(file);
    

//     const location = useLocation();
//     const navigate = useNavigate();
//     const { account } = useContext(DataContext);

    
//     useEffect(() => {
//         if (file) {
//             const objectUrl = URL.createObjectURL(file);
//             setPreview(objectUrl);
    
//             const uploadImage = async () => {
//                 setIsImageUploading(true);
//                 const data = new FormData();
//                 data.append('name', file.name);
//                 data.append('file', file);
    
//                 try {
//                     const response = await API.uploadFile(data);
//                     console.log('🚀 Image Upload Response:', response); // Check if API returns image URL
                    
//                     if (response?.data?.imageUrl) {
//                         setPost(prevPost => ({
//                             ...prevPost,
//                             picture: response.data.imageUrl
//                         }));
//                         console.log('✅ Updated Post:', post);
//                     } else {
//                         console.error('❌ No image URL in response:', response);
//                     }
//                 } catch (error) {
//                     console.error('❌ Image upload failed:', error);
//                 }
//                 setIsImageUploading(false);
//             };
    
//             uploadImage();
    
//             return () => URL.revokeObjectURL(objectUrl);
//         }
//     }, [file]);
    

//     useEffect(() => {
//         setPost(prevPost => ({
//             ...prevPost,
//             categories: location.search.split('=')[1] || 'All',
//             username: account.username,
//         }));
//     }, [location.search, account.username]);

//     const handleChange = (e) => {
//         setPost({ ...post, [e.target.name]: e.target.value });
//     };

//     const savePost = async () => {
//         if (!post.picture) {
//             alert("Please upload an image before publishing.");
//             return;
//         }

//         if (isImageUploading) {
//             alert("Please wait until the image is uploaded.");
//             return;
//         }

//         let response = await API.createPost(post);
//         if (response.isSuccess) {
//             navigate('/');
//         }
//     };

//     return (
//         <Container>
//             {preview && <img src={preview} alt="Preview" style={{ width: '100%', height: '50vh', objectFit: 'cover' }} />}

//             <StyledFormControl>
//                 <label htmlFor="fileInput">
//                     <Add fontSize="large" color="action" />
//                 </label>
//                 <input
//                     type="file"
//                     id="fileInput"
//                     style={{ display: 'none' }}
//                     onChange={(e) => setFile(e.target.files[0])}
//                 />

//                 <InputTextField placeholder="Title" onChange={handleChange} name="title" value={post.title} />
//                 <Button variant="contained" onClick={savePost}>
//                     Publish
//                 </Button>
//             </StyledFormControl>

//             <Textarea minRows={5} placeholder="Tell your story..." onChange={handleChange} name="description" value={post.description} />
//         </Container>
//     );
// };

// export default CreatePost;





import React, { useState, useEffect, useContext } from 'react';
import { Box, styled, FormControl, InputBase, Button, TextareaAutosize } from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { DataContext } from '../../context/DataProvider';

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

const CreatePost = () => {
    const [post, setPost] = useState(initialPost);
    const [preview, setPreview] = useState('');

        console.log(post);
    
    const location = useLocation();
    const navigate = useNavigate();
    const { account } = useContext(DataContext);

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
        setPost(prevPost => ({
            ...prevPost,
            categories: location.search.split('=')[1] || 'All',
            username: account.username,
        }));
    }, [location.search, account.username]);

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    // const savePost = () => {
    //     if (!post.picture) {
    //         alert("Please select an image before publishing.");
    //         return;
    //     }

    //     console.log('Final Post Data:', post);
    //     navigate('/');
    // };

    // const savePost = async () => {
    //             if (!post.picture) {
    //                 alert("Please upload an image before publishing.");
    //                 return;
    //             }
        
                
        
    //             let response = await API.createPost(post);
    //             if (response.isSuccess) {
    //                 navigate('/');
    //             }
    //         };

    const token = localStorage.getItem('accessToken'); 
    console.log(token);
    // Fetch token from storage

    const savePost = async () => {
        try {
            const res = await axios.post("http://localhost:8000/api/create", post, {
                headers: {
                    Authorization: `Bearer ${token}`, // Ensure "Bearer " prefix is included
                },
            });
            console.log(res);
            if(res.data.success){
                navigate("/");
                alert("Blog Created Successfully")
            }
        } catch (error) {
            console.error("Error creating post:", error.response);
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
                <Button variant="contained" onClick={savePost}>
                    Publish
                </Button>
            </StyledFormControl>

            <Textarea minRows={5} placeholder="Tell your story..." onChange={handleChange} name="description" value={post.description} />
        </Container>
    );
};

export default CreatePost;
