import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email jest wymagany'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Email nie jest poprawny'],
  },
  password: {
    type: String,
    required: [true, 'Hasło jest wymagane'],
    minlength: [8, 'Minimalna długość hasła wynosi 8 znaków'],
  },
});

userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('user', userSchema);

export default User;
