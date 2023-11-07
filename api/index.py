from flask import Flask, request

app = Flask(__name__)

@app.route('/hello', methods=['GET'])
def hello_world():
    print("Received request at /api/hello")
    return "HELLO"

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5328)