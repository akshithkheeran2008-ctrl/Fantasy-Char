import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '10mb' }));

  // Initialize GoogleGenAI server-side with user-agent
  let ai: GoogleGenAI | null = null;
  if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

  // API Route to Generate Cartoon / Video Game Character Portrait
  app.post('/api/generate-portrait', async (req, res) => {
    try {
      const { character, stylePrompt } = req.body;
      if (!character) {
        return res.status(400).json({ error: 'Character data is required' });
      }

      if (!ai || !process.env.GEMINI_API_KEY) {
        return res.json({
          fallback: true,
          message: 'No Gemini API key attached, falling back to local procedural cartoon engine',
        });
      }

      const prompt = `Vibrant 2D cartoon video game character portrait of ${character.fullName}, a ${character.race} ${character.characterClass}. Wearing ${character.armorOrAttire}, brandishing ${character.primaryWeapon}. Style: colorful cel-shaded 2D fantasy video game art, bold expressive lines, whimsical cartoon proportions, dynamic gaming avatar, saturated glowing accents, solid colored clean game backdrop. ${stylePrompt || ''}`;

      // Generate image using gemini-3.1-flash-lite-image
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite-image',
        contents: {
          parts: [{ text: prompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: '1:1',
          },
        },
      });

      let imageUrl: string | null = null;
      for (const part of response.candidates?.[0]?.content?.parts ?? []) {
        if (part.inlineData?.data) {
          const mime = part.inlineData.mimeType ?? 'image/png';
          imageUrl = `data:${mime};base64,${part.inlineData.data}`;
          break;
        }
      }

      if (imageUrl) {
        return res.json({ imageUrl, success: true });
      } else {
        return res.json({
          fallback: true,
          message: 'Model responded without inline image data, falling back to procedural engine',
        });
      }
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : 'Unknown generation error';
      console.warn('Gemini image generation note (using local cartoon generator fallback):', errMsg);
      return res.json({
        fallback: true,
        message: errMsg,
      });
    }
  });

  // API Route to Generate 1-to-2-sentence Character Origin Backstory
  app.post('/api/generate-backstory', async (req, res) => {
    try {
      const { character } = req.body;
      if (!character) {
        return res.status(400).json({ error: 'Character data is required' });
      }

      if (!ai || !process.env.GEMINI_API_KEY) {
        return res.json({ fallback: true, message: 'No Gemini API key attached' });
      }

      const prompt = `Write a compelling, evocative, exactly one-to-two-sentence fantasy origin backstory for this adventurer:
Name: ${character.fullName} ("${character.epithet}")
Race: ${character.race}
Class: ${character.characterClass}
Alignment: ${character.alignment}
Homeland / Origin: ${character.originRealm}
Weapon: ${character.primaryWeapon}
Signature Ability: ${character.signatureAbility}
Personality Trait: ${character.personalityTrait}
Heroic Flaw: ${character.flaw}

Requirements:
- Length: Strictly 1 to 2 sentences.
- Tone: Rich, atmospheric, heroic dark fantasy.
- Content: Describe their origins, what drove them into adventuring with their signature weapon, or the fateful event that marked their destiny.
- Return ONLY the 1-2 sentence story. Do NOT include quotation marks, titles, or greetings.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction:
            'You are an ancient fantasy alchemist chronicler recording heroic origins into a sacred grimoire. Provide only the 1-2 sentence origin story with zero meta-commentary.',
        },
      });

      const backstory = response.text?.trim();
      if (backstory) {
        return res.json({ backstory, success: true });
      } else {
        return res.json({ fallback: true });
      }
    } catch (err: unknown) {
      console.warn('Gemini backstory generation notice (using fallback):', err);
      return res.json({ fallback: true });
    }
  });

  // Vite development middleware
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Arcane Codex server running on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
