import { Request } from 'express';

import fs from 'fs';
import path from 'path';

export const saveImage = (base64Image: string, customerCode: string, req: Request): string => {
  const buffer = Buffer.from(base64Image, 'base64');
  const imageName = `${customerCode}-${Date.now()}.png`;
  const imagePath = path.join(__dirname, '..', '..', 'bucket', imageName);
  fs.writeFileSync(imagePath, buffer);

  return `${req.protocol}://${req.get('host')}/bucket/${imageName}`;
};
