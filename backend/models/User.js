const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    yearOfStudy: { type: String, required: true },
    branch: { type: String, required: true },
    courses: { type: [String], default: [] },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
    tokenExpiration: { type: Date },
    resetPasswordToken: {type: String },
    resetPasswordExpires: {type: Date },
});

module.exports = mongoose.model('User', userSchema);
