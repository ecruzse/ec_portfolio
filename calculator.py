from flask import Flask, redirect, url_for, render_template, request, session, flash

app = Flask(__name__)

@app.route("/calculator", methods=['GET', 'POST'])
def calculator():
    # return render_template('calculator.html')
    return render_template('calculatorOld.html')

# @app.route("/home", methods=['GET', 'POST'])
# def home():
#     return render_template('calculatorOld.html')

if __name__ == "__main__":
    app.run(debug=True)