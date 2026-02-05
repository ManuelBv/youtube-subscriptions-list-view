const fs = require('fs');
const path = require('path');
const { minify } = require('terser');

async function build() {
  console.log('🔨 Building bookmarklet...\n');

  // Read source files
  const utilsJS = fs.readFileSync(path.join(__dirname, 'src', 'utils.js'), 'utf8');
  const bookmarkletJS = fs.readFileSync(path.join(__dirname, 'src', 'bookmarklet.js'), 'utf8');
  const stylesCSS = fs.readFileSync(path.join(__dirname, 'src', 'styles.css'), 'utf8');

  // Minify CSS (basic minification)
  const minifiedCSS = stylesCSS
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
    .replace(/\s+/g, ' ') // Collapse whitespace
    .replace(/\s*([{}:;,])\s*/g, '$1') // Remove spaces around special chars
    .trim();

  // Combine JS files and inject CSS
  const combinedJS = `
    ${utilsJS}

    // Injected CSS
    const CSS_STYLES = ${JSON.stringify(minifiedCSS)};

    ${bookmarkletJS}
  `;

  // Minify JS
  const minified = await minify(combinedJS, {
    compress: {
      dead_code: true,
      drop_console: false,
      drop_debugger: true,
      keep_fargs: false,
      passes: 2
    },
    mangle: {
      toplevel: true
    },
    format: {
      comments: false
    }
  });

  if (minified.error) {
    console.error('❌ Minification error:', minified.error);
    process.exit(1);
  }

  // Wrap in bookmarklet format
  const bookmarklet = `javascript:(function(){${minified.code}})();`;

  // Ensure dist directory exists
  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
  }

  // Write output
  fs.writeFileSync(path.join(__dirname, 'dist', 'bookmarklet.txt'), bookmarklet, 'utf8');
  fs.writeFileSync(path.join(__dirname, 'dist', 'bookmarklet.js'), minified.code, 'utf8');

  console.log('✅ Bookmarklet built successfully!');
  console.log(`📦 Output: dist/bookmarklet.txt (${bookmarklet.length} characters)`);
  console.log(`📦 Readable: dist/bookmarklet.js\n`);
}

build().catch(err => {
  console.error('❌ Build failed:', err);
  process.exit(1);
});
