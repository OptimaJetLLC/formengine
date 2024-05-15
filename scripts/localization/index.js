require('dotenv').config();

//https://cloud.yandex.ru/docs/translate/quickstart

const axios = require('axios');
const deepMerge = require('deepmerge');
const path = require('path');
const {entries} = require('lodash-es/object.js');
const {
  saveToFile,
  flattenArrayToObject,
  objectValues,
  diffByKeys,
  sortObject,
  objectKeys,
  removeObsolete,
  hasObsolete
} = require('./utils.js');

const {YA_API_URL, YA_FOLDER_ID, YA_IAM_TOKEN} = process.env;

const LOCALIZATION_FOLDER = '../../packages/designer/public/locales';
const {en, ...localizations} = require('./localizations.json');

const defaultLanguage = sortObject(getLocalization(en));

entries(localizations).forEach(([key, fullCode]) => updateLocalization(getLocalization(fullCode), key));

function updateLocalization(localization, targetLang) {
  const missedItems = diffByKeys(defaultLanguage, localization);
  const texts = objectValues(missedItems);
  let filtered = localization;

  if (hasObsolete(defaultLanguage, localization)) {
    filtered = removeObsolete(defaultLanguage, localization);
    console.log(`${targetLang.toUpperCase()} - removed obsolete items`);
    if (!texts.length) {
      save(targetLang, filtered);
      return;
    }
  }

  if (!texts.length) {
    console.log(String(targetLang).toUpperCase() + ' - localization is up to date');
    return;
  }

  requestTranslate(targetLang, texts, result => {
    const targetArray = result.data['translations'].map(({text}) => text);
    flattenArrayToObject(targetArray, missedItems);
    const merged = sortObject(deepMerge(missedItems, filtered));
    save(targetLang, merged);

    const translatedKeys = objectKeys(missedItems).join(', ');
    console.log(`${targetLang.toUpperCase()} - updated ${texts.length} items: [${translatedKeys}]`);
  });
}

//texts should be an array like ["first word", "second", ...]
function requestTranslate(targetLanguageCode, texts, successCallback) {
  axios.post(YA_API_URL, {
    targetLanguageCode,
    texts,
    folderId: YA_FOLDER_ID
  }, {
    headers: {
      Authorization: `Bearer ${YA_IAM_TOKEN}`
    }
  })
    .then(successCallback)
    .catch(err => console.error(err));
}

function getLocalization(languageCode) {
  return require(`${LOCALIZATION_FOLDER}/${languageCode}.json`)
}

function save(targetLang, localization) {
  saveToFile(path.join(LOCALIZATION_FOLDER, String(localizations[targetLang]) + '.json'), localization);
}
