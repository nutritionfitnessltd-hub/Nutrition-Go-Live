import fs from 'node:fs';
const required=['index.html','styles.css','app.js','data.js','vercel.json','api/config.js','supabase/schema.sql'];
for(const f of required){ if(!fs.existsSync(f)){ console.error('Missing',f); process.exit(1); } }
console.log('Launch Control file check passed.');
