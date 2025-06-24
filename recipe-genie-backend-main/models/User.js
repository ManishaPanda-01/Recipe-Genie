const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // For hashing passwords

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Enforcing uniqueness of email
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe',
      },
    ],
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Hash the password before saving the user document
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Skip hashing if password is not modified

  // Hash password with salt rounds of 10
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare passwords (for login)
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;