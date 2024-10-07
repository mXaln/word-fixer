import fs from 'fs';
import path from 'path';
import usfmjs from 'usfm-js';
import _ from 'underscore';
import { Result } from 'app';
import namesToStrongs from '../../assets/names_to_strongs.json';
import strongs from '../../assets/strongs.json';

export default async function processDirectory(directory: string) {
  const results: Result[] = [];

  const names = _.flatten(
    Object.keys(namesToStrongs).map((name) => {
      return namesToStrongs[name as keyof typeof namesToStrongs].map(
        (strong) => {
          return Object.keys(strongs)
            .filter((key) => {
              return strong === key;
            })
            .map(() => {
              return strongs[strong as keyof typeof strongs];
            })
            .map((refs) => {
              return { name, strong, refs };
            });
        },
      );
    }),
  );

  const files = fs.readdirSync(directory);
  try {
    files.forEach((file) => {
      const filePath = path.join(directory, file);
      const stats = fs.statSync(filePath);
      const fileName = path.parse(filePath);

      if (stats.isFile() && fileName.ext === '.usfm') {
        const nameParts = fileName.name.split('-');
        const bookSlug = nameParts[1].toLowerCase();

        const document = fs.readFileSync(filePath, {
          encoding: 'utf8',
          flag: 'r',
        });
        const book = usfmjs.toJSON(document);

        names.forEach((obj: any) => {
          obj.refs.forEach((ref: string) => {
            const refParts = ref.split(' ');
            const refBook = refParts[0].toLowerCase();
            const refChapterParts = refParts[1].split(':');
            const chapter = refChapterParts[0];
            const verse = refChapterParts[1];

            // Skip other books
            if (refBook !== bookSlug) return;

            const place = book.chapters[chapter][verse];

            if (place) {
              place.verseObjects.forEach((verseObj: any) => {
                if (
                  verseObj.type === 'text' &&
                  !verseObj.text.includes(obj.name)
                ) {
                  const result: Result = {
                    bookSlug,
                    name: obj.name,
                    strong: obj.strong,
                    ref,
                    text: verseObj.text,
                  };
                  results.push(result);
                }
              });
            }
          });
        });
      }
    });
  } catch (err) {
    // console.log(err);
  }

  return results;
}
