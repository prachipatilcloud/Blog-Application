
import Post from '../model/post.js';


export const createPost = async (request, response) => {
    try {
        if (!request.body.picture) {
            return response.status(400).json({ 
                success: false, 
                message: 'Picture is required' 
            });
        }

        
        const { id: userId, username } = request.user;

       
        const postData = {
            ...request.body,
            username: username,  
            userId: userId,      
            createdDate: new Date()
        };

        const post = new Post(postData);
        await post.save();

        response.status(200).json({ 
            success: true,
            message: 'Post created successfully', 
            data: { post }
        });
    } catch (error) {
        console.error('Create Post Error:', error);
        return response.status(400).json({ 
            success: false,
            message: 'Error creating post', 
            error: error.message 
        });
    }
};

export const getAllPosts = async (request, response) => {
    try {
        const category = request.query.category;
        let posts;
        
        if (category) {
            posts = await Post.find({ categories: category });
        } else {
            posts = await Post.find({});
        }

        return response.status(200).json({
            success: true,
            message: 'Posts retrieved successfully',
            data: { posts }
        });
    } catch (error) {
        console.error('Get Posts Error:', error);
        return response.status(500).json({ 
            success: false,
            message: 'Error retrieving posts',
            error: error.message 
        });
    }
}

export const getPost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        if (!post) {
            return response.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }

        return response.status(200).json({
            success: true,
            message: 'Post retrieved successfully',
            data: { post }
        });
    } catch (error) {
        console.error('Get Post Error:', error);
        return response.status(500).json({ 
            success: false,
            message: 'Error retrieving post',
            error: error.message 
        });
    }
}

export const updatePost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        if (!post) {
            return response.status(404).json({ 
                success: false,
                message: 'Post not found' 
            });
        }

        // Check if user owns this post
        if (post.username !== request.user.username) {
            return response.status(403).json({ 
                success: false,
                message: 'Unauthorized: You can only update your own posts' 
            });
        }

        // Update post with new data but keep original user info
        const updateData = {
            ...request.body,
            username: post.username, // Keep original owner
            userId: post.userId,     // Keep original userId
            createdDate: post.createdDate // Keep original creation date
        };

        const updatedPost = await Post.findByIdAndUpdate(
            request.params.id,
            { $set: updateData },
            { new: true }
        );

        return response.status(200).json({ 
            success: true,
            message: 'Post updated successfully',
            data: { post: updatedPost }
        });
    } catch (error) {
        console.error('Update Post Error:', error);
        return response.status(500).json({ 
            success: false,
            message: 'Error updating post',
            error: error.message 
        });
    }
}

export const deletePost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        if (!post) {
            return response.status(404).json({ 
                success: false,
                message: 'Post not found' 
            });
        }

        // Check if user owns this post
        if (post.username !== request.user.username) {
            return response.status(403).json({ 
                success: false,
                message: 'Unauthorized: You can only delete your own posts' 
            });
        }

        await Post.findByIdAndDelete(request.params.id);

        return response.status(200).json({ 
            success: true,
            message: 'Post deleted successfully'
        });
    } catch (error) {
        console.error('Delete Post Error:', error);
        return response.status(500).json({ 
            success: false,
            message: 'Error deleting post',
            error: error.message 
        });
    }
}