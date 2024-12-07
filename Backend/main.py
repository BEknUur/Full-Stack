from fastapi import FastAPI,Response,Form
from datetime import datetime
from fastapi.responses import FileResponse
app=FastAPI()

@app.get("/")
def root():
    return FileResponse("new.html")

@app.post("/postdata")
def postdata(username=Form(),userage=Form()):
    return {"name":username,"age":userage}


'''
import uuid
from fastapi import FastAPI,Body,status
from fastapi.responses import JSONResponse,FileResponse



class Person():
    def __init__(self,name,age):
        self.name=name
        self.age=age
        self.id=str(uuid.uuid4())


people=[Person("Beknur",18),Person("Aisha",19),Person("Turarbek",19),Person("Bekzat",18)]

def find_person(id):
    for person in people:
        if person.id==id:
            return person
        return None

app=FastAPI()

@app.get("/")

async def main():
    return FileResponse("new.html")


@app.get("/api/users")
def get_people():
    return people


@app.get("/api/users/{id}")
def get_person(id):
    person=find_person(id)
    print(person)

    if person==None:
        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"message":"User is not found"}
        )
    return person


@app.post("/api/users")
def create_person(data=Body()):
    person=Person(data["name"],data["age"])
    people.append(person)
    return person


@app.put("/api/users")
def edit_person(data=Body()):
    person=find_person(id)
    if person==None:
        return JSONResponse(status_code=status.HTTP_404_NOT_FOUND,content={"message":"User is not found"})
    
    person.age=data["age"]
    person.name=data["name"]
    return person



@app.delete("/api/users/{id}")
def delete_person(id):
    person=find_person(id)
    if person==None:
        return JSONResponse(status_code=status.HTTP_404_NOT_FOUND,content={"message":"User is not found"})
    
    people.remove(person)
    return person

    '''