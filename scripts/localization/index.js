import 'dotenv/config.js'

import path from 'path';
import fs from 'fs';

import axios from 'axios';
import deepMerge from 'deepmerge';

import {diffByKeys, flattenArrayToObject, hasObsolete, objectKeys, objectValues, removeObsolete, saveToFile, sortObject} from './utils.js';

import locales from './localizations.js'

//https://cloud.yandex.ru/docs/translate/quickstart
const {YA_API_URL, YA_FOLDER_ID, YA_IAM_TOKEN} = process.env;

const LOCALIZATION_FOLDER = '../../packages/designer/public/locales';

const {en, ...localizations} = locales;

function getLocalization(languageCode) {
  const contents = fs.readFileSync(`${LOCALIZATION_FOLDER}/${languageCode}.json`, {encoding: 'utf8'})
  return JSON.parse(contents)
}

function save(targetLang, localization) {
  saveToFile(path.join(LOCALIZATION_FOLDER, String(localizations[targetLang]) + '.json'), localization);
}

const localesData = Object.entries(locales).map(([lang, locale]) => [locale, getLocalization(locale)]).reduce((acc, curr) => {
  acc[curr[0]] = curr[1]
  return acc
}, {})

const defaultLanguage = sortObject(localesData[en]);

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

Object.entries(localizations).forEach(([key, fullCode]) => updateLocalization(localesData[fullCode], key));
