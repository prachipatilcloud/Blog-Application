import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true,
        default:"https://media.istockphoto.com/id/1414801672/photo/cardboard-box-with-cosmetics-product-in-front-od-open-door-buying-online-and-delivery.jpg?s=612x612&w=0&k=20&c=SA9VCzp-QtpzlliX8dM_uoH8K20U1gHqYfsWP08aLl0="
    },
    username: {
        type: String,
        required: true
    },
    categories: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date
    }
});

const post = mongoose.model('post', postSchema);

export default post;
