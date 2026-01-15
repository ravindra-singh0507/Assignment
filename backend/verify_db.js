import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;
console.log('\n--- MongoDB Verification Script ---');
console.log('Target URI:', uri);

async function verify() {
    try {
        await mongoose.connect(uri);
        console.log('✅ Connected successfully to MongoDB');

        const dbName = mongoose.connection.db.databaseName;
        console.log(`📂 Database: ${dbName}`);

        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log(`📚 Collections: ${collections.length}`);

        if (collections.length === 0) {
            console.log('⚠️ No collections found. The database might be empty.');
        } else {
            console.log('\nCollection Counts:');
            for (const col of collections) {
                const count = await mongoose.connection.db.collection(col.name).countDocuments();
                console.log(`   - ${col.name}: ${count} document(s)`);
            }
        }
        console.log('-----------------------------------\n');

    } catch (err) {
        console.error('❌ Connection Error:', err.message);
    } finally {
        await mongoose.disconnect();
    }
}

verify();
