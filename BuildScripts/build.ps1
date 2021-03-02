$loc = Get-Location

cd ../rsuite
npm install
npm run dist

Copy-Item build/optimajet-builder.js ../build/
Copy-Item build/optimajet-formbuilder-javascript.js ../build/

cd ../mobile
npm install
npm run dist

Copy-Item build/optimajet-mobile-builder.js ../build/
Copy-Item build/optimajet-mobile-form.js ../build/
Copy-Item build/optimajet-mobile-web.js ../build/

Set-Location -Path $loc