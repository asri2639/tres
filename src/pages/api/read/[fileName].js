import fs from 'fs';
import path from 'path';

export default (req, res) => {
  const { fileName } = req.query;
  const fileContent = fs.readFileSync(
    path.join(__dirname, '..', '..', 'public', 'assets', fileName),
    'utf8'
  );
  console.log(fileContent)
  res.json(fileContent);
  res.statusCode = 200;
  res.end();
};
