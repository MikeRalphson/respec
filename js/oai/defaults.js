define(["exports", "core/linter", "core/linter-rules/no-headingless-sections", "core/linter-rules/no-http-props", "w3c/linter-rules/privsec-section", "core/linter-rules/check-punctuation", "core/linter-rules/local-refs-exist"], function (exports, _linter, _noHeadinglessSections, _noHttpProps, _privsecSection, _checkPunctuation, _localRefsExist) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.name = undefined;
  exports.run = run;

  var _linter2 = _interopRequireDefault(_linter);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  /**
   * Sets the defaults for OAI specs
   */
  const name = exports.name = "oai/defaults";


  _linter2.default.register(_noHttpProps.rule, _privsecSection.rule, _noHeadinglessSections.rule, _checkPunctuation.rule, _localRefsExist.rule);

  const cgbg = new Set(["BG-DRAFT", "BG-FINAL", "CG-DRAFT", "CG-FINAL"]);
  const licenses = new Map([["cc0", {
    name: "Creative Commons 0 Public Domain Dedication",
    short: "CC0",
    url: "https://creativecommons.org/publicdomain/zero/1.0/"
  }], ["w3c-software", {
    name: "W3C Software Notice and License",
    short: "W3C Software",
    url: "https://www.w3.org/Consortium/Legal/2002/copyright-software-20021231"
  }], ["w3c-software-doc", {
    name: "W3C Software and Document Notice and License",
    short: "W3C Software and Document",
    url: "https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document"
  }], ["apache2", {
    name: "Apache 2.0 License",
    short: "Apache 2.0",
    url: "https://www.apache.org/licenses/LICENSE-2.0.html"
  }], ["cc-by", {
    name: "Creative Commons Attribution 4.0 International Public License",
    short: "CC-BY",
    url: "https://creativecommons.org/licenses/by/4.0/legalcode"
  }]]);

  const oaiDefaults = {
    lint: {
      "no-headingless-sections": false,
      "privsec-section": true,
      "no-http-props": false,
      "check-punctuation": false,
      "local-refs-exist": false
    },
    pluralize: true,
    doJsonLd: true,
    license: "apache2",
    specStatus: "base",
    prependW3C: false,
    //overrideCopyright: true,
    logos: [{
      src: "https://raw.githubusercontent.com/OAI/OpenAPI-Style-Guide/master/graphics/bitmap/OpenAPI_Logo_Pantone.png",
      alt: "OpenAPI Initiative",
      height: 48,
      //width: 211,
      url: "https://openapis.org/"
    }]
  };

  function computeProps(conf) {
    return {
      isCCBY: conf.license === "cc-by",
      licenseInfo: licenses.get(conf.license),
      isCGBG: cgbg.has(conf.specStatus),
      isCGFinal: conf.isCGBG && /G-FINAL$/.test(conf.specStatus),
      isBasic: conf.specStatus === "base",
      isRegular: !conf.isCGBG && conf.specStatus === "base"
    };
  }

  function run(conf) {
    // assign the defaults
    Object.assign(conf, _extends({}, oaiDefaults, conf));
    //computed properties
    Object.assign(conf, computeProps(conf));
  }
});
//# sourceMappingURL=defaults.js.map
