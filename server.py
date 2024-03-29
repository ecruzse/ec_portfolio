import os
from flask import Flask, redirect, url_for, render_template, request, session, flash
# from dotenv import load_dotenv


app = Flask(__name__)

@app.route("/base", methods=['GET', 'POST'])    
def base():
    return render_template('base.html')

@app.route("/", methods=['GET', 'POST'])
def index():
    return render_template('index.html')

@app.route("/calculator", methods=['GET','POST'])
def calculator():
    return render_template('calculator.html')

@app.route("/gaap", methods=['GET','POST'])
def gaap():
    return render_template('gaap.html')

key = os.getenv("GAAP_PW")

@app.route("/auth", methods=["GET", "POST"])
def authentication():

    if request.method == 'POST':
        if key == request.form.get("pw"):
            return redirect(url_for('gaap'))
    return render_template("gaapAuth.html")


@app.route("/test", methods=['GET','POST'])
def test():
    return render_template('test.html')


if __name__ == "__main__":
    # load_dotenv()
    app.run(debug=True)