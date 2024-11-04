from flask import Flask, jsonify, request, abort

app = Flask(__name__)

# Data dummy
data = {
    1: {'name': 'Item 1', 'description': 'This is item 1'},
    2: {'name': 'Item 2', 'description': 'This is item 2'},
}

# Endpoint untuk GET
@app.route('/items', methods=['GET'])
def get_items():
    return jsonify(data)

# Endpoint untuk POST
@app.route('/items', methods=['POST'])
def create_item():
    if not request.json or 'name' not in request.json:
        abort(400)
    new_id = max(data.keys()) + 1
    data[new_id] = {
        'name': request.json['name'],
        'description': request.json.get('description', "")
    }
    return jsonify(data[new_id]), 201

# Endpoint untuk PUT
@app.route('/items/<int:item_id>', methods=['PUT'])
def update_item(item_id):
    if item_id not in data:
        abort(404)
    if not request.json:
        abort(400)
    
    data[item_id]['name'] = request.json.get('name', data[item_id]['name'])
    data[item_id]['description'] = request.json.get('description', data[item_id]['description'])
    
    return jsonify(data[item_id])

# Endpoint untuk DELETE
@app.route('/items/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    if item_id not in data:
        abort(404)
    del data[item_id]
    return jsonify({'result': True})

if __name__ == '__main__':
    app.run(debug=True)
