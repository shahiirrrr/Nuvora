import sharp from 'sharp';
import { existsSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join, basename, extname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ensure the optimized directory exists
const optimizedDir = join(__dirname, '../public/optimized');
if (!existsSync(optimizedDir)) {
  mkdirSync(optimizedDir, { recursive: true });
}

// Process each banner image
const processImage = async (imageName) => {
  const inputPath = join(__dirname, `../public/${imageName}`);
  const outputName = basename(imageName, extname(imageName));
  const outputPath = join(optimizedDir, `${outputName}.webp`);
  
  try {
    // Convert to WebP
    await sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputPath);
    
    console.log(`✅ Optimized ${imageName} to WebP`);
    
    // Also create a lower quality version for better loading
    await sharp(inputPath)
      .jpeg({ quality: 60 })
      .toFile(join(optimizedDir, `${outputName}.jpg`));
      
    console.log(`✅ Created optimized JPG for ${imageName}`);
    
  } catch (error) {
    console.error(`❌ Error processing ${imageName}:`, error);
  }
};

// Get all banner images
const bannerImages = [
  'banner-living.jpg',
  'banner-dining.jpg',
  'banner-bedroom.jpg',
  'banner-decor.jpg',
  'category-banner.jpg'
];

// Process all images
const processAll = async () => {
  console.log('🚀 Starting image optimization...');
  
  for (const image of bannerImages) {
    await processImage(image);
  }
  
  console.log('✨ All images have been optimized!');};

processAll();
