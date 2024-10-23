from flask import *;
import pathlib
from csv import *
import csv
import mysql.connector
from flask_sqlalchemy import *
from sqlalchemy import *
from extensions import db
from models import Question
import pandas as pd
from werkzeug.utils import secure_filename
import os



app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:@localhost/webProj'
# enable debugging mode
app.config["DEBUG"] = True

# Upload folder
UPLOAD_FOLDER = 'static/files/'
app.config['UPLOAD_FOLDER'] =  UPLOAD_FOLDER


csv_path =  pathlib.Path.cwd() / "static/files/data.csv"


db.init_app(app)




@app.route('/')
def add():

    dict_list = [] 
    data = pd.read_csv('static/files/data.csv')
    print("1",dict_list)
    
    with csv_path.open(mode ='r') as file:    
        csvFile = csv.reader(file)
        # Skip the header row
        # if 
        next(csvFile)

        for rows in csvFile:
            dict_list.append({'question':rows[0], 'option1':rows[1], 'option2':rows[2], 'option3':rows[3], 'option4':rows[4], 'answer':rows[5]})
            print("2",dict_list)
        
        for item in dict_list:
            sql = Question(question= item['question'], option1= item['option1'], option2= item['option2'], option3= item['option3'], option4= item['option4'], answer= item['answer'])
        #  db.session.add(sql)
    # db.session.commit()
    return render_template('index.html',tables=[data.to_html()],titles=[''], data_list = dict_list)

@app.route('/',methods=["POST"])
def check():
    option = request.form["options"]
    if(option=="option4"):
        ans = "correct"
    else:
        ans = "wrong"
    return(ans)
    

@app.route('/fileUpload', methods=['GET','POST'])
def upload():
    if request.method == 'POST':
        dict_list = [] 
        f = request.files['file']
        filename = secure_filename(f.filename)
        # saving new file
        file_path = (os.path.join(app.config['UPLOAD_FOLDER'], filename))
        f.save(file_path)
        print(filename)

        # reading new file
        with open(filename, mode='r') as f_read:
            csvFile_new = csv.DictReader(f_read)
            first_row_new = next(csvFile_new, None)
            # storing the headers
            list_column_name_new = list(first_row_new.keys())
            print(list_column_name_new)

        # reading old file
        with csv_path.open(mode ='r') as file:    
            csvFile_old = csv.DictReader(file)
            first_row_old = next(csvFile_old, None)
            # storing the headers
            list_column_name_old = list(first_row_old.keys())
            
        if(list_column_name_new == list_column_name_old):
            # reading old file
            with csv_path.open(mode ='r') as file: 
                reader = csv.reader(file) 
                headings = next(reader) 
                Output = [] 
                # storing data of old file
                for row in reader: 
                    Output.append(row[:])   
                print("output:",Output)

            # reading new file
            with open(file_path, "r") as f_read_again:
                csvFile = csv.reader(f_read_again)
                headers = next(csvFile)
                new_Output = []
                # storing data of new file
                for rows in csvFile:
                    new_Output.append(rows[:])
                    print("new output",new_Output)
                    # storing new data in a list
                    if rows not in Output:
                        dict_list.append({'question':rows[0], 'option1':rows[1], 'option2':rows[2], 'option3':rows[3], 'option4':rows[4], 'answer':rows[5]})
                        print(dict_list) 

           
            # appending new data in old file
            with open(csv_path,'a') as f_obj:
                for i in range(0,len(dict_list)):
                    dict_info = dict_list[i]
                    dictwriter_object = DictWriter(f_obj, fieldnames=headers)
                    dictwriter_object.writerow(dict_info)
                f_obj.close()

        else:
            print("Column headers doesnt match")

        return render_template("fileUpload.html", filename=f.filename)

    return render_template("fileUpload.html", filename=None)

   

if __name__ == '__main__':
    app.run(debug=True)
