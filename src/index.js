import app from './app.js';
import { initDatabase } from './database.js';

const APP_PORT = process.env.PORT || 7000;
app.listen(APP_PORT, () => {
    console.log('Listening @', APP_PORT);
    initDatabase();
});
