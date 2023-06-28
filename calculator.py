from flask import Flask, redirect, url_for, render_template, request, session, flash

app = Flask(__name__)

@app.route("/", methods=['GET', 'POST'])
def calculator():
    # return render_template('calculator.html')
    return render_template('calculatorCopy.html')

if __name__ == "__main__":
    app.run(debug=True)

