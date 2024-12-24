import fs from "node:fs/promises";

export default async function cleanDirectory(directory) {
  try {
    await fs
      .readdir(directory)
      .then((files) =>
        Promise.all(
          files.map((file) => fs.rm(`${directory}`, { recursive: true }))
        )
      );
  } catch (err) {
    console.log(err);
  }
}
