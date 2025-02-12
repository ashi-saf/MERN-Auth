import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter the name'],
  },
  email: {
    type: String,
    required: [true, 'Please enter the email'],
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
});

const User = mongoose.model.user || mongoose.model('User', userSchema);

export default User;
