import React from 'react'

import { useState, useContext, useEffect } from 'react';

import { Box, TextareaAutosize, Button,styled } from '@mui/material'

import { DataContext } from '../../../context/DataProvider';
import { API } from '../../../service/api';

//components
import Comment from './Comment';

const Container = styled(Box)`
    margin: 100px;
    display: flex;
`

const Image = styled('img')({
    width: 50,
    height: 50,
    borderRadius: '50%'
})

const StyledTextArea = styled(TextareaAutosize)`
    height: 100px;
    width: 100%;
    margin: 0 20px;
`;

const initialValues = {
    name: '',
    postId: '',
    comments: '',
    date: new Date()
}

const Comments = ({ post }) => {
    

    const url = 'https://static.thenounproject.com/png/12017-200.png'

    const [comment, setComment] = useState(initialValues);
    
    
    const [comments, setComments] = useState([]);
    
    
    const [toggle, setToggle] = useState(false);

    const { account } = useContext(DataContext);

    useEffect(() => {
        const getData = async() => {
            const response = await API.getAllComments(post._id);
            if (response.isSuccess) {
                setComments(response.data);
                console.log(comments);
                
            }
        }
        getData();
    }, [post, toggle])

    const handleChange = (e) => {
        setComment({
            ...comment,
            name : account.username,
            postId: post._id,
            comments: e.target.value
        })
    }

    const addComment = async(e) => {
        let response = await API.newComment(comment);
        
        if (response.isSucess) {
            alert('Comment added successfully');
            setComments(prevComments => [...prevComments, response.data]);
           
            
        }
        setToggle(prevState => !prevState);
    }


  return (
    <Box>
        <Container>
            <Image src={url} alt="dp" />
            <StyledTextArea
                minRows={5}
                placeholder='Add a comment'
                value={comment.comments}
                onChange={(e) => handleChange(e)}
            />
            <Button 
                variant='contained' 
                color='primary' 
                size='medium'
                style={{height: 40}}
                onClick={(e) => addComment(e)}>
                Post
            </Button>
        </Container>
        <Box>
            {
                comments && comments.length > 0 && comments.map((comment) => (
                    <Comment comment = {comment} setToggle= {setToggle} />
                ))
            }

        </Box>
    </Box>
)
}

export default Comments


// import React, { useState, useContext, useEffect } from 'react';
// import { Box, TextareaAutosize, Button, styled } from '@mui/material';
// import { DataContext } from '../../../context/DataProvider';
// import { API } from '../../../service/api';

// // Components
// import Comment from './Comment';

// const Container = styled(Box)`
//     margin: 100px;
//     display: flex;
// `;

// const Image = styled('img')({
//     width: 50,
//     height: 50,
//     borderRadius: '50%'
// });

// const StyledTextArea = styled(TextareaAutosize)`
//     height: 100px;
//     width: 100%;
//     margin: 0 20px;
// `;

// const initialValues = {
//     name: '',
//     postId: '',
//     comments: '',
//     date: new Date()
// };

// const Comments = ({ post }) => {
//     const url = 'https://static.thenounproject.com/png/12017-200.png';

//     const [comment, setComment] = useState(initialValues);
//     const [comments, setComments] = useState([]);
//     const [toggle, setToggle] = useState(false);

//     const { account } = useContext(DataContext);

//     // ✅ Fetch comments when post or toggle changes
//     useEffect(() => {
//         const getData = async () => {
//             try {
//                 const response = await API.getAllComments(post._id);
//                 console.log("API Response:", response);

//                 if (response.isSuccess && Array.isArray(response.data)) {
//                     setComments(response.data);
//                 } else {
//                     setComments([]); // Ensure it's always an array
//                 }
//             } catch (error) {
//                 console.error("Error fetching comments:", error);
//             }
//         };
//         getData();
//     }, [post, toggle]);

//     // ✅ Watch comments state changes (for debugging)
//     useEffect(() => {
//         console.log("Updated Comments:", comments);
//     }, [comments]);

//     const handleChange = (e) => {
//         setComment({
//             ...comment,
//             name: account.username,
//             postId: post._id,
//             comments: e.target.value
//         });
//     };

//     const addComment = async (e) => {
//         e.preventDefault(); // Prevent form submission refresh

//         try {
//             const response = await API.newComment(comment);
//             console.log("New Comment Response:", response);

//             if (response.isSuccess && response.data) {
//                 alert('Comment added successfully');

//                 // ✅ Append new comment properly
//                 setComments(prevComments => [...prevComments, response.data]);

//                 // ✅ Reset input field
//                 setComment(initialValues);
//             }
//         } catch (error) {
//             console.error("Error adding comment:", error);
//         }

//         // ✅ Toggle to re-fetch comments
//         setToggle(prevState => !prevState);
//     };

//     return (
//         <Box>
//             <Container>
//                 <Image src={url} alt="dp" />
//                 <StyledTextArea
//                     minRows={5}
//                     placeholder='Add a comment'
//                     value={comment.comments}
//                     onChange={handleChange}
//                 />
//                 <Button 
//                     variant='contained' 
//                     color='primary' 
//                     size='medium'
//                     style={{ height: 40 }}
//                     onClick={addComment}
//                 >
//                     Post
//                 </Button>
//             </Container>

//             <Box>
//                 {comments.length > 0 ? (
//                     comments.map((comment) => (
//                         <Comment key={comment._id} comment={comment} setToggle={setToggle} />
//                     ))
//                 ) : (
//                     <p>No comments yet.</p>
//                 )}
//             </Box>
//         </Box>
//     );
// };

// export default Comments;
