const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });
const axios = require('axios');

// Proxy pour Anthropic (Claude)
exports.anthropicProxy = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    try {
      const { apiKey, model, max_tokens, temperature, prompt } = req.body;
      
      if (!apiKey) {
        return res.status(400).json({ error: 'API key is required' });
      }
      
      const response = await axios.post('https://api.anthropic.com/v1/messages', {
        model: model || 'claude-3-sonnet-20240229',
        max_tokens: max_tokens || 2000,
        temperature: temperature || 0.7,
        messages: [
          { role: 'user', content: prompt }
        ]
      }, {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        }
      });
      
      res.json(response.data);
    } catch (error) {
      console.error('Anthropic API error:', error.response?.data || error.message);
      res.status(error.response?.status || 500).json({ 
        error: error.response?.data || error.message 
      });
    }
  });
});

// Proxy pour OpenAI
exports.openaiProxy = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    try {
      const { apiKey, model, temperature, prompt } = req.body;
      
      if (!apiKey) {
        return res.status(400).json({ error: 'API key is required' });
      }
      
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: model || 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'Tu es un expert en marketing d\'influence qui rédige des emails professionnels.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: temperature || 0.7
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      });
      
      res.json(response.data);
    } catch (error) {
      console.error('OpenAI API error:', error.response?.data || error.message);
      res.status(error.response?.status || 500).json({ 
        error: error.response?.data || error.message 
      });
    }
  });
}); 