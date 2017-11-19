#!/bin/bash
rm -rf mybiogate.tar.gz
npm install
node  build.js
tar -zcf mybiogate.tar.gz output
