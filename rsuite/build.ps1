npm install

./node_modules/.bin/webpack --env.prod
copy build/optimajet-form.js ../../Optimajet.DWKit.StarterApplication/wwwroot/scripts/optimajet-form.js
copy build/optimajet-form.js ../../optimajet-app/optimajet-app-semantic/scripts/optimajet-form.js
copy build/optimajet-builder.js ../../optimajet-admin/scripts/optimajet-builder.js

copy css/optimajet-formbuilder.css ../../Optimajet.DWKit.StarterApplication/wwwroot/css/optimajet-formbuilder.css
copy css/optimajet-formbuilder.css ../../optimajet-admin/css/optimajet-formbuilder.css
copy css/optimajet-formbuilder.css ../../frontend/frontend-semantic/css/optimajet-formbuilder.css
copy css/optimajet-formbuilder.css ../../Optimajet.DWKit.StarterApplication/wwwroot/css/optimajet-formbuilder.css

$loc = Get-Location

Set-Location -Path "../../optimajet-admin/"

npm install
./node_modules/.bin/webpack --env.prod

copy build/optimajet-admin.js ../Optimajet.DWKit.StarterApplication/wwwroot/scripts/optimajet-admin.js

Set-Location -Path "../optimajet-app/optimajet-app-semantic/"

npm install
./node_modules/.bin/webpack --env.prod

copy build/optimajet-app.js ../../frontend/frontend-semantic/scripts/optimajet-app.js

copy build/optimajet-app.js ../../OptimaJet.DWKit.StarterApplication/wwwroot/scripts/optimajet-app.js

Set-Location -Path "../../Optimajet.DWKit.StarterApplication/"
npm install
./node_modules/.bin/webpack --env.prod

Set-Location -Path $loc