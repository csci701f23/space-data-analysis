from flask import jsonify
class Serializer:
    def __init__(self):
        pass

    def ping_output(self, res):
        return jsonify(res)