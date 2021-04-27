
## Installation

Use the npm to install.

```bash
npm install 
npm install --save-dev nodemon
```

## Usage

API - Create Schedule

```
Method - POST
URL - localhost:3000/email
Expected Body
{
    "subject":String, //Required
    "email":String, //Required
    "content":String, //Required
    "schedulename":String, //Required
    "date":String //Required- Preferably ISO String in GMT
    
}
```

API - Update Schedule / Reschedule
```
Method - PATCH
URL - localhost:3000/email/:id   // id - schedule id
Expected Body
{
    "subject":String, //Optional
    "email":String, //Optional
    "content":String, //Optional
    "date":String //Optional- Preferably ISO String in GMT
    
}
```

API - Read Schedule
```
Method - GET
URL - localhost:3000/email/:id   // id - schedule id
```

API - List Schedule
```
Method - GET
URL - localhost:3000/email   
```

API - Delete Schedule
```
Method - DELETE
URL - localhost:3000/email/:id   // id - schedule id   
```

