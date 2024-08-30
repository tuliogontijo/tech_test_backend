import fs from 'fs';

import { GoogleGenerativeAI } from '@google/generative-ai';

export const getAIMeasureValueFromImage = async (path: string): Promise<string> => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const fileToIA = fileToGenerativePart(path, 'image/png');

  const prompt =
    'Este imagem se trata de uma foto tirada de uma conta de água ou gás. Analise a imagem e me retorne o valor da medição do perído corrente contido na mesma. Preciso que o retorno desta solicitação seja somente os números da medição, sem qualquer texto adicional';

  const generatedContent = await model.generateContent([prompt, fileToIA]);

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
