#! /bin/bash

echo "Publishing to Cozy repository"
rsync -a --delete ./public/ ./publish/cozy/public/
rsync -a --delete ./server/ ./publish/cozy/server/
rsync -a --delete ./server.js ./publish/cozy/server.js
