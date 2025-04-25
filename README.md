# Skill-Link-Backend


## API Endpoints

### **Authentication Routes (`/api/auth`)**

| Endpoint  | Method | Request Body / Headers                     | Response (200 OK)                     |
|-----------|--------|--------------------------------------------|----------------------------------------|
| `/register` | `POST` | `{ name, email, password }`               | `{ message }`                         |
| `/login`    | `POST` | `{ email, password }`                    | `{ userId, otp }`                     |
| `/verify`   | `POST` | `{ userId, otp }`                        | `{ message, token }`                  |
| `/me`       | `GET`  | `{ Authorization: Bearer <token> }` (Header) | `{ ...userData }`                      |

### **Event Routes (`/api/event`)**
| Endpoint | Method | Request Body / Headers / Query              | Response (200 OK)                      |
|----------|--------|---------------------------------------------|----------------------------------------|
| `/all`   | `GET`  | `{}`                                        | `{...events}`                          |
| `/create`| `POST` | `{...EventData}`                            | `{message, newEvent}`                  |
|`/update/:id` | `PUT` | `{...UpdatedData}`                       | `{message, updatedEvent}`              |
| `/delete/:id`| `DELETE`| `{}`                                   |  `{message}`                           |     