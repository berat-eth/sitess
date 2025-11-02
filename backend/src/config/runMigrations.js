import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { query } from './database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const migrationsDir = path.join(__dirname, '../../migrations');

async function runMigrations() {
  try {
    // Read all migration files
    const files = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.sql'))
      .sort();

    console.log(`📦 Found ${files.length} migration files`);

    // Create migrations tracking table
    await query(`
      CREATE TABLE IF NOT EXISTS \`migrations\` (
        \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT,
        \`filename\` VARCHAR(255) NOT NULL UNIQUE,
        \`executed_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // Get already executed migrations
    const executedMigrations = await query('SELECT filename FROM migrations');
    const executedSet = new Set(executedMigrations.map(m => m.filename));

    // Execute each migration
    for (const file of files) {
      if (executedSet.has(file)) {
        console.log(`⏭️  Skipping ${file} (already executed)`);
        continue;
      }

      const filePath = path.join(migrationsDir, file);
      const sql = fs.readFileSync(filePath, 'utf8');

      console.log(`🔄 Running migration: ${file}`);
      
      // Split SQL by semicolons and execute each statement
      const statements = sql
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0);

      for (const statement of statements) {
        await query(statement);
      }

      // Record migration as executed
      await query('INSERT INTO migrations (filename) VALUES (?)', [file]);
      console.log(`✅ Completed: ${file}`);
    }

    console.log('✨ All migrations completed successfully!');
  } catch (error) {
    console.error('❌ Migration error:', error);
    process.exit(1);
  }
}

runMigrations();
