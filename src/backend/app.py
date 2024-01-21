"""Python Flask WebApp Auth0 integration example
"""

import json
from os import environ as env
from urllib.parse import quote_plus, urlencode

from authlib.integrations.flask_client import OAuth
from dotenv import find_dotenv, load_dotenv
from flask import Flask, redirect, render_template, session, url_for, request

from algo import checkIfValidAssigmentPossible, calculate_distance, find_arangement
user_id = "c2bMXBEwVtUgaCIkJziWBhHGnVScUdgG"
ENV_FILE = find_dotenv()
if ENV_FILE:
    load_dotenv(ENV_FILE)

json_file = './data.json'

app = Flask(__name__)
app.secret_key = env.get("APP_SECRET_KEY")
# app.debug = True


oauth = OAuth(app)

oauth.register(
    "auth0",
    client_id=env.get("AUTH0_CLIENT_ID"),
    client_secret=env.get("AUTH0_CLIENT_SECRET"),
    client_kwargs={
        "scope": "openid profile email",
    },
    server_metadata_url=f'https://{env.get("AUTH0_DOMAIN")}/.well-known/openid-configuration',
)


# Controllers API
@app.route("/")
def home():
    return render_template(
        "home.html",
        session=session.get("user"),
        pretty=json.dumps(session.get("user"), indent=4),
    )

@app.route("/algo")
def algo():
    # run algorithm on and update json file
    if user_id not in data:
        data[user_id] = {}
        data[user_id]['rooms'] = []
        data[user_id]['classes'] = []
        with open(json_file, 'w') as f:
            json.dump(data, f, indent=4)
    with open(json_file, 'r') as f:
        data = json.load(f)
    #get rooms and classes
    rooms = data[user_id]['rooms']
    classes = data[user_id]['classes']
    #run algorithm
    if not checkIfValidAssigmentPossible(rooms, classes):       
        return json.dumps({'error': 'Not enough rooms to hold all classes'})

@app.route('/add_room', methods=['POST'])
def add_room():  
    with open(json_file, 'r') as f:
        data = json.load(f)
    if user_id not in data:
        data[user_id] = {}
        data[user_id]['rooms'] = []
        data[user_id]['classes'] = []
        with open(json_file, 'w') as f:
            json.dump(data, f, indent=4)

    req_data = request.get_json()
    
    
    #get user id from session

    data[user_id]['rooms'].append(req_data)

    with open(json_file, 'w') as f:
        json.dump(data, f, indent=4)
    return json.dumps(req_data)
    
@app.route('/add_class', methods=['POST'])
def add_class():
    with open(json_file, 'r') as f:
        data = json.load(f)
    if user_id not in data:
        data[user_id] = {}
        data[user_id]['rooms'] = []
        data[user_id]['classes'] = []
        with open(json_file, 'w') as f:
            json.dump(data, f, indent=4)
    req_data = request.get_json()
    #get user id from session

    data[user_id]['classes'].append(req_data)

    with open(json_file, 'w') as f:
        json.dump(data, f, indent=4)
    return json.dumps(req_data)

@app.route('/get_rooms', methods=['GET'])
def get_rooms():
    with open(json_file, 'r') as f:
        data = json.load(f)
    if user_id not in data:
        data[user_id] = {}
        data[user_id]['rooms'] = []
        data[user_id]['classes'] = []
        with open(json_file, 'w') as f:
            json.dump(data, f, indent=4)

   
    return json.dumps(data[user_id]['rooms'])

@app.route('/get_classes', methods=['GET'])
def get_classes():
    with open(json_file, 'r') as f:
        data = json.load(f)
    if user_id not in data:
        data[user_id] = {}
        data[user_id]['rooms'] = []
        data[user_id]['classes'] = []
        with open(json_file, 'w') as f:
            json.dump(data, f, indent=4)


    return json.dumps(data[user_id]['classes'])

@app.route('/delete_room', methods=['POST'])
def delete_room():
    with open(json_file, 'r') as f:
        data = json.load(f)
    req_data = request.get_json()    
    #get user id from session

    data[user_id]['rooms'].remove(req_data)

    with open(json_file, 'w') as f:
        json.dump(data, f, indent=4)
    return json.dumps(req_data)

@app.route('/delete_class', methods=['POST'])
def delete_class():
    req_data = request.get_json()
    with open(json_file, 'r') as f:
        data = json.load(f)
    
    #get user id from session

    data[user_id]['classes'].remove(req_data)

    with open(json_file, 'w') as f:
        json.dump(data, f, indent=4)
    return json.dumps(req_data)

@app.route("/callback", methods=["GET", "POST"])
def callback():
    token = oauth.auth0.authorize_access_token()
    session["user"] = token              
    return redirect("http://localhost:3001/projects?token="+token["access_token"]+"&user_id="+user_id)


@app.route("/login")
def login():
    return oauth.auth0.authorize_redirect(
        redirect_uri=url_for("callback", _external=True)
    )


@app.route("/logout")
def logout():
    session.clear()
    return redirect(
        "https://"
        + env.get("AUTH0_DOMAIN")
        + "/v2/logout?"
        + urlencode(
            {
                "returnTo": url_for("home", _external=True),
                "client_id": env.get("AUTH0_CLIENT_ID"),
            },
            quote_via=quote_plus,
        )
    )


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=env.get("FLASK_RUN_PORT", 3001))
