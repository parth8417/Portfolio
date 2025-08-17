// Image optimization script
// Run with: node optimize-images.js

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const optimizeProfilePic = async () => {
  const inputPath = path.join(__dirname, '../public/profile-pic.jpg');
  const outputPath = path.join(__dirname, '../public/profile-pic.jpg');
  const backupPath = path.join(__dirname, '../public/profile-pic.original.jpg');
  
  // Create a backup if it doesn't exist
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(inputPath, backupPath);
    console.log('Created backup of original profile picture');
  }

  try {
    // Optimize the image
    await sharp(inputPath)
      .resize(400) // Resize to 400x400 pixels (adjust as needed)
      .jpeg({ quality: 80, progressive: true }) // Reduce quality to 80%
      .toFile(outputPath + '.temp');
    
    // Replace the original file with the optimized one
    fs.unlinkSync(outputPath);
    fs.renameSync(outputPath + '.temp', outputPath);
    
    const originalSize = fs.statSync(backupPath).size / 1024; // KB
    const optimizedSize = fs.statSync(outputPath).size / 1024; // KB
    const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(2);
    
    console.log(`Profile picture optimized!`);
    console.log(`Original size: ${originalSize.toFixed(2)} KB`);
    console.log(`Optimized size: ${optimizedSize.toFixed(2)} KB`);
    console.log(`Saved: ${savings}%`);
  } catch (error) {
    console.error('Error optimizing image:', error);
  }
};

// Optimize all images in a directory (public/images)
const optimizeImagesInDirectory = async (directory) => {
  const imagesDir = path.join(__dirname, directory);
  
  if (!fs.existsSync(imagesDir)) {
    console.log(`Directory ${directory} does not exist`);
    return;
  }
  
  const files = fs.readdirSync(imagesDir);
  for (const file of files) {
    if (file.match(/\.(jpg|jpeg|png)$/i)) {
      const inputPath = path.join(imagesDir, file);
      const outputPath = path.join(imagesDir, file);
      const backupPath = path.join(imagesDir, `${path.parse(file).name}.original${path.parse(file).ext}`);
      
      // Create a backup if it doesn't exist
      if (!fs.existsSync(backupPath)) {
        fs.copyFileSync(inputPath, backupPath);
      }
      
      try {
        await sharp(inputPath)
          .jpeg({ quality: 80, progressive: true })
          .png({ quality: 80, progressive: true })
          .toFile(outputPath + '.temp');
        
        fs.unlinkSync(outputPath);
        fs.renameSync(outputPath + '.temp', outputPath);
        
        const originalSize = fs.statSync(backupPath).size / 1024;
        const optimizedSize = fs.statSync(outputPath).size / 1024;
        const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(2);
        
        console.log(`Optimized ${file}: ${originalSize.toFixed(2)} KB → ${optimizedSize.toFixed(2)} KB (${savings}% saved)`);
      } catch (error) {
        console.error(`Error optimizing ${file}:`, error);
      }
    }
  }
};

// Run optimizations
(async () => {
  console.log('Starting image optimization...');
  await optimizeProfilePic();
  // To optimize additional directories:
  // await optimizeImagesInDirectory('../public/images');
  console.log('Image optimization complete!');
})();
