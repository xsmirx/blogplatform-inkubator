import { Collection, Db, MongoClient } from 'mongodb';
import { UserDB } from '../users/types/user-db';
import { Blog } from '../blogs/types/blogs';
import { Post } from '../posts/types/posts';

const USERS_COLLECTION_NAME = 'users';
const BLOGS_COLLECTION_NAME = 'blogs';
const POSTS_COLLECTION_NAME = 'posts';

export let client: MongoClient;
export let userCollection: Collection<UserDB>;
export let blogCollection: Collection<Blog>;
export let postCollection: Collection<Post>;

export const runDb = async (url: string, databaseName: string) => {
  client = new MongoClient(url);

  const db: Db = client.db(databaseName);

  blogCollection = db.collection(BLOGS_COLLECTION_NAME);
  postCollection = db.collection(POSTS_COLLECTION_NAME);
  userCollection = db.collection(USERS_COLLECTION_NAME);

  try {
    await client.connect();
    await db.command({ ping: 1 });
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    await client.close();
    throw new Error(
      `❌ Failed to connect to MongoDB: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
};
