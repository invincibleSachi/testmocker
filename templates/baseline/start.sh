#!/bin/bash
echo $1
cd servers/$1
npm install
nodemon server.js