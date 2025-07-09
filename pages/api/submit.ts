import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const data = req.body;

  try {
    const docRef = await addDoc(collection(db, 'submissions'), data);
    res.status(200).json({ id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
