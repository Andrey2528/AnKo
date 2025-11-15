import { saveHomeSections } from '../api/firestore/homeSections';
import { createProject } from '../api/firestore/projects';
import { createPage } from '../api/firestore/pages';

/**
 * Migrate data from localStorage to Firestore
 * 
 * Run this once to transfer existing data
 */
export async function migrateFromLocalStorage() {
  try {
    console.log('Starting migration from localStorage to Firestore...');

    // 1. Migrate Home Sections
    const homeSectionsData = localStorage.getItem('anko_home_sections_v1');
    if (homeSectionsData) {
      console.log('Migrating home sections...');
      const homeSections = JSON.parse(homeSectionsData);
      await saveHomeSections(homeSections);
      console.log('✅ Home sections migrated');
    }

    // 2. Migrate Projects
    const projectsData = localStorage.getItem('anko_projects_v1');
    if (projectsData) {
      console.log('Migrating projects...');
      const projects = JSON.parse(projectsData);
      
      for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        await createProject({
          ...project,
          order: i // Preserve original order
        });
      }
      console.log(`✅ ${projects.length} projects migrated`);
    }

    // 3. Migrate Pages
    const pagesData = localStorage.getItem('anko_pages_v1');
    if (pagesData) {
      console.log('Migrating pages...');
      const pages = JSON.parse(pagesData);
      
      for (const page of pages) {
        await createPage(page);
      }
      console.log(`✅ ${pages.length} pages migrated`);
    }

    console.log('🎉 Migration completed successfully!');
    console.log('You can now safely clear localStorage or keep it as backup.');
    
    return {
      success: true,
      message: 'Migration completed successfully'
    };

  } catch (error) {
    console.error('❌ Migration failed:', error);
    return {
      success: false,
      message: error.message
    };
  }
}

/**
 * Export current Firestore data to localStorage format (backup)
 */
export async function exportToLocalStorage() {
  try {
    const { loadHomeSections } = await import('../api/firestore/homeSections');
    const { getProjects } = await import('../api/firestore/projects');
    const { getPages } = await import('../api/firestore/pages');

    const homeSections = await loadHomeSections();
    const projects = await getProjects();
    const pages = await getPages();

    localStorage.setItem('anko_home_sections_backup', JSON.stringify(homeSections));
    localStorage.setItem('anko_projects_backup', JSON.stringify(projects));
    localStorage.setItem('anko_pages_backup', JSON.stringify(pages));

    console.log('✅ Data exported to localStorage as backup');
    return true;
  } catch (error) {
    console.error('Export failed:', error);
    return false;
  }
}

/**
 * Clear old localStorage data (use after successful migration)
 */
export function clearOldLocalStorage() {
  const confirmed = confirm(
    'Are you sure you want to clear old localStorage data?\n' +
    'Make sure migration to Firestore was successful!\n\n' +
    'This will remove:\n' +
    '- anko_home_sections_v1\n' +
    '- anko_projects_v1\n' +
    '- anko_pages_v1'
  );

  if (confirmed) {
    localStorage.removeItem('anko_home_sections_v1');
    localStorage.removeItem('anko_projects_v1');
    localStorage.removeItem('anko_pages_v1');
    console.log('✅ Old localStorage data cleared');
    return true;
  }
  
  return false;
}
