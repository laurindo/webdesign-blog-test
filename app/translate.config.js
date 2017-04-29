(function () {
  'use strict';

  function ConfigI18n($translateProvider, EN_I18N, PT_I18N, GeneralConstant) {

    var DEFAULT_VALUE = 'en';

    /*
    * Easy cross browser way to get the preferred language
    * */
    var PREFERRED_LANGUAGE = navigator.language || navigator.userLanguage || navigator.browserLanguage
      || navigator.systemLanguage || DEFAULT_VALUE;

    var SELECTED_LANGUAGE = GeneralConstant[PREFERRED_LANGUAGE];

    $translateProvider.translations('en', EN_I18N);
    $translateProvider.translations('pt', PT_I18N);
    $translateProvider.preferredLanguage(SELECTED_LANGUAGE);
    $translateProvider.fallbackLanguage(DEFAULT_VALUE);
  }

  ConfigI18n.$inject = ['$translateProvider', 'EN_I18N', 'PT_I18N', 'GeneralConstant'];

  angular.module('app').config(ConfigI18n);
}());
