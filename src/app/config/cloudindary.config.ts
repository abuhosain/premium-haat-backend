import { v2 as cloudinary } from 'cloudinary';
import config from '.';

// Configuration
cloudinary.config({
    cloud_name: "djqyb52xi",
    api_key: "635181914688275",
    api_secret: "Rj1owdgKmUDS-WkIJFKVdYClIRo",
  });
  
export const cloudinaryUpload = cloudinary;