import React, { useState } from 'react';
import { uploadImageToGitHub, deleteImageFromGitHub } from '../../../config/github';
import './ImageUpload.scss';

/**
 * ImageUpload Component
 * 
 * Component for uploading images to GitHub repository
 * 
 * @param {Object} props
 * @param {string} props.currentImage - Current image URL
 * @param {Function} props.onImageUploaded - Callback when image is uploaded
 * @param {string} props.customPath - Custom path in repo (optional)
 * @param {boolean} props.showPreview - Show image preview
 */
const ImageUpload = ({ 
  currentImage, 
  onImageUploaded, 
  customPath = null,
  showPreview = true 
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(currentImage);

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    setError(null);
    setUploading(true);

    try {
      // Show preview immediately
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(file);

      // Upload to GitHub
      const imageUrl = await uploadImageToGitHub(file, customPath);
      
      // Call callback with new URL
      onImageUploaded(imageUrl);
      
      setPreview(imageUrl);
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.message || 'Failed to upload image');
      setPreview(currentImage); // Revert preview
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!currentImage) return;
    
    if (!confirm('Are you sure you want to delete this image?')) {
      return;
    }

    setUploading(true);
    setError(null);

    try {
      await deleteImageFromGitHub(currentImage);
      setPreview(null);
      onImageUploaded(null);
    } catch (err) {
      console.error('Delete error:', err);
      setError(err.message || 'Failed to delete image');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="image-upload">
      {showPreview && preview && (
        <div className="image-upload__preview">
          <img src={preview} alt="Preview" />
          <button
            type="button"
            className="image-upload__delete"
            onClick={handleDelete}
            disabled={uploading}
            title="Delete image"
          >
            ×
          </button>
        </div>
      )}

      <div className="image-upload__controls">
        <label className="image-upload__label">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            disabled={uploading}
            className="image-upload__input"
          />
          <span className="image-upload__button">
            {uploading ? 'Uploading...' : preview ? 'Change Image' : 'Upload Image'}
          </span>
        </label>

        {error && (
          <div className="image-upload__error">
            {error}
          </div>
        )}
      </div>

      {uploading && (
        <div className="image-upload__loader">
          <div className="image-upload__spinner"></div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
