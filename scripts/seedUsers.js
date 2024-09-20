const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const bcrypt = require('bcrypt');

const db = new sqlite3.Database('./api/morlaco.sqlite');

// Read users from JSON file
const users = JSON.parse(fs.readFileSync('./seed/users.json', 'utf8'));

// Clear existing users
db.run('DELETE FROM user', async (err) => {
  if (err) {
    console.error('Error clearing users:', err);
    db.close();
    return;
  }
  console.log('Cleared existing users');

  // Insert new users
  const stmt = db.prepare('INSERT INTO user (email, password, name) VALUES (?, ?, ?)');

  try {
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await new Promise((resolve, reject) => {
        stmt.run(user.email, hashedPassword, user.name, (err) => {
          if (err) {
            reject(err);
          } else {
            console.log(`Inserted user: ${user.email}`);
            resolve();
          }
        });
      });
    }
  } catch (error) {
    console.error('Error inserting user:', error);
  } finally {
    stmt.finalize();
    db.close(() => console.log('Database connection closed'));
  }
});
