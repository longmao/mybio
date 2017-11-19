#!/bin/bash
rm -rf mybiogate.tar.gz
node  build.js
tar -zcf mybiogate.tar.gz output
rm -rf output 