const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const producer = require('../kafka/kafkaProducer');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10); //remove from encryptioon
 // const hashedPassword=password;
  const user = new User({ username, email, password: hashedPassword });
  await user.save();

  await producer.send({
    topic: 'user-registered',
    messages: [{ value: JSON.stringify({ email, username }) }],
  });

  res.json({ message: 'User registered' });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ error: 'Invalid email' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: 'Invalid password' });

//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  const token = jwt.sign({ id: user._id }, "c635246a3d027f63167af855f9581211657c5a9f4b386f757436cf2de102ea59", { expiresIn: '1h' });

  //sending message to the kafka client
  await producer.send({
    topic: 'user-logged-in',
    messages: [{ value: JSON.stringify({ email, timestamp: Date.now() }) }],
  });

  res.json({ message: 'Login successful', token });
};
