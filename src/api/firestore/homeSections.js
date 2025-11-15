import { 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  query, 
  getDocs,
  orderBy 
} from 'firebase/firestore';
import { db } from '../../config/firebase';

const COLLECTION = 'homeSections';
const DOC_ID = 'content';

/**
 * Default home sections structure
 */
const defaultHomeSections = {
  hero: {
    title: "We're not your ordinary digital studio.",
    buttonText: "Let's talk",
    buttonLink: "#contact"
  },
  about: {
    title: "About Us",
    mainText: "We are a digital studio focused on creating exceptional web experiences.",
    secondaryText: "Our team combines creativity with technical expertise to deliver outstanding results.",
    stats: [
      { label: "Projects Completed", value: "100+" },
      { label: "Happy Clients", value: "50+" },
      { label: "Years Experience", value: "5+" }
    ]
  },
  services: {
    title: "Our Services",
    subtitle: "What we offer",
    items: [
      {
        id: 1,
        title: "Web Development",
        description: "Custom websites and web applications built with modern technologies."
      },
      {
        id: 2,
        title: "UI/UX Design",
        description: "Beautiful and intuitive user interfaces that users love."
      },
      {
        id: 3,
        title: "Branding",
        description: "Complete brand identity solutions for your business."
      }
    ]
  },
  contact: {
    title: "Get In Touch",
    subtitle: "Let's work together",
    formFields: ["name", "email", "message"],
    submitButtonText: "Send Message"
  },
  work: {
    marqueeText: "Our Latest Projects",
    title: "Featured Work"
  }
};

/**
 * Load home sections from Firestore
 */
export async function loadHomeSections() {
  try {
    const docRef = doc(db, COLLECTION, DOC_ID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      // Initialize with default data if doesn't exist
      await setDoc(docRef, defaultHomeSections);
      return defaultHomeSections;
    }
  } catch (error) {
    console.error('Error loading home sections:', error);
    // Fallback to default if Firestore fails
    return defaultHomeSections;
  }
}

/**
 * Save specific section to Firestore
 */
export async function saveHomeSection(sectionName, sectionData) {
  try {
    const docRef = doc(db, COLLECTION, DOC_ID);
    
    // Get current data
    const currentData = await loadHomeSections();
    
    // Update specific section
    const updatedData = {
      ...currentData,
      [sectionName]: sectionData
    };

    // Save to Firestore
    await setDoc(docRef, updatedData);
    
    return updatedData;
  } catch (error) {
    console.error('Error saving home section:', error);
    throw error;
  }
}

/**
 * Save all home sections to Firestore
 */
export async function saveHomeSections(sections) {
  try {
    const docRef = doc(db, COLLECTION, DOC_ID);
    await setDoc(docRef, sections);
    return sections;
  } catch (error) {
    console.error('Error saving home sections:', error);
    throw error;
  }
}

/**
 * Initialize home sections with default data
 */
export async function initializeHomeSections() {
  try {
    const docRef = doc(db, COLLECTION, DOC_ID);
    await setDoc(docRef, defaultHomeSections);
    return defaultHomeSections;
  } catch (error) {
    console.error('Error initializing home sections:', error);
    throw error;
  }
}

export { defaultHomeSections };
