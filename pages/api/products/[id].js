import { db } from '../../../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const productRef = doc(db, 'products', id);
    const productSnap = await getDoc(productRef);

    if (!productSnap.exists()) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json({ id: productSnap.id, ...productSnap.data() });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
