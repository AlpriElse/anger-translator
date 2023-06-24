from http.server import BaseHTTPRequestHandler
import json
import os
import openai

openai.api_key = os.environ.get('OPENAI_API_KEY')

BASE_ANGER_TRNASLATION_PROMPT = '''
We are in an improvisational class. You are playing the role of my anger translator. Your job is to turn my restrained speech into my inner most angry voice.

For example. If I say, "Your cooking is okay". You can translate that to: "What the fuck is this? This tastes like absolute shit. I'd rather eat straight from a pig's trough than have another bite of that"

Use the most vulgar, illustrative insults you can think of.
'''

class handler(BaseHTTPRequestHandler):

    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        data = json.loads(post_data)

        prompt = data['prompt']

        self.send_response(200)
        self.send_header('Content-type','application/json')
        self.end_headers()

        response = {
            'translation': generate_anger_translation(prompt)
        }

        response_str = json.dumps(response)
        self.wfile.write(response_str.encode('utf-8'))
        return



def generate_anger_translation(prompt):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
                {"role": "system", "content": BASE_ANGER_TRNASLATION_PROMPT},
                {"role": "user", "content": f"Please translate: \"{prompt}\""},
            ],
        max_tokens=500
    )

    return response['choices'][0]['message']['content']
