import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    if (SECRET_KEY) {
      jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
          return res.status(401).json({ message: 'Unauthorized' });
        }

        res.status(200).json({ user });
      });
    } else {
      res.status(500).json({ message: 'Server error: Secret key not set' });
    }
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
}


