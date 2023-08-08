from flask import Flask, redirect, url_for, render_template, request, session, flash
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
import pdfkit

app = Flask(__name__)

@app.route("/base", methods=['GET', 'POST'])
def base():
    return render_template('base.html')

@app.route("/", methods=['GET', 'POST'])
def index():
    return render_template('index.html')

@app.route("/calculator")
def calculator():
    return render_template('calculator.html')

key = 'password'

@app.route("/auth", methods=["GET", "POST"])
def authentication():

    if request.method == 'POST':
        if key == request.form.get("pw"):
            return render_template('gaap.html')
    return render_template("gaapAuth.html")
    
def toPdf():
    with open('templates/gaap.html') as f:
        pdfkit.from_file(f, 'out.pdf')

toPdf()
if __name__ == "__main__":
    app.run(debug=True)