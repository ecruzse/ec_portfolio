import pdfkit
import shutil

def makeCopy():
    shutil.copyfile('/home/ec/Documents/portfolio/accounting-calculator/templates/gaap.html', 'gaap_copy.html')
    # pass
    

def makePDF():
    # pdfkit.from_file(url_for('static', filename='gaap.html'))
    pdfkit.from_file('gaap_copy.html', 'gaap.pdf')
    # pass

