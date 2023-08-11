from flask import Flask, redirect, url_for, render_template, request, session, flash
from pdfMaker import *

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
    file = render_template('gaap.html')
    if request.method == 'POST':
        # pdfkit.from_file('templates/gaap.html', 'gaap.pdf')
        # makeCopy()
        # makePDF() 
        pass
    return render_template('gaap.html')
key = 'password'

@app.route("/auth", methods=["GET", "POST"])
def authentication():

    if request.method == 'POST':
        if key == request.form.get("pw"):
            return redirect(url_for('gaap'))
    return render_template("gaapAuth.html")

if __name__ == "__main__":
    app.run(debug=True)