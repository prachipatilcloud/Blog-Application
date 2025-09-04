
import Post from '../model/post.js';


export const createPost = async (request, response) => {
    try {
        if (!request.body.picture) {
            return response.status(400).json({ msg: 'Picture is required' });
        }

        const post = new Post(request.body);
        await post.save();

        response.status(200).json({ msg: 'Post created successfully', post , success: true});
    } catch (error) {
        return response.status(400).json({ msg: 'Error creating post', error });
    }
};

export const getAllPosts = async (request, response) => {
    let category = request.query.category;
    let posts;
    try{
        if (category){
            posts = await Post.find({ categories: category });
            return response.status(200).json(posts);
        }else{
            posts = await Post.find({});
        }

        return response.status(200).json(posts);
    }catch (error){
        return response.status(500).json({ msg: error.message});
    }
}

export const getPost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        return response.status(200).json(post);
    } catch (error) {
        return response.status(500).json({ msg: error.message });
    }
}

export const updatePost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        if(!post){
            return response.status(404).json({ msg: 'Post not found' });
        }

        await Post.findByIdAndUpdate(request.params.id, {
            $set: request.body,
        });

        return response.status(200).json({ msg: 'Post updated successfully', success: true });
    } catch (error) {
        return response.status(500).json({ msg: error.message });
    }
}

export const deletePost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        if(!post){
            return response.status(404).json({ msg: 'Post not found' });
        }

        await Post.findByIdAndDelete(request.params.id);  // ✅ Correct method

        return response.status(200).json({ msg: 'Post deleted successfully', success: true });
    } catch (error) {
        return response.status(500).json({ msg: error.message });
    }
}