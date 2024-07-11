from flask import Flask, render_template, jsonify
from flask import request

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/user_stopped_typing', methods=['POST'])
def user_stopped_typing():
    data = request.get_json()
    print("User stopped typing. Text content:", data['text'])
    return jsonify({"message": "Received text content"})


if __name__ == '__main__':
    app.run(debug=True)