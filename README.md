# Skill-Link-Backend


## API Endpoints

### **Authentication Routes (`/api/auth`)**

| Endpoint  | Method | Request Body / Headers                     | Response (200 OK)                     |
|-----------|--------|--------------------------------------------|----------------------------------------|
| `/register` | `POST` | `{ name, email, password }`               | `{ message }`                         |
| `/login`    | `POST` | `{ email, password }`                    | `{ userId, otp }`                     |
| `/verify`   | `POST` | `{ userId, otp }`                        | `{ message, token }`                  |
| `/me`       | `GET`  | `{ Authorization: Bearer <token> }` (Header) | `{ ...userData }`                      |

### **User Routes (`/api/user`)**

| Endpoint  | Method | Request Body / Headers                     | Response (200 OK)                     |
|-----------|--------|--------------------------------------------|----------------------------------------|
| `/update/:userId` | `POST` | `{ ...updatedUser }`               | `{ message }`                         |

### **Event Routes (`/api/event`)**
| Endpoint | Method | Request Body / Headers / Query              | Response (200 OK)                      |
|----------|--------|---------------------------------------------|----------------------------------------|
| `/all`   | `GET`  | `{}`                                        | `{[...events]}`                          |
| `/create`| `POST` | `{...EventData}`                            | `{message, newEvent}`                  |
|`/update/:id` | `PUT` | `{...UpdatedData}`                       | `{message, updatedEvent}`              |
| `/delete/:id`| `DELETE`| `{}`                                   |  `{message}`                           |     

### **Skill Routes (`/api/skill`)**

| Endpoint            | Method | Request Body / Headers / Query       | Response (200 OK)                      |
|---------------------|--------|--------------------------------------|----------------------------------------|
| `/user/:id`         | `GET`  | `{}`                                 | `{skills: [...skills]}`                |
| `/skills/:id`       | `GET`  | `{}`                                 | `{skill: {...skill}}`                  |
| `/create`           | `POST` | `{ ..SkillData }` | `{ message, skill: {...newSkill} }` |
| `/update/:id`       | `PUT`  | `{ ...UpdatedData }` | `{ message, skill: {...updatedSkill} }` |
| `/delete/:id`       | `DELETE`| `{}`                                 | `{ message }` |

---

###  **Blog Routes (`/api/blog`)**

| Endpoint            | Method | Request Body / Headers / Query       | Response (200 OK)                      |
|---------------------|--------|--------------------------------------|----------------------------------------|
| `/create`           | `POST` | `{ ...blogData }` | `{ message, blog: {...newBlog} }` |
| `/all`              | `GET`  | `{}`                                 | `{ blogs: [...blogs] }`                |
| `/update/:id`       | `PUT`  | `{ ...updatedData }` | `{ message, blog: {...updatedBlog} }` |
| `/delete/:id`       | `DELETE`| `{}`                                 | `{ message }` |

---