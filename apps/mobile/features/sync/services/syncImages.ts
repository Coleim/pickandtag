import { database } from "@/shared/database/db";


let isImageSyncRunning = false;

export async function syncImages(playerId: string) {

  if (isImageSyncRunning) return;
  isImageSyncRunning = true;
  try {
    const trashes = await database.getNotSyncedImageUrls();

    console.log("Trashes : ", trashes)
    // [{"id": "1ad64fc6-9dba-4179-a37e-80437fa5fa66", "imageUrl": "file:///data/user/0/com.coleim.pickandtag/files/trash_image_1766263088569.png"}]


    console.log(" player id : ", playerId)
  } finally {
    isImageSyncRunning = false;
  }

}
