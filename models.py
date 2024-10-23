from extensions import db

class Question(db.Model):
    id = db.Column(db.Integer,primary_key = True)
    question = db.Column(db.VARCHAR(150))
    option1 = db.Column(db.VARCHAR(150))
    option2 = db.Column(db.VARCHAR(150))
    option3 = db.Column(db.VARCHAR(150))
    option4 = db.Column(db.VARCHAR(150))
    answer = db.Column(db.VARCHAR(150))