const Anthropic = require('@anthropic-ai/sdk');
const system = require('./prompt');

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const getAdvice = async (data) => {
  try {
    const response = await anthropic.messages.create({
      system,
      max_tokens: 450,
      temperature: 0.1,
      model: 'claude-3-5-sonnet-20240620',
      messages: [
        { role: 'user', content: data },
      ],
    });

    return response.content[0].text;
  } catch (error) {
    console.error('Error creating message:', error);
    throw error;
  }
};

module.exports = { getAdvice };