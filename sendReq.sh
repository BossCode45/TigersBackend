#!/bin/bash

curl -XPOST -H "Content-Type: application/json" -d @./$1 http://192.168.0.163:3000/$2
echo
