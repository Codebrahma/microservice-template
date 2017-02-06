# microservice-template
A template for developing a microservice

# Installation
* `git clone` this repository
* `cd` into the repository
* Build the docker image by `docker build -t microservice .`

# Run
* Set environment variables like `MONGO_URL` and `RABBITMQ_URL`. Full list in the wiki.
* `docker run -e RABBITMQ_URL=<rabbitmq_url> -e MONGO_URL =<mongo_url> -i -t microservice`

# Test
`npm test`


---
Built by: [Codebrahma](https://github.com/Codebrahma/)
