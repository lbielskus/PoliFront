import { db } from '../../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const productsSnapshot = await getDocs(collection(db, 'products'));
      const products = productsSnapshot.docs.map((doc) => ({
        id: doc.id, // <-- THIS IS IMPORTANT
        ...doc.data(),
      }));
      res.status(200).json(products);
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
