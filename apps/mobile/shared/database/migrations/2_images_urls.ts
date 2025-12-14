import { File, Paths } from 'expo-file-system';
import { ImageManipulator, SaveFormat } from 'expo-image-manipulator';
import * as SQLite from 'expo-sqlite';

type TableColumnInfo = {
  cid: number;
  name: string;
  type: string;
  notnull: number;
  dflt_value: string | null;
  pk: number;
};


export async function images_urls_v2(db: SQLite.SQLiteDatabase) {

  const columns: TableColumnInfo[] = await db.getAllAsync(`PRAGMA table_info(trashes);`);
  const hasImageUrl = columns.some(c => c.name === 'imageUrl');
  if (!hasImageUrl) {
    await db.execAsync(`ALTER TABLE trashes ADD COLUMN imageUrl TEXT;`);
    // get all images
    const trashes: { id: string, imageb64: string }[] | null = await db.getAllAsync(`SELECT id, imageb64 FROM trashes WHERE imageb64 IS NOT NULL AND imageb64 != ''`);
    for (let trash of trashes) {
      const uri = `data:image/jpeg;base64,${trash.imageb64}`;
      const context = ImageManipulator.manipulate(uri);
      context.resize({ width: 800 });
      const image = await context.renderAsync();
      const result = await image.saveAsync({
        format: SaveFormat.PNG,
        compress: 0.5
      });

      const filename = `image_${Date.now()}.png`;
      const sourceFile = new File(result.uri);
      const destinationFile = new File(Paths.document, filename);
      sourceFile.copy(destinationFile);
      await db.runAsync(`UPDATE trashes SET imageUrl = ? WHERE id = ? `, [destinationFile.uri, trash.id]);
    }
    await db.execAsync(`ALTER TABLE trashes DROP imageb64`);
  }
}
