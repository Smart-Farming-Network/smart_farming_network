import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req) {
  try {
    const { messages } = await req.json();

    const response = await client.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 1024,
      system: `You are Edna, a friendly and knowledgeable AI assistant for the Smart Farming Network (GSFN).

Your role is to help farmers, investors, and agricultural enthusiasts with:
- Smart farming practices and technology
- Agricultural advice and crop management
- Information about the GSFN platform (marketplace, profiles, dashboards)
- Investment opportunities in agriculture
- Market prices and trends
- Farm management best practices
- Connecting farmers with investors

Keep your responses concise, warm, and encouraging. Use simple, clear language.
If someone asks something outside agriculture or the GSFN platform, gently steer them back to farming topics.
Always be positive and supportive of farmers and the agricultural community.`,
      messages: messages
        .filter((m) => m.role === 'user' || m.role === 'assistant')
        .map((m) => ({ role: m.role, content: m.content })),
    });

    return Response.json({ message: response.content[0].text });
  } catch (error) {
    console.error('Chat API error:', error);
    return Response.json(
      { message: 'Sorry, I am having trouble connecting right now. Please try again shortly.' },
      { status: 500 }
    );
  }
}
