import openai
import firebase_admin
from firebase_admin import credentials, firestore
from flask import Flask, request, jsonify


# Inicialização do app Flask
app = Flask(__name__)

# Caminho para o arquivo de credenciais do Firebase
cred = credentials.Certificate("/workspaces/Lens_Geld_completo/IA/lensgeld-9df15-firebase-adminsdk-d4rin-b36af14a39.json")

# Verifica se o Firebase já foi inicializado
if not firebase_admin._apps:
    firebase_admin.initialize_app(cred)

# Inicialização do Firestore
db = firestore.client()

@app.route('/api/usuario/<user_id>', methods=['GET'])
def obter_nome_usuario(user_id):
    try:
        # Busca o documento do usuário no Firestore pela coleção 'firstname'
        usuario_ref = db.collection('firstname').document(user_id)
        usuario = usuario_ref.get()

        # Verifica se o usuário existe
        if usuario.exists:
            # Obtém o nome do usuário do documento
            nome = usuario.to_dict().get('nome')
            return jsonify({'nome': nome})
        else:
            return jsonify({'erro': 'Usuário não encontrado'}), 404

    except Exception as e:
        return jsonify({'erro': str(e)}), 500


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
    # Garantir que o Flask aceite conexões de qualquer interface e rodar na porta 5000
    app.run(debug=True, host='0.0.0.0', port=5000)
