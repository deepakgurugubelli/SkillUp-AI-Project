import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();

    console.log('Received messages:', messages);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4-mini',
        messages: [
          {
            role: 'system',
            content: `You are a helpful AI learning assistant focused on skill development and education. You provide clear, concise, and supportive responses to help users with their learning journey. You have expertise in various courses including:

            - Full Stack Development (MERN Stack)
            - AI & Machine Learning
            - Cloud Computing (AWS)
            - DevOps & CI/CD
            - Blockchain Development
            - UI/UX Design
            - Data Science
            - Cybersecurity
            - Mobile App Development
            - Python Programming
            - Digital Marketing
            - IoT Development
            - Game Development
            - Cloud Native Development
            - Data Engineering

            When users ask about these courses, provide specific, relevant information about the curriculum, prerequisites, and career opportunities. Keep responses friendly and encouraging, and be able to assist in multiple languages.`
          },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 150
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', errorData);
      
      if (response.status === 429 || errorData.includes('insufficient_quota')) {
        throw new Error('OpenAI API rate limit or quota exceeded. Please try again later or update your API key.');
      }
      
      throw new Error(`OpenAI API error: ${errorData}`);
    }

    const data = await response.json();
    console.log('OpenAI response:', data);
    
    const message = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in chat function:', error);
    
    const errorMessage = error.message.includes('rate limit') || error.message.includes('quota') ?
      'OpenAI API rate limit or quota exceeded. Please try again later or update your API key.' :
      'An unexpected error occurred while processing your request.';
    
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        details: error.message
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});