import { database } from "@/shared/database/db";
import { supabase } from "@/lib/supabase";
import { File } from 'expo-file-system';

let isImageSyncRunning = false;

export async function syncImages(playerId: string) {
  if (isImageSyncRunning) return;
  isImageSyncRunning = true;
  try {
    const trashes = await database.getNotSyncedImageUrls();
    for (const trash of trashes) {
      
      if (!trash.imageUrl) continue;

      const file = await readLocalImage(trash.imageUrl);
      const { error } = await supabase.storage.from('trash-images')
                              .upload(`${playerId}/${trash.id}.png`, file, {
                                upsert: true,
                                contentType: 'image/png'
                              });
      if (error) {
        console.error(`Failed to upload image for trash ${trash.id}:`, error);
        continue;
      }
      const { data: publicUrlData } = supabase.storage.from('trash-images')
                                        .getPublicUrl(`${playerId}/${trash.id}.png`);
      if (!publicUrlData || !publicUrlData.publicUrl) {
        console.error(`Failed to get public URL for trash ${trash.id}`);
        continue;
      }
      await database.updateTrashImageUrl(trash.id, publicUrlData.publicUrl);

      // Delete local image
      const sourceFile = new File(trash.imageUrl);
      sourceFile.delete();

      console.log(`Successfully synced image for trash ${trash.id}`);
      
    }
  } finally {
    isImageSyncRunning = false;
  }
}


export async function readLocalImage(uri: string): Promise<ArrayBuffer> {
  const file = new File(uri);
  return await file.arrayBuffer();
}