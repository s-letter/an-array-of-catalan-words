const fs = require('fs');
const https = require('https');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');
const SCRIPTS_DIR = path.join(__dirname, 'scripts');

// Create directories if they don't exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(SCRIPTS_DIR)) {
  fs.mkdirSync(SCRIPTS_DIR, { recursive: true });
}

const files = [
  {
    url: 'https://raw.githubusercontent.com/softcatala/catalan-dict-tools/master/resultats/hunspell/catalan.dic',
    dest: path.join(DATA_DIR, 'catalan.dic')
  },
  {
    url: 'https://raw.githubusercontent.com/softcatala/catalan-dict-tools/master/resultats/hunspell/catalan.aff',
    dest: path.join(DATA_DIR, 'catalan.aff')
  }
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    console.log(`Downloading ${url} ...`);
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

async function setup() {
  try {
    for (const file of files) {
      if (!fs.existsSync(file.dest)) {
        await downloadFile(file.url, file.dest);
        console.log(`Downloaded ${path.basename(file.dest)} successfully.`);
      } else {
        console.log(`${path.basename(file.dest)} already exists.`);
      }
    }
    
    console.log('\n--- INSTRUCCIONES IMPORTANTES ---');
    console.log('Para generar la lista de palabras crudas, necesitas usar la herramienta "unmunch" de Hunspell.');
    console.log('Por favor, ejecuta el siguiente comando en tu terminal desde la raíz del proyecto:');
    console.log('\n  unmunch data/catalan.dic data/catalan.aff > data/raw_words.txt\n');
    console.log('Nota: En Windows, si no tienes unmunch, puedes ejecutarlo vía WSL, instalar Hunspell para Windows,');
    console.log('o utilizar un script alternativo si dispones de él.');
    console.log('Una vez generado data/raw_words.txt, ejecuta: node build.js');

  } catch (err) {
    console.error('Error during setup:', err);
  }
}

setup();
