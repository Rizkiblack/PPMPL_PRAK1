from locust import HttpUser, TaskSet, task

class UserBehavior(TaskSet):
    
    @task(1)
    def get_items(self):
        self.client.get("/items")
    
    @task(2)
    def create_item(self):
        self.client.post("/items", json={"name": "New Item", "description": "This is a new item"})
    
    @task(1)
    def update_item(self):
        self.client.put("/items/1", json={"name": "Updated Item", "description": "This is an updated item"})
    
    @task(1)
    def delete_item(self):
        self.client.delete("/items/1")

class WebsiteUser(HttpUser):
    tasks = [UserBehavior]
    min_wait = 1000
    max_wait = 3000
