// GitHub configuration for image uploads
export const GITHUB_CONFIG = {
  owner: import.meta.env.VITE_GITHUB_OWNER || 'Andrey2528',
  repo: import.meta.env.VITE_GITHUB_REPO || 'AnKo',
  branch: import.meta.env.VITE_GITHUB_BRANCH || 'master',
  token: import.meta.env.VITE_GITHUB_TOKEN || '', // Personal Access Token with repo permissions
  imagePath: 'src/assets/images/uploads' // Path where images will be stored
};

/**
 * Upload image to GitHub repository
 * @param {File} file - Image file to upload
 * @param {string} customPath - Optional custom path (default: GITHUB_CONFIG.imagePath)
 * @returns {Promise<string>} URL of uploaded image
 */
export async function uploadImageToGitHub(file, customPath = null) {
  const { owner, repo, branch, token, imagePath } = GITHUB_CONFIG;
  
  if (!token) {
    throw new Error('GitHub token not configured. Set VITE_GITHUB_TOKEN in .env file');
  }

  // Generate unique filename
  const timestamp = Date.now();
  const fileName = `${timestamp}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
  const path = `${customPath || imagePath}/${fileName}`;

  // Convert file to base64
  const base64Content = await fileToBase64(file);

  // Upload to GitHub
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `token ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: `Upload image: ${fileName}`,
      content: base64Content.split(',')[1], // Remove data:image/...;base64, prefix
      branch: branch
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`GitHub upload failed: ${error.message}`);
  }

  const data = await response.json();
  
  // Return raw GitHub URL for the image
  return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;
}

/**
 * Delete image from GitHub repository
 * @param {string} imageUrl - Full URL of the image
 * @returns {Promise<void>}
 */
export async function deleteImageFromGitHub(imageUrl) {
  const { owner, repo, branch, token } = GITHUB_CONFIG;
  
  if (!token) {
    throw new Error('GitHub token not configured');
  }

  // Extract path from URL
  const urlPattern = new RegExp(`https://raw.githubusercontent.com/${owner}/${repo}/${branch}/(.+)`);
  const match = imageUrl.match(urlPattern);
  
  if (!match) {
    throw new Error('Invalid GitHub image URL');
  }

  const path = match[1];

  // Get file SHA first
  const getUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  const getResponse = await fetch(getUrl, {
    headers: {
      'Authorization': `token ${token}`,
    }
  });

  if (!getResponse.ok) {
    throw new Error('Failed to get file info');
  }

  const fileData = await getResponse.json();

  // Delete file
  const deleteUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  const deleteResponse = await fetch(deleteUrl, {
    method: 'DELETE',
    headers: {
      'Authorization': `token ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: `Delete image: ${path.split('/').pop()}`,
      sha: fileData.sha,
      branch: branch
    })
  });

  if (!deleteResponse.ok) {
    const error = await deleteResponse.json();
    throw new Error(`GitHub delete failed: ${error.message}`);
  }
}

/**
 * Convert File to base64 string
 */
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
