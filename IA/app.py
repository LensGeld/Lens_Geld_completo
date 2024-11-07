import firebase_admin
from firebase_admin import credentials, firestore
from flask import Flask, request, jsonify, render_template
from transformers import pipeline, AutoModelForCausalLM, AutoTokenizer
from flask_cors import CORS
import json

# Inicialização do app Flask
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://127.0.0.1:5500"}})

@app.route('/')
def home():
    return render_template('index.html')  # Serve o index.html

# Função para carregar as informações do arquivo JSON
def carregar_informacoes():
    with open('informacoes.json', 'r') as file:
        return json.load(file)

# Carregar as informações no início
informacoes = carregar_informacoes()

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

# Carregar o pipeline para geração de texto
model = AutoModelForCausalLM.from_pretrained('pierreguillou/gpt2-small-portuguese')
tokenizer = AutoTokenizer.from_pretrained('pierreguillou/gpt2-small-portuguese')
generator = pipeline('text-generation', model=model, tokenizer=tokenizer)

# Exemplo de memória simples
memoria = []

# Função para criar contexto com base nas informações do JSON
def criar_contexto(pergunta):
    contexto = ""
    
    # Adiciona o contexto da empresa, site e investimentos com base na pergunta
    if "sky fenix" in pergunta.lower():
        contexto += informacoes['Sky Fenix'] + " "
    if "lens geld" in pergunta.lower():
        contexto += informacoes['Lens Geld'] + " "
    
    
    return contexto

@app.route('/api/ma.IA', methods=['POST'])
def obter_resposta():
    data = request.get_json()  # Obtém os dados enviados no corpo da requisição
    print(f"Dados recebidos: {data}")  # Verifique o que está sendo recebido
    pergunta = data.get('pergunta')  # Obtém a pergunta

    # Adicionando um print para verificar se a pergunta foi recebida corretamente
    print(f"Pergunta recebida: {pergunta}")

    # Verifica se a pergunta foi fornecida
    if not pergunta:
        return jsonify({'erro': 'Pergunta não fornecida.'}), 400

    # Adiciona a pergunta à memória
    memoria.append(f"Usuário: {pergunta}")
    
    # Cria um contexto baseado na pergunta do usuário
    contexto = criar_contexto(pergunta)
    
    # Combina o contexto com a pergunta para gerar uma resposta mais precisa
    pergunta_com_contexto = contexto + pergunta

    # Resposta para saudações
    if pergunta.lower() in ['olá', 'oi', 'olá!', 'ola']:
        return jsonify({'resposta': 'Olá! Como posso ajudar você hoje?'})

    # Chama o modelo Hugging Face com a pergunta do usuário
    try:
        result = generator(pergunta_com_contexto, max_length=150, num_return_sequences=1, temperature=0.7)
        resposta = result[0]['generated_text']  # Obtém a resposta

        # Armazena a resposta na memória
        memoria.append(f"IA: {resposta}")

    except Exception as e:
        print(f"Erro ao chamar a Hugging Face: {e}")
        return jsonify({'erro': str(e)}), 500

    # Exibe a resposta gerada pela IA no terminal
    print(f"Resposta gerada pela IA: {resposta}")

    return jsonify({'resposta': resposta})

if __name__ == '__main__':
    # Garantir que o Flask aceite conexões de qualquer interface e rodar na porta 5000
    app.run(debug=True, host='0.0.0.0', port=5000)
