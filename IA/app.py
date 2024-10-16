import openai  # Corrigido o nome da importação
from flask import Flask, request, jsonify

app = Flask(__name__)

# Chave de API da OpenAI
openai.api_key = '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'

@app.route('/api/ma.IA', methods=['POST'])
def obter_resposta():
    data = request.get_json()
    pergunta = data.get('pergunta')
    
    # Verifica se a pergunta foi fornecida
    if not pergunta:
        return jsonify({'erro': 'Pergunta não fornecida.'}), 400

    # Chama o modelo da OpenAI com a pergunta do usuário
    try:
        completion = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[{"role": "user", "content": pergunta}]
        )
        resposta = completion['choices'][0]['message']['content']  # Obtém a resposta
    except Exception as e:
        return jsonify({'erro': str(e)}), 500  # Retorna erro se algo falhar

    return jsonify({'resposta': resposta})

if __name__ == '__main__':
    app.run(debug=True)
