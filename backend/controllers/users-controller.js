const uuid = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const User = require('../models/user');

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, '-password');
  } catch (err) {
    return next(
      new HttpError('Error fetching all users, please try again later', 500)
    );
  }

  res
    .status(200)
    .json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return next(new HttpError('Sign Up failed, please try again later', 500));
  }

  if (existingUser) {
    return next(new HttpError('User exists already, please login', 422));
  }

  const createdUser = new User({
    name,
    email,
    image: 'https://avatars.githubusercontent.com/u/25249321?s=96&v=4',
    password,
    places: [],
  });

  let user;
  try {
    user = await createdUser.save();
  } catch (err) {
    return next(new HttpError('Sign up failed, please try again later', 500));
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return next(new HttpError('Login Up failed, please try again later', 500));
  }

  if (!existingUser || existingUser.password !== password) {
    return next(new HttpError('Credentials seems wrong.', 401));
  }

  res.status(200).json({
    message: 'logged In!',
    user: existingUser.toObject({ getters: true }),
  });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
