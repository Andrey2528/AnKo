import { 
  collection, 
  doc,
  getDoc,
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../../config/firebase';

const COLLECTION = 'projects';

/**
 * Get all projects
 */
export async function getProjects() {
  try {
    const q = query(collection(db, COLLECTION), orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting projects:', error);
    return [];
  }
}

/**
 * Get single project by ID
 */
export async function getProject(id) {
  try {
    const docRef = doc(db, COLLECTION, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error('Error getting project:', error);
    return null;
  }
}

/**
 * Create new project
 */
export async function createProject(projectData) {
  try {
    const newProject = {
      ...projectData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      order: projectData.order || 0
    };
    
    const docRef = await addDoc(collection(db, COLLECTION), newProject);
    
    return { id: docRef.id, ...newProject };
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
}

/**
 * Update existing project
 */
export async function updateProject(id, projectData) {
  try {
    const docRef = doc(db, COLLECTION, id);
    
    const updatedData = {
      ...projectData,
      updatedAt: Timestamp.now()
    };
    
    await updateDoc(docRef, updatedData);
    
    return { id, ...updatedData };
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
}

/**
 * Delete project
 */
export async function deleteProject(id) {
  try {
    const docRef = doc(db, COLLECTION, id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
}

/**
 * Reorder projects
 */
export async function reorderProjects(projectsWithNewOrder) {
  try {
    const updatePromises = projectsWithNewOrder.map(({ id, order }) => {
      const docRef = doc(db, COLLECTION, id);
      return updateDoc(docRef, { order, updatedAt: Timestamp.now() });
    });
    
    await Promise.all(updatePromises);
    return true;
  } catch (error) {
    console.error('Error reordering projects:', error);
    throw error;
  }
}
