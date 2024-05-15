Generate translation via Yandex Cloud API.
Seed locale file located in packages/designer/public/locales/en-US.json
If key is missing there it will be deleted from other locales.
Only new keys will be added or updated.

- create .env file ```cp .env.example .env```
- login to YC ```npm run auth```
  - in .env replace ```<FOLDER_ID>``` with ```folderId``` for YC project
- request token ```npm run token```
  - in .env replace ```<IAM-TOKEN>``` with contents of ```.token``` file
- to update translation run ```npm run update```
