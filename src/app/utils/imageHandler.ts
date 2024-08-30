import { Request } from 'express';

import fs from 'fs';
import path from 'path';

type TsaveAndGetImgURLReturn = {
  image_url: string;
  path: string;
};

export const saveAndGetImgURL = (
  base64Image: string,
  customerCode: string,
  req: Request,
): TsaveAndGetImgURLReturn => {
  const buffer = Buffer.from(base64Image, 'base64');
  const imageName = `${customerCode}-${Date.now()}.png`;
  const imagePath = path.join(__dirname, '..', '..', 'bucket', imageName);
  fs.writeFileSync(imagePath, buffer);

  return {
    image_url: `${req.protocol}://${req.get('host')}/bucket/${imageName}`,
    path: imagePath,
  };
};
