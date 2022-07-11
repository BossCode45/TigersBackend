#!/bin/bash

curl -XPOST -H "Content-Type: application/json" -d @./$1 http://localhost:3000/$2
echo
