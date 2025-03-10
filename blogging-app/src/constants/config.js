//API Notification messages
export const API_NOTIFICATION_MESSAGES = {
    loading: {
        title: 'Loading...',
        message: 'Please wait while we fetch the data'
    },
    success: {
        title: 'Success',
        message: 'Data fetched successfully'
    },
    responseFailure: {
        title: 'Error',
        message: 'Failed to fetch data. Please try again later'
    },
    requestFailure: {
        title: 'Error',
        message: 'An error occurred while parsing the request. Please try again later'
    },
    networkFailure: {
        title: 'Error',
        message: 'Network error occurred. Please check your internet connection'
    }
}

//API service call

export const SERVICE_URLS = {
    userSignup: { url: '/signup', method: 'POST'  },
    userLogin: { url: '/login', method: 'POST' },
    uploadFile: { url: '/file/upload', method: 'POST' },
    createPost: {url: '/create', method:'POST'},
    getAllPosts: {url: '/posts', method:'GET', params: true},
    getPostById: {url: '/post', method:'GET', query: true},
    updatePost: {url: '/update', method:'PUT', query: true},
    deletePost: {url: '/delete', method:'DELETE', query: true},
    newComment: {url: '/comment/new', method:'POST'},
    getAllComments: {url: '/comments', method:'GET', query: true},
    deleteComment: {url: '/comment/delete', method:'DELETE', query: true}
}