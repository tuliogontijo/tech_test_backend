import { Request } from 'express';

import { GoogleGenerativeAI } from '@google/generative-ai';

import fs from 'fs';
import path from 'path';

export const saveAndGetImgURL = (base64Image: string, customerCode: string, req: Request): Record<string, string> => {
  const buffer = Buffer.from(base64Image, 'base64');
  const imageName = `${customerCode}-${Date.now()}.png`;
  const imagePath = path.join(__dirname, '..', '..', 'bucket', imageName);
  fs.writeFileSync(imagePath, buffer);

  return {
    image_url: `${req.protocol}://${req.get('host')}/bucket/${imageName}`,
    path: imagePath,
  };
};

export const getAIMeasureValueFromImage = async (path: string): Promise<string> => {
  const API_KEY = process.env.GEMINI_API_KEY as string;

  const genAI = new GoogleGenerativeAI(API_KEY);

  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const fileToIA = fileToGenerativePart(path, 'image/png');

  console.log(path);

  const prompt =
    'Este imagem se trata de uma foto tirada de uma conta de água ou gás. Analise a imagem e me retorne o valor da medição do perído corrente contido na mesma. Preciso que o retorno desta solicitação seja somente os números da medição, sem qualquer texto adicional';

  const generatedContent = await model.generateContent([prompt, fileToIA]);

  console.log(generatedContent.response.text());

  return generatedContent.response.text();
};

const fileToGenerativePart = (path: string, mimeType: string) => {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString('base64'),
      mimeType,
    },
  };
};
