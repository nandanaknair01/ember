import ssl
import certifi

def create_ssl_context():
    return ssl.create_default_context(cafile=certifi.where())

ssl._create_default_https_context = create_ssl_context
from flask import Flask, request, jsonify
from flask_cors import CORS
import whisper
import tempfile

app = Flask(__name__)
CORS(app)
model = whisper.load_model("base")

@app.route("/transcribe", methods=["POST"])
def transcribe():
    audio = request.files["audio"]

    with tempfile.NamedTemporaryFile(delete=False) as tmp:
        audio.save(tmp.name)
        result = model.transcribe(tmp.name)

    return jsonify({"transcript": result["text"]})

app.run(port=5000)