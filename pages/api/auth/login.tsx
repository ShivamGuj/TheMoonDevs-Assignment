import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    console.log('Received credentials:', { username, password }); // Debugging

    const validUsername = 'test';
    const validPassword = 'password';

    if (username === validUsername && password === validPassword) {
      if (!SECRET_KEY) {
        res.status(500).json({ message: 'Server error: Secret key not set' });
        return;
      }

      const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
