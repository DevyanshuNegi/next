import mongoose, {Schema, Document} from 'mongoose';
// document for type safety

 export interface Message extends Document {
    content: string,
    createdAt: Date,
 }

 const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
 });

export interface User extends Document {
    username: string,
    email: string,
    password: string,
    verifyCode: string,
    verifyCodeExpiry: Date,
    isVerified: boolean,
    isAcceptingMessage : boolean,
    messages: Message[],
}

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username']
    }, 
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        match: [
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            'Please provide a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        // minlength: 6,
        // select: false
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, 'Please provide a verify code expiry date'],
    },
    verifyCode: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true
    },
    messages: [MessageSchema]

});


// const userModel = mongoose.model<User>('User', UserSchema);
const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>('User', UserSchema);
// this is to prevent overwriting the model during hot reloads

export default UserModel;