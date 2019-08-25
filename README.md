# Rocket Surveys

A single page survey application.

Users can create new surveys, see the answers to their surveys, and take surveys.

### Links
- [Application](https://acupoftee.github.io/Rocket-Surveys-Client/)
- [Back end](https://rocket-surveys-acupoftee.herokuapp.com/)
- [Front end repo](https://github.com/acupoftee/Rocket-Surveys-Client)
- [Back end repo](https://github.com/acupoftee/rocket-surveys-api)

### Development
1. Team launch w/ sprint planning meeting.
  1. Ongoing team stand ups: morning, after lunch, evening.
2. Created user stories.
3. Created wireframes.
4. Created ERD.
5. Began development:
  1. Create front end repo and deployed site.
  2. Create back end repo and database.
  3. Built authentication.
  4. HTML page layout.
  5. CRUD.
  6. Styling and UI functionality.

##### Problem Solving
In the event of a bug or issue:
1. Pair programming
2. Mob programming

##### Git / Version Control
1. Team code reviews
2. All major commits / merges done as a team.

### Technologies
- HTML
- CSS
- Bootstrap
- Handlebars
- Javascript
- jQuery
- AJAX
- Express
- MongoDb
- Mongoose

### User Stories

```md
As an unregistered user, I would like to sign up with email and password.
As a registered user, I would like to sign in with email and password.
As a signed in user, I would like to change password.
As a signed in user, I would like to sign out.
As a signed in user, I would like to create a survey with a question.
As a signed in user, I would like to update my survey's question.
As a signed in user, I would like to delete my survey.
As a signed in user, I would like to see all surveys and its answers.
As a signed in user, I would like to take a survey.
As a signed in user, I must be able to add a scaled survey to a User.
As a signed in user, I must be able to see the User's scaled survey.
As a signed in user, I must be able to delete my scaled survey.
As a signed in user, I must be able to update my scaled survey question.
```

### Database

The application will have two one-to-many relationships between five collections: users, surveys, responses, prompts, and ratings.

```md
Collection: Users
- id: string
- email: string

Collection: Surveys
- _id: string
- updatedAt: date
- createdAt: date
- question: string
- owner: string

Collection: Responses
- _id: string
- updatedAt: date
- createdAt: date
- answer: boolean
- survey: string
- owner: string

Collection: Prompts
- _id: string
- updatedAt: date
- createdAt: date
- question: string
- owner: string

Collection: Ratings
- _id: string
- updatedAt: date
- createdAt: date
- answer: number
- survey: string
- owner: string
```

##### Users

| CRUD        | HTTP           | Action | Route |
| ------------- |:-------------:| :-----:|:-----:|
| Create      | POST | create | /sign-up |
| Create     | POST      |  create | /sign-in |
| Update | PATCH     |    update | /change-password |
| Delete | DELETE     |    destroy | /sign-out |

##### Surveys

| CRUD        | HTTP           | Action | Route |
| ------------- |:-------------:| :-----:|:-----:|
| Create      | POST | create | /surveys |
| Read     | GET      |  index | /surveys |
| Update | PATCH     |    update | /surveys/:id |
| Delete | DELETE     |    destroy | /surveys/:id |

##### Responses

| CRUD        | HTTP           | Action | Route |
| ------------- |:-------------:| :-----:|:-----:|
| Create      | POST | create | /responses |
| Read     | GET      |  index | /responses |
| Update | PATCH     |    update | /responses/:id |
| Delete | DELETE     |    destroy | /responses/:id |

##### Prompts

| CRUD        | HTTP           | Action | Route |
| ------------- |:-------------:| :-----:|:-----:|
| Create      | POST | create | /prompts |
| Read     | GET      |  index | /prompts |
| Update | PATCH     |    update | /prompts/:id |
| Delete | DELETE     |    destroy | /prompts/:id |

##### Ratings

| CRUD        | HTTP           | Action | Route |
| ------------- |:-------------:| :-----:|:-----:|
| Create      | POST | create | /ratings |
| Read     | GET      |  index | /ratings |
| Update | PATCH     |    update | /ratings/:id |
| Delete | DELETE     |    destroy | /ratings/:id |

### ERD

![ERD](https://i.imgur.com/7buLNq7.jpg "ERD")

### Wireframes

![Sign In](https://i.imgur.com/IFRtMJ4.png "Sign In")

![Your Surveys](https://i.imgur.com/DV4t2Tc.png "Your Surveys")

![Take Survey](https://i.imgur.com/U7JzIY5.png "Take Survey")

![Create Survey](https://i.imgur.com/nfav5gf.png "Create Survey")

### Unsolved Issues / Future Features
- Include new resource for survey distribution URLs
- Integrate socket.io for realtime updates
