import firebase_admin
from firebase_admin import credentials, firestore
import functions_framework
from transformers import pipeline, AutoModelForCausalLM, AutoTokenizer
import json
import requests

# Substitua pela sua chave de API
ALPHA_VANTAGE_API_KEY = "NGRUWF14PTDEDXRK"

# Inicialização do Firebase Admin SDK
cred = credentials.Certificate("/workspaces/Lens_Geld_completo/public/IA/lensgeld-9df15-firebase-adminsdk-d4rin-b36af14a39.json")

if not firebase_admin._apps:
    firebase_admin.initialize_app(cred)

# Inicialização do Firestore
db = firestore.client()

# Carregar as informações no início
def carregar_informacoes():
    caminho = '/workspaces/Lens_Geld_completo/IA/informacoes.json'
    with open(caminho, 'r') as file:
        return json.load(file)

informacoes = carregar_informacoes()

# Carregar o pipeline para geração de texto
model = AutoModelForCausalLM.from_pretrained('pierreguillou/gpt2-small-portuguese')
tokenizer = AutoTokenizer.from_pretrained('pierreguillou/gpt2-small-portuguese')
generator = pipeline('text-generation', model=model, tokenizer=tokenizer)

# Função para identificar a intenção da pergunta
def interpretar_intencao(pergunta):
    pergunta = pergunta.lower()
    if "empresa" in pergunta or "sky fenix" in pergunta:
        return "empresa"
    elif "assistente" in pergunta or "ma.ia" in pergunta:
        return "ia_info"
    elif "investimentos" in pergunta or "financeiro" in pergunta:
        return "financeiro"
    else:
        return "geral"

# Função para criar contexto com base na pergunta e na intenção
def criar_contexto(pergunta):
    contexto = ""
    intencao = interpretar_intencao(pergunta)
    
    if intencao == "empresa":
        contexto += informacoes.get("Sky Fenix", "") + " "
    elif intencao == "ia_info":
        contexto += informacoes.get("ma.IA", "") + " "
    elif intencao == "financeiro":
        contexto += "Estou acessando dados financeiros recentes. Aguarde um momento..."
    
    return contexto

# Função para obter dados financeiros (opcional, caso precise)
def obter_dados_financeiros(symbol="AAPL"):
    url = f"https://www.alphavantage.co/query"
    params = {
        'function': 'TIME_SERIES_INTRADAY',
        'symbol': symbol,
        'interval': '5min',
        'apikey': ALPHA_VANTAGE_API_KEY
    }
    
    resposta = requests.get(url, params=params)
    if resposta.status_code == 200:
        dados = resposta.json()
        return dados
    else:
        return None

# Função principal para lidar com requisições HTTP do Firebase Functions
@functions_framework.http
def obter_resposta(request):
    # Verifica se a requisição é do tipo POST
    if request.method != 'POST':
        return {'erro': 'Método não permitido'}, 405

    # Recupera os dados da requisição
    data = request.get_json()
    pergunta = data.get('pergunta')

    if not pergunta:
        return {'erro': 'Pergunta não fornecida.'}, 400

    # Criação do contexto com base na pergunta
    contexto = criar_contexto(pergunta)
    pergunta_com_contexto = contexto + pergunta
    pergunta = pergunta.lower()

    # Chama o modelo Hugging Face para gerar a resposta
    try:
        result = generator(pergunta_com_contexto, max_length=150, num_return_sequences=1, temperature=0.7)
        resposta = result[0]['generated_text']
    except Exception as e:
        print(f"Erro ao chamar a Hugging Face: {e}")
        return {'erro': str(e)}, 500

    return {'resposta': resposta}

