#!/bin/bash
#


docker run --name postgres-db   -e POSTGRES_PASSWORD=mysecretpassword   -e POSTGRES_USER=myuser   -e POSTGRES_DB=mydatabase   -v postgres-data:/var/lib/postgresql   -p 5432:5432   -d postgres





