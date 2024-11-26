import requests
import json
import os

output_dir='DevCore/DevCore103'
output_file=os.path.join(output_dir,"data.json")

def get_posts():
    url="https://jsonplaceholder.typicode.com/posts"
    try:
        print("Sending GET requests for getting lists")
        response=requests.get(url)
        response.raise_for_status()
        posts=response.json()
        print(f"Getting {len(posts)} posts")
        return posts
    except requests.exceptions.RequestException as e:
        print(f"Error when getting:{e}")
        return []
    

def get_post_by_id(post_id):
    url = f"https://jsonplaceholder.typicode.com/posts/{post_id}"
    try:
        print(f"Sending  GET-requests for getting post  with ID {post_id}")
        response=requests.get(url)
        response.raise_for_status()
        post=response.json()
        print(f"Getting post with ID{post_id}:{post['title']}")
        return post
    except requests.exceptions.RequestException as e:
        print(f"Error with getting post with ID{post_id}:{e}")
        return None
    


def create_post(title, body, user_id):
    url = "https://jsonplaceholder.typicode.com/posts"
    data = {
        "title": title,
        "body": body,
        "userId": user_id
    }
    try:
        print("Sending Post request for making new Post...")
        response = requests.post(url, json=data)
        response.raise_for_status()
        new_post = response.json()
        print(f"New post loading: {new_post}")
        return new_post
    except requests.exceptions.RequestException as e:
        print(f"Error with making post: {e}")
        return None
    

def save_to_file(data):
    try:
        os.makedirs(output_dir,exist_ok=True)
        with open(output_file,"w",encoding="utf-8")as file:
            json.dump(data,file,indent=4,ensure_ascii=False)
        print(f"All recording in a file:{output_file}")
    except IOError as e:
        print(f"Error with saving with file:{e}")


def main():
    posts=get_posts()
    if posts:
        save_to_file(posts)

    post_id=1
    post=get_post_by_id(post_id)

    if post:
        new_post=create_post("New post","This recording of this post",1)

if __name__=="__main__":
    main()