# Função para adicionar perguntas e respostas ao Firestore
def adicionar_saudacoes():
    # Definindo as perguntas e respostas
    saudacoes = [
        {
            "pergunta": ['olá', 'oi', 'olá!', 'ola', 'oie', 'oii', 'eai', 'oláaaa', 'oiiii', 'olá olá', 'oi oi', 
                         'oi, tudo bem?', 'olá, tudo bem?', 'oi, como vai?', 'olá, como vai?', 'e ai, tudo bem?', 
                         'oi oi oi', 'oláaaaaaa', 'oi oi oi oi', 'oi meu chapa', 'olá meu chapa', 'e aí, beleza?', 
                         'oi, tudo certo?', 'olá! tudo certo?', 'oi, firmeza?', 'oi, meu querido', 'olá, meu querido', 
                         'olá, tudo ótimo?', 'oi, tudo bom?', 'Hi', 'hello', 'hey'],
            "resposta": 'Olá! Como posso te ajudar hoje?'
        },
         {
            "pergunta": ['bom dia', 'bom dia!', 'bom diaaaaa', 'bom diaaaa', 'bom diaaaa!', 'bom dia meu chapa', 
                         'bom dia, como vai?', 'bom dia, beleza?', 'bom dia, como você está?', 'bom dia, tudo ótimo?', 
                         'bom dia, tranquilo?', 'bom dia meu querido', 'bom dia, firmeza?', 'bom dia, tudo certo?'],
            "resposta": 'Bom dia! Como posso te ajudar?'
        },
        {
            "pergunta": ['bom dia tudo bem?', 'bom dia, tudo bem?', 'bom dia, tudo bem com você?', 'bom dia, tudo certo?', 
                         'bom dia, beleza?', 'bom dia, e aí?', 'bom dia, como você tá?', 'bom dia, como vai?'],
            "resposta": 'Bom dia! Estou bem, e você? Como posso te ajudar?'
        },
        {
            "pergunta": ['boa tarde', 'boa tarde!', 'boa tarde meu chapa', 'boa tarde meu querido', 'boa tarde, beleza?', 
                         'boa tarde! tudo certo?', 'boa tarde, tranquilo?', 'boa tarde, como vai?', 'boa tarde, como você está?'],
            "resposta": 'Boa tarde! Como posso te ajudar?'
        },
        {
            "pergunta": ['boa tarde tudo bem?', 'boa tarde, tudo bem?', 'boa tarde, tudo bem com você?', 'boa tarde, tudo certo?', 
                         'boa tarde, beleza?', 'boa tarde, e aí?', 'boa tarde, como você tá?', 'boa tarde, como vai?'],
            "resposta": 'Boa tarde! Estou bem, e você? Como posso te ajudar?'
        },
        {
            "pergunta": ['boa noite', 'boa noite!', 'boa noite meu chapa', 'boa noite meu querido', 'boa noite, tranquilo?', 
                         'boa noite', 'boa noite', 'boa noite', 'boa noite', 'boa noite, amigo!', 'boa noite, guerreiro!', 
                        'boa noite, estrela!', 'boa noite, campeão!', 'boa noite, amor!', 'boa noite, coração!', 'boa noite, alma!', 
                        'boa noite, flor!', 'boa noite, querido!', 'boa noite, tesouro!', 'boa noite, sol!', 'boa noite, anjo!', 
                        'boa noite, raio de luz!', 'boa noite, estrela-guia!', 'boa noite, sorriso!', 'boa noite, minha vida!', 
                        'boa noite, coraçãozinho!',  'boa noite, minha flor!', 'boa noite, querida amiga!', 'boa noite, refúgio!', 
                        'boa noite, estrela do meu céu!', 'boa noite, paz!', 'boa noite, sonho!', 'boa noite, raio de sol!', 
                        'boa noite, vida!', 'boa noite, esperança!', 'boa noite, anjo da guarda!'],

            "resposta": 'Boa noite! Como posso te ajudar?'
        },
        {
            "pergunta": ['boa noite tudo bem?', 'boa noite, tudo bem?', 'boa noite, tudo bem com você?', 'boa noite, tudo certo?', 
                         'boa noite, beleza?', 'boa noite, e aí?', 'boa noite, como você tá?', 'boa noite, como vai?'],
            "resposta": 'Boa noite! Estou bem, e você? Como posso te ajudar?'
        }
    ]
    
    # Para cada saudação, adicione um documento à coleção "saudacoes"
    for saudacao in saudacoes:
        # Adiciona a saudação no Firestore
        db.collection('saudacoes').add(saudacao)
    print("Saudações adicionadas com sucesso!")

# Chama a função para adicionar as saudações no Firestore
adicionar_saudacoes()
