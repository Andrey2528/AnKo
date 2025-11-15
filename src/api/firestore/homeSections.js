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
  process: {
    title: "04. Our Process",
    items: [
      {
        id: 1,
        title: "Idea Discussion",
        description: "We discuss your ideas and requirements in detail."
      },
      {
        id: 2,
        title: "Design & Planning",
        description: "Creating wireframes and design mockups for your approval."
      },
      {
        id: 3,
        title: "Development",
        description: "Building your project with clean, maintainable code."
      },
      {
        id: 4,
        title: "Testing & Launch",
        description: "Thorough testing before deploying to production."
      }
    ]
  },
  pricing: {
    title: "05. Pricing",
    marqueeText: "Fair & Transparent Pricing. Fair & Transparent Pricing.",
    serviceTypes: ["web", "photo", "branding", "bot"]
  },
  faq: {
    title: "06. FREQUENTLY ASKED QUESTIONS",
    items: [
      {
        id: 1,
        question: "How long does a typical project take?",
        answer: "The timeline varies depending on the project scope and complexity. A typical website project takes 4-8 weeks, while branding projects usually require 2-4 weeks. We provide a detailed timeline during the initial consultation."
      },
      {
        id: 2,
        question: "Do you offer ongoing support and maintenance?",
        answer: "Yes, we offer various support and maintenance packages to ensure your website or brand materials stay up-to-date and function smoothly. We can discuss the best option for your needs."
      },
      {
        id: 3,
        question: "Can I see examples of your previous work?",
        answer: "Absolutely! You can view our portfolio showcasing a variety of projects we have completed. Each project demonstrates our commitment to quality and creativity."
      },
      {
        id: 4,
        question: "What kind of support can I expect post-launch?",
        answer: "Absolutely, at ANKO, we understand that budgeting is essential. We offer various payment plans to make our web design, branding, and visual identity services accessible to everyone, regardless of budget constraints."
      },
      {
        id: 5,
        question: "Do you offer custom design, or do you use templates?",
        answer: "We specialize in custom design tailored to your unique brand and business needs. While templates can be a starting point, we always customize them extensively to ensure your project stands out."
      },
      {
        id: 6,
        question: "How will I be involved in the project?",
        answer: "We believe in collaborative work. You will be involved at every stage of the project, from initial concept to final delivery. Regular check-ins and feedback sessions ensure the final product meets your vision."
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
