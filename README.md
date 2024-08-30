## Platform Service APIs

#### User API
<details>
 <summary><code>POST</code> <code><b>/user/login/google</b></code> <code>(Login with Google)</code></summary>

##### Request payload

> | field      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | email      |  required | string   | N/A  |
> | firstName|  required | string   | N/A  |
> | lastName|  required | string   | N/A  |
> | originalImage|  required | string   | N/A  |
> | scope|  optional | string   | N/A  |
> | thumbnailImage|  required | string   | N/A  |
> | token|  required | string   | Public token from google |
> | type|  required | string   | N/A  |
> | username|  optional | string   | N/A  |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | `{"statusCode: 200, "message": "User logged in successfully.", "success": true, "data": {}}`                                |
> | `400`         | `application/json`                | `{"code":"400","message":"Bad Request"}`                            |

##### Example cURL

> ```javascript
>  curl -X POST -H "Content-Type: application/json" --data @post.json http://localhost:4000/user/login/google
> ```

</details>

<details>
 <summary><code>POST</code> <code><b>/user/login/github</b></code> <code>(Login with Github)</code></summary>

##### Request payload

> | field      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | code      |  required | string   | Authorization code from github that will be verified once it reaches the service |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | `{"statusCode: 200, "message": "User logged in successfully.", "success": true, "data": {}`                                |
> | `400`         | `application/json`                | `{"code":"400","message":"Bad Request"}`                            |

##### Example cURL

> ```javascript
>  curl -X POST -H "Content-Type: application/json" --data @post.json http://localhost:4000/user/login/github
> ```

</details>

------------------------------------------------------------------------------------------

#### Course API

<details>
 <summary><code>POST</code> <code><b>/course/add</b></code> <code>(Add new course)</code></summary>

##### Request payload

> | field      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | title      |  required | string   | N/A  |
> | description|  optional | string   | N/A  |
> | status|  required | string   | Values are `PUBLISHED`, `UNPUBLISHED` or `DRAFT`  |
> | tags|  required | array of strings   | N/A  |
> | stages|  required | array of objects   | N/A |

##### Sample JSON payload
```json
 {
    "title": "Sample unpublished course v2",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "tags": ["NodeJS", "MongoDB"],
    "status": "UNPUBLISHED",
    "stages": [
        {
            "title": "Introduction",
            "content": "When software scales, it opens up issues that directly affect maintainability and performance, especially if the app is built without consistency in its codebase. Apparently, there is no universal coding standard that defines what “efficient” and 'clean code' means and is agreed upon. Therefore, it's up to individual companies to determine their preferred coding practices. Our goal here is to give you efficient options that you can apply to whatever projects you’re working on. You'll learn how to create high-quality solutions by working on a real-world project. And our main focus will be on improving your comprehension of the methods that we’ll be discussing by refactoring some codes."
        }
    ]
}
```
##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | `{"statusCode: 200, "message": "Course added successfully.", "success": true, "data": {"insertedId: "4215235234""}}`                                |
> | `400`         | `application/json`                | `{"code":"400","message":"Bad Request"}`                            |

##### Example cURL

> ```javascript
>  curl -X POST -H "Content-Type: application/json" --data @post.json http://localhost:4000/course/add
> ```

</details>

<details>
 <summary><code>GET</code> <code><b>/course/list</b></code> <code>(List courses)</code></summary>

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | `{"statusCode: 200, "message": "Courses fetched successfully.", "success": true, "data": []}`                                |
> | `400`         | `application/json`                | `{"code":"400","message":"Bad Request"}`                            |

##### Example cURL

> ```javascript
>  curl -X GET -H "Content-Type: application/json" --data @get.json http://localhost:4000/course/get/64f694c192fef26602f4831e
> ```

</details>

<details>
 <summary><code>GET</code> <code><b>/course/get/:id</b></code> <code>(Get course)</code></summary>

##### Parameters

> | field     | type                     |
> |---------------|-----------------------------------
> | id         | string        |

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | `{"statusCode: 200, "message": "Course fetched successfully.", "success": true, "data": {}}`                                |
> | `400`         | `application/json`                | `{"code":"400","message":"Bad Request"}`                            |

</details>

------------------------------------------------------------------------------------------

#### Feedback API
<details>
 <summary><code>POST</code> <code><b>/feedback/add</b></code> <code>(Add feedback)</code></summary>

</details>
