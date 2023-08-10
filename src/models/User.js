import mongoose, {Schema} from 'mongoose'

const UserSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    first_name: {
        type: String,
        length: 40,
        required: true
    },
    last_name: {
        type: String,
        length: 40
    },
    email: {
        type: String,
        length: 40,
        unique: true
    },
    password: {
        type: String,
        length: 40,
        required: true
    },
    password_token: {
        type: String,
        length: 64,
        default: null,
    },
    status: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
})

const UserModel = mongoose.model('User', UserSchema)
export default UserModel