import { db } from '../../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      // Change 'blogs' to your Firestore collection name if needed (e.g., 'straipsniai')
      const blogsSnapshot = await getDocs(collection(db, 'blog'));
      const blogs = blogsSnapshot.docs.map((doc) => {
        const data = doc.data();

        // Convert Firestore timestamp to a serializable format
        let createdAt = null;
        if (
          data.createdAt &&
          typeof data.createdAt === 'object' &&
          data.createdAt.seconds
        ) {
          createdAt = new Date(data.createdAt.seconds * 1000).toISOString();
        } else if (data.createdAt) {
          createdAt = data.createdAt;
        }

        return {
          id: doc.id,
          ...data,
          createdAt,
        };
      });
      res.status(200).json(blogs);
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
