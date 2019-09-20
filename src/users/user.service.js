const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./user.model");
const {
  UserNotFound,
  WrongPassword,
  EmailAlreadyInUse
} = require("./user.errors");

async function authenticate({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new UserNotFound();
  }

  const isEqual = await bcrypt.compare(password, user.password);

  if (!isEqual) {
    throw new WrongPassword();
  }

  const payload = { id: user._id };
  const accessToken = jwt.sign(payload, process.env.JWT_TOKEN_SECRET_KEY);

  return {
    _id: user._id,
    email: user.email,
    username: user.username,
    profileImageFilename: user.profileImageFilename,
    accessToken
  };
}

async function getAll() {
  return await User.find().select("-password");
}

async function getById(id) {
  const user = await User.findById(id).select(
    "-password -__v -createdAt -updatedAt"
  );

  if (!user) {
    throw new UserNotFound();
  }

  return user;
}

async function create(userParam) {
  if (await User.findOne({ email: userParam.email })) {
    throw new EmailAlreadyInUse(`Email ${userParam.email} is already taken`);
  }

  const userWithoutId = new User(userParam);
  userWithoutId.password = await bcrypt.hash(userParam.password, 12);
  const user = await userWithoutId.save();

  const payload = { id: user._id };
  const accessToken = jwt.sign(payload, process.env.JWT_TOKEN_SECRET_KEY);

  return {
    _id: user._id,
    email: user.email,
    username: user.username,
    profileImageFilename: user.profileImageFilename,
    accessToken
  };
}

async function update(id, userParam) {
  const user = await User.findById(id);

  if (!user) {
    throw new UserNotFound();
  }

  const param = { ...userParam };

  if (param.password) {
    param.password = bcrypt.hashSync(param.password, 10);
  }

  Object.assign(user, param);

  await user.save();
  const { password, ...userWithoutPassword } = user.toObject();
  return userWithoutPassword;
}

async function remove(id) {
  await User.findByIdAndRemove(id);
}

async function removeAll() {
  await User.deleteMany({});
}

module.exports = {
  authenticate,
  getAll,
  getById,
  create,
  update,
  remove,
  removeAll
};
