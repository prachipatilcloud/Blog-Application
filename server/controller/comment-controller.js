
import Comment from '../model/comment.js';



export const newComment = async (request, response) => {
    try {
        // Get authenticated user info from JWT token
        const { id: userId, username } = request.user;

        // Create comment with authenticated user's data
        const commentData = {
            ...request.body,
            name: username,     // Use authenticated user's username
            userId: userId,     // Add userId for better relationships
            date: new Date()    // Server timestamp
        };

        const comment = new Comment(commentData);
        await comment.save();

        response.status(200).json({
            success: true,
            message: 'Comment added successfully', 
            data: { comment }
        });
    } catch (error) {
        console.error('Create Comment Error:', error);
        response.status(500).json({ 
            success: false,
            message: 'Error adding comment',
            error: error.message 
        });
    }
}

export const getComments = async (request, response) => {
    try {
        const comments = await Comment.find({ postId: request.params.id });

        response.status(200).json({
            success: true,
            message: 'Comments retrieved successfully',
            data: { comments }
        });
    } catch (error) {
        console.error('Get Comments Error:', error);
        response.status(500).json({ 
            success: false,
            message: 'Error retrieving comments',
            error: error.message 
        });
    }
}

export const deleteComment = async (request, response) => {
    try {
        const comment = await Comment.findById(request.params.id);

        if (!comment) {
            return response.status(404).json({
                success: false,
                message: 'Comment not found'
            });
        }

        // Check if user owns this comment
        if (comment.name !== request.user.username) {
            return response.status(403).json({
                success: false,
                message: 'Unauthorized: You can only delete your own comments'
            });
        }

        await Comment.findByIdAndDelete(request.params.id);

        response.status(200).json({
            success: true,
            message: 'Comment deleted successfully'
        });
    } catch (error) {
        console.error('Delete Comment Error:', error);
        response.status(500).json({ 
            success: false,
            message: 'Error deleting comment',
            error: error.message 
        });
    }
}