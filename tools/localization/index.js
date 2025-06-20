import 'dotenv/config.js'

import path from 'path';
import fs from 'fs';

import axios from 'axios';
import deepMerge from 'deepmerge';

import {
  diffByKeys,
  flattenArrayToObject,
  hasObsolete,
  objectKeys,
  objectValues,
  removeObsolete,
  saveToFile,
  sortObject,
  stripSpanTags,
  wrapPlaceholders
} from './utils.js';

import locales from './localizations.js'

//https://cloud.yandex.ru/docs/translate/quickstart
const {YA_API_URL, YA_FOLDER_ID, YA_IAM_TOKEN} = process.env;

const rSuiteFolder = '../../src/packages/designer/src/features/localization/rsuite/locales'
const rSuiteComponentsFolder = '../../src/packages/views/rsuite/src/components/i18n/locales'

const LOCALIZATION_FOLDER = [
  '../../src/packages/designer/public/locales'
];

const {en, ...localizations} = locales;

function getLocalization(folder, languageCode) {
  const contents = fs.readFileSync(`${folder}/${languageCode}.json`, {encoding: 'utf8'})
  return JSON.parse(contents)
}

function save(folder, targetLang, localization) {
  saveToFile(path.join(folder, String(localizations[targetLang]) + '.json'), localization);
}

//texts should be an array like ["first word", "second", ...]
function requestTranslate(targetLanguageCode, texts, successCallback) {
  axios.post(YA_API_URL, {
    format: "HTML",
    sourceLanguageCode: 'en',
    targetLanguageCode,
    texts: texts.flatMap(wrapPlaceholders),
    folderId: YA_FOLDER_ID
  }, {
    headers: {
      Authorization: `Bearer ${YA_IAM_TOKEN}`
    }
  })
    .then(({data: {translations}}) => {
      const texts = translations.map(({text}) => stripSpanTags(text))
      successCallback(texts)
    })
    .catch(err => console.error(err));
}

function updateLocalization(folder, defaultLanguage, localization, targetLang) {
  const missedItems = diffByKeys(defaultLanguage, localization);
  const texts = objectValues(missedItems);
  let filtered = localization;

  if (hasObsolete(defaultLanguage, localization)) {
    filtered = removeObsolete(defaultLanguage, localization);
    console.log(`${targetLang.toUpperCase()} - removed obsolete items`);
    if (!texts.length) {
      save(folder, targetLang, filtered);
      return;
    }
  }

  if (!texts.length) {
    console.log(String(targetLang).toUpperCase() + ' - localization is up to date');
    return;
  }

  requestTranslate(targetLang, texts, translations => {
    flattenArrayToObject(translations, missedItems);
    const merged = sortObject(deepMerge(missedItems, filtered));
    save(folder, targetLang, merged);

    const translatedKeys = objectKeys(missedItems).join(', ');
    console.log(`${targetLang.toUpperCase()} - updated ${texts.length} items: [${translatedKeys}]`);
  });
}

function translateFolder(folder) {
  console.log('translating ', folder);

  const localesData = Object.entries(locales).map(([lang, locale]) => [locale, getLocalization(folder, locale)]).reduce((acc, curr) => {
    acc[curr[0]] = curr[1]
    return acc
  }, {})

  const defaultLanguage = sortObject(localesData[en]);

  Object.entries(localizations).forEach(([key, fullCode]) => updateLocalization(folder, defaultLanguage, localesData[fullCode], key));

  console.log('translating ', folder, 'done!');
}

function translateRSuiteFolder() {
  console.log('translating ', rSuiteFolder)

  const enUS = getLocalization(rSuiteFolder, 'en-US')
  const defaultLanguage = sortObject(enUS)

  const rSuiteLocales = {
    'hi': 'hi-IN',
    'sr': 'sr-RS'
  }

  const localesData = {}
  Object.entries(rSuiteLocales).forEach(([_, locale]) => {
    localesData[locale] = getLocalization(rSuiteFolder, locale)
  })

  Object.entries(rSuiteLocales).forEach(([key, fullCode]) => {
    updateLocalization(rSuiteFolder, defaultLanguage, localesData[fullCode], key)

    const fileName = `${fullCode}.json`
    // update components localization
    fs.copyFileSync(
      path.join(rSuiteFolder, fileName),
      path.join(rSuiteComponentsFolder, fileName)
    )
  });

  console.log('translating ', rSuiteFolder, 'done!');
}

function run() {
  LOCALIZATION_FOLDER.forEach(translateFolder)
  translateRSuiteFolder()
}


run()
