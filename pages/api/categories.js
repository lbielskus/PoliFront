import { db } from '../../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const categoriesSnapshot = await getDocs(collection(db, 'categories'));
      const categories = categoriesSnapshot.docs.map((doc) => ({
        id: doc.id, // <-- THIS IS IMPORTANT
        ...doc.data(),
      }));
      res.status(200).json(categories);
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
