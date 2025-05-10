const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Create the scripts directory if it doesn't exist
if (!fs.existsSync('scripts')) {
  fs.mkdirSync('scripts');
}

// Create the icons directory if it doesn't exist
if (!fs.existsSync('public/icons')) {
  fs.mkdirSync('public/icons', { recursive: true });
}

// Define the sizes for the icons
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Path to the SVG icon
const svgPath = path.join(__dirname, '../public/icons/icon.svg');

// Generate PNG icons for each size
async function generateIcons() {
  try {
    const svgBuffer = fs.readFileSync(svgPath);
    
    for (const size of sizes) {
      const outputPath = path.join(__dirname, `../public/icons/icon-${size}x${size}.png`);
      
      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(outputPath);
      
      console.log(`Generated icon: ${outputPath}`);
    }
    
    console.log('All icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

generateIcons();
