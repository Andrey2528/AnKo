import { 
  collection, 
  doc,
  getDoc,
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../../config/firebase';

const COLLECTION = 'pages';

/**
 * Get all pages
 */
export async function getPages() {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION));
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting pages:', error);
    return [];
  }
}

/**
 * Get single page by ID
 */
export async function getPage(id) {
  try {
    const docRef = doc(db, COLLECTION, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error('Error getting page:', error);
    return null;
  }
}

/**
 * Get page by slug
 */
export async function getPageBySlug(slug) {
  try {
    const q = query(collection(db, COLLECTION), where('slug', '==', slug));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    }
    return null;
  } catch (error) {
    console.error('Error getting page by slug:', error);
    return null;
  }
}

/**
 * Create new page
 */
export async function createPage(pageData) {
  try {
    // Check if slug already exists
    const existing = await getPageBySlug(pageData.slug);
    if (existing) {
      throw new Error('Page with this slug already exists');
    }
    
    const newPage = {
      ...pageData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      published: pageData.published || false
    };
    
    const docRef = await addDoc(collection(db, COLLECTION), newPage);
    
    return { id: docRef.id, ...newPage };
  } catch (error) {
    console.error('Error creating page:', error);
    throw error;
  }
}

/**
 * Update existing page
 */
export async function updatePage(id, pageData) {
  try {
    const docRef = doc(db, COLLECTION, id);
    
    // If slug is being changed, check for duplicates
    if (pageData.slug) {
      const existing = await getPageBySlug(pageData.slug);
      if (existing && existing.id !== id) {
        throw new Error('Page with this slug already exists');
      }
    }
    
    const updatedData = {
      ...pageData,
      updatedAt: Timestamp.now()
    };
    
    await updateDoc(docRef, updatedData);
    
    return { id, ...updatedData };
  } catch (error) {
    console.error('Error updating page:', error);
    throw error;
  }
}

/**
 * Delete page
 */
export async function deletePage(id) {
  try {
    const docRef = doc(db, COLLECTION, id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('Error deleting page:', error);
    throw error;
  }
}

/**
 * Toggle page published status
 */
export async function togglePagePublished(id) {
  try {
    const page = await getPage(id);
    if (!page) {
      throw new Error('Page not found');
    }
    
    const docRef = doc(db, COLLECTION, id);
    await updateDoc(docRef, {
      published: !page.published,
      updatedAt: Timestamp.now()
    });
    
    return { id, published: !page.published };
  } catch (error) {
    console.error('Error toggling page published status:', error);
    throw error;
  }
}
