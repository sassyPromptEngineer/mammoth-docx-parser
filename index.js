import express from 'express';
import bodyParser from 'body-parser';
import mammoth from 'mammoth';

const app = express();
app.use(bodyParser.json({ limit: '10mb' }));

app.post('/parse-docx', async (req, res) => {
  try {
    const { base64 } = req.body;
    if (!base64) return res.status(400).json({ error: 'Missing base64 input' });

    const buffer = Buffer.from(base64, 'base64');
    const result = await mammoth.extractRawText({ buffer });

    res.json({ text: result.value });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/', (req, res) => {
  res.send('Mammoth DOCX Parser is running ✅');
});

app.listen(3000, () => {
  console.log('🚀 Mammoth server running on port 3000');
});
