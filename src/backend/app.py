"""Python Flask WebApp Auth0 integration example
"""

import json
from os import environ as env
from urllib.parse import quote_plus, urlencode

from authlib.integrations.flask_client import OAuth
from dotenv import find_dotenv, load_dotenv
from flask import Flask, redirect, render_template, session, url_for, request

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

@app.route('/add_room', methods=['POST'])
def add_room():
    #check if no user is logged in
    if not session.get("user"):
        return json.dumps({'error': 'no user logged in'})
    #check if user is in json file and add if not
    data = {}
    with open(json_file, 'r') as f:
        data = json.load(f)
    #get user id from session
    user_id = session.get("user")['userinfo']['aud']
    if user_id not in data:
        data[user_id] = {}
        data[user_id]['rooms'] = []
        data[user_id]['classes'] = []
        with open(json_file, 'w') as f:
            json.dump(data, f, indent=4)

    req_data = request.get_json()
    with open(json_file, 'r') as f:
        data = json.load(f)
    
    #get user id from session
    user_id = session.get("user")['userinfo']['aud']
    data[user_id]['rooms'].append(req_data)

    with open(json_file, 'w') as f:
        json.dump(data, f, indent=4)
    return json.dumps(req_data)
    
@app.route('/add_class', methods=['POST'])
def add_class():
    #check if no user is logged in
    if not session.get("user"):
        return json.dumps({'error': 'no user logged in'})
    #check if user is in json file and add if not
    data = {}
    with open(json_file, 'r') as f:
        data = json.load(f)
    #get user id from session
    user_id = session.get("user")['userinfo']['aud']
    if user_id not in data:
        data[user_id] = {}
        data[user_id]['rooms'] = []
        data[user_id]['classes'] = []
        with open(json_file, 'w') as f:
            json.dump(data, f, indent=4)
    req_data = request.get_json()
    with open(json_file, 'r') as f:
        data = json.load(f)
    
    #get user id from session
    user_id = session.get("user")['userinfo']['aud']
    data[user_id]['classes'].append(req_data)

    with open(json_file, 'w') as f:
        json.dump(data, f, indent=4)
    return json.dumps(req_data)

@app.route('/get_rooms', methods=['GET'])
def get_rooms():
    #check if no user is logged in
    if not session.get("user"):
        return json.dumps({'error': 'no user logged in'})
    #check if user is in json file and add if not
    data = {}
    with open(json_file, 'r') as f:
        data = json.load(f)
    #get user id from session
    user_id = session.get("user")['userinfo']['aud']
    if user_id not in data:
        data[user_id] = {}
        data[user_id]['rooms'] = []
        data[user_id]['classes'] = []
        with open(json_file, 'w') as f:
            json.dump(data, f, indent=4)
    with open(json_file, 'r') as f:
        data = json.load(f)
   
    return json.dumps(data[user_id]['rooms'])

@app.route('/get_classes', methods=['GET'])
def get_classes():
    #check if no user is logged in
    if not session.get("user"):
        return json.dumps({'error': 'no user logged in'})
    with open(json_file, 'r') as f:
        data = json.load(f)
    #get user id from session
    user_id = session.get("user")['userinfo']['aud']
    return json.dumps(data[user_id]['classes'])

@app.route('/delete_room', methods=['POST'])
def delete_room():
    #check if no user is logged in
    if not session.get("user"):
        return json.dumps({'error': 'no user logged in'})
    req_data = request.get_json()
    with open(json_file, 'r') as f:
        data = json.load(f)
    
    #get user id from session
    user_id = session.get("user")['userinfo']['aud']
    data[user_id]['rooms'].remove(req_data)

    with open(json_file, 'w') as f:
        json.dump(data, f, indent=4)
    return json.dumps(req_data)

@app.route('/delete_class', methods=['POST'])
def delete_class():
    #check if no user is logged in
    if not session.get("user"):
        return json.dumps({'error': 'no user logged in'})
    req_data = request.get_json()
    with open(json_file, 'r') as f:
        data = json.load(f)
    
    #get user id from session
    user_id = session.get("user")['userinfo']['aud']
    data[user_id]['classes'].remove(req_data)

    with open(json_file, 'w') as f:
        json.dump(data, f, indent=4)
    return json.dumps(req_data)

@app.route("/callback", methods=["GET", "POST"])
def callback():
    token = oauth.auth0.authorize_access_token()
    session["user"] = token      
    #check if user is in json file and add if not
    data = {}
    with open(json_file, 'r') as f:
        data = json.load(f)
    #get user id from session
    user_id = session.get("user")['userinfo']['aud']
    print(data.keys())
    if user_id not in data:
        data[user_id] = {}
        data[user_id]['rooms'] = []
        data[user_id]['classes'] = []
        with open(json_file, 'w') as f:
            json.dump(data, f, indent=4)
        
    return redirect("/")


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
