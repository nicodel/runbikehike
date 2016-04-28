#! /bin/bash
#./node_modules/uglify-js/bin/uglifyjs ./sources/js/**/**/* -o ./public/app.js

mkdir -p public/lib
rsync -a --delete ./sources/js/lib/ .public/lib/
sed -i 's/src="js\/app.js/src="app.js/g' ./public/index.html
sed -i '/src="js\/utils/d' ./public/index.html
sed -i '/src="js\/factories/d' ./public/index.html
sed -i '/src="js\/models/d' ./public/index.html
sed -i '/src="js\/collections/d' ./public/index.html
sed -i '/src="js\/views/d' ./public/index.html
sed -i '/src="js\/app/d' ./public/index.html
sed -i '/src="js\/router/d' ./public/index.html
sed -i 's/js\/lib/lib/g' ./public/index.html
./node_modules/uglify-js/bin/uglifyjs \
  ./sources/js/utils/gpx.js \
  ./sources/js/utils/tracks.js \
  ./sources/js/utils/chrono.js \
  ./sources/js/utils/map.js \
  ./sources/js/utils/helpers.js \
  ./sources/js/factories/models/message.js \
  ./sources/js/factories/models/athletics.js \
  ./sources/js/factories/models/body.js \
  ./sources/js/factories/models/cycling.js \
  ./sources/js/factories/models/mountaineering.js \
  ./sources/js/factories/models/sliding.js \
  ./sources/js/factories/models/swimming.js \
  ./sources/js/factories/models/watersport.js \
  ./sources/js/factories/views/dashboard_message.js \
  ./sources/js/factories/views/dashboard_summary_1.js \
  ./sources/js/factories/views/dashboard_summary_2.js \
  ./sources/js/factories/views/detailled_1.js \
  ./sources/js/factories/views/detailled_2.js \
  ./sources/js/factories/views/detailled_3.js \
  ./sources/js/factories/views/new_1.js \
  ./sources/js/factories/views/new_2.js \
  ./sources/js/factories/views/new_3.js \
  ./sources/js/factories/views/sessions_summary_1.js \
  ./sources/js/factories/views/sessions_summary_2.js \
  ./sources/js/factories/activities/message.js \
  ./sources/js/factories/activities/climbing.js \
  ./sources/js/factories/activities/mountain_biking.js \
  ./sources/js/factories/activities/paddling.js \
  ./sources/js/factories/activities/racing.js \
  ./sources/js/factories/activities/regular_biking.js \
  ./sources/js/factories/activities/running.js \
  ./sources/js/factories/activities/skiing.js \
  ./sources/js/factories/activities/swimming.js \
  ./sources/js/factories/activities/time_trial_biking.js \
  ./sources/js/factories/activities/trekking.js \
  ./sources/js/factories/activities/walking.js \
  ./sources/js/factories/activities/weight_act.js \
  ./sources/js/factories/factory.js \
  ./sources/js/models/doc.js \
  ./sources/js/models/preferences.js \
  ./sources/js/collections/docs.js \
  ./sources/js/views/indicators.js \
  ./sources/js/views/dashboard.js \
  ./sources/js/views/new-session.js \
  ./sources/js/views/tracking.js \
  ./sources/js/views/preferences.js \
  ./sources/js/views/reports.js \
  ./sources/js/views/sessions.js \
  ./sources/js/views/main.js \
  ./sources/js/router.js \
  ./sources/js/app.js \
  --beautify --indent-level=2 \
  -o ./public/app.js
