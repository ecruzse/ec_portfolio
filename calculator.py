from flask import Flask, redirect, url_for, render_template, request, session, flash

app = Flask(__name__)

@app.route("/base", methods=['GET', 'POST'])
def base():
    # return render_template('calculator.html')
    return render_template('base.html')

@app.route("/calculator", methods=['GET', 'POST'])
def calculator():
    # return render_template('calculator.html')
    return render_template('calculator.html')

@app.route("/", methods=['GET', 'POST'])
def test():
    return render_template('index.html')

if __name__ == "__main__":
    app.run(debug=True)