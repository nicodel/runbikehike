#! /bin/bash
#./node_modules/uglify-js/bin/uglifyjs ./sources/js/**/**/* -o ./public/app.js
#
mkdir -p ./public/lib
rsync -a --delete ./sources/js/lib/ ./public/lib/

mkdir -p ./public/js/workers
rsync -a --delete ./sources/js/workers/ ./public/js/workers/

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
./sources/js/factories/models/athletics.js \
./sources/js/factories/models/cycling.js \
./sources/js/factories/models/fighting.js \
./sources/js/factories/models/message.js \
./sources/js/factories/models/mountaineering.js \
./sources/js/factories/models/net.js \
./sources/js/factories/models/sliding.js \
./sources/js/factories/models/swimming.js \
./sources/js/factories/models/team.js \
./sources/js/factories/models/watersport.js \
./sources/js/factories/views/dashboard_message.js \
./sources/js/factories/views/dashboard_summary_1.js \
./sources/js/factories/views/dashboard_summary_2.js \
./sources/js/factories/views/dashboard_summary_3.js \
./sources/js/factories/views/detailled_1.js \
./sources/js/factories/views/detailled_3.js \
./sources/js/factories/views/new_1.js \
./sources/js/factories/views/new_3.js \
./sources/js/factories/views/new_4.js \
./sources/js/factories/views/sessions_summary_1.js \
./sources/js/factories/views/sessions_summary_3.js \
./sources/js/factories/activities/bmx.js \
./sources/js/factories/activities/climbing.js \
./sources/js/factories/activities/football.js \
./sources/js/factories/activities/frisbee.js \
./sources/js/factories/activities/handball.js \
./sources/js/factories/activities/in_sea.js \
./sources/js/factories/activities/kicking.js \
./sources/js/factories/activities/kitesurfing.js \
./sources/js/factories/activities/mountain_biking.js \
./sources/js/factories/activities/paddling.js \
./sources/js/factories/activities/ping_pong.js \
./sources/js/factories/activities/punching.js \
./sources/js/factories/activities/racing.js \
./sources/js/factories/activities/regular_biking.js \
./sources/js/factories/activities/roller_skating.js \
./sources/js/factories/activities/running.js \
./sources/js/factories/activities/skateboarding.js \
./sources/js/factories/activities/skiing.js \
./sources/js/factories/activities/sparring.js \
./sources/js/factories/activities/stick_fighting.js \
./sources/js/factories/activities/sup.js \
./sources/js/factories/activities/surfing.js \
./sources/js/factories/activities/swimming.js \
./sources/js/factories/activities/tennis.js \
./sources/js/factories/activities/time_trial_biking.js \
./sources/js/factories/activities/trekking.js \
./sources/js/factories/activities/walking.js \
./sources/js/factories/activities/wrestling.js \
./sources/js/factories/body_weight/body_weight.js \
./sources/js/factories/messages/message.js \
./sources/js/factories/factory.js \
./sources/js/models/message.js \
./sources/js/models/session.js \
./sources/js/models/body_weight.js \
./sources/js/models/item.js \
./sources/js/models/preferences.js \
./sources/js/collections/messages.js \
./sources/js/collections/sessions.js \
./sources/js/collections/body_weight.js \
./sources/js/collections/dashboard.js \
./sources/js/views/indicators.js \
./sources/js/views/dashboard.js \
./sources/js/views/new-session.js \
./sources/js/views/new-body-weight.js \
./sources/js/views/tracking.js \
./sources/js/views/preferences.js \
./sources/js/views/sessions.js \
./sources/js/views/reports.js \
./sources/js/views/navigation.js \
./sources/js/router.js \
./sources/js/app.js \
  --beautify --indent-level=2 \
  -o ./public/app.js
