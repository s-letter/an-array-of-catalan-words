const fs = require('fs');
const path = require('path');
const readline = require('readline');

const INPUT_FILE = path.join(__dirname, 'data', 'raw_words.txt');
const OUTPUT_FILE = path.join(__dirname, 'index.json');

// La expresión regular SOLO permite caracteres catalanes válidos en minúscula
// Excluye guiones, apóstrofes, espacios, números
const VALID_WORD_REGEX = /^[a-zçàèéíïòóúü]+$/;

async function build() {
  if (!fs.existsSync(INPUT_FILE)) {
    console.error(`Error: Archivo no encontrado en ${INPUT_FILE}`);
    console.error('Por favor, ejecuta "unmunch data/catalan.dic data/catalan.aff > data/raw_words.txt" primero.');
    process.exit(1);
  }

  console.log('Iniciando procesamiento de raw_words.txt...');
  
  const wordsSet = new Set();
  let lineCount = 0;
  
  const fileStream = fs.createReadStream(INPUT_FILE, { encoding: 'utf8' });
  
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    lineCount++;
    if (lineCount % 1000000 === 0) {
      console.log(`Procesadas ${lineCount} líneas...`);
    }

    // Extraer solo la raíz de la palabra (todo lo anterior al carácter /)
    let word = line.split('/')[0];
    
    if (!word) continue;

    // Normalización Unicode (NFC) y a minúsculas
    word = word.normalize('NFC').toLowerCase();

    // Filtro Crítico
    if (VALID_WORD_REGEX.test(word)) {
      wordsSet.add(word);
    }
  }

  console.log(`Lectura finalizada. Total de líneas procesadas: ${lineCount}`);
  console.log(`Palabras únicas válidas encontradas: ${wordsSet.size}`);
  
  console.log('Ordenando palabras alfabéticamente...');
  const sortedWords = Array.from(wordsSet).sort();
  
  console.log(`Escribiendo resultado en ${OUTPUT_FILE}...`);
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(sortedWords, null, 2), 'utf8');
  
  console.log('¡Construcción completada! index.json generado exitosamente.');
}

build().catch(err => {
  console.error('La construcción falló:', err);
});
