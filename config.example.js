// Copy this file to config.js and fill in your values.
// config.js is gitignored and must not be committed.
const GH_EXT_CONFIG = {
    // Regex matched against location.pathname to detect PR "Files changed" pages.
    // Examples:
    //   github.com, repo "my-org/my-repo"  →  /\/my-org\/my-repo\/pull\/\d+\/files/
    //   GitHub Enterprise, any repo         →  /\/pull\/\d+\/files/
    prFilesPathPattern: /\/YOUR_ORG\/YOUR_REPO\/pull\/\d+\/files/,
};
