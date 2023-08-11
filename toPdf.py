import pdfkit
import shutil


def copyFile():
    shutil.copyfile('templates/gaap.html', 'gaap_copy.html')
    shutil.copyfile('static/GAAP/gaap.css', 'gaap_css_copy.css')

def makePdf():
    file = pdfkit.from_file('templates/gaap.html', 'out.pdf')
    return file
