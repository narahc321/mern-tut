const uuid = require('uuid');
const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');

var DUMMY_USERS = [
  {
    id: 'u1',
    name: 'Max Schwarz',
    email: 'test@test.com',
    password: 'testers',
  },
];

const getUsers = (req, res, next) => {
  res.status(200).json({ users: DUMMY_USERS });
};

const signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError('Invalid inputs passed, please check your data.', 422);
  }

  const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find((user) => user.email === email);

  if (hasUser) {
    throw new HttpError('Could not create user, user already exists', 422);
  }

  const createdUser = {
    id: uuid.v4(),
    name,
    email,
    password,
  };
  DUMMY_USERS.push(createdUser);
  res.status(201).json({ user: createdUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  const user = DUMMY_USERS.find((user) => user.email === email);
  if (!user || user.password !== password) {
    throw new HttpError('Credentials seems wrong.', 401);
  }

  res.status(200).json({ message: 'logged In!' });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
