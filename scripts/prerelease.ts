import * as fs from 'fs-extra';
import * as path from 'path';

(function version() {
  const base = path.resolve(__dirname, '../packages');
  const items = fs.readdirSync(base);

  for (const item of items) {
    const packageJsonFilePath = path.join(base, item, 'package.json');

    if (fs.pathExistsSync(packageJsonFilePath)) {
      fs.writeFileSync(
        packageJsonFilePath,
        JSON.stringify({ ...fs.readJSONSync(packageJsonFilePath), version }, null, 2),
      );
    }
  }
})();
