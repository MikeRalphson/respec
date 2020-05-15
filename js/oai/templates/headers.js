define(["exports", "./show-logo", "./show-people", "./show-link", "core/pubsubhub", "deps/hyperhtml"], function (exports, _showLogo, _showPeople, _showLink, _pubsubhub) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _showLogo2 = _interopRequireDefault(_showLogo);

  var _showPeople2 = _interopRequireDefault(_showPeople);

  var _showLink2 = _interopRequireDefault(_showLink);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function getSpecTitleElem(conf) {
    const specTitleElem = document.querySelector("h1#title") || document.createElement("h1");
    if (specTitleElem.parentElement) {
      specTitleElem.remove();
      conf.title = specTitleElem.textContent.trim();
    } else {
      specTitleElem.textContent = conf.title;
      specTitleElem.id = "title";
    }
    specTitleElem.classList.add("title", "p-name");
    if (document.querySelector("title") === null) {
      document.title = conf.title;
    } else if (document.title !== conf.title) {
      (0, _pubsubhub.pub)("warn", "The document's title and the `<title>` element differ.");
    }
    return specTitleElem;
  }

  function getSpecSubTitleElem(conf) {
    let specSubTitleElem = document.querySelector("h2#subtitle");

    if (specSubTitleElem && specSubTitleElem.parentElement) {
      specSubTitleElem.remove();
      conf.subtitle = specSubTitleElem.textContent.trim();
    } else if (conf.subtitle) {
      specSubTitleElem = document.createElement("h2");
      specSubTitleElem.textContent = conf.subtitle;
      specSubTitleElem.id = "subtitle";
    }
    if (specSubTitleElem) {
      specSubTitleElem.classList.add("subtitle");
    }
    return specSubTitleElem;
  }

  exports.default = conf => {
    const html = hyperHTML;

    return html`<div class='head'>
  ${conf.logos.map(_showLogo2.default)}
  ${getSpecTitleElem(conf)}
  ${getSpecSubTitleElem(conf)}
  <h2>${conf.prependW3C ? "W3C" : ""}${conf.textStatus} <time class='dt-published' datetime='${conf.dashDate}'>${conf.publishHumanDate}</time></h2>
  <dl>
    ${!conf.isNoTrack ? html`
      <dt>${conf.l10n.this_version}</dt>
      <dd><a class='u-url' href='${conf.thisVersion}'>${conf.thisVersion}</a></dd>
      <dt>${conf.l10n.latest_published_version}</dt>
      <dd>${conf.latestVersion ? html`<a href='${conf.latestVersion}'>${conf.latestVersion}</a>` : "none"}</dd>
    ` : ""}
    ${conf.edDraftURI ? html`
      <dt>${conf.l10n.latest_editors_draft}</dt>
      <dd><a href='${conf.edDraftURI}'>${conf.edDraftURI}</a></dd>
    ` : ""}
    ${conf.testSuiteURI ? html`
      <dt>Test suite:</dt>
      <dd><a href='${conf.testSuiteURI}'>${conf.testSuiteURI}</a></dd>
    ` : ""}
    ${conf.implementationReportURI ? html`
      <dt>Implementation report:</dt>
      <dd><a href='${conf.implementationReportURI}'>${conf.implementationReportURI}</a></dd>
    ` : ""}
    ${conf.bugTrackerHTML ? html`
      <dt>${conf.l10n.bug_tracker}</dt>
      <dd>${[conf.bugTrackerHTML]}</dd>
    ` : ""}
    ${conf.isED ? html`
      ${conf.prevED ? html`
        <dt>Previous editor's draft:</dt>
        <dd><a href='${conf.prevED}'>${conf.prevED}</a></dd>
      ` : ""}
    ` : ""}
    ${conf.showPreviousVersion ? html`
      <dt>Previous version:</dt>
      <dd><a href='${conf.prevVersion}'>${conf.prevVersion}</a></dd>
    ` : ""}
    ${conf.prevRecURI ? html`
      ${conf.isRec ? html`
          <dt>Previous Recommendation:</dt>
          <dd><a href='${conf.prevRecURI}'>${conf.prevRecURI}</a></dd>
      ` : html`
          <dt>Latest Recommendation:</dt>
          <dd><a href='${conf.prevRecURI}'>${conf.prevRecURI}</a></dd>
      `}
    ` : ""}
    <dt>${conf.multipleEditors ? conf.l10n.editors : conf.l10n.editor}</dt>
    ${(0, _showPeople2.default)(conf, "Editor", conf.editors)}
    ${Array.isArray(conf.formerEditors) && conf.formerEditors.length > 0 ? html`
      <dt>${conf.multipleFormerEditors ? conf.l10n.former_editors : conf.l10n.former_editor}</dt>
      ${(0, _showPeople2.default)(conf, "Editor", conf.formerEditors)}
    ` : ""}
    ${conf.authors ? html`
      <dt>${conf.multipleAuthors ? conf.l10n.authors : conf.l10n.author}</dt>
      ${(0, _showPeople2.default)(conf, "Author", conf.authors)}
    ` : ""}
    ${conf.otherLinks ? conf.otherLinks.map(_showLink2.default) : ""}
  </dl>
  ${conf.errata ? html`
    <p>
      Please check the <a href="${conf.errata}"><strong>errata</strong></a> for any errors or issues
      reported since publication.
    </p>
  ` : ""}
  ${conf.isRec ? html`
    <p>
      See also <a href="${`http://www.w3.org/2003/03/Translations/byTechnology?technology=${conf.shortName}`}">
      <strong>translations</strong></a>.
    </p>
  ` : ""}
  ${conf.alternateFormats ? html`
    <p>
      ${conf.multipleAlternates ? "This document is also available in these non-normative formats:" : "This document is also available in this non-normative format:"}
      ${[conf.alternatesHTML]}
    </p>
  ` : ""}
  ${conf.isUnofficial ? html`
    ${conf.additionalCopyrightHolders ? html`
      <p class='copyright'>${[conf.additionalCopyrightHolders]}</p>
    ` : html`
      ${conf.overrideCopyright ? [conf.overrideCopyright] : html`
        <p class='copyright'>
          This document is licensed under a
          <a class='subfoot' href='https://creativecommons.org/licenses/by/3.0/' rel='license'>Creative Commons
          Attribution 3.0 License</a>.
        </p>
      `}
    `}
  ` : html`
    ${conf.overrideCopyright ? [conf.overrideCopyright] : html`
      <p class='copyright'>
        Copyright &copy;
        ${conf.copyrightStart ? `${conf.copyrightStart}-` : ""}${conf.publishYear}
        ${conf.additionalCopyrightHolders ? html` ${[conf.additionalCopyrightHolders]} ` : ""}
        ${conf.isCCBY ? html`
          Some Rights Reserved: this document is dual-licensed,
          <a rel="license" href="https://creativecommons.org/licenses/by/3.0/">CC-BY</a> and
          <a rel="license" href="https://www.w3.org/Consortium/Legal/copyright-documents">W3C Document License</a>.
        ` : ""}
      </p>
    `}
  `}
  <hr title="Separator for header">
</div>`;
  };
});
//# sourceMappingURL=headers.js.map
