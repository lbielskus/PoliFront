import { db } from '../../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default async function handle(req, res) {
  try {
    if (req.method === 'GET') {
      const mediaSnapshot = await getDocs(collection(db, 'media'));
      const media = mediaSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      res.status(200).json(media);
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
