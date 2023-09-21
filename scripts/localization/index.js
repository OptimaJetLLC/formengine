//https://cloud.yandex.ru/docs/translate/quickstart

const axios = require('axios');
const deepMerge = require('deepmerge');
const path = require('path');
const {entries} = require('lodash/object');
const {
  saveToFile,
  flattenArrayToObject,
  objectValues,
  diffByKeys,
  sortObject,
  objectKeys,
  removeObsolete,
  hasObsolete
} = require('./utils');

const {apiURL, Authorization, folderId} = require('./translation-api-credentials');

const LOCALIZATION_FOLDER = '../../packages/designer/public/locales';
const {en, ...localizations} = require('./localizations');
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
    console.log(targetLang.toUpperCase() + ' - localization is up to date');
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
  const data = {targetLanguageCode, texts, folderId};
  axios.post(apiURL, data, {headers: {Authorization}})
    .then(successCallback)
    .catch(err => console.error(err));
}

function getLocalization(languageCode) {
  return require(`${LOCALIZATION_FOLDER}/${languageCode}.json`)
}

function save(targetLang, localization) {
  saveToFile(path.join(LOCALIZATION_FOLDER, localizations[targetLang] + '.json'), localization);
}
