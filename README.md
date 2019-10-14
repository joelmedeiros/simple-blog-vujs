## Getting started

You will need [Docker](https://www.docker.com/get-started) and [Docker-Compose](https://docs.docker.com/compose/) installed to build this application.

Run the commands below on your favorite terminal inside the project folder:
 
```bash
docker-compose up -d
```

Then access [http://localhost:8080/](http://localhost:8080/).

### Requirements

For this project is needed an API with these responses:

GET /post

```json
{
    "data": [{
         "id": "5da103b68fd12569d573bf73", 
          "title": "Exercitationem et suscipit eius similique.",
         "body": "Eum inventore laborum ea culpa voluptatem vel. Repellendus rerum nemo odit consequatur occaecati et. Deleniti vel at quo molestiae dignissimos libero culpa.",
         "created_at": "1970-01-19T02:01:36+00:00",
    }],
    "success": true
}
```

GET /post/{id}
```json

{
    "data": {
         "id": "5da103b68fd12569d573bf73", 
          "title": "Exercitationem et suscipit eius similique."
         "body": "Eum inventore laborum ea culpa voluptatem vel. Repellendus rerum nemo odit consequatur occaecati et. Deleniti vel at quo molestiae dignissimos libero culpa.",
         "created_at": "1970-01-19T02:01:36+00:00"
    },
    "success": true
}
```

Make sure that you signed the correct value in `.env` file.