#! /bin/bash

echo "Publishing to Cozy repository"
rsync -a --delete ./public/ ./publish/runbikehike-cozy/public/
rsync -a --delete ./server/ ./publish/runbikehike-cozy/server/
rsync -a --delete ./server.js ./publish/runbikehike-cozy/server.js
