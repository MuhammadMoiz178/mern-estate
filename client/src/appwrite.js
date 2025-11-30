import { Client, Storage,ID} from 'appwrite';

export const client = new Client();
export const storage = new Storage(client);

client
    .setEndpoint(import.meta.env.VITE_APPWRITE_URL)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // Replace with your project ID

export const uploadToAppwrite = async (file) => {
    
    return await storage.createFile(
        import.meta.env.VITE_APPWRITE_BUCKET_ID,
        ID.unique(),
        file,
    )
}

export const getFile = async (fileId) => {
    return storage.getFileView(
        import.meta.env.VITE_APPWRITE_BUCKET_ID,
        fileId,
    )
}