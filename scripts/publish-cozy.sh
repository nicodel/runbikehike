#! /bin/bash

BIWhite='\033[1;97m'
BIGreen='\033[1;92m'
NC='\033[0m' # No Color


echo -e "${BIWhite}Publishing to Cozy Cloud submodule${NC}"
echo "Sync public files"
rsync -a --delete ./public/ ./publish/runbikehike-cozy/public/
echo "Sync server files"
rsync -a --delete ./server/ ./publish/runbikehike-cozy/server/
rsync -a --delete ./server.js ./publish/runbikehike-cozy/server.js
echo -e "${BIGreen}Done!${NC}\n"
