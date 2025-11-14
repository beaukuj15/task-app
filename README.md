## Task App

* dynamic web app to handle authentication and task CRUD functionality for authenticated users

### Pre-reqs

* Angular 19+
* NestJS
* Docker
* node + npm


## Setup

1. Start Postgres SQL Docker container: `./start_db.sh`
2. Setup initial empty database: `./connect_db.sh`
3. Start frontend web app: `cd ./frontend/ && ng serve`
4. Start backend dev server: `cd ./backend/ && npm run start:dev`



## Use and Test Web App

1. Register new user on `/register`
2. Login with new user info on `/login`
3. Go to welcome page that is only available to authorized users
4. Click `Tasks` button to go test the CRUD task functionality on `/tasks` page




## Access Control and User Roles

* Users must be log in and authenticate with a valid JWT to access the main web app
* Both the `/home` and `/welcome` pages are only accessible when authenticated as a valid user
* User roles are tracked in the database, but currently only default "user" entities are setup

## Example API Requests

1. Register new user: POST `/auth/register` with: `{"username": "test name", "email": "test@mail.com", "password": "test"}`
2. Login new user: POST `/auth/login` with `{"email": "test@mail.com", "password": "test"}`
3. Fetch all tasks: GET `/tasks` 
4. Create new task: POST `/tasks` with new task: `{"name": "test task", "description": "test description of task"}`
5. Update task: POST `/tasks/:id` with updated task: `{"id": 1, "name": "updated task", "description": "updated description"}`
6. Delete task: DELETE `/tasks/:id`



### Future TODOS

1. Add more RBAC roles that enforce who can delete or update tasks
2. Add organizations table and assign each user 
3. Ensure only some organizations can delete and update tasks
4. Update and extend user roles guard


 
