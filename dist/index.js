var $8EjUb$path = require("path");
var $8EjUb$os = require("os");
var $8EjUb$fs = require("fs");
var $8EjUb$crypto = require("crypto");
var $8EjUb$http = require("http");
var $8EjUb$https = require("https");
require("net");
var $8EjUb$tls = require("tls");
var $8EjUb$events = require("events");
var $8EjUb$assert = require("assert");
var $8EjUb$util = require("util");
var $8EjUb$string_decoder = require("string_decoder");
var $8EjUb$child_process = require("child_process");
var $8EjUb$timers = require("timers");
var $8EjUb$stream = require("stream");

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequirea88d"];
if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequirea88d"] = parcelRequire;
}
parcelRequire.register("bHHsC", function(module, exports) {

$parcel$export(module.exports, "getSpecificVersionAndUrl", () => getSpecificVersionAndUrl, (v) => getSpecificVersionAndUrl = v);

var $ikF6p = parcelRequire("ikF6p");

var $sWwma = parcelRequire("sWwma");

var $8Nfbt = parcelRequire("8Nfbt");

var $eNbgu = parcelRequire("eNbgu");

function getOptions() {
    return {
        version: $ikF6p.getInput("version"),
        forceVersion: ($ikF6p.getInput("force-version") || "").toLowerCase() === "true",
        ubuntuVersion: $ikF6p.getInput("ubuntu-version"),
        directory: $ikF6p.getInput("directory"),
        cached: ($ikF6p.getInput("cached") || "").toLowerCase() === "true",
        downloadUrl: $ikF6p.getInput("download-url"),
        auth: $ikF6p.getInput("auth"),
        env: ($ikF6p.getInput("env") ?? "").toLowerCase() === "true"
    };
}
//================================================
// Version
//================================================
/**
 * Gets the specific and minimum LLVM versions that can be used to refer to the
 * supplied specific LLVM versions (e.g., `3`, `3.5`, `3.5.2` for `3.5.2`).
 */ function getVersions(specific) {
    const versions = new Set(specific);
    for (const version of specific){
        versions.add(/^\d+/.exec(version)[0]);
        versions.add(/^\d+\.\d+/.exec(version)[0]);
    }
    return versions;
}
/** The specific and minimum LLVM versions supported by this action. */ const VERSIONS = getVersions([
    "3.5.0",
    "3.5.1",
    "3.5.2",
    "3.6.0",
    "3.6.1",
    "3.6.2",
    "3.7.0",
    "3.7.1",
    "3.8.0",
    "3.8.1",
    "3.9.0",
    "3.9.1",
    "4.0.0",
    "4.0.1",
    "5.0.0",
    "5.0.1",
    "5.0.2",
    "6.0.0",
    "6.0.1",
    "7.0.0",
    "7.0.1",
    "7.1.0",
    "8.0.0",
    "8.0.1",
    "9.0.0",
    "9.0.1",
    "10.0.0",
    "10.0.1",
    "11.0.0",
    "11.0.1",
    "11.1.0",
    "12.0.0",
    "12.0.1",
    "13.0.0",
    "13.0.1",
    "14.0.0",
    "14.0.1",
    "14.0.2",
    "14.0.3",
    "14.0.4",
    "14.0.5",
    "14.0.6",
    "15.0.0",
    "15.0.1",
    "15.0.2",
    "15.0.3",
    "15.0.4",
    "15.0.5",
    "15.0.6",
    "15.0.7",
    "16.0.0",
    "16.0.1",
    "16.0.2",
    "16.0.3",
    "16.0.4",
    "16.0.5",
    "16.0.6"
]);
/** Gets the ordering of two (specific or minimum) LLVM versions. */ function compareVersions(left, right) {
    const leftComponents = left.split(".").map((c)=>parseInt(c, 10));
    const rightComponents = right.split(".").map((c)=>parseInt(c, 10));
    const length = Math.max(leftComponents.length, rightComponents.length);
    for(let i = 0; i < length; ++i){
        const leftComponent = leftComponents[i] || 0;
        const rightComponent = rightComponents[i] || 0;
        if (leftComponent > rightComponent) return 1;
        else if (leftComponent < rightComponent) return -1;
    }
    return 0;
}
/**
 * Gets the specific LLVM versions supported by this action compatible with the
 * supplied (specific or minimum) LLVM version in descending order of release
 * (e.g., `5.0.2`, `5.0.1`, and `5.0.0` for `5`).
 */ function getSpecificVersions(version) {
    return Array.from(VERSIONS).filter((v)=>/^\d+\.\d+\.\d+$/.test(v) && v.startsWith(version)).sort().reverse();
}
//================================================
// URL
//================================================
/** Gets a LLVM download URL for GitHub release mirror like artifactory. */ function getDownloadUrl(baseUrl, version, prefix, suffix) {
    const file = `${prefix}${version}${suffix}`;
    return `${baseUrl}/${file}`;
}
/** Gets a LLVM download URL for GitHub. */ function getGitHubUrl(version, prefix, suffix) {
    return getDownloadUrl(`https://github.com/llvm/llvm-project/releases/download/llvmorg-${version}`, version, prefix, suffix);
}
/** Gets a LLVM download URL for https://releases.llvm.org. */ function getReleaseUrl(version, prefix, suffix) {
    const file = `${prefix}${version}${suffix}`;
    return `https://releases.llvm.org/${version}/${file}`;
}
/** The LLVM versions that were never released for the Darwin platform. */ const DARWIN_MISSING = new Set([
    "3.5.1",
    "3.6.1",
    "3.6.2",
    "3.7.1",
    "3.8.1",
    "3.9.1",
    "6.0.1",
    "7.0.1",
    "7.1.0",
    "8.0.1",
    "11.0.1",
    "11.1.0",
    "12.0.1",
    "15.0.3",
    "15.0.4",
    "15.0.5",
    "15.0.6",
    "16.0.0",
    "16.0.1",
    "16.0.2",
    "16.0.3",
    "16.0.4",
    "16.0.5",
    "16.0.6"
]);
/** The Darwin version suffixes which are applied for some releases. */ const DARWIN_VERSIONS = {
    "15.0.7": "21.0"
};
/** Gets an LLVM download URL for the Darwin platform. */ function getDarwinUrl(version, options) {
    if (!options.forceVersion && DARWIN_MISSING.has(version)) return null;
    const darwin = version === "9.0.0" ? "-darwin-apple" : "-apple-darwin";
    const prefix = "clang+llvm-";
    const suffix = `-x86_64${darwin}${DARWIN_VERSIONS[version] ?? ""}.tar.xz`;
    if (options.downloadUrl) return getDownloadUrl(options.downloadUrl, version, prefix, suffix);
    else if (compareVersions(version, "9.0.1") >= 0) return getGitHubUrl(version, prefix, suffix);
    else return getReleaseUrl(version, prefix, suffix);
}
/** The LLVM versions that were never released for the Linux platform. */ const LINUX_MISSING = new Set([
    "14.0.1",
    "14.0.2",
    "14.0.3",
    "14.0.4",
    "14.0.5",
    "14.0.6",
    "15.0.0",
    "15.0.1",
    "15.0.2",
    "15.0.3",
    "15.0.4",
    "15.0.7",
    "16.0.1",
    "16.0.5",
    "16.0.6"
]);
/**
 * The LLVM versions that should use the last RC version instead of the release
 * version for the Linux (Ubuntu) platform. This is useful when there were
 * binaries released for the Linux (Ubuntu) platform for the last RC version but
 * not for the actual release version.
 */ const UBUNTU_RC = new Map([]);
/** The (latest) Ubuntu versions for each LLVM version. */ const UBUNTU = {
    "3.5.0": "-ubuntu-14.04",
    "3.5.1": "",
    "3.5.2": "-ubuntu-14.04",
    "3.6.0": "-ubuntu-14.04",
    "3.6.1": "-ubuntu-14.04",
    "3.6.2": "-ubuntu-14.04",
    "3.7.0": "-ubuntu-14.04",
    "3.7.1": "-ubuntu-14.04",
    "3.8.0": "-ubuntu-16.04",
    "3.8.1": "-ubuntu-16.04",
    "3.9.0": "-ubuntu-16.04",
    "3.9.1": "-ubuntu-16.04",
    "4.0.0": "-ubuntu-16.04",
    "5.0.0": "-ubuntu16.04",
    "5.0.1": "-ubuntu-16.04",
    "5.0.2": "-ubuntu-16.04",
    "6.0.0": "-ubuntu-16.04",
    "6.0.1": "-ubuntu-16.04",
    "7.0.0": "-ubuntu-16.04",
    "7.0.1": "-ubuntu-18.04",
    "7.1.0": "-ubuntu-14.04",
    "8.0.0": "-ubuntu-18.04",
    "9.0.0": "-ubuntu-18.04",
    "9.0.1": "-ubuntu-16.04",
    "10.0.0": "-ubuntu-18.04",
    "10.0.1": "-ubuntu-16.04",
    "11.0.0": "-ubuntu-20.04",
    "11.0.1": "-ubuntu-16.04",
    "11.1.0": "-ubuntu-16.04",
    "12.0.0": "-ubuntu-20.04",
    "12.0.1": "-ubuntu-16.04",
    "13.0.0": "-ubuntu-20.04",
    "13.0.1": "-ubuntu-18.04",
    "14.0.0": "-ubuntu-18.04",
    "15.0.5": "-ubuntu-18.04",
    "15.0.6": "-ubuntu-18.04",
    "16.0.0": "-ubuntu-18.04",
    "16.0.2": "-ubuntu-22.04",
    "16.0.3": "-ubuntu-22.04",
    "16.0.4": "-ubuntu-22.04"
};
/** The latest supported LLVM version for the Linux (Ubuntu) platform. */ const MAX_UBUNTU = "16.0.0";
/** Gets an LLVM download URL for the Linux (Ubuntu) platform. */ function getLinuxUrl(version, options) {
    if (!options.forceVersion && LINUX_MISSING.has(version)) return null;
    const rc = UBUNTU_RC.get(version);
    if (rc) version = rc;
    let ubuntu;
    if (options.ubuntuVersion) ubuntu = `-ubuntu-${options.ubuntuVersion}`;
    else if (options.forceVersion) ubuntu = UBUNTU[MAX_UBUNTU];
    else ubuntu = UBUNTU[version];
    if (!ubuntu) return null;
    const prefix = "clang+llvm-";
    const suffix = `-x86_64-linux-gnu${ubuntu}.tar.xz`;
    if (compareVersions(version, "9.0.1") >= 0) return getGitHubUrl(version, prefix, suffix);
    else return getReleaseUrl(version, prefix, suffix);
}
/** The LLVM versions that were never released for the Windows platform. */ const WIN32_MISSING = new Set([
    "10.0.1"
]);
/** Gets an LLVM download URL for the Windows platform. */ function getWin32Url(version, options) {
    if (!options.forceVersion && WIN32_MISSING.has(version)) return null;
    const prefix = "LLVM-";
    const suffix = compareVersions(version, "3.7.0") >= 0 ? "-win64.exe" : "-win32.exe";
    if (compareVersions(version, "9.0.1") >= 0) return getGitHubUrl(version, prefix, suffix);
    else return getReleaseUrl(version, prefix, suffix);
}
/** Gets an LLVM download URL. */ function getUrl(platform, version, options) {
    switch(platform){
        case "darwin":
            return getDarwinUrl(version, options);
        case "linux":
            return getLinuxUrl(version, options);
        case "win32":
            return getWin32Url(version, options);
        default:
            return null;
    }
}
function getSpecificVersionAndUrl(platform, options) {
    if (options.forceVersion) return [
        options.version,
        getUrl(platform, options.version, options)
    ];
    if (!VERSIONS.has(options.version)) throw new Error(`Unsupported target! (platform='${platform}', version='${options.version}')`);
    for (const specificVersion of getSpecificVersions(options.version)){
        const url = getUrl(platform, specificVersion, options);
        if (url) return [
            specificVersion,
            url
        ];
    }
    throw new Error(`Unsupported target! (platform='${platform}', version='${options.version}')`);
}
//================================================
// Action
//================================================
const DEFAULT_NIX_DIRECTORY = "./llvm";
const DEFAULT_WIN32_DIRECTORY = "C:/Program Files/LLVM";
async function install(options) {
    const platform = process.platform;
    const [specificVersion, url] = getSpecificVersionAndUrl(platform, options);
    $ikF6p.setOutput("version", specificVersion);
    console.log(`Installing LLVM and Clang ${options.version} (${specificVersion})...`);
    console.log(`Downloading and extracting '${url}'...`);
    const archive = await $eNbgu.downloadTool(url, "", options.auth);
    let exit;
    if (platform === "win32") exit = await $sWwma.exec("7z", [
        "x",
        archive,
        `-o${options.directory}`,
        "-y"
    ]);
    else {
        await $8Nfbt.mkdirP(options.directory);
        exit = await $sWwma.exec("tar", [
            "xf",
            archive,
            "-C",
            options.directory,
            "--strip-components=1"
        ]);
    }
    if (exit !== 0) throw new Error("Could not extract LLVM and Clang binaries.");
    $ikF6p.info(`Installed LLVM and Clang ${options.version} (${specificVersion})!`);
    $ikF6p.info(`Install location: ${options.directory}`);
}
async function run(options) {
    if (!options.directory) options.directory = process.platform === "win32" ? DEFAULT_WIN32_DIRECTORY : DEFAULT_NIX_DIRECTORY;
    options.directory = $8EjUb$path.resolve(options.directory);
    if (options.cached) console.log(`Using cached LLVM and Clang ${options.version}...`);
    else await install(options);
    const bin = $8EjUb$path.join(options.directory, "bin");
    const lib = $8EjUb$path.join(options.directory, "lib");
    $ikF6p.addPath(bin);
    const ld = process.env.LD_LIBRARY_PATH ?? "";
    const dyld = process.env.DYLD_LIBRARY_PATH ?? "";
    $ikF6p.exportVariable("LLVM_PATH", options.directory);
    $ikF6p.exportVariable("LD_LIBRARY_PATH", `${lib}${$8EjUb$path.delimiter}${ld}`);
    $ikF6p.exportVariable("DYLD_LIBRARY_PATH", `${lib}${$8EjUb$path.delimiter}${dyld}`);
    if (options.env) {
        $ikF6p.exportVariable("CC", $8EjUb$path.join(options.directory, "bin", "clang"));
        $ikF6p.exportVariable("CXX", $8EjUb$path.join(options.directory, "bin", "clang++"));
    }
}
async function main() {
    try {
        await run(getOptions());
    } catch (error) {
        console.error(error.stack);
        $ikF6p.setFailed(error.message);
    }
}
if (!module.parent) main();

});
parcelRequire.register("ikF6p", function(module, exports) {
"use strict";
var $d589fa5874ed2418$var$__createBinding = module.exports && module.exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
        enumerable: true,
        get: function() {
            return m[k];
        }
    });
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var $d589fa5874ed2418$var$__setModuleDefault = module.exports && module.exports.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var $d589fa5874ed2418$var$__importStar = module.exports && module.exports.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.hasOwnProperty.call(mod, k)) $d589fa5874ed2418$var$__createBinding(result, mod, k);
    }
    $d589fa5874ed2418$var$__setModuleDefault(result, mod);
    return result;
};
var $d589fa5874ed2418$var$__awaiter = module.exports && module.exports.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.getIDToken = module.exports.getState = module.exports.saveState = module.exports.group = module.exports.endGroup = module.exports.startGroup = module.exports.info = module.exports.notice = module.exports.warning = module.exports.error = module.exports.debug = module.exports.isDebug = module.exports.setFailed = module.exports.setCommandEcho = module.exports.setOutput = module.exports.getBooleanInput = module.exports.getMultilineInput = module.exports.getInput = module.exports.addPath = module.exports.setSecret = module.exports.exportVariable = module.exports.ExitCode = void 0;

var $bDHf3 = parcelRequire("bDHf3");

var $kjWZ1 = parcelRequire("kjWZ1");

var $4pF4Y = parcelRequire("4pF4Y");

const $d589fa5874ed2418$var$os = $d589fa5874ed2418$var$__importStar($8EjUb$os);

const $d589fa5874ed2418$var$path = $d589fa5874ed2418$var$__importStar($8EjUb$path);

var $4sv6r = parcelRequire("4sv6r");
/**
 * The code to exit an action
 */ var $d589fa5874ed2418$var$ExitCode;
(function(ExitCode) {
    /**
     * A code indicating that the action was successful
     */ ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */ ExitCode[ExitCode["Failure"] = 1] = "Failure";
})($d589fa5874ed2418$var$ExitCode = module.exports.ExitCode || (module.exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */ // eslint-disable-next-line @typescript-eslint/no-explicit-any
function $d589fa5874ed2418$var$exportVariable(name, val) {
    const convertedVal = $4pF4Y.toCommandValue(val);
    process.env[name] = convertedVal;
    const filePath = process.env["GITHUB_ENV"] || "";
    if (filePath) return $kjWZ1.issueFileCommand("ENV", $kjWZ1.prepareKeyValueMessage(name, val));
    $bDHf3.issueCommand("set-env", {
        name: name
    }, convertedVal);
}
module.exports.exportVariable = $d589fa5874ed2418$var$exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */ function $d589fa5874ed2418$var$setSecret(secret) {
    $bDHf3.issueCommand("add-mask", {}, secret);
}
module.exports.setSecret = $d589fa5874ed2418$var$setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */ function $d589fa5874ed2418$var$addPath(inputPath) {
    const filePath = process.env["GITHUB_PATH"] || "";
    if (filePath) $kjWZ1.issueFileCommand("PATH", inputPath);
    else $bDHf3.issueCommand("add-path", {}, inputPath);
    process.env["PATH"] = `${inputPath}${$d589fa5874ed2418$var$path.delimiter}${process.env["PATH"]}`;
}
module.exports.addPath = $d589fa5874ed2418$var$addPath;
/**
 * Gets the value of an input.
 * Unless trimWhitespace is set to false in InputOptions, the value is also trimmed.
 * Returns an empty string if the value is not defined.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */ function $d589fa5874ed2418$var$getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, "_").toUpperCase()}`] || "";
    if (options && options.required && !val) throw new Error(`Input required and not supplied: ${name}`);
    if (options && options.trimWhitespace === false) return val;
    return val.trim();
}
module.exports.getInput = $d589fa5874ed2418$var$getInput;
/**
 * Gets the values of an multiline input.  Each value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string[]
 *
 */ function $d589fa5874ed2418$var$getMultilineInput(name, options) {
    const inputs = $d589fa5874ed2418$var$getInput(name, options).split("\n").filter((x)=>x !== "");
    if (options && options.trimWhitespace === false) return inputs;
    return inputs.map((input)=>input.trim());
}
module.exports.getMultilineInput = $d589fa5874ed2418$var$getMultilineInput;
/**
 * Gets the input value of the boolean type in the YAML 1.2 "core schema" specification.
 * Support boolean input list: `true | True | TRUE | false | False | FALSE` .
 * The return value is also in boolean type.
 * ref: https://yaml.org/spec/1.2/spec.html#id2804923
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   boolean
 */ function $d589fa5874ed2418$var$getBooleanInput(name, options) {
    const trueValue = [
        "true",
        "True",
        "TRUE"
    ];
    const falseValue = [
        "false",
        "False",
        "FALSE"
    ];
    const val = $d589fa5874ed2418$var$getInput(name, options);
    if (trueValue.includes(val)) return true;
    if (falseValue.includes(val)) return false;
    throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${name}\n` + `Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
}
module.exports.getBooleanInput = $d589fa5874ed2418$var$getBooleanInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */ // eslint-disable-next-line @typescript-eslint/no-explicit-any
function $d589fa5874ed2418$var$setOutput(name, value) {
    const filePath = process.env["GITHUB_OUTPUT"] || "";
    if (filePath) return $kjWZ1.issueFileCommand("OUTPUT", $kjWZ1.prepareKeyValueMessage(name, value));
    process.stdout.write($d589fa5874ed2418$var$os.EOL);
    $bDHf3.issueCommand("set-output", {
        name: name
    }, $4pF4Y.toCommandValue(value));
}
module.exports.setOutput = $d589fa5874ed2418$var$setOutput;
/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */ function $d589fa5874ed2418$var$setCommandEcho(enabled) {
    $bDHf3.issue("echo", enabled ? "on" : "off");
}
module.exports.setCommandEcho = $d589fa5874ed2418$var$setCommandEcho;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */ function $d589fa5874ed2418$var$setFailed(message) {
    process.exitCode = $d589fa5874ed2418$var$ExitCode.Failure;
    $d589fa5874ed2418$var$error(message);
}
module.exports.setFailed = $d589fa5874ed2418$var$setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Gets whether Actions Step Debug is on or not
 */ function $d589fa5874ed2418$var$isDebug() {
    return process.env["RUNNER_DEBUG"] === "1";
}
module.exports.isDebug = $d589fa5874ed2418$var$isDebug;
/**
 * Writes debug message to user log
 * @param message debug message
 */ function $d589fa5874ed2418$var$debug(message) {
    $bDHf3.issueCommand("debug", {}, message);
}
module.exports.debug = $d589fa5874ed2418$var$debug;
/**
 * Adds an error issue
 * @param message error issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */ function $d589fa5874ed2418$var$error(message, properties = {}) {
    $bDHf3.issueCommand("error", $4pF4Y.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
module.exports.error = $d589fa5874ed2418$var$error;
/**
 * Adds a warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */ function $d589fa5874ed2418$var$warning(message, properties = {}) {
    $bDHf3.issueCommand("warning", $4pF4Y.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
module.exports.warning = $d589fa5874ed2418$var$warning;
/**
 * Adds a notice issue
 * @param message notice issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */ function $d589fa5874ed2418$var$notice(message, properties = {}) {
    $bDHf3.issueCommand("notice", $4pF4Y.toCommandProperties(properties), message instanceof Error ? message.toString() : message);
}
module.exports.notice = $d589fa5874ed2418$var$notice;
/**
 * Writes info to log with console.log.
 * @param message info message
 */ function $d589fa5874ed2418$var$info(message) {
    process.stdout.write(message + $d589fa5874ed2418$var$os.EOL);
}
module.exports.info = $d589fa5874ed2418$var$info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */ function $d589fa5874ed2418$var$startGroup(name) {
    $bDHf3.issue("group", name);
}
module.exports.startGroup = $d589fa5874ed2418$var$startGroup;
/**
 * End an output group.
 */ function $d589fa5874ed2418$var$endGroup() {
    $bDHf3.issue("endgroup");
}
module.exports.endGroup = $d589fa5874ed2418$var$endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */ function $d589fa5874ed2418$var$group(name, fn) {
    return $d589fa5874ed2418$var$__awaiter(this, void 0, void 0, function*() {
        $d589fa5874ed2418$var$startGroup(name);
        let result;
        try {
            result = yield fn();
        } finally{
            $d589fa5874ed2418$var$endGroup();
        }
        return result;
    });
}
module.exports.group = $d589fa5874ed2418$var$group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */ // eslint-disable-next-line @typescript-eslint/no-explicit-any
function $d589fa5874ed2418$var$saveState(name, value) {
    const filePath = process.env["GITHUB_STATE"] || "";
    if (filePath) return $kjWZ1.issueFileCommand("STATE", $kjWZ1.prepareKeyValueMessage(name, value));
    $bDHf3.issueCommand("save-state", {
        name: name
    }, $4pF4Y.toCommandValue(value));
}
module.exports.saveState = $d589fa5874ed2418$var$saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */ function $d589fa5874ed2418$var$getState(name) {
    return process.env[`STATE_${name}`] || "";
}
module.exports.getState = $d589fa5874ed2418$var$getState;
function $d589fa5874ed2418$var$getIDToken(aud) {
    return $d589fa5874ed2418$var$__awaiter(this, void 0, void 0, function*() {
        return yield $4sv6r.OidcClient.getIDToken(aud);
    });
}
module.exports.getIDToken = $d589fa5874ed2418$var$getIDToken;

var $9xNm5 = parcelRequire("9xNm5");
Object.defineProperty(module.exports, "summary", {
    enumerable: true,
    get: function() {
        return $9xNm5.summary;
    }
});

var $9xNm5 = parcelRequire("9xNm5");
Object.defineProperty(module.exports, "markdownSummary", {
    enumerable: true,
    get: function() {
        return $9xNm5.markdownSummary;
    }
});

var $f9pag = parcelRequire("f9pag");
Object.defineProperty(module.exports, "toPosixPath", {
    enumerable: true,
    get: function() {
        return $f9pag.toPosixPath;
    }
});
Object.defineProperty(module.exports, "toWin32Path", {
    enumerable: true,
    get: function() {
        return $f9pag.toWin32Path;
    }
});
Object.defineProperty(module.exports, "toPlatformPath", {
    enumerable: true,
    get: function() {
        return $f9pag.toPlatformPath;
    }
});

});
parcelRequire.register("bDHf3", function(module, exports) {
"use strict";
var $8794e127b6bfc3fa$var$__createBinding = module.exports && module.exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
        enumerable: true,
        get: function() {
            return m[k];
        }
    });
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var $8794e127b6bfc3fa$var$__setModuleDefault = module.exports && module.exports.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var $8794e127b6bfc3fa$var$__importStar = module.exports && module.exports.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.hasOwnProperty.call(mod, k)) $8794e127b6bfc3fa$var$__createBinding(result, mod, k);
    }
    $8794e127b6bfc3fa$var$__setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.issue = module.exports.issueCommand = void 0;

const $8794e127b6bfc3fa$var$os = $8794e127b6bfc3fa$var$__importStar($8EjUb$os);

var $4pF4Y = parcelRequire("4pF4Y");
/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */ function $8794e127b6bfc3fa$var$issueCommand(command, properties, message) {
    const cmd = new $8794e127b6bfc3fa$var$Command(command, properties, message);
    process.stdout.write(cmd.toString() + $8794e127b6bfc3fa$var$os.EOL);
}
module.exports.issueCommand = $8794e127b6bfc3fa$var$issueCommand;
function $8794e127b6bfc3fa$var$issue(name, message = "") {
    $8794e127b6bfc3fa$var$issueCommand(name, {}, message);
}
module.exports.issue = $8794e127b6bfc3fa$var$issue;
const $8794e127b6bfc3fa$var$CMD_STRING = "::";
class $8794e127b6bfc3fa$var$Command {
    constructor(command, properties, message){
        if (!command) command = "missing.command";
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = $8794e127b6bfc3fa$var$CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += " ";
            let first = true;
            for(const key in this.properties)if (this.properties.hasOwnProperty(key)) {
                const val = this.properties[key];
                if (val) {
                    if (first) first = false;
                    else cmdStr += ",";
                    cmdStr += `${key}=${$8794e127b6bfc3fa$var$escapeProperty(val)}`;
                }
            }
        }
        cmdStr += `${$8794e127b6bfc3fa$var$CMD_STRING}${$8794e127b6bfc3fa$var$escapeData(this.message)}`;
        return cmdStr;
    }
}
function $8794e127b6bfc3fa$var$escapeData(s) {
    return $4pF4Y.toCommandValue(s).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
}
function $8794e127b6bfc3fa$var$escapeProperty(s) {
    return $4pF4Y.toCommandValue(s).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A").replace(/:/g, "%3A").replace(/,/g, "%2C");
}

});
parcelRequire.register("4pF4Y", function(module, exports) {
"use strict";
// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */ Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.toCommandProperties = module.exports.toCommandValue = void 0;
/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */ function $33695cae541db7ca$var$toCommandValue(input) {
    if (input === null || input === undefined) return "";
    else if (typeof input === "string" || input instanceof String) return input;
    return JSON.stringify(input);
}
module.exports.toCommandValue = $33695cae541db7ca$var$toCommandValue;
/**
 *
 * @param annotationProperties
 * @returns The command properties to send with the actual annotation command
 * See IssueCommandProperties: https://github.com/actions/runner/blob/main/src/Runner.Worker/ActionCommandManager.cs#L646
 */ function $33695cae541db7ca$var$toCommandProperties(annotationProperties) {
    if (!Object.keys(annotationProperties).length) return {};
    return {
        title: annotationProperties.title,
        file: annotationProperties.file,
        line: annotationProperties.startLine,
        endLine: annotationProperties.endLine,
        col: annotationProperties.startColumn,
        endColumn: annotationProperties.endColumn
    };
}
module.exports.toCommandProperties = $33695cae541db7ca$var$toCommandProperties;

});


parcelRequire.register("kjWZ1", function(module, exports) {
"use strict";
// For internal use, subject to change.
var $ecb355cff3772e3b$var$__createBinding = module.exports && module.exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
        enumerable: true,
        get: function() {
            return m[k];
        }
    });
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var $ecb355cff3772e3b$var$__setModuleDefault = module.exports && module.exports.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var $ecb355cff3772e3b$var$__importStar = module.exports && module.exports.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.hasOwnProperty.call(mod, k)) $ecb355cff3772e3b$var$__createBinding(result, mod, k);
    }
    $ecb355cff3772e3b$var$__setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.prepareKeyValueMessage = module.exports.issueFileCommand = void 0;

// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */ const $ecb355cff3772e3b$var$fs = $ecb355cff3772e3b$var$__importStar($8EjUb$fs);

const $ecb355cff3772e3b$var$os = $ecb355cff3772e3b$var$__importStar($8EjUb$os);

var $8xoTv = parcelRequire("8xoTv");

var $4pF4Y = parcelRequire("4pF4Y");
function $ecb355cff3772e3b$var$issueFileCommand(command, message) {
    const filePath = process.env[`GITHUB_${command}`];
    if (!filePath) throw new Error(`Unable to find environment variable for file command ${command}`);
    if (!$ecb355cff3772e3b$var$fs.existsSync(filePath)) throw new Error(`Missing file at path: ${filePath}`);
    $ecb355cff3772e3b$var$fs.appendFileSync(filePath, `${$4pF4Y.toCommandValue(message)}${$ecb355cff3772e3b$var$os.EOL}`, {
        encoding: "utf8"
    });
}
module.exports.issueFileCommand = $ecb355cff3772e3b$var$issueFileCommand;
function $ecb355cff3772e3b$var$prepareKeyValueMessage(key, value) {
    const delimiter = `ghadelimiter_${$8xoTv.default()}`;
    const convertedValue = $4pF4Y.toCommandValue(value);
    // These should realistically never happen, but just in case someone finds a
    // way to exploit uuid generation let's not allow keys or values that contain
    // the delimiter.
    if (key.includes(delimiter)) throw new Error(`Unexpected input: name should not contain the delimiter "${delimiter}"`);
    if (convertedValue.includes(delimiter)) throw new Error(`Unexpected input: value should not contain the delimiter "${delimiter}"`);
    return `${key}<<${delimiter}${$ecb355cff3772e3b$var$os.EOL}${convertedValue}${$ecb355cff3772e3b$var$os.EOL}${delimiter}`;
}
module.exports.prepareKeyValueMessage = $ecb355cff3772e3b$var$prepareKeyValueMessage;

});
parcelRequire.register("8xoTv", function(module, exports) {

$parcel$export(module.exports, "default", () => $6374b7417b4f9ee6$export$2e2bcd8739ae039);

var $6YLEL = parcelRequire("6YLEL");

var $5OiAA = parcelRequire("5OiAA");
function $6374b7417b4f9ee6$var$v4(options, buf, offset) {
    options = options || {};
    const rnds = options.random || (options.rng || (0, $6YLEL.default))(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
    rnds[6] = rnds[6] & 0x0f | 0x40;
    rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided
    if (buf) {
        offset = offset || 0;
        for(let i = 0; i < 16; ++i)buf[offset + i] = rnds[i];
        return buf;
    }
    return (0, $5OiAA.default)(rnds);
}
var $6374b7417b4f9ee6$export$2e2bcd8739ae039 = $6374b7417b4f9ee6$var$v4;

});
parcelRequire.register("6YLEL", function(module, exports) {

$parcel$export(module.exports, "default", () => $514d5045764fa9bc$export$2e2bcd8739ae039);

const $514d5045764fa9bc$var$rnds8Pool = new Uint8Array(256); // # of random values to pre-allocate
let $514d5045764fa9bc$var$poolPtr = $514d5045764fa9bc$var$rnds8Pool.length;
function $514d5045764fa9bc$export$2e2bcd8739ae039() {
    if ($514d5045764fa9bc$var$poolPtr > $514d5045764fa9bc$var$rnds8Pool.length - 16) {
        (0, ($parcel$interopDefault($8EjUb$crypto))).randomFillSync($514d5045764fa9bc$var$rnds8Pool);
        $514d5045764fa9bc$var$poolPtr = 0;
    }
    return $514d5045764fa9bc$var$rnds8Pool.slice($514d5045764fa9bc$var$poolPtr, $514d5045764fa9bc$var$poolPtr += 16);
}

});

parcelRequire.register("5OiAA", function(module, exports) {

$parcel$export(module.exports, "default", () => $43b00aab26f0d784$export$2e2bcd8739ae039);

var $cuy0z = parcelRequire("cuy0z");
/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */ const $43b00aab26f0d784$var$byteToHex = [];
for(let i = 0; i < 256; ++i)$43b00aab26f0d784$var$byteToHex.push((i + 0x100).toString(16).substr(1));
function $43b00aab26f0d784$var$stringify(arr, offset = 0) {
    // Note: Be careful editing this code!  It's been tuned for performance
    // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
    const uuid = ($43b00aab26f0d784$var$byteToHex[arr[offset + 0]] + $43b00aab26f0d784$var$byteToHex[arr[offset + 1]] + $43b00aab26f0d784$var$byteToHex[arr[offset + 2]] + $43b00aab26f0d784$var$byteToHex[arr[offset + 3]] + "-" + $43b00aab26f0d784$var$byteToHex[arr[offset + 4]] + $43b00aab26f0d784$var$byteToHex[arr[offset + 5]] + "-" + $43b00aab26f0d784$var$byteToHex[arr[offset + 6]] + $43b00aab26f0d784$var$byteToHex[arr[offset + 7]] + "-" + $43b00aab26f0d784$var$byteToHex[arr[offset + 8]] + $43b00aab26f0d784$var$byteToHex[arr[offset + 9]] + "-" + $43b00aab26f0d784$var$byteToHex[arr[offset + 10]] + $43b00aab26f0d784$var$byteToHex[arr[offset + 11]] + $43b00aab26f0d784$var$byteToHex[arr[offset + 12]] + $43b00aab26f0d784$var$byteToHex[arr[offset + 13]] + $43b00aab26f0d784$var$byteToHex[arr[offset + 14]] + $43b00aab26f0d784$var$byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
    // of the following:
    // - One or more input array values don't map to a hex octet (leading to
    // "undefined" in the uuid)
    // - Invalid input values for the RFC `version` or `variant` fields
    if (!(0, $cuy0z.default)(uuid)) throw TypeError("Stringified UUID is invalid");
    return uuid;
}
var $43b00aab26f0d784$export$2e2bcd8739ae039 = $43b00aab26f0d784$var$stringify;

});
parcelRequire.register("cuy0z", function(module, exports) {

$parcel$export(module.exports, "default", () => $9182aaac4fa820e1$export$2e2bcd8739ae039);

var $bf1rh = parcelRequire("bf1rh");
function $9182aaac4fa820e1$var$validate(uuid) {
    return typeof uuid === "string" && (0, $bf1rh.default).test(uuid);
}
var $9182aaac4fa820e1$export$2e2bcd8739ae039 = $9182aaac4fa820e1$var$validate;

});
parcelRequire.register("bf1rh", function(module, exports) {

$parcel$export(module.exports, "default", () => $021cae4aff4569e6$export$2e2bcd8739ae039);
var $021cae4aff4569e6$export$2e2bcd8739ae039 = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

});





parcelRequire.register("4sv6r", function(module, exports) {
"use strict";
var $33f1e7529990ada4$var$__awaiter = module.exports && module.exports.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.OidcClient = void 0;

var $5StmC = parcelRequire("5StmC");

var $kyEZm = parcelRequire("kyEZm");

var $ikF6p = parcelRequire("ikF6p");
class $33f1e7529990ada4$var$OidcClient {
    static createHttpClient(allowRetry = true, maxRetry = 10) {
        const requestOptions = {
            allowRetries: allowRetry,
            maxRetries: maxRetry
        };
        return new $5StmC.HttpClient("actions/oidc-client", [
            new $kyEZm.BearerCredentialHandler($33f1e7529990ada4$var$OidcClient.getRequestToken())
        ], requestOptions);
    }
    static getRequestToken() {
        const token = process.env["ACTIONS_ID_TOKEN_REQUEST_TOKEN"];
        if (!token) throw new Error("Unable to get ACTIONS_ID_TOKEN_REQUEST_TOKEN env variable");
        return token;
    }
    static getIDTokenUrl() {
        const runtimeUrl = process.env["ACTIONS_ID_TOKEN_REQUEST_URL"];
        if (!runtimeUrl) throw new Error("Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable");
        return runtimeUrl;
    }
    static getCall(id_token_url) {
        var _a;
        return $33f1e7529990ada4$var$__awaiter(this, void 0, void 0, function*() {
            const httpclient = $33f1e7529990ada4$var$OidcClient.createHttpClient();
            const res = yield httpclient.getJson(id_token_url).catch((error)=>{
                throw new Error(`Failed to get ID Token. \n 
        Error Code : ${error.statusCode}\n 
        Error Message: ${error.result.message}`);
            });
            const id_token = (_a = res.result) === null || _a === void 0 ? void 0 : _a.value;
            if (!id_token) throw new Error("Response json body do not have ID Token field");
            return id_token;
        });
    }
    static getIDToken(audience) {
        return $33f1e7529990ada4$var$__awaiter(this, void 0, void 0, function*() {
            try {
                // New ID Token is requested from action service
                let id_token_url = $33f1e7529990ada4$var$OidcClient.getIDTokenUrl();
                if (audience) {
                    const encodedAudience = encodeURIComponent(audience);
                    id_token_url = `${id_token_url}&audience=${encodedAudience}`;
                }
                $ikF6p.debug(`ID token url is ${id_token_url}`);
                const id_token = yield $33f1e7529990ada4$var$OidcClient.getCall(id_token_url);
                $ikF6p.setSecret(id_token);
                return id_token;
            } catch (error) {
                throw new Error(`Error message: ${error.message}`);
            }
        });
    }
}
module.exports.OidcClient = $33f1e7529990ada4$var$OidcClient;

});
parcelRequire.register("5StmC", function(module, exports) {
"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */ var $4478c5f4e442e696$var$__createBinding = module.exports && module.exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
        enumerable: true,
        get: function() {
            return m[k];
        }
    });
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var $4478c5f4e442e696$var$__setModuleDefault = module.exports && module.exports.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var $4478c5f4e442e696$var$__importStar = module.exports && module.exports.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.hasOwnProperty.call(mod, k)) $4478c5f4e442e696$var$__createBinding(result, mod, k);
    }
    $4478c5f4e442e696$var$__setModuleDefault(result, mod);
    return result;
};
var $4478c5f4e442e696$var$__awaiter = module.exports && module.exports.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.HttpClient = module.exports.isHttps = module.exports.HttpClientResponse = module.exports.HttpClientError = module.exports.getProxyUrl = module.exports.MediaTypes = module.exports.Headers = module.exports.HttpCodes = void 0;

const $4478c5f4e442e696$var$http = $4478c5f4e442e696$var$__importStar($8EjUb$http);

const $4478c5f4e442e696$var$https = $4478c5f4e442e696$var$__importStar($8EjUb$https);

const $4478c5f4e442e696$var$pm = $4478c5f4e442e696$var$__importStar((parcelRequire("eY7II")));

const $4478c5f4e442e696$var$tunnel = $4478c5f4e442e696$var$__importStar((parcelRequire("7ovee")));
var $4478c5f4e442e696$var$HttpCodes;
(function(HttpCodes) {
    HttpCodes[HttpCodes["OK"] = 200] = "OK";
    HttpCodes[HttpCodes["MultipleChoices"] = 300] = "MultipleChoices";
    HttpCodes[HttpCodes["MovedPermanently"] = 301] = "MovedPermanently";
    HttpCodes[HttpCodes["ResourceMoved"] = 302] = "ResourceMoved";
    HttpCodes[HttpCodes["SeeOther"] = 303] = "SeeOther";
    HttpCodes[HttpCodes["NotModified"] = 304] = "NotModified";
    HttpCodes[HttpCodes["UseProxy"] = 305] = "UseProxy";
    HttpCodes[HttpCodes["SwitchProxy"] = 306] = "SwitchProxy";
    HttpCodes[HttpCodes["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    HttpCodes[HttpCodes["PermanentRedirect"] = 308] = "PermanentRedirect";
    HttpCodes[HttpCodes["BadRequest"] = 400] = "BadRequest";
    HttpCodes[HttpCodes["Unauthorized"] = 401] = "Unauthorized";
    HttpCodes[HttpCodes["PaymentRequired"] = 402] = "PaymentRequired";
    HttpCodes[HttpCodes["Forbidden"] = 403] = "Forbidden";
    HttpCodes[HttpCodes["NotFound"] = 404] = "NotFound";
    HttpCodes[HttpCodes["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    HttpCodes[HttpCodes["NotAcceptable"] = 406] = "NotAcceptable";
    HttpCodes[HttpCodes["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
    HttpCodes[HttpCodes["RequestTimeout"] = 408] = "RequestTimeout";
    HttpCodes[HttpCodes["Conflict"] = 409] = "Conflict";
    HttpCodes[HttpCodes["Gone"] = 410] = "Gone";
    HttpCodes[HttpCodes["TooManyRequests"] = 429] = "TooManyRequests";
    HttpCodes[HttpCodes["InternalServerError"] = 500] = "InternalServerError";
    HttpCodes[HttpCodes["NotImplemented"] = 501] = "NotImplemented";
    HttpCodes[HttpCodes["BadGateway"] = 502] = "BadGateway";
    HttpCodes[HttpCodes["ServiceUnavailable"] = 503] = "ServiceUnavailable";
    HttpCodes[HttpCodes["GatewayTimeout"] = 504] = "GatewayTimeout";
})($4478c5f4e442e696$var$HttpCodes = module.exports.HttpCodes || (module.exports.HttpCodes = {}));
var $4478c5f4e442e696$var$Headers;
(function(Headers) {
    Headers["Accept"] = "accept";
    Headers["ContentType"] = "content-type";
})($4478c5f4e442e696$var$Headers = module.exports.Headers || (module.exports.Headers = {}));
var $4478c5f4e442e696$var$MediaTypes;
(function(MediaTypes) {
    MediaTypes["ApplicationJson"] = "application/json";
})($4478c5f4e442e696$var$MediaTypes = module.exports.MediaTypes || (module.exports.MediaTypes = {}));
/**
 * Returns the proxy URL, depending upon the supplied url and proxy environment variables.
 * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
 */ function $4478c5f4e442e696$var$getProxyUrl(serverUrl) {
    const proxyUrl = $4478c5f4e442e696$var$pm.getProxyUrl(new URL(serverUrl));
    return proxyUrl ? proxyUrl.href : "";
}
module.exports.getProxyUrl = $4478c5f4e442e696$var$getProxyUrl;
const $4478c5f4e442e696$var$HttpRedirectCodes = [
    $4478c5f4e442e696$var$HttpCodes.MovedPermanently,
    $4478c5f4e442e696$var$HttpCodes.ResourceMoved,
    $4478c5f4e442e696$var$HttpCodes.SeeOther,
    $4478c5f4e442e696$var$HttpCodes.TemporaryRedirect,
    $4478c5f4e442e696$var$HttpCodes.PermanentRedirect
];
const $4478c5f4e442e696$var$HttpResponseRetryCodes = [
    $4478c5f4e442e696$var$HttpCodes.BadGateway,
    $4478c5f4e442e696$var$HttpCodes.ServiceUnavailable,
    $4478c5f4e442e696$var$HttpCodes.GatewayTimeout
];
const $4478c5f4e442e696$var$RetryableHttpVerbs = [
    "OPTIONS",
    "GET",
    "DELETE",
    "HEAD"
];
const $4478c5f4e442e696$var$ExponentialBackoffCeiling = 10;
const $4478c5f4e442e696$var$ExponentialBackoffTimeSlice = 5;
class $4478c5f4e442e696$var$HttpClientError extends Error {
    constructor(message, statusCode){
        super(message);
        this.name = "HttpClientError";
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, $4478c5f4e442e696$var$HttpClientError.prototype);
    }
}
module.exports.HttpClientError = $4478c5f4e442e696$var$HttpClientError;
class $4478c5f4e442e696$var$HttpClientResponse {
    constructor(message){
        this.message = message;
    }
    readBody() {
        return $4478c5f4e442e696$var$__awaiter(this, void 0, void 0, function*() {
            return new Promise((resolve)=>$4478c5f4e442e696$var$__awaiter(this, void 0, void 0, function*() {
                    let output = Buffer.alloc(0);
                    this.message.on("data", (chunk)=>{
                        output = Buffer.concat([
                            output,
                            chunk
                        ]);
                    });
                    this.message.on("end", ()=>{
                        resolve(output.toString());
                    });
                }));
        });
    }
}
module.exports.HttpClientResponse = $4478c5f4e442e696$var$HttpClientResponse;
function $4478c5f4e442e696$var$isHttps(requestUrl) {
    const parsedUrl = new URL(requestUrl);
    return parsedUrl.protocol === "https:";
}
module.exports.isHttps = $4478c5f4e442e696$var$isHttps;
class $4478c5f4e442e696$var$HttpClient {
    constructor(userAgent, handlers, requestOptions){
        this._ignoreSslError = false;
        this._allowRedirects = true;
        this._allowRedirectDowngrade = false;
        this._maxRedirects = 50;
        this._allowRetries = false;
        this._maxRetries = 1;
        this._keepAlive = false;
        this._disposed = false;
        this.userAgent = userAgent;
        this.handlers = handlers || [];
        this.requestOptions = requestOptions;
        if (requestOptions) {
            if (requestOptions.ignoreSslError != null) this._ignoreSslError = requestOptions.ignoreSslError;
            this._socketTimeout = requestOptions.socketTimeout;
            if (requestOptions.allowRedirects != null) this._allowRedirects = requestOptions.allowRedirects;
            if (requestOptions.allowRedirectDowngrade != null) this._allowRedirectDowngrade = requestOptions.allowRedirectDowngrade;
            if (requestOptions.maxRedirects != null) this._maxRedirects = Math.max(requestOptions.maxRedirects, 0);
            if (requestOptions.keepAlive != null) this._keepAlive = requestOptions.keepAlive;
            if (requestOptions.allowRetries != null) this._allowRetries = requestOptions.allowRetries;
            if (requestOptions.maxRetries != null) this._maxRetries = requestOptions.maxRetries;
        }
    }
    options(requestUrl, additionalHeaders) {
        return $4478c5f4e442e696$var$__awaiter(this, void 0, void 0, function*() {
            return this.request("OPTIONS", requestUrl, null, additionalHeaders || {});
        });
    }
    get(requestUrl, additionalHeaders) {
        return $4478c5f4e442e696$var$__awaiter(this, void 0, void 0, function*() {
            return this.request("GET", requestUrl, null, additionalHeaders || {});
        });
    }
    del(requestUrl, additionalHeaders) {
        return $4478c5f4e442e696$var$__awaiter(this, void 0, void 0, function*() {
            return this.request("DELETE", requestUrl, null, additionalHeaders || {});
        });
    }
    post(requestUrl, data, additionalHeaders) {
        return $4478c5f4e442e696$var$__awaiter(this, void 0, void 0, function*() {
            return this.request("POST", requestUrl, data, additionalHeaders || {});
        });
    }
    patch(requestUrl, data, additionalHeaders) {
        return $4478c5f4e442e696$var$__awaiter(this, void 0, void 0, function*() {
            return this.request("PATCH", requestUrl, data, additionalHeaders || {});
        });
    }
    put(requestUrl, data, additionalHeaders) {
        return $4478c5f4e442e696$var$__awaiter(this, void 0, void 0, function*() {
            return this.request("PUT", requestUrl, data, additionalHeaders || {});
        });
    }
    head(requestUrl, additionalHeaders) {
        return $4478c5f4e442e696$var$__awaiter(this, void 0, void 0, function*() {
            return this.request("HEAD", requestUrl, null, additionalHeaders || {});
        });
    }
    sendStream(verb, requestUrl, stream, additionalHeaders) {
        return $4478c5f4e442e696$var$__awaiter(this, void 0, void 0, function*() {
            return this.request(verb, requestUrl, stream, additionalHeaders);
        });
    }
    /**
     * Gets a typed object from an endpoint
     * Be aware that not found returns a null.  Other errors (4xx, 5xx) reject the promise
     */ getJson(requestUrl, additionalHeaders = {}) {
        return $4478c5f4e442e696$var$__awaiter(this, void 0, void 0, function*() {
            additionalHeaders[$4478c5f4e442e696$var$Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, $4478c5f4e442e696$var$Headers.Accept, $4478c5f4e442e696$var$MediaTypes.ApplicationJson);
            const res = yield this.get(requestUrl, additionalHeaders);
            return this._processResponse(res, this.requestOptions);
        });
    }
    postJson(requestUrl, obj, additionalHeaders = {}) {
        return $4478c5f4e442e696$var$__awaiter(this, void 0, void 0, function*() {
            const data = JSON.stringify(obj, null, 2);
            additionalHeaders[$4478c5f4e442e696$var$Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, $4478c5f4e442e696$var$Headers.Accept, $4478c5f4e442e696$var$MediaTypes.ApplicationJson);
            additionalHeaders[$4478c5f4e442e696$var$Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, $4478c5f4e442e696$var$Headers.ContentType, $4478c5f4e442e696$var$MediaTypes.ApplicationJson);
            const res = yield this.post(requestUrl, data, additionalHeaders);
            return this._processResponse(res, this.requestOptions);
        });
    }
    putJson(requestUrl, obj, additionalHeaders = {}) {
        return $4478c5f4e442e696$var$__awaiter(this, void 0, void 0, function*() {
            const data = JSON.stringify(obj, null, 2);
            additionalHeaders[$4478c5f4e442e696$var$Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, $4478c5f4e442e696$var$Headers.Accept, $4478c5f4e442e696$var$MediaTypes.ApplicationJson);
            additionalHeaders[$4478c5f4e442e696$var$Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, $4478c5f4e442e696$var$Headers.ContentType, $4478c5f4e442e696$var$MediaTypes.ApplicationJson);
            const res = yield this.put(requestUrl, data, additionalHeaders);
            return this._processResponse(res, this.requestOptions);
        });
    }
    patchJson(requestUrl, obj, additionalHeaders = {}) {
        return $4478c5f4e442e696$var$__awaiter(this, void 0, void 0, function*() {
            const data = JSON.stringify(obj, null, 2);
            additionalHeaders[$4478c5f4e442e696$var$Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, $4478c5f4e442e696$var$Headers.Accept, $4478c5f4e442e696$var$MediaTypes.ApplicationJson);
            additionalHeaders[$4478c5f4e442e696$var$Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, $4478c5f4e442e696$var$Headers.ContentType, $4478c5f4e442e696$var$MediaTypes.ApplicationJson);
            const res = yield this.patch(requestUrl, data, additionalHeaders);
            return this._processResponse(res, this.requestOptions);
        });
    }
    /**
     * Makes a raw http request.
     * All other methods such as get, post, patch, and request ultimately call this.
     * Prefer get, del, post and patch
     */ request(verb, requestUrl, data, headers) {
        return $4478c5f4e442e696$var$__awaiter(this, void 0, void 0, function*() {
            if (this._disposed) throw new Error("Client has already been disposed.");
            const parsedUrl = new URL(requestUrl);
            let info = this._prepareRequest(verb, parsedUrl, headers);
            // Only perform retries on reads since writes may not be idempotent.
            const maxTries = this._allowRetries && $4478c5f4e442e696$var$RetryableHttpVerbs.includes(verb) ? this._maxRetries + 1 : 1;
            let numTries = 0;
            let response;
            do {
                response = yield this.requestRaw(info, data);
                // Check if it's an authentication challenge
                if (response && response.message && response.message.statusCode === $4478c5f4e442e696$var$HttpCodes.Unauthorized) {
                    let authenticationHandler;
                    for (const handler of this.handlers)if (handler.canHandleAuthentication(response)) {
                        authenticationHandler = handler;
                        break;
                    }
                    if (authenticationHandler) return authenticationHandler.handleAuthentication(this, info, data);
                    else // We have received an unauthorized response but have no handlers to handle it.
                    // Let the response return to the caller.
                    return response;
                }
                let redirectsRemaining = this._maxRedirects;
                while(response.message.statusCode && $4478c5f4e442e696$var$HttpRedirectCodes.includes(response.message.statusCode) && this._allowRedirects && redirectsRemaining > 0){
                    const redirectUrl = response.message.headers["location"];
                    if (!redirectUrl) break;
                    const parsedRedirectUrl = new URL(redirectUrl);
                    if (parsedUrl.protocol === "https:" && parsedUrl.protocol !== parsedRedirectUrl.protocol && !this._allowRedirectDowngrade) throw new Error("Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.");
                    // we need to finish reading the response before reassigning response
                    // which will leak the open socket.
                    yield response.readBody();
                    // strip authorization header if redirected to a different hostname
                    if (parsedRedirectUrl.hostname !== parsedUrl.hostname) {
                        for(const header in headers)// header names are case insensitive
                        if (header.toLowerCase() === "authorization") delete headers[header];
                    }
                    // let's make the request with the new redirectUrl
                    info = this._prepareRequest(verb, parsedRedirectUrl, headers);
                    response = yield this.requestRaw(info, data);
                    redirectsRemaining--;
                }
                if (!response.message.statusCode || !$4478c5f4e442e696$var$HttpResponseRetryCodes.includes(response.message.statusCode)) // If not a retry code, return immediately instead of retrying
                return response;
                numTries += 1;
                if (numTries < maxTries) {
                    yield response.readBody();
                    yield this._performExponentialBackoff(numTries);
                }
            }while (numTries < maxTries);
            return response;
        });
    }
    /**
     * Needs to be called if keepAlive is set to true in request options.
     */ dispose() {
        if (this._agent) this._agent.destroy();
        this._disposed = true;
    }
    /**
     * Raw request.
     * @param info
     * @param data
     */ requestRaw(info, data) {
        return $4478c5f4e442e696$var$__awaiter(this, void 0, void 0, function*() {
            return new Promise((resolve, reject)=>{
                function callbackForResult(err, res) {
                    if (err) reject(err);
                    else if (!res) // If `err` is not passed, then `res` must be passed.
                    reject(new Error("Unknown error"));
                    else resolve(res);
                }
                this.requestRawWithCallback(info, data, callbackForResult);
            });
        });
    }
    /**
     * Raw request with callback.
     * @param info
     * @param data
     * @param onResult
     */ requestRawWithCallback(info, data, onResult) {
        if (typeof data === "string") {
            if (!info.options.headers) info.options.headers = {};
            info.options.headers["Content-Length"] = Buffer.byteLength(data, "utf8");
        }
        let callbackCalled = false;
        function handleResult(err, res) {
            if (!callbackCalled) {
                callbackCalled = true;
                onResult(err, res);
            }
        }
        const req = info.httpModule.request(info.options, (msg)=>{
            const res = new $4478c5f4e442e696$var$HttpClientResponse(msg);
            handleResult(undefined, res);
        });
        let socket;
        req.on("socket", (sock)=>{
            socket = sock;
        });
        // If we ever get disconnected, we want the socket to timeout eventually
        req.setTimeout(this._socketTimeout || 180000, ()=>{
            if (socket) socket.end();
            handleResult(new Error(`Request timeout: ${info.options.path}`));
        });
        req.on("error", function(err) {
            // err has statusCode property
            // res should have headers
            handleResult(err);
        });
        if (data && typeof data === "string") req.write(data, "utf8");
        if (data && typeof data !== "string") {
            data.on("close", function() {
                req.end();
            });
            data.pipe(req);
        } else req.end();
    }
    /**
     * Gets an http agent. This function is useful when you need an http agent that handles
     * routing through a proxy server - depending upon the url and proxy environment variables.
     * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
     */ getAgent(serverUrl) {
        const parsedUrl = new URL(serverUrl);
        return this._getAgent(parsedUrl);
    }
    _prepareRequest(method, requestUrl, headers) {
        const info = {};
        info.parsedUrl = requestUrl;
        const usingSsl = info.parsedUrl.protocol === "https:";
        info.httpModule = usingSsl ? $4478c5f4e442e696$var$https : $4478c5f4e442e696$var$http;
        const defaultPort = usingSsl ? 443 : 80;
        info.options = {};
        info.options.host = info.parsedUrl.hostname;
        info.options.port = info.parsedUrl.port ? parseInt(info.parsedUrl.port) : defaultPort;
        info.options.path = (info.parsedUrl.pathname || "") + (info.parsedUrl.search || "");
        info.options.method = method;
        info.options.headers = this._mergeHeaders(headers);
        if (this.userAgent != null) info.options.headers["user-agent"] = this.userAgent;
        info.options.agent = this._getAgent(info.parsedUrl);
        // gives handlers an opportunity to participate
        if (this.handlers) for (const handler of this.handlers)handler.prepareRequest(info.options);
        return info;
    }
    _mergeHeaders(headers) {
        if (this.requestOptions && this.requestOptions.headers) return Object.assign({}, $4478c5f4e442e696$var$lowercaseKeys(this.requestOptions.headers), $4478c5f4e442e696$var$lowercaseKeys(headers || {}));
        return $4478c5f4e442e696$var$lowercaseKeys(headers || {});
    }
    _getExistingOrDefaultHeader(additionalHeaders, header, _default) {
        let clientHeader;
        if (this.requestOptions && this.requestOptions.headers) clientHeader = $4478c5f4e442e696$var$lowercaseKeys(this.requestOptions.headers)[header];
        return additionalHeaders[header] || clientHeader || _default;
    }
    _getAgent(parsedUrl) {
        let agent;
        const proxyUrl = $4478c5f4e442e696$var$pm.getProxyUrl(parsedUrl);
        const useProxy = proxyUrl && proxyUrl.hostname;
        if (this._keepAlive && useProxy) agent = this._proxyAgent;
        if (this._keepAlive && !useProxy) agent = this._agent;
        // if agent is already assigned use that agent.
        if (agent) return agent;
        const usingSsl = parsedUrl.protocol === "https:";
        let maxSockets = 100;
        if (this.requestOptions) maxSockets = this.requestOptions.maxSockets || $4478c5f4e442e696$var$http.globalAgent.maxSockets;
        // This is `useProxy` again, but we need to check `proxyURl` directly for TypeScripts's flow analysis.
        if (proxyUrl && proxyUrl.hostname) {
            const agentOptions = {
                maxSockets: maxSockets,
                keepAlive: this._keepAlive,
                proxy: Object.assign(Object.assign({}, (proxyUrl.username || proxyUrl.password) && {
                    proxyAuth: `${proxyUrl.username}:${proxyUrl.password}`
                }), {
                    host: proxyUrl.hostname,
                    port: proxyUrl.port
                })
            };
            let tunnelAgent;
            const overHttps = proxyUrl.protocol === "https:";
            if (usingSsl) tunnelAgent = overHttps ? $4478c5f4e442e696$var$tunnel.httpsOverHttps : $4478c5f4e442e696$var$tunnel.httpsOverHttp;
            else tunnelAgent = overHttps ? $4478c5f4e442e696$var$tunnel.httpOverHttps : $4478c5f4e442e696$var$tunnel.httpOverHttp;
            agent = tunnelAgent(agentOptions);
            this._proxyAgent = agent;
        }
        // if reusing agent across request and tunneling agent isn't assigned create a new agent
        if (this._keepAlive && !agent) {
            const options = {
                keepAlive: this._keepAlive,
                maxSockets: maxSockets
            };
            agent = usingSsl ? new $4478c5f4e442e696$var$https.Agent(options) : new $4478c5f4e442e696$var$http.Agent(options);
            this._agent = agent;
        }
        // if not using private agent and tunnel agent isn't setup then use global agent
        if (!agent) agent = usingSsl ? $4478c5f4e442e696$var$https.globalAgent : $4478c5f4e442e696$var$http.globalAgent;
        if (usingSsl && this._ignoreSslError) // we don't want to set NODE_TLS_REJECT_UNAUTHORIZED=0 since that will affect request for entire process
        // http.RequestOptions doesn't expose a way to modify RequestOptions.agent.options
        // we have to cast it to any and change it directly
        agent.options = Object.assign(agent.options || {}, {
            rejectUnauthorized: false
        });
        return agent;
    }
    _performExponentialBackoff(retryNumber) {
        return $4478c5f4e442e696$var$__awaiter(this, void 0, void 0, function*() {
            retryNumber = Math.min($4478c5f4e442e696$var$ExponentialBackoffCeiling, retryNumber);
            const ms = $4478c5f4e442e696$var$ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
            return new Promise((resolve)=>setTimeout(()=>resolve(), ms));
        });
    }
    _processResponse(res, options) {
        return $4478c5f4e442e696$var$__awaiter(this, void 0, void 0, function*() {
            return new Promise((resolve, reject)=>$4478c5f4e442e696$var$__awaiter(this, void 0, void 0, function*() {
                    const statusCode = res.message.statusCode || 0;
                    const response = {
                        statusCode: statusCode,
                        result: null,
                        headers: {}
                    };
                    // not found leads to null obj returned
                    if (statusCode === $4478c5f4e442e696$var$HttpCodes.NotFound) resolve(response);
                    // get the result from the body
                    function dateTimeDeserializer(key, value) {
                        if (typeof value === "string") {
                            const a = new Date(value);
                            if (!isNaN(a.valueOf())) return a;
                        }
                        return value;
                    }
                    let obj;
                    let contents;
                    try {
                        contents = yield res.readBody();
                        if (contents && contents.length > 0) {
                            if (options && options.deserializeDates) obj = JSON.parse(contents, dateTimeDeserializer);
                            else obj = JSON.parse(contents);
                            response.result = obj;
                        }
                        response.headers = res.message.headers;
                    } catch (err) {
                    // Invalid resource (contents not json);  leaving result obj null
                    }
                    // note that 3xx redirects are handled by the http layer.
                    if (statusCode > 299) {
                        let msg;
                        // if exception/error in body, attempt to get better error
                        if (obj && obj.message) msg = obj.message;
                        else if (contents && contents.length > 0) // it may be the case that the exception is in the body message as string
                        msg = contents;
                        else msg = `Failed request: (${statusCode})`;
                        const err = new $4478c5f4e442e696$var$HttpClientError(msg, statusCode);
                        err.result = response.result;
                        reject(err);
                    } else resolve(response);
                }));
        });
    }
}
module.exports.HttpClient = $4478c5f4e442e696$var$HttpClient;
const $4478c5f4e442e696$var$lowercaseKeys = (obj)=>Object.keys(obj).reduce((c, k)=>(c[k.toLowerCase()] = obj[k], c), {});

});
parcelRequire.register("eY7II", function(module, exports) {
"use strict";
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.checkBypass = module.exports.getProxyUrl = void 0;
function $ae5ca86225207332$var$getProxyUrl(reqUrl) {
    const usingSsl = reqUrl.protocol === "https:";
    if ($ae5ca86225207332$var$checkBypass(reqUrl)) return undefined;
    const proxyVar = (()=>{
        if (usingSsl) return process.env["https_proxy"] || process.env["HTTPS_PROXY"];
        else return process.env["http_proxy"] || process.env["HTTP_PROXY"];
    })();
    if (proxyVar) return new URL(proxyVar);
    else return undefined;
}
module.exports.getProxyUrl = $ae5ca86225207332$var$getProxyUrl;
function $ae5ca86225207332$var$checkBypass(reqUrl) {
    if (!reqUrl.hostname) return false;
    const noProxy = process.env["no_proxy"] || process.env["NO_PROXY"] || "";
    if (!noProxy) return false;
    // Determine the request port
    let reqPort;
    if (reqUrl.port) reqPort = Number(reqUrl.port);
    else if (reqUrl.protocol === "http:") reqPort = 80;
    else if (reqUrl.protocol === "https:") reqPort = 443;
    // Format the request hostname and hostname with port
    const upperReqHosts = [
        reqUrl.hostname.toUpperCase()
    ];
    if (typeof reqPort === "number") upperReqHosts.push(`${upperReqHosts[0]}:${reqPort}`);
    // Compare request host against noproxy
    for (const upperNoProxyItem of noProxy.split(",").map((x)=>x.trim().toUpperCase()).filter((x)=>x)){
        if (upperReqHosts.some((x)=>x === upperNoProxyItem)) return true;
    }
    return false;
}
module.exports.checkBypass = $ae5ca86225207332$var$checkBypass;

});

parcelRequire.register("7ovee", function(module, exports) {

module.exports = (parcelRequire("9fZn7"));

});
parcelRequire.register("9fZn7", function(module, exports) {

$parcel$export(module.exports, "httpOverHttp", () => $6bd51ef689d3a47e$export$25cbd437c61a3835, (v) => $6bd51ef689d3a47e$export$25cbd437c61a3835 = v);
$parcel$export(module.exports, "httpsOverHttp", () => $6bd51ef689d3a47e$export$c06e3df7111bae43, (v) => $6bd51ef689d3a47e$export$c06e3df7111bae43 = v);
$parcel$export(module.exports, "httpOverHttps", () => $6bd51ef689d3a47e$export$5d50e36ef656139f, (v) => $6bd51ef689d3a47e$export$5d50e36ef656139f = v);
$parcel$export(module.exports, "httpsOverHttps", () => $6bd51ef689d3a47e$export$212d6605025321cc, (v) => $6bd51ef689d3a47e$export$212d6605025321cc = v);
$parcel$export(module.exports, "debug", () => $6bd51ef689d3a47e$export$1c9f709888824e05, (v) => $6bd51ef689d3a47e$export$1c9f709888824e05 = v);
var $6bd51ef689d3a47e$export$25cbd437c61a3835;
var $6bd51ef689d3a47e$export$c06e3df7111bae43;
var $6bd51ef689d3a47e$export$5d50e36ef656139f;
var $6bd51ef689d3a47e$export$212d6605025321cc;
var $6bd51ef689d3a47e$export$1c9f709888824e05;
"use strict";







$6bd51ef689d3a47e$export$25cbd437c61a3835 = $6bd51ef689d3a47e$var$httpOverHttp;
$6bd51ef689d3a47e$export$c06e3df7111bae43 = $6bd51ef689d3a47e$var$httpsOverHttp;
$6bd51ef689d3a47e$export$5d50e36ef656139f = $6bd51ef689d3a47e$var$httpOverHttps;
$6bd51ef689d3a47e$export$212d6605025321cc = $6bd51ef689d3a47e$var$httpsOverHttps;
function $6bd51ef689d3a47e$var$httpOverHttp(options) {
    var agent = new $6bd51ef689d3a47e$var$TunnelingAgent(options);
    agent.request = $8EjUb$http.request;
    return agent;
}
function $6bd51ef689d3a47e$var$httpsOverHttp(options) {
    var agent = new $6bd51ef689d3a47e$var$TunnelingAgent(options);
    agent.request = $8EjUb$http.request;
    agent.createSocket = $6bd51ef689d3a47e$var$createSecureSocket;
    agent.defaultPort = 443;
    return agent;
}
function $6bd51ef689d3a47e$var$httpOverHttps(options) {
    var agent = new $6bd51ef689d3a47e$var$TunnelingAgent(options);
    agent.request = $8EjUb$https.request;
    return agent;
}
function $6bd51ef689d3a47e$var$httpsOverHttps(options) {
    var agent = new $6bd51ef689d3a47e$var$TunnelingAgent(options);
    agent.request = $8EjUb$https.request;
    agent.createSocket = $6bd51ef689d3a47e$var$createSecureSocket;
    agent.defaultPort = 443;
    return agent;
}
function $6bd51ef689d3a47e$var$TunnelingAgent(options) {
    var self = this;
    self.options = options || {};
    self.proxyOptions = self.options.proxy || {};
    self.maxSockets = self.options.maxSockets || $8EjUb$http.Agent.defaultMaxSockets;
    self.requests = [];
    self.sockets = [];
    self.on("free", function onFree(socket, host, port, localAddress) {
        var options = $6bd51ef689d3a47e$var$toOptions(host, port, localAddress);
        for(var i = 0, len = self.requests.length; i < len; ++i){
            var pending = self.requests[i];
            if (pending.host === options.host && pending.port === options.port) {
                // Detect the request to connect same origin server,
                // reuse the connection.
                self.requests.splice(i, 1);
                pending.request.onSocket(socket);
                return;
            }
        }
        socket.destroy();
        self.removeSocket(socket);
    });
}
$8EjUb$util.inherits($6bd51ef689d3a47e$var$TunnelingAgent, $8EjUb$events.EventEmitter);
$6bd51ef689d3a47e$var$TunnelingAgent.prototype.addRequest = function addRequest(req, host, port, localAddress) {
    var self = this;
    var options = $6bd51ef689d3a47e$var$mergeOptions({
        request: req
    }, self.options, $6bd51ef689d3a47e$var$toOptions(host, port, localAddress));
    if (self.sockets.length >= this.maxSockets) {
        // We are over limit so we'll add it to the queue.
        self.requests.push(options);
        return;
    }
    // If we are under maxSockets create a new one.
    self.createSocket(options, function(socket) {
        socket.on("free", onFree);
        socket.on("close", onCloseOrRemove);
        socket.on("agentRemove", onCloseOrRemove);
        req.onSocket(socket);
        function onFree() {
            self.emit("free", socket, options);
        }
        function onCloseOrRemove(err) {
            self.removeSocket(socket);
            socket.removeListener("free", onFree);
            socket.removeListener("close", onCloseOrRemove);
            socket.removeListener("agentRemove", onCloseOrRemove);
        }
    });
};
$6bd51ef689d3a47e$var$TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
    var self = this;
    var placeholder = {};
    self.sockets.push(placeholder);
    var connectOptions = $6bd51ef689d3a47e$var$mergeOptions({}, self.proxyOptions, {
        method: "CONNECT",
        path: options.host + ":" + options.port,
        agent: false,
        headers: {
            host: options.host + ":" + options.port
        }
    });
    if (options.localAddress) connectOptions.localAddress = options.localAddress;
    if (connectOptions.proxyAuth) {
        connectOptions.headers = connectOptions.headers || {};
        connectOptions.headers["Proxy-Authorization"] = "Basic " + new Buffer(connectOptions.proxyAuth).toString("base64");
    }
    $6bd51ef689d3a47e$var$debug("making CONNECT request");
    var connectReq = self.request(connectOptions);
    connectReq.useChunkedEncodingByDefault = false; // for v0.6
    connectReq.once("response", onResponse); // for v0.6
    connectReq.once("upgrade", onUpgrade); // for v0.6
    connectReq.once("connect", onConnect); // for v0.7 or later
    connectReq.once("error", onError);
    connectReq.end();
    function onResponse(res) {
        // Very hacky. This is necessary to avoid http-parser leaks.
        res.upgrade = true;
    }
    function onUpgrade(res, socket, head) {
        // Hacky.
        process.nextTick(function() {
            onConnect(res, socket, head);
        });
    }
    function onConnect(res, socket, head) {
        connectReq.removeAllListeners();
        socket.removeAllListeners();
        if (res.statusCode !== 200) {
            $6bd51ef689d3a47e$var$debug("tunneling socket could not be established, statusCode=%d", res.statusCode);
            socket.destroy();
            var error = new Error("tunneling socket could not be established, statusCode=" + res.statusCode);
            error.code = "ECONNRESET";
            options.request.emit("error", error);
            self.removeSocket(placeholder);
            return;
        }
        if (head.length > 0) {
            $6bd51ef689d3a47e$var$debug("got illegal response body from proxy");
            socket.destroy();
            var error = new Error("got illegal response body from proxy");
            error.code = "ECONNRESET";
            options.request.emit("error", error);
            self.removeSocket(placeholder);
            return;
        }
        $6bd51ef689d3a47e$var$debug("tunneling connection has established");
        self.sockets[self.sockets.indexOf(placeholder)] = socket;
        return cb(socket);
    }
    function onError(cause) {
        connectReq.removeAllListeners();
        $6bd51ef689d3a47e$var$debug("tunneling socket could not be established, cause=%s\n", cause.message, cause.stack);
        var error = new Error("tunneling socket could not be established, cause=" + cause.message);
        error.code = "ECONNRESET";
        options.request.emit("error", error);
        self.removeSocket(placeholder);
    }
};
$6bd51ef689d3a47e$var$TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
    var pos = this.sockets.indexOf(socket);
    if (pos === -1) return;
    this.sockets.splice(pos, 1);
    var pending = this.requests.shift();
    if (pending) // If we have pending requests and a socket gets closed a new one
    // needs to be created to take over in the pool for the one that closed.
    this.createSocket(pending, function(socket) {
        pending.request.onSocket(socket);
    });
};
function $6bd51ef689d3a47e$var$createSecureSocket(options, cb) {
    var self = this;
    $6bd51ef689d3a47e$var$TunnelingAgent.prototype.createSocket.call(self, options, function(socket) {
        var hostHeader = options.request.getHeader("host");
        var tlsOptions = $6bd51ef689d3a47e$var$mergeOptions({}, self.options, {
            socket: socket,
            servername: hostHeader ? hostHeader.replace(/:.*$/, "") : options.host
        });
        // 0 is dummy port for v0.6
        var secureSocket = $8EjUb$tls.connect(0, tlsOptions);
        self.sockets[self.sockets.indexOf(socket)] = secureSocket;
        cb(secureSocket);
    });
}
function $6bd51ef689d3a47e$var$toOptions(host, port, localAddress) {
    if (typeof host === "string") return {
        host: host,
        port: port,
        localAddress: localAddress
    };
    return host; // for v0.11 or later
}
function $6bd51ef689d3a47e$var$mergeOptions(target) {
    for(var i = 1, len = arguments.length; i < len; ++i){
        var overrides = arguments[i];
        if (typeof overrides === "object") {
            var keys = Object.keys(overrides);
            for(var j = 0, keyLen = keys.length; j < keyLen; ++j){
                var k = keys[j];
                if (overrides[k] !== undefined) target[k] = overrides[k];
            }
        }
    }
    return target;
}
var $6bd51ef689d3a47e$var$debug;
if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) $6bd51ef689d3a47e$var$debug = function() {
    var args = Array.prototype.slice.call(arguments);
    if (typeof args[0] === "string") args[0] = "TUNNEL: " + args[0];
    else args.unshift("TUNNEL:");
    console.error.apply(console, args);
};
else $6bd51ef689d3a47e$var$debug = function() {};
$6bd51ef689d3a47e$export$1c9f709888824e05 = $6bd51ef689d3a47e$var$debug; // for test

});



parcelRequire.register("kyEZm", function(module, exports) {
"use strict";
var $ef76c7201fdef3c2$var$__awaiter = module.exports && module.exports.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.PersonalAccessTokenCredentialHandler = module.exports.BearerCredentialHandler = module.exports.BasicCredentialHandler = void 0;
class $ef76c7201fdef3c2$var$BasicCredentialHandler {
    constructor(username, password){
        this.username = username;
        this.password = password;
    }
    prepareRequest(options) {
        if (!options.headers) throw Error("The request has no headers");
        options.headers["Authorization"] = `Basic ${Buffer.from(`${this.username}:${this.password}`).toString("base64")}`;
    }
    // This handler cannot handle 401
    canHandleAuthentication() {
        return false;
    }
    handleAuthentication() {
        return $ef76c7201fdef3c2$var$__awaiter(this, void 0, void 0, function*() {
            throw new Error("not implemented");
        });
    }
}
module.exports.BasicCredentialHandler = $ef76c7201fdef3c2$var$BasicCredentialHandler;
class $ef76c7201fdef3c2$var$BearerCredentialHandler {
    constructor(token){
        this.token = token;
    }
    // currently implements pre-authorization
    // TODO: support preAuth = false where it hooks on 401
    prepareRequest(options) {
        if (!options.headers) throw Error("The request has no headers");
        options.headers["Authorization"] = `Bearer ${this.token}`;
    }
    // This handler cannot handle 401
    canHandleAuthentication() {
        return false;
    }
    handleAuthentication() {
        return $ef76c7201fdef3c2$var$__awaiter(this, void 0, void 0, function*() {
            throw new Error("not implemented");
        });
    }
}
module.exports.BearerCredentialHandler = $ef76c7201fdef3c2$var$BearerCredentialHandler;
class $ef76c7201fdef3c2$var$PersonalAccessTokenCredentialHandler {
    constructor(token){
        this.token = token;
    }
    // currently implements pre-authorization
    // TODO: support preAuth = false where it hooks on 401
    prepareRequest(options) {
        if (!options.headers) throw Error("The request has no headers");
        options.headers["Authorization"] = `Basic ${Buffer.from(`PAT:${this.token}`).toString("base64")}`;
    }
    // This handler cannot handle 401
    canHandleAuthentication() {
        return false;
    }
    handleAuthentication() {
        return $ef76c7201fdef3c2$var$__awaiter(this, void 0, void 0, function*() {
            throw new Error("not implemented");
        });
    }
}
module.exports.PersonalAccessTokenCredentialHandler = $ef76c7201fdef3c2$var$PersonalAccessTokenCredentialHandler;

});


parcelRequire.register("9xNm5", function(module, exports) {
"use strict";
var $6f2d7b1164c79a5f$var$__awaiter = module.exports && module.exports.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.summary = module.exports.markdownSummary = module.exports.SUMMARY_DOCS_URL = module.exports.SUMMARY_ENV_VAR = void 0;


const { access: $6f2d7b1164c79a5f$var$access , appendFile: $6f2d7b1164c79a5f$var$appendFile , writeFile: $6f2d7b1164c79a5f$var$writeFile  } = $8EjUb$fs.promises;
module.exports.SUMMARY_ENV_VAR = "GITHUB_STEP_SUMMARY";
module.exports.SUMMARY_DOCS_URL = "https://docs.github.com/actions/using-workflows/workflow-commands-for-github-actions#adding-a-job-summary";
class $6f2d7b1164c79a5f$var$Summary {
    constructor(){
        this._buffer = "";
    }
    /**
     * Finds the summary file path from the environment, rejects if env var is not found or file does not exist
     * Also checks r/w permissions.
     *
     * @returns step summary file path
     */ filePath() {
        return $6f2d7b1164c79a5f$var$__awaiter(this, void 0, void 0, function*() {
            if (this._filePath) return this._filePath;
            const pathFromEnv = process.env[module.exports.SUMMARY_ENV_VAR];
            if (!pathFromEnv) throw new Error(`Unable to find environment variable for $${module.exports.SUMMARY_ENV_VAR}. Check if your runtime environment supports job summaries.`);
            try {
                yield $6f2d7b1164c79a5f$var$access(pathFromEnv, $8EjUb$fs.constants.R_OK | $8EjUb$fs.constants.W_OK);
            } catch (_a) {
                throw new Error(`Unable to access summary file: '${pathFromEnv}'. Check if the file has correct read/write permissions.`);
            }
            this._filePath = pathFromEnv;
            return this._filePath;
        });
    }
    /**
     * Wraps content in an HTML tag, adding any HTML attributes
     *
     * @param {string} tag HTML tag to wrap
     * @param {string | null} content content within the tag
     * @param {[attribute: string]: string} attrs key-value list of HTML attributes to add
     *
     * @returns {string} content wrapped in HTML element
     */ wrap(tag, content, attrs = {}) {
        const htmlAttrs = Object.entries(attrs).map(([key, value])=>` ${key}="${value}"`).join("");
        if (!content) return `<${tag}${htmlAttrs}>`;
        return `<${tag}${htmlAttrs}>${content}</${tag}>`;
    }
    /**
     * Writes text in the buffer to the summary buffer file and empties buffer. Will append by default.
     *
     * @param {SummaryWriteOptions} [options] (optional) options for write operation
     *
     * @returns {Promise<Summary>} summary instance
     */ write(options) {
        return $6f2d7b1164c79a5f$var$__awaiter(this, void 0, void 0, function*() {
            const overwrite = !!(options === null || options === void 0 ? void 0 : options.overwrite);
            const filePath = yield this.filePath();
            const writeFunc = overwrite ? $6f2d7b1164c79a5f$var$writeFile : $6f2d7b1164c79a5f$var$appendFile;
            yield writeFunc(filePath, this._buffer, {
                encoding: "utf8"
            });
            return this.emptyBuffer();
        });
    }
    /**
     * Clears the summary buffer and wipes the summary file
     *
     * @returns {Summary} summary instance
     */ clear() {
        return $6f2d7b1164c79a5f$var$__awaiter(this, void 0, void 0, function*() {
            return this.emptyBuffer().write({
                overwrite: true
            });
        });
    }
    /**
     * Returns the current summary buffer as a string
     *
     * @returns {string} string of summary buffer
     */ stringify() {
        return this._buffer;
    }
    /**
     * If the summary buffer is empty
     *
     * @returns {boolen} true if the buffer is empty
     */ isEmptyBuffer() {
        return this._buffer.length === 0;
    }
    /**
     * Resets the summary buffer without writing to summary file
     *
     * @returns {Summary} summary instance
     */ emptyBuffer() {
        this._buffer = "";
        return this;
    }
    /**
     * Adds raw text to the summary buffer
     *
     * @param {string} text content to add
     * @param {boolean} [addEOL=false] (optional) append an EOL to the raw text (default: false)
     *
     * @returns {Summary} summary instance
     */ addRaw(text, addEOL = false) {
        this._buffer += text;
        return addEOL ? this.addEOL() : this;
    }
    /**
     * Adds the operating system-specific end-of-line marker to the buffer
     *
     * @returns {Summary} summary instance
     */ addEOL() {
        return this.addRaw($8EjUb$os.EOL);
    }
    /**
     * Adds an HTML codeblock to the summary buffer
     *
     * @param {string} code content to render within fenced code block
     * @param {string} lang (optional) language to syntax highlight code
     *
     * @returns {Summary} summary instance
     */ addCodeBlock(code, lang) {
        const attrs = Object.assign({}, lang && {
            lang: lang
        });
        const element = this.wrap("pre", this.wrap("code", code), attrs);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML list to the summary buffer
     *
     * @param {string[]} items list of items to render
     * @param {boolean} [ordered=false] (optional) if the rendered list should be ordered or not (default: false)
     *
     * @returns {Summary} summary instance
     */ addList(items, ordered = false) {
        const tag = ordered ? "ol" : "ul";
        const listItems = items.map((item)=>this.wrap("li", item)).join("");
        const element = this.wrap(tag, listItems);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML table to the summary buffer
     *
     * @param {SummaryTableCell[]} rows table rows
     *
     * @returns {Summary} summary instance
     */ addTable(rows) {
        const tableBody = rows.map((row)=>{
            const cells = row.map((cell)=>{
                if (typeof cell === "string") return this.wrap("td", cell);
                const { header: header , data: data , colspan: colspan , rowspan: rowspan  } = cell;
                const tag = header ? "th" : "td";
                const attrs = Object.assign(Object.assign({}, colspan && {
                    colspan: colspan
                }), rowspan && {
                    rowspan: rowspan
                });
                return this.wrap(tag, data, attrs);
            }).join("");
            return this.wrap("tr", cells);
        }).join("");
        const element = this.wrap("table", tableBody);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds a collapsable HTML details element to the summary buffer
     *
     * @param {string} label text for the closed state
     * @param {string} content collapsable content
     *
     * @returns {Summary} summary instance
     */ addDetails(label, content) {
        const element = this.wrap("details", this.wrap("summary", label) + content);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML image tag to the summary buffer
     *
     * @param {string} src path to the image you to embed
     * @param {string} alt text description of the image
     * @param {SummaryImageOptions} options (optional) addition image attributes
     *
     * @returns {Summary} summary instance
     */ addImage(src, alt, options) {
        const { width: width , height: height  } = options || {};
        const attrs = Object.assign(Object.assign({}, width && {
            width: width
        }), height && {
            height: height
        });
        const element = this.wrap("img", null, Object.assign({
            src: src,
            alt: alt
        }, attrs));
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML section heading element
     *
     * @param {string} text heading text
     * @param {number | string} [level=1] (optional) the heading level, default: 1
     *
     * @returns {Summary} summary instance
     */ addHeading(text, level) {
        const tag = `h${level}`;
        const allowedTag = [
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6"
        ].includes(tag) ? tag : "h1";
        const element = this.wrap(allowedTag, text);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML thematic break (<hr>) to the summary buffer
     *
     * @returns {Summary} summary instance
     */ addSeparator() {
        const element = this.wrap("hr", null);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML line break (<br>) to the summary buffer
     *
     * @returns {Summary} summary instance
     */ addBreak() {
        const element = this.wrap("br", null);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML blockquote to the summary buffer
     *
     * @param {string} text quote text
     * @param {string} cite (optional) citation url
     *
     * @returns {Summary} summary instance
     */ addQuote(text, cite) {
        const attrs = Object.assign({}, cite && {
            cite: cite
        });
        const element = this.wrap("blockquote", text, attrs);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML anchor tag to the summary buffer
     *
     * @param {string} text link text/content
     * @param {string} href hyperlink
     *
     * @returns {Summary} summary instance
     */ addLink(text, href) {
        const element = this.wrap("a", text, {
            href: href
        });
        return this.addRaw(element).addEOL();
    }
}
const $6f2d7b1164c79a5f$var$_summary = new $6f2d7b1164c79a5f$var$Summary();
/**
 * @deprecated use `core.summary`
 */ module.exports.markdownSummary = $6f2d7b1164c79a5f$var$_summary;
module.exports.summary = $6f2d7b1164c79a5f$var$_summary;

});

parcelRequire.register("f9pag", function(module, exports) {
"use strict";
var $b07b37758132bea8$var$__createBinding = module.exports && module.exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
        enumerable: true,
        get: function() {
            return m[k];
        }
    });
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var $b07b37758132bea8$var$__setModuleDefault = module.exports && module.exports.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var $b07b37758132bea8$var$__importStar = module.exports && module.exports.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.hasOwnProperty.call(mod, k)) $b07b37758132bea8$var$__createBinding(result, mod, k);
    }
    $b07b37758132bea8$var$__setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.toPlatformPath = module.exports.toWin32Path = module.exports.toPosixPath = void 0;

const $b07b37758132bea8$var$path = $b07b37758132bea8$var$__importStar($8EjUb$path);
/**
 * toPosixPath converts the given path to the posix form. On Windows, \\ will be
 * replaced with /.
 *
 * @param pth. Path to transform.
 * @return string Posix path.
 */ function $b07b37758132bea8$var$toPosixPath(pth) {
    return pth.replace(/[\\]/g, "/");
}
module.exports.toPosixPath = $b07b37758132bea8$var$toPosixPath;
/**
 * toWin32Path converts the given path to the win32 form. On Linux, / will be
 * replaced with \\.
 *
 * @param pth. Path to transform.
 * @return string Win32 path.
 */ function $b07b37758132bea8$var$toWin32Path(pth) {
    return pth.replace(/[/]/g, "\\");
}
module.exports.toWin32Path = $b07b37758132bea8$var$toWin32Path;
/**
 * toPlatformPath converts the given path to a platform-specific path. It does
 * this by replacing instances of / and \ with the platform-specific path
 * separator.
 *
 * @param pth The path to platformize.
 * @return string The platform-specific path.
 */ function $b07b37758132bea8$var$toPlatformPath(pth) {
    return pth.replace(/[/\\]/g, $b07b37758132bea8$var$path.sep);
}
module.exports.toPlatformPath = $b07b37758132bea8$var$toPlatformPath;

});


parcelRequire.register("sWwma", function(module, exports) {
"use strict";
var $057002aaeca9713d$var$__createBinding = module.exports && module.exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
        enumerable: true,
        get: function() {
            return m[k];
        }
    });
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var $057002aaeca9713d$var$__setModuleDefault = module.exports && module.exports.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var $057002aaeca9713d$var$__importStar = module.exports && module.exports.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.hasOwnProperty.call(mod, k)) $057002aaeca9713d$var$__createBinding(result, mod, k);
    }
    $057002aaeca9713d$var$__setModuleDefault(result, mod);
    return result;
};
var $057002aaeca9713d$var$__awaiter = module.exports && module.exports.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.getExecOutput = module.exports.exec = void 0;


const $057002aaeca9713d$var$tr = $057002aaeca9713d$var$__importStar((parcelRequire("3q1pa")));
/**
 * Exec a command.
 * Output will be streamed to the live console.
 * Returns promise with return code
 *
 * @param     commandLine        command to execute (can include additional args). Must be correctly escaped.
 * @param     args               optional arguments for tool. Escaping is handled by the lib.
 * @param     options            optional exec options.  See ExecOptions
 * @returns   Promise<number>    exit code
 */ function $057002aaeca9713d$var$exec(commandLine, args, options) {
    return $057002aaeca9713d$var$__awaiter(this, void 0, void 0, function*() {
        const commandArgs = $057002aaeca9713d$var$tr.argStringToArray(commandLine);
        if (commandArgs.length === 0) throw new Error(`Parameter 'commandLine' cannot be null or empty.`);
        // Path to tool to execute should be first arg
        const toolPath = commandArgs[0];
        args = commandArgs.slice(1).concat(args || []);
        const runner = new $057002aaeca9713d$var$tr.ToolRunner(toolPath, args, options);
        return runner.exec();
    });
}
module.exports.exec = $057002aaeca9713d$var$exec;
/**
 * Exec a command and get the output.
 * Output will be streamed to the live console.
 * Returns promise with the exit code and collected stdout and stderr
 *
 * @param     commandLine           command to execute (can include additional args). Must be correctly escaped.
 * @param     args                  optional arguments for tool. Escaping is handled by the lib.
 * @param     options               optional exec options.  See ExecOptions
 * @returns   Promise<ExecOutput>   exit code, stdout, and stderr
 */ function $057002aaeca9713d$var$getExecOutput(commandLine, args, options) {
    var _a, _b;
    return $057002aaeca9713d$var$__awaiter(this, void 0, void 0, function*() {
        let stdout = "";
        let stderr = "";
        //Using string decoder covers the case where a mult-byte character is split
        const stdoutDecoder = new $8EjUb$string_decoder.StringDecoder("utf8");
        const stderrDecoder = new $8EjUb$string_decoder.StringDecoder("utf8");
        const originalStdoutListener = (_a = options === null || options === void 0 ? void 0 : options.listeners) === null || _a === void 0 ? void 0 : _a.stdout;
        const originalStdErrListener = (_b = options === null || options === void 0 ? void 0 : options.listeners) === null || _b === void 0 ? void 0 : _b.stderr;
        const stdErrListener = (data)=>{
            stderr += stderrDecoder.write(data);
            if (originalStdErrListener) originalStdErrListener(data);
        };
        const stdOutListener = (data)=>{
            stdout += stdoutDecoder.write(data);
            if (originalStdoutListener) originalStdoutListener(data);
        };
        const listeners = Object.assign(Object.assign({}, options === null || options === void 0 ? void 0 : options.listeners), {
            stdout: stdOutListener,
            stderr: stdErrListener
        });
        const exitCode = yield $057002aaeca9713d$var$exec(commandLine, args, Object.assign(Object.assign({}, options), {
            listeners: listeners
        }));
        //flush any remaining characters
        stdout += stdoutDecoder.end();
        stderr += stderrDecoder.end();
        return {
            exitCode: exitCode,
            stdout: stdout,
            stderr: stderr
        };
    });
}
module.exports.getExecOutput = $057002aaeca9713d$var$getExecOutput;

});
parcelRequire.register("3q1pa", function(module, exports) {
"use strict";
var $27d4e3cc602253c0$var$__createBinding = module.exports && module.exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
        enumerable: true,
        get: function() {
            return m[k];
        }
    });
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var $27d4e3cc602253c0$var$__setModuleDefault = module.exports && module.exports.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var $27d4e3cc602253c0$var$__importStar = module.exports && module.exports.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.hasOwnProperty.call(mod, k)) $27d4e3cc602253c0$var$__createBinding(result, mod, k);
    }
    $27d4e3cc602253c0$var$__setModuleDefault(result, mod);
    return result;
};
var $27d4e3cc602253c0$var$__awaiter = module.exports && module.exports.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.argStringToArray = module.exports.ToolRunner = void 0;

const $27d4e3cc602253c0$var$os = $27d4e3cc602253c0$var$__importStar($8EjUb$os);

const $27d4e3cc602253c0$var$events = $27d4e3cc602253c0$var$__importStar($8EjUb$events);

const $27d4e3cc602253c0$var$child = $27d4e3cc602253c0$var$__importStar($8EjUb$child_process);

const $27d4e3cc602253c0$var$path = $27d4e3cc602253c0$var$__importStar($8EjUb$path);

const $27d4e3cc602253c0$var$io = $27d4e3cc602253c0$var$__importStar((parcelRequire("7RiDB")));

const $27d4e3cc602253c0$var$ioUtil = $27d4e3cc602253c0$var$__importStar((parcelRequire("6DqRQ")));

/* eslint-disable @typescript-eslint/unbound-method */ const $27d4e3cc602253c0$var$IS_WINDOWS = process.platform === "win32";
/*
 * Class for running command line tools. Handles quoting and arg parsing in a platform agnostic way.
 */ class $27d4e3cc602253c0$var$ToolRunner extends $27d4e3cc602253c0$var$events.EventEmitter {
    constructor(toolPath, args, options){
        super();
        if (!toolPath) throw new Error("Parameter 'toolPath' cannot be null or empty.");
        this.toolPath = toolPath;
        this.args = args || [];
        this.options = options || {};
    }
    _debug(message) {
        if (this.options.listeners && this.options.listeners.debug) this.options.listeners.debug(message);
    }
    _getCommandString(options, noPrefix) {
        const toolPath = this._getSpawnFileName();
        const args = this._getSpawnArgs(options);
        let cmd = noPrefix ? "" : "[command]"; // omit prefix when piped to a second tool
        if ($27d4e3cc602253c0$var$IS_WINDOWS) {
            // Windows + cmd file
            if (this._isCmdFile()) {
                cmd += toolPath;
                for (const a of args)cmd += ` ${a}`;
            } else if (options.windowsVerbatimArguments) {
                cmd += `"${toolPath}"`;
                for (const a of args)cmd += ` ${a}`;
            } else {
                cmd += this._windowsQuoteCmdArg(toolPath);
                for (const a of args)cmd += ` ${this._windowsQuoteCmdArg(a)}`;
            }
        } else {
            // OSX/Linux - this can likely be improved with some form of quoting.
            // creating processes on Unix is fundamentally different than Windows.
            // on Unix, execvp() takes an arg array.
            cmd += toolPath;
            for (const a of args)cmd += ` ${a}`;
        }
        return cmd;
    }
    _processLineBuffer(data, strBuffer, onLine) {
        try {
            let s = strBuffer + data.toString();
            let n = s.indexOf($27d4e3cc602253c0$var$os.EOL);
            while(n > -1){
                const line = s.substring(0, n);
                onLine(line);
                // the rest of the string ...
                s = s.substring(n + $27d4e3cc602253c0$var$os.EOL.length);
                n = s.indexOf($27d4e3cc602253c0$var$os.EOL);
            }
            return s;
        } catch (err) {
            // streaming lines to console is best effort.  Don't fail a build.
            this._debug(`error processing line. Failed with error ${err}`);
            return "";
        }
    }
    _getSpawnFileName() {
        if ($27d4e3cc602253c0$var$IS_WINDOWS) {
            if (this._isCmdFile()) return process.env["COMSPEC"] || "cmd.exe";
        }
        return this.toolPath;
    }
    _getSpawnArgs(options) {
        if ($27d4e3cc602253c0$var$IS_WINDOWS) {
            if (this._isCmdFile()) {
                let argline = `/D /S /C "${this._windowsQuoteCmdArg(this.toolPath)}`;
                for (const a of this.args){
                    argline += " ";
                    argline += options.windowsVerbatimArguments ? a : this._windowsQuoteCmdArg(a);
                }
                argline += '"';
                return [
                    argline
                ];
            }
        }
        return this.args;
    }
    _endsWith(str, end) {
        return str.endsWith(end);
    }
    _isCmdFile() {
        const upperToolPath = this.toolPath.toUpperCase();
        return this._endsWith(upperToolPath, ".CMD") || this._endsWith(upperToolPath, ".BAT");
    }
    _windowsQuoteCmdArg(arg) {
        // for .exe, apply the normal quoting rules that libuv applies
        if (!this._isCmdFile()) return this._uvQuoteCmdArg(arg);
        // otherwise apply quoting rules specific to the cmd.exe command line parser.
        // the libuv rules are generic and are not designed specifically for cmd.exe
        // command line parser.
        //
        // for a detailed description of the cmd.exe command line parser, refer to
        // http://stackoverflow.com/questions/4094699/how-does-the-windows-command-interpreter-cmd-exe-parse-scripts/7970912#7970912
        // need quotes for empty arg
        if (!arg) return '""';
        // determine whether the arg needs to be quoted
        const cmdSpecialChars = [
            " ",
            "	",
            "&",
            "(",
            ")",
            "[",
            "]",
            "{",
            "}",
            "^",
            "=",
            ";",
            "!",
            "'",
            "+",
            ",",
            "`",
            "~",
            "|",
            "<",
            ">",
            '"'
        ];
        let needsQuotes = false;
        for (const char of arg)if (cmdSpecialChars.some((x)=>x === char)) {
            needsQuotes = true;
            break;
        }
        // short-circuit if quotes not needed
        if (!needsQuotes) return arg;
        // the following quoting rules are very similar to the rules that by libuv applies.
        //
        // 1) wrap the string in quotes
        //
        // 2) double-up quotes - i.e. " => ""
        //
        //    this is different from the libuv quoting rules. libuv replaces " with \", which unfortunately
        //    doesn't work well with a cmd.exe command line.
        //
        //    note, replacing " with "" also works well if the arg is passed to a downstream .NET console app.
        //    for example, the command line:
        //          foo.exe "myarg:""my val"""
        //    is parsed by a .NET console app into an arg array:
        //          [ "myarg:\"my val\"" ]
        //    which is the same end result when applying libuv quoting rules. although the actual
        //    command line from libuv quoting rules would look like:
        //          foo.exe "myarg:\"my val\""
        //
        // 3) double-up slashes that precede a quote,
        //    e.g.  hello \world    => "hello \world"
        //          hello\"world    => "hello\\""world"
        //          hello\\"world   => "hello\\\\""world"
        //          hello world\    => "hello world\\"
        //
        //    technically this is not required for a cmd.exe command line, or the batch argument parser.
        //    the reasons for including this as a .cmd quoting rule are:
        //
        //    a) this is optimized for the scenario where the argument is passed from the .cmd file to an
        //       external program. many programs (e.g. .NET console apps) rely on the slash-doubling rule.
        //
        //    b) it's what we've been doing previously (by deferring to node default behavior) and we
        //       haven't heard any complaints about that aspect.
        //
        // note, a weakness of the quoting rules chosen here, is that % is not escaped. in fact, % cannot be
        // escaped when used on the command line directly - even though within a .cmd file % can be escaped
        // by using %%.
        //
        // the saving grace is, on the command line, %var% is left as-is if var is not defined. this contrasts
        // the line parsing rules within a .cmd file, where if var is not defined it is replaced with nothing.
        //
        // one option that was explored was replacing % with ^% - i.e. %var% => ^%var^%. this hack would
        // often work, since it is unlikely that var^ would exist, and the ^ character is removed when the
        // variable is used. the problem, however, is that ^ is not removed when %* is used to pass the args
        // to an external program.
        //
        // an unexplored potential solution for the % escaping problem, is to create a wrapper .cmd file.
        // % can be escaped within a .cmd file.
        let reverse = '"';
        let quoteHit = true;
        for(let i = arg.length; i > 0; i--){
            // walk the string in reverse
            reverse += arg[i - 1];
            if (quoteHit && arg[i - 1] === "\\") reverse += "\\"; // double the slash
            else if (arg[i - 1] === '"') {
                quoteHit = true;
                reverse += '"'; // double the quote
            } else quoteHit = false;
        }
        reverse += '"';
        return reverse.split("").reverse().join("");
    }
    _uvQuoteCmdArg(arg) {
        // Tool runner wraps child_process.spawn() and needs to apply the same quoting as
        // Node in certain cases where the undocumented spawn option windowsVerbatimArguments
        // is used.
        //
        // Since this function is a port of quote_cmd_arg from Node 4.x (technically, lib UV,
        // see https://github.com/nodejs/node/blob/v4.x/deps/uv/src/win/process.c for details),
        // pasting copyright notice from Node within this function:
        //
        //      Copyright Joyent, Inc. and other Node contributors. All rights reserved.
        //
        //      Permission is hereby granted, free of charge, to any person obtaining a copy
        //      of this software and associated documentation files (the "Software"), to
        //      deal in the Software without restriction, including without limitation the
        //      rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
        //      sell copies of the Software, and to permit persons to whom the Software is
        //      furnished to do so, subject to the following conditions:
        //
        //      The above copyright notice and this permission notice shall be included in
        //      all copies or substantial portions of the Software.
        //
        //      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
        //      IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
        //      FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
        //      AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
        //      LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
        //      FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
        //      IN THE SOFTWARE.
        if (!arg) // Need double quotation for empty argument
        return '""';
        if (!arg.includes(" ") && !arg.includes("	") && !arg.includes('"')) // No quotation needed
        return arg;
        if (!arg.includes('"') && !arg.includes("\\")) // No embedded double quotes or backslashes, so I can just wrap
        // quote marks around the whole thing.
        return `"${arg}"`;
        // Expected input/output:
        //   input : hello"world
        //   output: "hello\"world"
        //   input : hello""world
        //   output: "hello\"\"world"
        //   input : hello\world
        //   output: hello\world
        //   input : hello\\world
        //   output: hello\\world
        //   input : hello\"world
        //   output: "hello\\\"world"
        //   input : hello\\"world
        //   output: "hello\\\\\"world"
        //   input : hello world\
        //   output: "hello world\\" - note the comment in libuv actually reads "hello world\"
        //                             but it appears the comment is wrong, it should be "hello world\\"
        let reverse = '"';
        let quoteHit = true;
        for(let i = arg.length; i > 0; i--){
            // walk the string in reverse
            reverse += arg[i - 1];
            if (quoteHit && arg[i - 1] === "\\") reverse += "\\";
            else if (arg[i - 1] === '"') {
                quoteHit = true;
                reverse += "\\";
            } else quoteHit = false;
        }
        reverse += '"';
        return reverse.split("").reverse().join("");
    }
    _cloneExecOptions(options) {
        options = options || {};
        const result = {
            cwd: options.cwd || process.cwd(),
            env: options.env || process.env,
            silent: options.silent || false,
            windowsVerbatimArguments: options.windowsVerbatimArguments || false,
            failOnStdErr: options.failOnStdErr || false,
            ignoreReturnCode: options.ignoreReturnCode || false,
            delay: options.delay || 10000
        };
        result.outStream = options.outStream || process.stdout;
        result.errStream = options.errStream || process.stderr;
        return result;
    }
    _getSpawnOptions(options, toolPath) {
        options = options || {};
        const result = {};
        result.cwd = options.cwd;
        result.env = options.env;
        result["windowsVerbatimArguments"] = options.windowsVerbatimArguments || this._isCmdFile();
        if (options.windowsVerbatimArguments) result.argv0 = `"${toolPath}"`;
        return result;
    }
    /**
     * Exec a tool.
     * Output will be streamed to the live console.
     * Returns promise with return code
     *
     * @param     tool     path to tool to exec
     * @param     options  optional exec options.  See ExecOptions
     * @returns   number
     */ exec() {
        return $27d4e3cc602253c0$var$__awaiter(this, void 0, void 0, function*() {
            // root the tool path if it is unrooted and contains relative pathing
            if (!$27d4e3cc602253c0$var$ioUtil.isRooted(this.toolPath) && (this.toolPath.includes("/") || $27d4e3cc602253c0$var$IS_WINDOWS && this.toolPath.includes("\\"))) // prefer options.cwd if it is specified, however options.cwd may also need to be rooted
            this.toolPath = $27d4e3cc602253c0$var$path.resolve(process.cwd(), this.options.cwd || process.cwd(), this.toolPath);
            // if the tool is only a file name, then resolve it from the PATH
            // otherwise verify it exists (add extension on Windows if necessary)
            this.toolPath = yield $27d4e3cc602253c0$var$io.which(this.toolPath, true);
            return new Promise((resolve, reject)=>$27d4e3cc602253c0$var$__awaiter(this, void 0, void 0, function*() {
                    this._debug(`exec tool: ${this.toolPath}`);
                    this._debug("arguments:");
                    for (const arg of this.args)this._debug(`   ${arg}`);
                    const optionsNonNull = this._cloneExecOptions(this.options);
                    if (!optionsNonNull.silent && optionsNonNull.outStream) optionsNonNull.outStream.write(this._getCommandString(optionsNonNull) + $27d4e3cc602253c0$var$os.EOL);
                    const state = new $27d4e3cc602253c0$var$ExecState(optionsNonNull, this.toolPath);
                    state.on("debug", (message)=>{
                        this._debug(message);
                    });
                    if (this.options.cwd && !(yield $27d4e3cc602253c0$var$ioUtil.exists(this.options.cwd))) return reject(new Error(`The cwd: ${this.options.cwd} does not exist!`));
                    const fileName = this._getSpawnFileName();
                    const cp = $27d4e3cc602253c0$var$child.spawn(fileName, this._getSpawnArgs(optionsNonNull), this._getSpawnOptions(this.options, fileName));
                    let stdbuffer = "";
                    if (cp.stdout) cp.stdout.on("data", (data)=>{
                        if (this.options.listeners && this.options.listeners.stdout) this.options.listeners.stdout(data);
                        if (!optionsNonNull.silent && optionsNonNull.outStream) optionsNonNull.outStream.write(data);
                        stdbuffer = this._processLineBuffer(data, stdbuffer, (line)=>{
                            if (this.options.listeners && this.options.listeners.stdline) this.options.listeners.stdline(line);
                        });
                    });
                    let errbuffer = "";
                    if (cp.stderr) cp.stderr.on("data", (data)=>{
                        state.processStderr = true;
                        if (this.options.listeners && this.options.listeners.stderr) this.options.listeners.stderr(data);
                        if (!optionsNonNull.silent && optionsNonNull.errStream && optionsNonNull.outStream) {
                            const s = optionsNonNull.failOnStdErr ? optionsNonNull.errStream : optionsNonNull.outStream;
                            s.write(data);
                        }
                        errbuffer = this._processLineBuffer(data, errbuffer, (line)=>{
                            if (this.options.listeners && this.options.listeners.errline) this.options.listeners.errline(line);
                        });
                    });
                    cp.on("error", (err)=>{
                        state.processError = err.message;
                        state.processExited = true;
                        state.processClosed = true;
                        state.CheckComplete();
                    });
                    cp.on("exit", (code)=>{
                        state.processExitCode = code;
                        state.processExited = true;
                        this._debug(`Exit code ${code} received from tool '${this.toolPath}'`);
                        state.CheckComplete();
                    });
                    cp.on("close", (code)=>{
                        state.processExitCode = code;
                        state.processExited = true;
                        state.processClosed = true;
                        this._debug(`STDIO streams have closed for tool '${this.toolPath}'`);
                        state.CheckComplete();
                    });
                    state.on("done", (error, exitCode)=>{
                        if (stdbuffer.length > 0) this.emit("stdline", stdbuffer);
                        if (errbuffer.length > 0) this.emit("errline", errbuffer);
                        cp.removeAllListeners();
                        if (error) reject(error);
                        else resolve(exitCode);
                    });
                    if (this.options.input) {
                        if (!cp.stdin) throw new Error("child process missing stdin");
                        cp.stdin.end(this.options.input);
                    }
                }));
        });
    }
}
module.exports.ToolRunner = $27d4e3cc602253c0$var$ToolRunner;
/**
 * Convert an arg string to an array of args. Handles escaping
 *
 * @param    argString   string of arguments
 * @returns  string[]    array of arguments
 */ function $27d4e3cc602253c0$var$argStringToArray(argString) {
    const args = [];
    let inQuotes = false;
    let escaped = false;
    let arg = "";
    function append(c) {
        // we only escape double quotes.
        if (escaped && c !== '"') arg += "\\";
        arg += c;
        escaped = false;
    }
    for(let i = 0; i < argString.length; i++){
        const c = argString.charAt(i);
        if (c === '"') {
            if (!escaped) inQuotes = !inQuotes;
            else append(c);
            continue;
        }
        if (c === "\\" && escaped) {
            append(c);
            continue;
        }
        if (c === "\\" && inQuotes) {
            escaped = true;
            continue;
        }
        if (c === " " && !inQuotes) {
            if (arg.length > 0) {
                args.push(arg);
                arg = "";
            }
            continue;
        }
        append(c);
    }
    if (arg.length > 0) args.push(arg.trim());
    return args;
}
module.exports.argStringToArray = $27d4e3cc602253c0$var$argStringToArray;
class $27d4e3cc602253c0$var$ExecState extends $27d4e3cc602253c0$var$events.EventEmitter {
    constructor(options, toolPath){
        super();
        this.processClosed = false; // tracks whether the process has exited and stdio is closed
        this.processError = "";
        this.processExitCode = 0;
        this.processExited = false; // tracks whether the process has exited
        this.processStderr = false; // tracks whether stderr was written to
        this.delay = 10000; // 10 seconds
        this.done = false;
        this.timeout = null;
        if (!toolPath) throw new Error("toolPath must not be empty");
        this.options = options;
        this.toolPath = toolPath;
        if (options.delay) this.delay = options.delay;
    }
    CheckComplete() {
        if (this.done) return;
        if (this.processClosed) this._setResult();
        else if (this.processExited) this.timeout = $8EjUb$timers.setTimeout($27d4e3cc602253c0$var$ExecState.HandleTimeout, this.delay, this);
    }
    _debug(message) {
        this.emit("debug", message);
    }
    _setResult() {
        // determine whether there is an error
        let error;
        if (this.processExited) {
            if (this.processError) error = new Error(`There was an error when attempting to execute the process '${this.toolPath}'. This may indicate the process failed to start. Error: ${this.processError}`);
            else if (this.processExitCode !== 0 && !this.options.ignoreReturnCode) error = new Error(`The process '${this.toolPath}' failed with exit code ${this.processExitCode}`);
            else if (this.processStderr && this.options.failOnStdErr) error = new Error(`The process '${this.toolPath}' failed because one or more lines were written to the STDERR stream`);
        }
        // clear the timeout
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
        this.done = true;
        this.emit("done", error, this.processExitCode);
    }
    static HandleTimeout(state) {
        if (state.done) return;
        if (!state.processClosed && state.processExited) {
            const message = `The STDIO streams did not close within ${state.delay / 1000} seconds of the exit event from process '${state.toolPath}'. This may indicate a child process inherited the STDIO streams and has not yet exited.`;
            state._debug(message);
        }
        state._setResult();
    }
}

});
parcelRequire.register("7RiDB", function(module, exports) {
"use strict";
var $5b8bf0b684021e0a$var$__awaiter = module.exports && module.exports.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var $5b8bf0b684021e0a$var$__importStar = module.exports && module.exports.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    }
    result["default"] = mod;
    return result;
};
Object.defineProperty(module.exports, "__esModule", {
    value: true
});

const $5b8bf0b684021e0a$var$childProcess = $5b8bf0b684021e0a$var$__importStar($8EjUb$child_process);

const $5b8bf0b684021e0a$var$path = $5b8bf0b684021e0a$var$__importStar($8EjUb$path);


const $5b8bf0b684021e0a$var$ioUtil = $5b8bf0b684021e0a$var$__importStar((parcelRequire("6DqRQ")));
const $5b8bf0b684021e0a$var$exec = $8EjUb$util.promisify($5b8bf0b684021e0a$var$childProcess.exec);
/**
 * Copies a file or folder.
 * Based off of shelljs - https://github.com/shelljs/shelljs/blob/9237f66c52e5daa40458f94f9565e18e8132f5a6/src/cp.js
 *
 * @param     source    source path
 * @param     dest      destination path
 * @param     options   optional. See CopyOptions.
 */ function $5b8bf0b684021e0a$var$cp(source, dest, options = {}) {
    return $5b8bf0b684021e0a$var$__awaiter(this, void 0, void 0, function*() {
        const { force: force , recursive: recursive  } = $5b8bf0b684021e0a$var$readCopyOptions(options);
        const destStat = (yield $5b8bf0b684021e0a$var$ioUtil.exists(dest)) ? yield $5b8bf0b684021e0a$var$ioUtil.stat(dest) : null;
        // Dest is an existing file, but not forcing
        if (destStat && destStat.isFile() && !force) return;
        // If dest is an existing directory, should copy inside.
        const newDest = destStat && destStat.isDirectory() ? $5b8bf0b684021e0a$var$path.join(dest, $5b8bf0b684021e0a$var$path.basename(source)) : dest;
        if (!(yield $5b8bf0b684021e0a$var$ioUtil.exists(source))) throw new Error(`no such file or directory: ${source}`);
        const sourceStat = yield $5b8bf0b684021e0a$var$ioUtil.stat(source);
        if (sourceStat.isDirectory()) {
            if (!recursive) throw new Error(`Failed to copy. ${source} is a directory, but tried to copy without recursive flag.`);
            else yield $5b8bf0b684021e0a$var$cpDirRecursive(source, newDest, 0, force);
        } else {
            if ($5b8bf0b684021e0a$var$path.relative(source, newDest) === "") // a file cannot be copied to itself
            throw new Error(`'${newDest}' and '${source}' are the same file`);
            yield $5b8bf0b684021e0a$var$copyFile(source, newDest, force);
        }
    });
}
module.exports.cp = $5b8bf0b684021e0a$var$cp;
/**
 * Moves a path.
 *
 * @param     source    source path
 * @param     dest      destination path
 * @param     options   optional. See MoveOptions.
 */ function $5b8bf0b684021e0a$var$mv(source, dest, options = {}) {
    return $5b8bf0b684021e0a$var$__awaiter(this, void 0, void 0, function*() {
        if (yield $5b8bf0b684021e0a$var$ioUtil.exists(dest)) {
            let destExists = true;
            if (yield $5b8bf0b684021e0a$var$ioUtil.isDirectory(dest)) {
                // If dest is directory copy src into dest
                dest = $5b8bf0b684021e0a$var$path.join(dest, $5b8bf0b684021e0a$var$path.basename(source));
                destExists = yield $5b8bf0b684021e0a$var$ioUtil.exists(dest);
            }
            if (destExists) {
                if (options.force == null || options.force) yield $5b8bf0b684021e0a$var$rmRF(dest);
                else throw new Error("Destination already exists");
            }
        }
        yield $5b8bf0b684021e0a$var$mkdirP($5b8bf0b684021e0a$var$path.dirname(dest));
        yield $5b8bf0b684021e0a$var$ioUtil.rename(source, dest);
    });
}
module.exports.mv = $5b8bf0b684021e0a$var$mv;
/**
 * Remove a path recursively with force
 *
 * @param inputPath path to remove
 */ function $5b8bf0b684021e0a$var$rmRF(inputPath) {
    return $5b8bf0b684021e0a$var$__awaiter(this, void 0, void 0, function*() {
        if ($5b8bf0b684021e0a$var$ioUtil.IS_WINDOWS) {
            // Node doesn't provide a delete operation, only an unlink function. This means that if the file is being used by another
            // program (e.g. antivirus), it won't be deleted. To address this, we shell out the work to rd/del.
            try {
                if (yield $5b8bf0b684021e0a$var$ioUtil.isDirectory(inputPath, true)) yield $5b8bf0b684021e0a$var$exec(`rd /s /q "${inputPath}"`);
                else yield $5b8bf0b684021e0a$var$exec(`del /f /a "${inputPath}"`);
            } catch (err) {
                // if you try to delete a file that doesn't exist, desired result is achieved
                // other errors are valid
                if (err.code !== "ENOENT") throw err;
            }
            // Shelling out fails to remove a symlink folder with missing source, this unlink catches that
            try {
                yield $5b8bf0b684021e0a$var$ioUtil.unlink(inputPath);
            } catch (err) {
                // if you try to delete a file that doesn't exist, desired result is achieved
                // other errors are valid
                if (err.code !== "ENOENT") throw err;
            }
        } else {
            let isDir = false;
            try {
                isDir = yield $5b8bf0b684021e0a$var$ioUtil.isDirectory(inputPath);
            } catch (err) {
                // if you try to delete a file that doesn't exist, desired result is achieved
                // other errors are valid
                if (err.code !== "ENOENT") throw err;
                return;
            }
            if (isDir) yield $5b8bf0b684021e0a$var$exec(`rm -rf "${inputPath}"`);
            else yield $5b8bf0b684021e0a$var$ioUtil.unlink(inputPath);
        }
    });
}
module.exports.rmRF = $5b8bf0b684021e0a$var$rmRF;
/**
 * Make a directory.  Creates the full path with folders in between
 * Will throw if it fails
 *
 * @param   fsPath        path to create
 * @returns Promise<void>
 */ function $5b8bf0b684021e0a$var$mkdirP(fsPath) {
    return $5b8bf0b684021e0a$var$__awaiter(this, void 0, void 0, function*() {
        yield $5b8bf0b684021e0a$var$ioUtil.mkdirP(fsPath);
    });
}
module.exports.mkdirP = $5b8bf0b684021e0a$var$mkdirP;
/**
 * Returns path of a tool had the tool actually been invoked.  Resolves via paths.
 * If you check and the tool does not exist, it will throw.
 *
 * @param     tool              name of the tool
 * @param     check             whether to check if tool exists
 * @returns   Promise<string>   path to tool
 */ function $5b8bf0b684021e0a$var$which(tool, check) {
    return $5b8bf0b684021e0a$var$__awaiter(this, void 0, void 0, function*() {
        if (!tool) throw new Error("parameter 'tool' is required");
        // recursive when check=true
        if (check) {
            const result = yield $5b8bf0b684021e0a$var$which(tool, false);
            if (!result) {
                if ($5b8bf0b684021e0a$var$ioUtil.IS_WINDOWS) throw new Error(`Unable to locate executable file: ${tool}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also verify the file has a valid extension for an executable file.`);
                else throw new Error(`Unable to locate executable file: ${tool}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also check the file mode to verify the file is executable.`);
            }
            return result;
        }
        const matches = yield $5b8bf0b684021e0a$var$findInPath(tool);
        if (matches && matches.length > 0) return matches[0];
        return "";
    });
}
module.exports.which = $5b8bf0b684021e0a$var$which;
/**
 * Returns a list of all occurrences of the given tool on the system path.
 *
 * @returns   Promise<string[]>  the paths of the tool
 */ function $5b8bf0b684021e0a$var$findInPath(tool) {
    return $5b8bf0b684021e0a$var$__awaiter(this, void 0, void 0, function*() {
        if (!tool) throw new Error("parameter 'tool' is required");
        // build the list of extensions to try
        const extensions = [];
        if ($5b8bf0b684021e0a$var$ioUtil.IS_WINDOWS && process.env["PATHEXT"]) {
            for (const extension of process.env["PATHEXT"].split($5b8bf0b684021e0a$var$path.delimiter))if (extension) extensions.push(extension);
        }
        // if it's rooted, return it if exists. otherwise return empty.
        if ($5b8bf0b684021e0a$var$ioUtil.isRooted(tool)) {
            const filePath = yield $5b8bf0b684021e0a$var$ioUtil.tryGetExecutablePath(tool, extensions);
            if (filePath) return [
                filePath
            ];
            return [];
        }
        // if any path separators, return empty
        if (tool.includes($5b8bf0b684021e0a$var$path.sep)) return [];
        // build the list of directories
        //
        // Note, technically "where" checks the current directory on Windows. From a toolkit perspective,
        // it feels like we should not do this. Checking the current directory seems like more of a use
        // case of a shell, and the which() function exposed by the toolkit should strive for consistency
        // across platforms.
        const directories = [];
        if (process.env.PATH) {
            for (const p of process.env.PATH.split($5b8bf0b684021e0a$var$path.delimiter))if (p) directories.push(p);
        }
        // find all matches
        const matches = [];
        for (const directory of directories){
            const filePath = yield $5b8bf0b684021e0a$var$ioUtil.tryGetExecutablePath($5b8bf0b684021e0a$var$path.join(directory, tool), extensions);
            if (filePath) matches.push(filePath);
        }
        return matches;
    });
}
module.exports.findInPath = $5b8bf0b684021e0a$var$findInPath;
function $5b8bf0b684021e0a$var$readCopyOptions(options) {
    const force = options.force == null ? true : options.force;
    const recursive = Boolean(options.recursive);
    return {
        force: force,
        recursive: recursive
    };
}
function $5b8bf0b684021e0a$var$cpDirRecursive(sourceDir, destDir, currentDepth, force) {
    return $5b8bf0b684021e0a$var$__awaiter(this, void 0, void 0, function*() {
        // Ensure there is not a run away recursive copy
        if (currentDepth >= 255) return;
        currentDepth++;
        yield $5b8bf0b684021e0a$var$mkdirP(destDir);
        const files = yield $5b8bf0b684021e0a$var$ioUtil.readdir(sourceDir);
        for (const fileName of files){
            const srcFile = `${sourceDir}/${fileName}`;
            const destFile = `${destDir}/${fileName}`;
            const srcFileStat = yield $5b8bf0b684021e0a$var$ioUtil.lstat(srcFile);
            if (srcFileStat.isDirectory()) // Recurse
            yield $5b8bf0b684021e0a$var$cpDirRecursive(srcFile, destFile, currentDepth, force);
            else yield $5b8bf0b684021e0a$var$copyFile(srcFile, destFile, force);
        }
        // Change the mode for the newly created directory
        yield $5b8bf0b684021e0a$var$ioUtil.chmod(destDir, (yield $5b8bf0b684021e0a$var$ioUtil.stat(sourceDir)).mode);
    });
}
// Buffered file copy
function $5b8bf0b684021e0a$var$copyFile(srcFile, destFile, force) {
    return $5b8bf0b684021e0a$var$__awaiter(this, void 0, void 0, function*() {
        if ((yield $5b8bf0b684021e0a$var$ioUtil.lstat(srcFile)).isSymbolicLink()) {
            // unlink/re-link it
            try {
                yield $5b8bf0b684021e0a$var$ioUtil.lstat(destFile);
                yield $5b8bf0b684021e0a$var$ioUtil.unlink(destFile);
            } catch (e) {
                // Try to override file permission
                if (e.code === "EPERM") {
                    yield $5b8bf0b684021e0a$var$ioUtil.chmod(destFile, "0666");
                    yield $5b8bf0b684021e0a$var$ioUtil.unlink(destFile);
                }
            // other errors = it doesn't exist, no work to do
            }
            // Copy over symlink
            const symlinkFull = yield $5b8bf0b684021e0a$var$ioUtil.readlink(srcFile);
            yield $5b8bf0b684021e0a$var$ioUtil.symlink(symlinkFull, destFile, $5b8bf0b684021e0a$var$ioUtil.IS_WINDOWS ? "junction" : null);
        } else if (!(yield $5b8bf0b684021e0a$var$ioUtil.exists(destFile)) || force) yield $5b8bf0b684021e0a$var$ioUtil.copyFile(srcFile, destFile);
    });
}

});
parcelRequire.register("6DqRQ", function(module, exports) {
"use strict";
var $4d4b39e7e3cca916$var$__awaiter = module.exports && module.exports.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var $4d4b39e7e3cca916$var$__importStar = module.exports && module.exports.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    }
    result["default"] = mod;
    return result;
};
var $4d4b39e7e3cca916$var$_a;
Object.defineProperty(module.exports, "__esModule", {
    value: true
});


const $4d4b39e7e3cca916$var$fs = $4d4b39e7e3cca916$var$__importStar($8EjUb$fs);

const $4d4b39e7e3cca916$var$path = $4d4b39e7e3cca916$var$__importStar($8EjUb$path);
$4d4b39e7e3cca916$var$_a = $4d4b39e7e3cca916$var$fs.promises, module.exports.chmod = $4d4b39e7e3cca916$var$_a.chmod, module.exports.copyFile = $4d4b39e7e3cca916$var$_a.copyFile, module.exports.lstat = $4d4b39e7e3cca916$var$_a.lstat, module.exports.mkdir = $4d4b39e7e3cca916$var$_a.mkdir, module.exports.readdir = $4d4b39e7e3cca916$var$_a.readdir, module.exports.readlink = $4d4b39e7e3cca916$var$_a.readlink, module.exports.rename = $4d4b39e7e3cca916$var$_a.rename, module.exports.rmdir = $4d4b39e7e3cca916$var$_a.rmdir, module.exports.stat = $4d4b39e7e3cca916$var$_a.stat, module.exports.symlink = $4d4b39e7e3cca916$var$_a.symlink, module.exports.unlink = $4d4b39e7e3cca916$var$_a.unlink;
module.exports.IS_WINDOWS = process.platform === "win32";
function $4d4b39e7e3cca916$var$exists(fsPath) {
    return $4d4b39e7e3cca916$var$__awaiter(this, void 0, void 0, function*() {
        try {
            yield module.exports.stat(fsPath);
        } catch (err) {
            if (err.code === "ENOENT") return false;
            throw err;
        }
        return true;
    });
}
module.exports.exists = $4d4b39e7e3cca916$var$exists;
function $4d4b39e7e3cca916$var$isDirectory(fsPath, useStat = false) {
    return $4d4b39e7e3cca916$var$__awaiter(this, void 0, void 0, function*() {
        const stats = useStat ? yield module.exports.stat(fsPath) : yield module.exports.lstat(fsPath);
        return stats.isDirectory();
    });
}
module.exports.isDirectory = $4d4b39e7e3cca916$var$isDirectory;
/**
 * On OSX/Linux, true if path starts with '/'. On Windows, true for paths like:
 * \, \hello, \\hello\share, C:, and C:\hello (and corresponding alternate separator cases).
 */ function $4d4b39e7e3cca916$var$isRooted(p) {
    p = $4d4b39e7e3cca916$var$normalizeSeparators(p);
    if (!p) throw new Error('isRooted() parameter "p" cannot be empty');
    if (module.exports.IS_WINDOWS) return p.startsWith("\\") || /^[A-Z]:/i.test(p) // e.g. \ or \hello or \\hello
    ; // e.g. C: or C:\hello
    return p.startsWith("/");
}
module.exports.isRooted = $4d4b39e7e3cca916$var$isRooted;
/**
 * Recursively create a directory at `fsPath`.
 *
 * This implementation is optimistic, meaning it attempts to create the full
 * path first, and backs up the path stack from there.
 *
 * @param fsPath The path to create
 * @param maxDepth The maximum recursion depth
 * @param depth The current recursion depth
 */ function $4d4b39e7e3cca916$var$mkdirP(fsPath, maxDepth = 1000, depth = 1) {
    return $4d4b39e7e3cca916$var$__awaiter(this, void 0, void 0, function*() {
        $8EjUb$assert.ok(fsPath, "a path argument must be provided");
        fsPath = $4d4b39e7e3cca916$var$path.resolve(fsPath);
        if (depth >= maxDepth) return module.exports.mkdir(fsPath);
        try {
            yield module.exports.mkdir(fsPath);
            return;
        } catch (err) {
            switch(err.code){
                case "ENOENT":
                    yield $4d4b39e7e3cca916$var$mkdirP($4d4b39e7e3cca916$var$path.dirname(fsPath), maxDepth, depth + 1);
                    yield module.exports.mkdir(fsPath);
                    return;
                default:
                    {
                        let stats;
                        try {
                            stats = yield module.exports.stat(fsPath);
                        } catch (err2) {
                            throw err;
                        }
                        if (!stats.isDirectory()) throw err;
                    }
            }
        }
    });
}
module.exports.mkdirP = $4d4b39e7e3cca916$var$mkdirP;
/**
 * Best effort attempt to determine whether a file exists and is executable.
 * @param filePath    file path to check
 * @param extensions  additional file extensions to try
 * @return if file exists and is executable, returns the file path. otherwise empty string.
 */ function $4d4b39e7e3cca916$var$tryGetExecutablePath(filePath, extensions) {
    return $4d4b39e7e3cca916$var$__awaiter(this, void 0, void 0, function*() {
        let stats = undefined;
        try {
            // test file exists
            stats = yield module.exports.stat(filePath);
        } catch (err) {
            if (err.code !== "ENOENT") // eslint-disable-next-line no-console
            console.log(`Unexpected error attempting to determine if executable file exists '${filePath}': ${err}`);
        }
        if (stats && stats.isFile()) {
            if (module.exports.IS_WINDOWS) {
                // on Windows, test for valid extension
                const upperExt = $4d4b39e7e3cca916$var$path.extname(filePath).toUpperCase();
                if (extensions.some((validExt)=>validExt.toUpperCase() === upperExt)) return filePath;
            } else {
                if ($4d4b39e7e3cca916$var$isUnixExecutable(stats)) return filePath;
            }
        }
        // try each extension
        const originalFilePath = filePath;
        for (const extension of extensions){
            filePath = originalFilePath + extension;
            stats = undefined;
            try {
                stats = yield module.exports.stat(filePath);
            } catch (err) {
                if (err.code !== "ENOENT") // eslint-disable-next-line no-console
                console.log(`Unexpected error attempting to determine if executable file exists '${filePath}': ${err}`);
            }
            if (stats && stats.isFile()) {
                if (module.exports.IS_WINDOWS) {
                    // preserve the case of the actual file (since an extension was appended)
                    try {
                        const directory = $4d4b39e7e3cca916$var$path.dirname(filePath);
                        const upperName = $4d4b39e7e3cca916$var$path.basename(filePath).toUpperCase();
                        for (const actualName of yield module.exports.readdir(directory))if (upperName === actualName.toUpperCase()) {
                            filePath = $4d4b39e7e3cca916$var$path.join(directory, actualName);
                            break;
                        }
                    } catch (err) {
                        // eslint-disable-next-line no-console
                        console.log(`Unexpected error attempting to determine the actual case of the file '${filePath}': ${err}`);
                    }
                    return filePath;
                } else {
                    if ($4d4b39e7e3cca916$var$isUnixExecutable(stats)) return filePath;
                }
            }
        }
        return "";
    });
}
module.exports.tryGetExecutablePath = $4d4b39e7e3cca916$var$tryGetExecutablePath;
function $4d4b39e7e3cca916$var$normalizeSeparators(p) {
    p = p || "";
    if (module.exports.IS_WINDOWS) {
        // convert slashes on Windows
        p = p.replace(/\//g, "\\");
        // remove redundant slashes
        return p.replace(/\\\\+/g, "\\");
    }
    // remove redundant slashes
    return p.replace(/\/\/+/g, "/");
}
// on Mac/Linux, test the execute bit
//     R   W  X  R  W X R W X
//   256 128 64 32 16 8 4 2 1
function $4d4b39e7e3cca916$var$isUnixExecutable(stats) {
    return (stats.mode & 1) > 0 || (stats.mode & 8) > 0 && stats.gid === process.getgid() || (stats.mode & 64) > 0 && stats.uid === process.getuid();
}

});




parcelRequire.register("8Nfbt", function(module, exports) {
"use strict";
var $666ead8d309dea9e$var$__createBinding = module.exports && module.exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
        enumerable: true,
        get: function() {
            return m[k];
        }
    });
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var $666ead8d309dea9e$var$__setModuleDefault = module.exports && module.exports.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var $666ead8d309dea9e$var$__importStar = module.exports && module.exports.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.hasOwnProperty.call(mod, k)) $666ead8d309dea9e$var$__createBinding(result, mod, k);
    }
    $666ead8d309dea9e$var$__setModuleDefault(result, mod);
    return result;
};
var $666ead8d309dea9e$var$__awaiter = module.exports && module.exports.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.findInPath = module.exports.which = module.exports.mkdirP = module.exports.rmRF = module.exports.mv = module.exports.cp = void 0;


const $666ead8d309dea9e$var$childProcess = $666ead8d309dea9e$var$__importStar($8EjUb$child_process);

const $666ead8d309dea9e$var$path = $666ead8d309dea9e$var$__importStar($8EjUb$path);


const $666ead8d309dea9e$var$ioUtil = $666ead8d309dea9e$var$__importStar((parcelRequire("gN3xs")));
const $666ead8d309dea9e$var$exec = $8EjUb$util.promisify($666ead8d309dea9e$var$childProcess.exec);
const $666ead8d309dea9e$var$execFile = $8EjUb$util.promisify($666ead8d309dea9e$var$childProcess.execFile);
/**
 * Copies a file or folder.
 * Based off of shelljs - https://github.com/shelljs/shelljs/blob/9237f66c52e5daa40458f94f9565e18e8132f5a6/src/cp.js
 *
 * @param     source    source path
 * @param     dest      destination path
 * @param     options   optional. See CopyOptions.
 */ function $666ead8d309dea9e$var$cp(source, dest, options = {}) {
    return $666ead8d309dea9e$var$__awaiter(this, void 0, void 0, function*() {
        const { force: force , recursive: recursive , copySourceDirectory: copySourceDirectory  } = $666ead8d309dea9e$var$readCopyOptions(options);
        const destStat = (yield $666ead8d309dea9e$var$ioUtil.exists(dest)) ? yield $666ead8d309dea9e$var$ioUtil.stat(dest) : null;
        // Dest is an existing file, but not forcing
        if (destStat && destStat.isFile() && !force) return;
        // If dest is an existing directory, should copy inside.
        const newDest = destStat && destStat.isDirectory() && copySourceDirectory ? $666ead8d309dea9e$var$path.join(dest, $666ead8d309dea9e$var$path.basename(source)) : dest;
        if (!(yield $666ead8d309dea9e$var$ioUtil.exists(source))) throw new Error(`no such file or directory: ${source}`);
        const sourceStat = yield $666ead8d309dea9e$var$ioUtil.stat(source);
        if (sourceStat.isDirectory()) {
            if (!recursive) throw new Error(`Failed to copy. ${source} is a directory, but tried to copy without recursive flag.`);
            else yield $666ead8d309dea9e$var$cpDirRecursive(source, newDest, 0, force);
        } else {
            if ($666ead8d309dea9e$var$path.relative(source, newDest) === "") // a file cannot be copied to itself
            throw new Error(`'${newDest}' and '${source}' are the same file`);
            yield $666ead8d309dea9e$var$copyFile(source, newDest, force);
        }
    });
}
module.exports.cp = $666ead8d309dea9e$var$cp;
/**
 * Moves a path.
 *
 * @param     source    source path
 * @param     dest      destination path
 * @param     options   optional. See MoveOptions.
 */ function $666ead8d309dea9e$var$mv(source, dest, options = {}) {
    return $666ead8d309dea9e$var$__awaiter(this, void 0, void 0, function*() {
        if (yield $666ead8d309dea9e$var$ioUtil.exists(dest)) {
            let destExists = true;
            if (yield $666ead8d309dea9e$var$ioUtil.isDirectory(dest)) {
                // If dest is directory copy src into dest
                dest = $666ead8d309dea9e$var$path.join(dest, $666ead8d309dea9e$var$path.basename(source));
                destExists = yield $666ead8d309dea9e$var$ioUtil.exists(dest);
            }
            if (destExists) {
                if (options.force == null || options.force) yield $666ead8d309dea9e$var$rmRF(dest);
                else throw new Error("Destination already exists");
            }
        }
        yield $666ead8d309dea9e$var$mkdirP($666ead8d309dea9e$var$path.dirname(dest));
        yield $666ead8d309dea9e$var$ioUtil.rename(source, dest);
    });
}
module.exports.mv = $666ead8d309dea9e$var$mv;
/**
 * Remove a path recursively with force
 *
 * @param inputPath path to remove
 */ function $666ead8d309dea9e$var$rmRF(inputPath) {
    return $666ead8d309dea9e$var$__awaiter(this, void 0, void 0, function*() {
        if ($666ead8d309dea9e$var$ioUtil.IS_WINDOWS) {
            // Node doesn't provide a delete operation, only an unlink function. This means that if the file is being used by another
            // program (e.g. antivirus), it won't be deleted. To address this, we shell out the work to rd/del.
            // Check for invalid characters
            // https://docs.microsoft.com/en-us/windows/win32/fileio/naming-a-file
            if (/[*"<>|]/.test(inputPath)) throw new Error('File path must not contain `*`, `"`, `<`, `>` or `|` on Windows');
            try {
                const cmdPath = $666ead8d309dea9e$var$ioUtil.getCmdPath();
                if (yield $666ead8d309dea9e$var$ioUtil.isDirectory(inputPath, true)) yield $666ead8d309dea9e$var$exec(`${cmdPath} /s /c "rd /s /q "%inputPath%""`, {
                    env: {
                        inputPath: inputPath
                    }
                });
                else yield $666ead8d309dea9e$var$exec(`${cmdPath} /s /c "del /f /a "%inputPath%""`, {
                    env: {
                        inputPath: inputPath
                    }
                });
            } catch (err) {
                // if you try to delete a file that doesn't exist, desired result is achieved
                // other errors are valid
                if (err.code !== "ENOENT") throw err;
            }
            // Shelling out fails to remove a symlink folder with missing source, this unlink catches that
            try {
                yield $666ead8d309dea9e$var$ioUtil.unlink(inputPath);
            } catch (err) {
                // if you try to delete a file that doesn't exist, desired result is achieved
                // other errors are valid
                if (err.code !== "ENOENT") throw err;
            }
        } else {
            let isDir = false;
            try {
                isDir = yield $666ead8d309dea9e$var$ioUtil.isDirectory(inputPath);
            } catch (err) {
                // if you try to delete a file that doesn't exist, desired result is achieved
                // other errors are valid
                if (err.code !== "ENOENT") throw err;
                return;
            }
            if (isDir) yield $666ead8d309dea9e$var$execFile(`rm`, [
                `-rf`,
                `${inputPath}`
            ]);
            else yield $666ead8d309dea9e$var$ioUtil.unlink(inputPath);
        }
    });
}
module.exports.rmRF = $666ead8d309dea9e$var$rmRF;
/**
 * Make a directory.  Creates the full path with folders in between
 * Will throw if it fails
 *
 * @param   fsPath        path to create
 * @returns Promise<void>
 */ function $666ead8d309dea9e$var$mkdirP(fsPath) {
    return $666ead8d309dea9e$var$__awaiter(this, void 0, void 0, function*() {
        $8EjUb$assert.ok(fsPath, "a path argument must be provided");
        yield $666ead8d309dea9e$var$ioUtil.mkdir(fsPath, {
            recursive: true
        });
    });
}
module.exports.mkdirP = $666ead8d309dea9e$var$mkdirP;
/**
 * Returns path of a tool had the tool actually been invoked.  Resolves via paths.
 * If you check and the tool does not exist, it will throw.
 *
 * @param     tool              name of the tool
 * @param     check             whether to check if tool exists
 * @returns   Promise<string>   path to tool
 */ function $666ead8d309dea9e$var$which(tool, check) {
    return $666ead8d309dea9e$var$__awaiter(this, void 0, void 0, function*() {
        if (!tool) throw new Error("parameter 'tool' is required");
        // recursive when check=true
        if (check) {
            const result = yield $666ead8d309dea9e$var$which(tool, false);
            if (!result) {
                if ($666ead8d309dea9e$var$ioUtil.IS_WINDOWS) throw new Error(`Unable to locate executable file: ${tool}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also verify the file has a valid extension for an executable file.`);
                else throw new Error(`Unable to locate executable file: ${tool}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also check the file mode to verify the file is executable.`);
            }
            return result;
        }
        const matches = yield $666ead8d309dea9e$var$findInPath(tool);
        if (matches && matches.length > 0) return matches[0];
        return "";
    });
}
module.exports.which = $666ead8d309dea9e$var$which;
/**
 * Returns a list of all occurrences of the given tool on the system path.
 *
 * @returns   Promise<string[]>  the paths of the tool
 */ function $666ead8d309dea9e$var$findInPath(tool) {
    return $666ead8d309dea9e$var$__awaiter(this, void 0, void 0, function*() {
        if (!tool) throw new Error("parameter 'tool' is required");
        // build the list of extensions to try
        const extensions = [];
        if ($666ead8d309dea9e$var$ioUtil.IS_WINDOWS && process.env["PATHEXT"]) {
            for (const extension of process.env["PATHEXT"].split($666ead8d309dea9e$var$path.delimiter))if (extension) extensions.push(extension);
        }
        // if it's rooted, return it if exists. otherwise return empty.
        if ($666ead8d309dea9e$var$ioUtil.isRooted(tool)) {
            const filePath = yield $666ead8d309dea9e$var$ioUtil.tryGetExecutablePath(tool, extensions);
            if (filePath) return [
                filePath
            ];
            return [];
        }
        // if any path separators, return empty
        if (tool.includes($666ead8d309dea9e$var$path.sep)) return [];
        // build the list of directories
        //
        // Note, technically "where" checks the current directory on Windows. From a toolkit perspective,
        // it feels like we should not do this. Checking the current directory seems like more of a use
        // case of a shell, and the which() function exposed by the toolkit should strive for consistency
        // across platforms.
        const directories = [];
        if (process.env.PATH) {
            for (const p of process.env.PATH.split($666ead8d309dea9e$var$path.delimiter))if (p) directories.push(p);
        }
        // find all matches
        const matches = [];
        for (const directory of directories){
            const filePath = yield $666ead8d309dea9e$var$ioUtil.tryGetExecutablePath($666ead8d309dea9e$var$path.join(directory, tool), extensions);
            if (filePath) matches.push(filePath);
        }
        return matches;
    });
}
module.exports.findInPath = $666ead8d309dea9e$var$findInPath;
function $666ead8d309dea9e$var$readCopyOptions(options) {
    const force = options.force == null ? true : options.force;
    const recursive = Boolean(options.recursive);
    const copySourceDirectory = options.copySourceDirectory == null ? true : Boolean(options.copySourceDirectory);
    return {
        force: force,
        recursive: recursive,
        copySourceDirectory: copySourceDirectory
    };
}
function $666ead8d309dea9e$var$cpDirRecursive(sourceDir, destDir, currentDepth, force) {
    return $666ead8d309dea9e$var$__awaiter(this, void 0, void 0, function*() {
        // Ensure there is not a run away recursive copy
        if (currentDepth >= 255) return;
        currentDepth++;
        yield $666ead8d309dea9e$var$mkdirP(destDir);
        const files = yield $666ead8d309dea9e$var$ioUtil.readdir(sourceDir);
        for (const fileName of files){
            const srcFile = `${sourceDir}/${fileName}`;
            const destFile = `${destDir}/${fileName}`;
            const srcFileStat = yield $666ead8d309dea9e$var$ioUtil.lstat(srcFile);
            if (srcFileStat.isDirectory()) // Recurse
            yield $666ead8d309dea9e$var$cpDirRecursive(srcFile, destFile, currentDepth, force);
            else yield $666ead8d309dea9e$var$copyFile(srcFile, destFile, force);
        }
        // Change the mode for the newly created directory
        yield $666ead8d309dea9e$var$ioUtil.chmod(destDir, (yield $666ead8d309dea9e$var$ioUtil.stat(sourceDir)).mode);
    });
}
// Buffered file copy
function $666ead8d309dea9e$var$copyFile(srcFile, destFile, force) {
    return $666ead8d309dea9e$var$__awaiter(this, void 0, void 0, function*() {
        if ((yield $666ead8d309dea9e$var$ioUtil.lstat(srcFile)).isSymbolicLink()) {
            // unlink/re-link it
            try {
                yield $666ead8d309dea9e$var$ioUtil.lstat(destFile);
                yield $666ead8d309dea9e$var$ioUtil.unlink(destFile);
            } catch (e) {
                // Try to override file permission
                if (e.code === "EPERM") {
                    yield $666ead8d309dea9e$var$ioUtil.chmod(destFile, "0666");
                    yield $666ead8d309dea9e$var$ioUtil.unlink(destFile);
                }
            // other errors = it doesn't exist, no work to do
            }
            // Copy over symlink
            const symlinkFull = yield $666ead8d309dea9e$var$ioUtil.readlink(srcFile);
            yield $666ead8d309dea9e$var$ioUtil.symlink(symlinkFull, destFile, $666ead8d309dea9e$var$ioUtil.IS_WINDOWS ? "junction" : null);
        } else if (!(yield $666ead8d309dea9e$var$ioUtil.exists(destFile)) || force) yield $666ead8d309dea9e$var$ioUtil.copyFile(srcFile, destFile);
    });
}

});
parcelRequire.register("gN3xs", function(module, exports) {
"use strict";
var $c393f7a0a06826fe$var$__createBinding = module.exports && module.exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
        enumerable: true,
        get: function() {
            return m[k];
        }
    });
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var $c393f7a0a06826fe$var$__setModuleDefault = module.exports && module.exports.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var $c393f7a0a06826fe$var$__importStar = module.exports && module.exports.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.hasOwnProperty.call(mod, k)) $c393f7a0a06826fe$var$__createBinding(result, mod, k);
    }
    $c393f7a0a06826fe$var$__setModuleDefault(result, mod);
    return result;
};
var $c393f7a0a06826fe$var$__awaiter = module.exports && module.exports.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var $c393f7a0a06826fe$var$_a;
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.getCmdPath = module.exports.tryGetExecutablePath = module.exports.isRooted = module.exports.isDirectory = module.exports.exists = module.exports.IS_WINDOWS = module.exports.unlink = module.exports.symlink = module.exports.stat = module.exports.rmdir = module.exports.rename = module.exports.readlink = module.exports.readdir = module.exports.mkdir = module.exports.lstat = module.exports.copyFile = module.exports.chmod = void 0;

const $c393f7a0a06826fe$var$fs = $c393f7a0a06826fe$var$__importStar($8EjUb$fs);

const $c393f7a0a06826fe$var$path = $c393f7a0a06826fe$var$__importStar($8EjUb$path);
$c393f7a0a06826fe$var$_a = $c393f7a0a06826fe$var$fs.promises, module.exports.chmod = $c393f7a0a06826fe$var$_a.chmod, module.exports.copyFile = $c393f7a0a06826fe$var$_a.copyFile, module.exports.lstat = $c393f7a0a06826fe$var$_a.lstat, module.exports.mkdir = $c393f7a0a06826fe$var$_a.mkdir, module.exports.readdir = $c393f7a0a06826fe$var$_a.readdir, module.exports.readlink = $c393f7a0a06826fe$var$_a.readlink, module.exports.rename = $c393f7a0a06826fe$var$_a.rename, module.exports.rmdir = $c393f7a0a06826fe$var$_a.rmdir, module.exports.stat = $c393f7a0a06826fe$var$_a.stat, module.exports.symlink = $c393f7a0a06826fe$var$_a.symlink, module.exports.unlink = $c393f7a0a06826fe$var$_a.unlink;
module.exports.IS_WINDOWS = process.platform === "win32";
function $c393f7a0a06826fe$var$exists(fsPath) {
    return $c393f7a0a06826fe$var$__awaiter(this, void 0, void 0, function*() {
        try {
            yield module.exports.stat(fsPath);
        } catch (err) {
            if (err.code === "ENOENT") return false;
            throw err;
        }
        return true;
    });
}
module.exports.exists = $c393f7a0a06826fe$var$exists;
function $c393f7a0a06826fe$var$isDirectory(fsPath, useStat = false) {
    return $c393f7a0a06826fe$var$__awaiter(this, void 0, void 0, function*() {
        const stats = useStat ? yield module.exports.stat(fsPath) : yield module.exports.lstat(fsPath);
        return stats.isDirectory();
    });
}
module.exports.isDirectory = $c393f7a0a06826fe$var$isDirectory;
/**
 * On OSX/Linux, true if path starts with '/'. On Windows, true for paths like:
 * \, \hello, \\hello\share, C:, and C:\hello (and corresponding alternate separator cases).
 */ function $c393f7a0a06826fe$var$isRooted(p) {
    p = $c393f7a0a06826fe$var$normalizeSeparators(p);
    if (!p) throw new Error('isRooted() parameter "p" cannot be empty');
    if (module.exports.IS_WINDOWS) return p.startsWith("\\") || /^[A-Z]:/i.test(p) // e.g. \ or \hello or \\hello
    ; // e.g. C: or C:\hello
    return p.startsWith("/");
}
module.exports.isRooted = $c393f7a0a06826fe$var$isRooted;
/**
 * Best effort attempt to determine whether a file exists and is executable.
 * @param filePath    file path to check
 * @param extensions  additional file extensions to try
 * @return if file exists and is executable, returns the file path. otherwise empty string.
 */ function $c393f7a0a06826fe$var$tryGetExecutablePath(filePath, extensions) {
    return $c393f7a0a06826fe$var$__awaiter(this, void 0, void 0, function*() {
        let stats = undefined;
        try {
            // test file exists
            stats = yield module.exports.stat(filePath);
        } catch (err) {
            if (err.code !== "ENOENT") // eslint-disable-next-line no-console
            console.log(`Unexpected error attempting to determine if executable file exists '${filePath}': ${err}`);
        }
        if (stats && stats.isFile()) {
            if (module.exports.IS_WINDOWS) {
                // on Windows, test for valid extension
                const upperExt = $c393f7a0a06826fe$var$path.extname(filePath).toUpperCase();
                if (extensions.some((validExt)=>validExt.toUpperCase() === upperExt)) return filePath;
            } else {
                if ($c393f7a0a06826fe$var$isUnixExecutable(stats)) return filePath;
            }
        }
        // try each extension
        const originalFilePath = filePath;
        for (const extension of extensions){
            filePath = originalFilePath + extension;
            stats = undefined;
            try {
                stats = yield module.exports.stat(filePath);
            } catch (err) {
                if (err.code !== "ENOENT") // eslint-disable-next-line no-console
                console.log(`Unexpected error attempting to determine if executable file exists '${filePath}': ${err}`);
            }
            if (stats && stats.isFile()) {
                if (module.exports.IS_WINDOWS) {
                    // preserve the case of the actual file (since an extension was appended)
                    try {
                        const directory = $c393f7a0a06826fe$var$path.dirname(filePath);
                        const upperName = $c393f7a0a06826fe$var$path.basename(filePath).toUpperCase();
                        for (const actualName of yield module.exports.readdir(directory))if (upperName === actualName.toUpperCase()) {
                            filePath = $c393f7a0a06826fe$var$path.join(directory, actualName);
                            break;
                        }
                    } catch (err) {
                        // eslint-disable-next-line no-console
                        console.log(`Unexpected error attempting to determine the actual case of the file '${filePath}': ${err}`);
                    }
                    return filePath;
                } else {
                    if ($c393f7a0a06826fe$var$isUnixExecutable(stats)) return filePath;
                }
            }
        }
        return "";
    });
}
module.exports.tryGetExecutablePath = $c393f7a0a06826fe$var$tryGetExecutablePath;
function $c393f7a0a06826fe$var$normalizeSeparators(p) {
    p = p || "";
    if (module.exports.IS_WINDOWS) {
        // convert slashes on Windows
        p = p.replace(/\//g, "\\");
        // remove redundant slashes
        return p.replace(/\\\\+/g, "\\");
    }
    // remove redundant slashes
    return p.replace(/\/\/+/g, "/");
}
// on Mac/Linux, test the execute bit
//     R   W  X  R  W X R W X
//   256 128 64 32 16 8 4 2 1
function $c393f7a0a06826fe$var$isUnixExecutable(stats) {
    return (stats.mode & 1) > 0 || (stats.mode & 8) > 0 && stats.gid === process.getgid() || (stats.mode & 64) > 0 && stats.uid === process.getuid();
}
// Get the path of cmd.exe in windows
function $c393f7a0a06826fe$var$getCmdPath() {
    var _a;
    return (_a = process.env["COMSPEC"]) !== null && _a !== void 0 ? _a : `cmd.exe`;
}
module.exports.getCmdPath = $c393f7a0a06826fe$var$getCmdPath;

});


parcelRequire.register("eNbgu", function(module, exports) {

var $ac4e61474dcd488a$var$$parcel$__dirname = $8EjUb$path.resolve(__dirname, "../node_modules/@actions/tool-cache/lib");
"use strict";
var $ac4e61474dcd488a$var$__createBinding = module.exports && module.exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
        enumerable: true,
        get: function() {
            return m[k];
        }
    });
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var $ac4e61474dcd488a$var$__setModuleDefault = module.exports && module.exports.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var $ac4e61474dcd488a$var$__importStar = module.exports && module.exports.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.hasOwnProperty.call(mod, k)) $ac4e61474dcd488a$var$__createBinding(result, mod, k);
    }
    $ac4e61474dcd488a$var$__setModuleDefault(result, mod);
    return result;
};
var $ac4e61474dcd488a$var$__awaiter = module.exports && module.exports.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var $ac4e61474dcd488a$var$__importDefault = module.exports && module.exports.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.evaluateVersions = module.exports.isExplicitVersion = module.exports.findFromManifest = module.exports.getManifestFromRepo = module.exports.findAllVersions = module.exports.find = module.exports.cacheFile = module.exports.cacheDir = module.exports.extractZip = module.exports.extractXar = module.exports.extractTar = module.exports.extract7z = module.exports.downloadTool = module.exports.HTTPError = void 0;

const $ac4e61474dcd488a$var$core = $ac4e61474dcd488a$var$__importStar((parcelRequire("13d93")));

const $ac4e61474dcd488a$var$io = $ac4e61474dcd488a$var$__importStar((parcelRequire("lH4cv")));

const $ac4e61474dcd488a$var$fs = $ac4e61474dcd488a$var$__importStar($8EjUb$fs);

const $ac4e61474dcd488a$var$mm = $ac4e61474dcd488a$var$__importStar((parcelRequire("dB6sP")));

const $ac4e61474dcd488a$var$os = $ac4e61474dcd488a$var$__importStar($8EjUb$os);

const $ac4e61474dcd488a$var$path = $ac4e61474dcd488a$var$__importStar($8EjUb$path);

const $ac4e61474dcd488a$var$httpm = $ac4e61474dcd488a$var$__importStar((parcelRequire("5StmC")));

const $ac4e61474dcd488a$var$semver = $ac4e61474dcd488a$var$__importStar((parcelRequire("fMMin")));

const $ac4e61474dcd488a$var$stream = $ac4e61474dcd488a$var$__importStar($8EjUb$stream);

const $ac4e61474dcd488a$var$util = $ac4e61474dcd488a$var$__importStar($8EjUb$util);


const $ac4e61474dcd488a$var$v4_1 = $ac4e61474dcd488a$var$__importDefault((parcelRequire("geuwa")));

var $2YVDU = parcelRequire("2YVDU");

var $7nWFL = parcelRequire("7nWFL");
class $ac4e61474dcd488a$var$HTTPError extends Error {
    constructor(httpStatusCode){
        super(`Unexpected HTTP response: ${httpStatusCode}`);
        this.httpStatusCode = httpStatusCode;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
module.exports.HTTPError = $ac4e61474dcd488a$var$HTTPError;
const $ac4e61474dcd488a$var$IS_WINDOWS = process.platform === "win32";
const $ac4e61474dcd488a$var$IS_MAC = process.platform === "darwin";
const $ac4e61474dcd488a$var$userAgent = "actions/tool-cache";
/**
 * Download a tool from an url and stream it into a file
 *
 * @param url       url of tool to download
 * @param dest      path to download tool
 * @param auth      authorization header
 * @param headers   other headers
 * @returns         path to downloaded tool
 */ function $ac4e61474dcd488a$var$downloadTool(url, dest, auth, headers) {
    return $ac4e61474dcd488a$var$__awaiter(this, void 0, void 0, function*() {
        dest = dest || $ac4e61474dcd488a$var$path.join($ac4e61474dcd488a$var$_getTempDirectory(), $ac4e61474dcd488a$var$v4_1.default());
        yield $ac4e61474dcd488a$var$io.mkdirP($ac4e61474dcd488a$var$path.dirname(dest));
        $ac4e61474dcd488a$var$core.debug(`Downloading ${url}`);
        $ac4e61474dcd488a$var$core.debug(`Destination ${dest}`);
        const maxAttempts = 3;
        const minSeconds = $ac4e61474dcd488a$var$_getGlobal("TEST_DOWNLOAD_TOOL_RETRY_MIN_SECONDS", 10);
        const maxSeconds = $ac4e61474dcd488a$var$_getGlobal("TEST_DOWNLOAD_TOOL_RETRY_MAX_SECONDS", 20);
        const retryHelper = new $7nWFL.RetryHelper(maxAttempts, minSeconds, maxSeconds);
        return yield retryHelper.execute(()=>$ac4e61474dcd488a$var$__awaiter(this, void 0, void 0, function*() {
                return yield $ac4e61474dcd488a$var$downloadToolAttempt(url, dest || "", auth, headers);
            }), (err)=>{
            if (err instanceof $ac4e61474dcd488a$var$HTTPError && err.httpStatusCode) {
                // Don't retry anything less than 500, except 408 Request Timeout and 429 Too Many Requests
                if (err.httpStatusCode < 500 && err.httpStatusCode !== 408 && err.httpStatusCode !== 429) return false;
            }
            // Otherwise retry
            return true;
        });
    });
}
module.exports.downloadTool = $ac4e61474dcd488a$var$downloadTool;
function $ac4e61474dcd488a$var$downloadToolAttempt(url, dest, auth, headers) {
    return $ac4e61474dcd488a$var$__awaiter(this, void 0, void 0, function*() {
        if ($ac4e61474dcd488a$var$fs.existsSync(dest)) throw new Error(`Destination file path ${dest} already exists`);
        // Get the response headers
        const http = new $ac4e61474dcd488a$var$httpm.HttpClient($ac4e61474dcd488a$var$userAgent, [], {
            allowRetries: false
        });
        if (auth) {
            $ac4e61474dcd488a$var$core.debug("set auth");
            if (headers === undefined) headers = {};
            headers.authorization = auth;
        }
        const response = yield http.get(url, headers);
        if (response.message.statusCode !== 200) {
            const err = new $ac4e61474dcd488a$var$HTTPError(response.message.statusCode);
            $ac4e61474dcd488a$var$core.debug(`Failed to download from "${url}". Code(${response.message.statusCode}) Message(${response.message.statusMessage})`);
            throw err;
        }
        // Download the response body
        const pipeline = $ac4e61474dcd488a$var$util.promisify($ac4e61474dcd488a$var$stream.pipeline);
        const responseMessageFactory = $ac4e61474dcd488a$var$_getGlobal("TEST_DOWNLOAD_TOOL_RESPONSE_MESSAGE_FACTORY", ()=>response.message);
        const readStream = responseMessageFactory();
        let succeeded = false;
        try {
            yield pipeline(readStream, $ac4e61474dcd488a$var$fs.createWriteStream(dest));
            $ac4e61474dcd488a$var$core.debug("download complete");
            succeeded = true;
            return dest;
        } finally{
            // Error, delete dest before retry
            if (!succeeded) {
                $ac4e61474dcd488a$var$core.debug("download failed");
                try {
                    yield $ac4e61474dcd488a$var$io.rmRF(dest);
                } catch (err) {
                    $ac4e61474dcd488a$var$core.debug(`Failed to delete '${dest}'. ${err.message}`);
                }
            }
        }
    });
}
/**
 * Extract a .7z file
 *
 * @param file     path to the .7z file
 * @param dest     destination directory. Optional.
 * @param _7zPath  path to 7zr.exe. Optional, for long path support. Most .7z archives do not have this
 * problem. If your .7z archive contains very long paths, you can pass the path to 7zr.exe which will
 * gracefully handle long paths. By default 7zdec.exe is used because it is a very small program and is
 * bundled with the tool lib. However it does not support long paths. 7zr.exe is the reduced command line
 * interface, it is smaller than the full command line interface, and it does support long paths. At the
 * time of this writing, it is freely available from the LZMA SDK that is available on the 7zip website.
 * Be sure to check the current license agreement. If 7zr.exe is bundled with your action, then the path
 * to 7zr.exe can be pass to this function.
 * @returns        path to the destination directory
 */ function $ac4e61474dcd488a$var$extract7z(file, dest, _7zPath) {
    return $ac4e61474dcd488a$var$__awaiter(this, void 0, void 0, function*() {
        $8EjUb$assert.ok($ac4e61474dcd488a$var$IS_WINDOWS, "extract7z() not supported on current OS");
        $8EjUb$assert.ok(file, 'parameter "file" is required');
        dest = yield $ac4e61474dcd488a$var$_createExtractFolder(dest);
        const originalCwd = process.cwd();
        process.chdir(dest);
        if (_7zPath) try {
            const logLevel = $ac4e61474dcd488a$var$core.isDebug() ? "-bb1" : "-bb0";
            const args = [
                "x",
                logLevel,
                "-bd",
                "-sccUTF-8",
                file
            ];
            const options = {
                silent: true
            };
            yield $2YVDU.exec(`"${_7zPath}"`, args, options);
        } finally{
            process.chdir(originalCwd);
        }
        else {
            const escapedScript = $ac4e61474dcd488a$var$path.join($ac4e61474dcd488a$var$$parcel$__dirname, "..", "scripts", "Invoke-7zdec.ps1").replace(/'/g, "''").replace(/"|\n|\r/g, ""); // double-up single quotes, remove double quotes and newlines
            const escapedFile = file.replace(/'/g, "''").replace(/"|\n|\r/g, "");
            const escapedTarget = dest.replace(/'/g, "''").replace(/"|\n|\r/g, "");
            const command = `& '${escapedScript}' -Source '${escapedFile}' -Target '${escapedTarget}'`;
            const args = [
                "-NoLogo",
                "-Sta",
                "-NoProfile",
                "-NonInteractive",
                "-ExecutionPolicy",
                "Unrestricted",
                "-Command",
                command
            ];
            const options = {
                silent: true
            };
            try {
                const powershellPath = yield $ac4e61474dcd488a$var$io.which("powershell", true);
                yield $2YVDU.exec(`"${powershellPath}"`, args, options);
            } finally{
                process.chdir(originalCwd);
            }
        }
        return dest;
    });
}
module.exports.extract7z = $ac4e61474dcd488a$var$extract7z;
/**
 * Extract a compressed tar archive
 *
 * @param file     path to the tar
 * @param dest     destination directory. Optional.
 * @param flags    flags for the tar command to use for extraction. Defaults to 'xz' (extracting gzipped tars). Optional.
 * @returns        path to the destination directory
 */ function $ac4e61474dcd488a$var$extractTar(file, dest, flags = "xz") {
    return $ac4e61474dcd488a$var$__awaiter(this, void 0, void 0, function*() {
        if (!file) throw new Error("parameter 'file' is required");
        // Create dest
        dest = yield $ac4e61474dcd488a$var$_createExtractFolder(dest);
        // Determine whether GNU tar
        $ac4e61474dcd488a$var$core.debug("Checking tar --version");
        let versionOutput = "";
        yield $2YVDU.exec("tar --version", [], {
            ignoreReturnCode: true,
            silent: true,
            listeners: {
                stdout: (data)=>versionOutput += data.toString(),
                stderr: (data)=>versionOutput += data.toString()
            }
        });
        $ac4e61474dcd488a$var$core.debug(versionOutput.trim());
        const isGnuTar = versionOutput.toUpperCase().includes("GNU TAR");
        // Initialize args
        let args;
        if (flags instanceof Array) args = flags;
        else args = [
            flags
        ];
        if ($ac4e61474dcd488a$var$core.isDebug() && !flags.includes("v")) args.push("-v");
        let destArg = dest;
        let fileArg = file;
        if ($ac4e61474dcd488a$var$IS_WINDOWS && isGnuTar) {
            args.push("--force-local");
            destArg = dest.replace(/\\/g, "/");
            // Technically only the dest needs to have `/` but for aesthetic consistency
            // convert slashes in the file arg too.
            fileArg = file.replace(/\\/g, "/");
        }
        if (isGnuTar) {
            // Suppress warnings when using GNU tar to extract archives created by BSD tar
            args.push("--warning=no-unknown-keyword");
            args.push("--overwrite");
        }
        args.push("-C", destArg, "-f", fileArg);
        yield $2YVDU.exec(`tar`, args);
        return dest;
    });
}
module.exports.extractTar = $ac4e61474dcd488a$var$extractTar;
/**
 * Extract a xar compatible archive
 *
 * @param file     path to the archive
 * @param dest     destination directory. Optional.
 * @param flags    flags for the xar. Optional.
 * @returns        path to the destination directory
 */ function $ac4e61474dcd488a$var$extractXar(file, dest, flags = []) {
    return $ac4e61474dcd488a$var$__awaiter(this, void 0, void 0, function*() {
        $8EjUb$assert.ok($ac4e61474dcd488a$var$IS_MAC, "extractXar() not supported on current OS");
        $8EjUb$assert.ok(file, 'parameter "file" is required');
        dest = yield $ac4e61474dcd488a$var$_createExtractFolder(dest);
        let args;
        if (flags instanceof Array) args = flags;
        else args = [
            flags
        ];
        args.push("-x", "-C", dest, "-f", file);
        if ($ac4e61474dcd488a$var$core.isDebug()) args.push("-v");
        const xarPath = yield $ac4e61474dcd488a$var$io.which("xar", true);
        yield $2YVDU.exec(`"${xarPath}"`, $ac4e61474dcd488a$var$_unique(args));
        return dest;
    });
}
module.exports.extractXar = $ac4e61474dcd488a$var$extractXar;
/**
 * Extract a zip
 *
 * @param file     path to the zip
 * @param dest     destination directory. Optional.
 * @returns        path to the destination directory
 */ function $ac4e61474dcd488a$var$extractZip(file, dest) {
    return $ac4e61474dcd488a$var$__awaiter(this, void 0, void 0, function*() {
        if (!file) throw new Error("parameter 'file' is required");
        dest = yield $ac4e61474dcd488a$var$_createExtractFolder(dest);
        if ($ac4e61474dcd488a$var$IS_WINDOWS) yield $ac4e61474dcd488a$var$extractZipWin(file, dest);
        else yield $ac4e61474dcd488a$var$extractZipNix(file, dest);
        return dest;
    });
}
module.exports.extractZip = $ac4e61474dcd488a$var$extractZip;
function $ac4e61474dcd488a$var$extractZipWin(file, dest) {
    return $ac4e61474dcd488a$var$__awaiter(this, void 0, void 0, function*() {
        // build the powershell command
        const escapedFile = file.replace(/'/g, "''").replace(/"|\n|\r/g, ""); // double-up single quotes, remove double quotes and newlines
        const escapedDest = dest.replace(/'/g, "''").replace(/"|\n|\r/g, "");
        const pwshPath = yield $ac4e61474dcd488a$var$io.which("pwsh", false);
        //To match the file overwrite behavior on nix systems, we use the overwrite = true flag for ExtractToDirectory
        //and the -Force flag for Expand-Archive as a fallback
        if (pwshPath) {
            //attempt to use pwsh with ExtractToDirectory, if this fails attempt Expand-Archive
            const pwshCommand = [
                `$ErrorActionPreference = 'Stop' ;`,
                `try { Add-Type -AssemblyName System.IO.Compression.ZipFile } catch { } ;`,
                `try { [System.IO.Compression.ZipFile]::ExtractToDirectory('${escapedFile}', '${escapedDest}', $true) }`,
                `catch { if (($_.Exception.GetType().FullName -eq 'System.Management.Automation.MethodException') -or ($_.Exception.GetType().FullName -eq 'System.Management.Automation.RuntimeException') ){ Expand-Archive -LiteralPath '${escapedFile}' -DestinationPath '${escapedDest}' -Force } else { throw $_ } } ;`
            ].join(" ");
            const args = [
                "-NoLogo",
                "-NoProfile",
                "-NonInteractive",
                "-ExecutionPolicy",
                "Unrestricted",
                "-Command",
                pwshCommand
            ];
            $ac4e61474dcd488a$var$core.debug(`Using pwsh at path: ${pwshPath}`);
            yield $2YVDU.exec(`"${pwshPath}"`, args);
        } else {
            const powershellCommand = [
                `$ErrorActionPreference = 'Stop' ;`,
                `try { Add-Type -AssemblyName System.IO.Compression.FileSystem } catch { } ;`,
                `if ((Get-Command -Name Expand-Archive -Module Microsoft.PowerShell.Archive -ErrorAction Ignore)) { Expand-Archive -LiteralPath '${escapedFile}' -DestinationPath '${escapedDest}' -Force }`,
                `else {[System.IO.Compression.ZipFile]::ExtractToDirectory('${escapedFile}', '${escapedDest}', $true) }`
            ].join(" ");
            const args = [
                "-NoLogo",
                "-Sta",
                "-NoProfile",
                "-NonInteractive",
                "-ExecutionPolicy",
                "Unrestricted",
                "-Command",
                powershellCommand
            ];
            const powershellPath = yield $ac4e61474dcd488a$var$io.which("powershell", true);
            $ac4e61474dcd488a$var$core.debug(`Using powershell at path: ${powershellPath}`);
            yield $2YVDU.exec(`"${powershellPath}"`, args);
        }
    });
}
function $ac4e61474dcd488a$var$extractZipNix(file, dest) {
    return $ac4e61474dcd488a$var$__awaiter(this, void 0, void 0, function*() {
        const unzipPath = yield $ac4e61474dcd488a$var$io.which("unzip", true);
        const args = [
            file
        ];
        if (!$ac4e61474dcd488a$var$core.isDebug()) args.unshift("-q");
        args.unshift("-o"); //overwrite with -o, otherwise a prompt is shown which freezes the run
        yield $2YVDU.exec(`"${unzipPath}"`, args, {
            cwd: dest
        });
    });
}
/**
 * Caches a directory and installs it into the tool cacheDir
 *
 * @param sourceDir    the directory to cache into tools
 * @param tool          tool name
 * @param version       version of the tool.  semver format
 * @param arch          architecture of the tool.  Optional.  Defaults to machine architecture
 */ function $ac4e61474dcd488a$var$cacheDir(sourceDir, tool, version, arch) {
    return $ac4e61474dcd488a$var$__awaiter(this, void 0, void 0, function*() {
        version = $ac4e61474dcd488a$var$semver.clean(version) || version;
        arch = arch || $ac4e61474dcd488a$var$os.arch();
        $ac4e61474dcd488a$var$core.debug(`Caching tool ${tool} ${version} ${arch}`);
        $ac4e61474dcd488a$var$core.debug(`source dir: ${sourceDir}`);
        if (!$ac4e61474dcd488a$var$fs.statSync(sourceDir).isDirectory()) throw new Error("sourceDir is not a directory");
        // Create the tool dir
        const destPath = yield $ac4e61474dcd488a$var$_createToolPath(tool, version, arch);
        // copy each child item. do not move. move can fail on Windows
        // due to anti-virus software having an open handle on a file.
        for (const itemName of $ac4e61474dcd488a$var$fs.readdirSync(sourceDir)){
            const s = $ac4e61474dcd488a$var$path.join(sourceDir, itemName);
            yield $ac4e61474dcd488a$var$io.cp(s, destPath, {
                recursive: true
            });
        }
        // write .complete
        $ac4e61474dcd488a$var$_completeToolPath(tool, version, arch);
        return destPath;
    });
}
module.exports.cacheDir = $ac4e61474dcd488a$var$cacheDir;
/**
 * Caches a downloaded file (GUID) and installs it
 * into the tool cache with a given targetName
 *
 * @param sourceFile    the file to cache into tools.  Typically a result of downloadTool which is a guid.
 * @param targetFile    the name of the file name in the tools directory
 * @param tool          tool name
 * @param version       version of the tool.  semver format
 * @param arch          architecture of the tool.  Optional.  Defaults to machine architecture
 */ function $ac4e61474dcd488a$var$cacheFile(sourceFile, targetFile, tool, version, arch) {
    return $ac4e61474dcd488a$var$__awaiter(this, void 0, void 0, function*() {
        version = $ac4e61474dcd488a$var$semver.clean(version) || version;
        arch = arch || $ac4e61474dcd488a$var$os.arch();
        $ac4e61474dcd488a$var$core.debug(`Caching tool ${tool} ${version} ${arch}`);
        $ac4e61474dcd488a$var$core.debug(`source file: ${sourceFile}`);
        if (!$ac4e61474dcd488a$var$fs.statSync(sourceFile).isFile()) throw new Error("sourceFile is not a file");
        // create the tool dir
        const destFolder = yield $ac4e61474dcd488a$var$_createToolPath(tool, version, arch);
        // copy instead of move. move can fail on Windows due to
        // anti-virus software having an open handle on a file.
        const destPath = $ac4e61474dcd488a$var$path.join(destFolder, targetFile);
        $ac4e61474dcd488a$var$core.debug(`destination file ${destPath}`);
        yield $ac4e61474dcd488a$var$io.cp(sourceFile, destPath);
        // write .complete
        $ac4e61474dcd488a$var$_completeToolPath(tool, version, arch);
        return destFolder;
    });
}
module.exports.cacheFile = $ac4e61474dcd488a$var$cacheFile;
/**
 * Finds the path to a tool version in the local installed tool cache
 *
 * @param toolName      name of the tool
 * @param versionSpec   version of the tool
 * @param arch          optional arch.  defaults to arch of computer
 */ function $ac4e61474dcd488a$var$find(toolName, versionSpec, arch) {
    if (!toolName) throw new Error("toolName parameter is required");
    if (!versionSpec) throw new Error("versionSpec parameter is required");
    arch = arch || $ac4e61474dcd488a$var$os.arch();
    // attempt to resolve an explicit version
    if (!$ac4e61474dcd488a$var$isExplicitVersion(versionSpec)) {
        const localVersions = $ac4e61474dcd488a$var$findAllVersions(toolName, arch);
        const match = $ac4e61474dcd488a$var$evaluateVersions(localVersions, versionSpec);
        versionSpec = match;
    }
    // check for the explicit version in the cache
    let toolPath = "";
    if (versionSpec) {
        versionSpec = $ac4e61474dcd488a$var$semver.clean(versionSpec) || "";
        const cachePath = $ac4e61474dcd488a$var$path.join($ac4e61474dcd488a$var$_getCacheDirectory(), toolName, versionSpec, arch);
        $ac4e61474dcd488a$var$core.debug(`checking cache: ${cachePath}`);
        if ($ac4e61474dcd488a$var$fs.existsSync(cachePath) && $ac4e61474dcd488a$var$fs.existsSync(`${cachePath}.complete`)) {
            $ac4e61474dcd488a$var$core.debug(`Found tool in cache ${toolName} ${versionSpec} ${arch}`);
            toolPath = cachePath;
        } else $ac4e61474dcd488a$var$core.debug("not found");
    }
    return toolPath;
}
module.exports.find = $ac4e61474dcd488a$var$find;
/**
 * Finds the paths to all versions of a tool that are installed in the local tool cache
 *
 * @param toolName  name of the tool
 * @param arch      optional arch.  defaults to arch of computer
 */ function $ac4e61474dcd488a$var$findAllVersions(toolName, arch) {
    const versions = [];
    arch = arch || $ac4e61474dcd488a$var$os.arch();
    const toolPath = $ac4e61474dcd488a$var$path.join($ac4e61474dcd488a$var$_getCacheDirectory(), toolName);
    if ($ac4e61474dcd488a$var$fs.existsSync(toolPath)) {
        const children = $ac4e61474dcd488a$var$fs.readdirSync(toolPath);
        for (const child of children)if ($ac4e61474dcd488a$var$isExplicitVersion(child)) {
            const fullPath = $ac4e61474dcd488a$var$path.join(toolPath, child, arch || "");
            if ($ac4e61474dcd488a$var$fs.existsSync(fullPath) && $ac4e61474dcd488a$var$fs.existsSync(`${fullPath}.complete`)) versions.push(child);
        }
    }
    return versions;
}
module.exports.findAllVersions = $ac4e61474dcd488a$var$findAllVersions;
function $ac4e61474dcd488a$var$getManifestFromRepo(owner, repo, auth, branch = "master") {
    return $ac4e61474dcd488a$var$__awaiter(this, void 0, void 0, function*() {
        let releases = [];
        const treeUrl = `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}`;
        const http = new $ac4e61474dcd488a$var$httpm.HttpClient("tool-cache");
        const headers = {};
        if (auth) {
            $ac4e61474dcd488a$var$core.debug("set auth");
            headers.authorization = auth;
        }
        const response = yield http.getJson(treeUrl, headers);
        if (!response.result) return releases;
        let manifestUrl = "";
        for (const item of response.result.tree)if (item.path === "versions-manifest.json") {
            manifestUrl = item.url;
            break;
        }
        headers["accept"] = "application/vnd.github.VERSION.raw";
        let versionsRaw = yield (yield http.get(manifestUrl, headers)).readBody();
        if (versionsRaw) {
            // shouldn't be needed but protects against invalid json saved with BOM
            versionsRaw = versionsRaw.replace(/^\uFEFF/, "");
            try {
                releases = JSON.parse(versionsRaw);
            } catch (_a) {
                $ac4e61474dcd488a$var$core.debug("Invalid json");
            }
        }
        return releases;
    });
}
module.exports.getManifestFromRepo = $ac4e61474dcd488a$var$getManifestFromRepo;
function $ac4e61474dcd488a$var$findFromManifest(versionSpec, stable, manifest, archFilter = $ac4e61474dcd488a$var$os.arch()) {
    return $ac4e61474dcd488a$var$__awaiter(this, void 0, void 0, function*() {
        // wrap the internal impl
        const match = yield $ac4e61474dcd488a$var$mm._findMatch(versionSpec, stable, manifest, archFilter);
        return match;
    });
}
module.exports.findFromManifest = $ac4e61474dcd488a$var$findFromManifest;
function $ac4e61474dcd488a$var$_createExtractFolder(dest) {
    return $ac4e61474dcd488a$var$__awaiter(this, void 0, void 0, function*() {
        if (!dest) // create a temp dir
        dest = $ac4e61474dcd488a$var$path.join($ac4e61474dcd488a$var$_getTempDirectory(), $ac4e61474dcd488a$var$v4_1.default());
        yield $ac4e61474dcd488a$var$io.mkdirP(dest);
        return dest;
    });
}
function $ac4e61474dcd488a$var$_createToolPath(tool, version, arch) {
    return $ac4e61474dcd488a$var$__awaiter(this, void 0, void 0, function*() {
        const folderPath = $ac4e61474dcd488a$var$path.join($ac4e61474dcd488a$var$_getCacheDirectory(), tool, $ac4e61474dcd488a$var$semver.clean(version) || version, arch || "");
        $ac4e61474dcd488a$var$core.debug(`destination ${folderPath}`);
        const markerPath = `${folderPath}.complete`;
        yield $ac4e61474dcd488a$var$io.rmRF(folderPath);
        yield $ac4e61474dcd488a$var$io.rmRF(markerPath);
        yield $ac4e61474dcd488a$var$io.mkdirP(folderPath);
        return folderPath;
    });
}
function $ac4e61474dcd488a$var$_completeToolPath(tool, version, arch) {
    const folderPath = $ac4e61474dcd488a$var$path.join($ac4e61474dcd488a$var$_getCacheDirectory(), tool, $ac4e61474dcd488a$var$semver.clean(version) || version, arch || "");
    const markerPath = `${folderPath}.complete`;
    $ac4e61474dcd488a$var$fs.writeFileSync(markerPath, "");
    $ac4e61474dcd488a$var$core.debug("finished caching tool");
}
/**
 * Check if version string is explicit
 *
 * @param versionSpec      version string to check
 */ function $ac4e61474dcd488a$var$isExplicitVersion(versionSpec) {
    const c = $ac4e61474dcd488a$var$semver.clean(versionSpec) || "";
    $ac4e61474dcd488a$var$core.debug(`isExplicit: ${c}`);
    const valid = $ac4e61474dcd488a$var$semver.valid(c) != null;
    $ac4e61474dcd488a$var$core.debug(`explicit? ${valid}`);
    return valid;
}
module.exports.isExplicitVersion = $ac4e61474dcd488a$var$isExplicitVersion;
/**
 * Get the highest satisfiying semantic version in `versions` which satisfies `versionSpec`
 *
 * @param versions        array of versions to evaluate
 * @param versionSpec     semantic version spec to satisfy
 */ function $ac4e61474dcd488a$var$evaluateVersions(versions, versionSpec) {
    let version = "";
    $ac4e61474dcd488a$var$core.debug(`evaluating ${versions.length} versions`);
    versions = versions.sort((a, b)=>{
        if ($ac4e61474dcd488a$var$semver.gt(a, b)) return 1;
        return -1;
    });
    for(let i = versions.length - 1; i >= 0; i--){
        const potential = versions[i];
        const satisfied = $ac4e61474dcd488a$var$semver.satisfies(potential, versionSpec);
        if (satisfied) {
            version = potential;
            break;
        }
    }
    if (version) $ac4e61474dcd488a$var$core.debug(`matched: ${version}`);
    else $ac4e61474dcd488a$var$core.debug("match not found");
    return version;
}
module.exports.evaluateVersions = $ac4e61474dcd488a$var$evaluateVersions;
/**
 * Gets RUNNER_TOOL_CACHE
 */ function $ac4e61474dcd488a$var$_getCacheDirectory() {
    const cacheDirectory = process.env["RUNNER_TOOL_CACHE"] || "";
    $8EjUb$assert.ok(cacheDirectory, "Expected RUNNER_TOOL_CACHE to be defined");
    return cacheDirectory;
}
/**
 * Gets RUNNER_TEMP
 */ function $ac4e61474dcd488a$var$_getTempDirectory() {
    const tempDirectory = process.env["RUNNER_TEMP"] || "";
    $8EjUb$assert.ok(tempDirectory, "Expected RUNNER_TEMP to be defined");
    return tempDirectory;
}
/**
 * Gets a global variable
 */ function $ac4e61474dcd488a$var$_getGlobal(key, defaultValue) {
    /* eslint-disable @typescript-eslint/no-explicit-any */ const value = $parcel$global[key];
    /* eslint-enable @typescript-eslint/no-explicit-any */ return value !== undefined ? value : defaultValue;
}
/**
 * Returns an array of unique values.
 * @param values Values to make unique.
 */ function $ac4e61474dcd488a$var$_unique(values) {
    return Array.from(new Set(values));
}

});
parcelRequire.register("13d93", function(module, exports) {
"use strict";
var $0c40449c87a39485$var$__awaiter = module.exports && module.exports.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var $0c40449c87a39485$var$__importStar = module.exports && module.exports.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    }
    result["default"] = mod;
    return result;
};
Object.defineProperty(module.exports, "__esModule", {
    value: true
});

var $loWO8 = parcelRequire("loWO8");

var $2C42i = parcelRequire("2C42i");

var $biVhD = parcelRequire("biVhD");

const $0c40449c87a39485$var$os = $0c40449c87a39485$var$__importStar($8EjUb$os);

const $0c40449c87a39485$var$path = $0c40449c87a39485$var$__importStar($8EjUb$path);
/**
 * The code to exit an action
 */ var $0c40449c87a39485$var$ExitCode;
(function(ExitCode) {
    /**
     * A code indicating that the action was successful
     */ ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */ ExitCode[ExitCode["Failure"] = 1] = "Failure";
})($0c40449c87a39485$var$ExitCode = module.exports.ExitCode || (module.exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */ // eslint-disable-next-line @typescript-eslint/no-explicit-any
function $0c40449c87a39485$var$exportVariable(name, val) {
    const convertedVal = $biVhD.toCommandValue(val);
    process.env[name] = convertedVal;
    const filePath = process.env["GITHUB_ENV"] || "";
    if (filePath) {
        const delimiter = "_GitHubActionsFileCommandDelimeter_";
        const commandValue = `${name}<<${delimiter}${$0c40449c87a39485$var$os.EOL}${convertedVal}${$0c40449c87a39485$var$os.EOL}${delimiter}`;
        $2C42i.issueCommand("ENV", commandValue);
    } else $loWO8.issueCommand("set-env", {
        name: name
    }, convertedVal);
}
module.exports.exportVariable = $0c40449c87a39485$var$exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */ function $0c40449c87a39485$var$setSecret(secret) {
    $loWO8.issueCommand("add-mask", {}, secret);
}
module.exports.setSecret = $0c40449c87a39485$var$setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */ function $0c40449c87a39485$var$addPath(inputPath) {
    const filePath = process.env["GITHUB_PATH"] || "";
    if (filePath) $2C42i.issueCommand("PATH", inputPath);
    else $loWO8.issueCommand("add-path", {}, inputPath);
    process.env["PATH"] = `${inputPath}${$0c40449c87a39485$var$path.delimiter}${process.env["PATH"]}`;
}
module.exports.addPath = $0c40449c87a39485$var$addPath;
/**
 * Gets the value of an input.  The value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */ function $0c40449c87a39485$var$getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, "_").toUpperCase()}`] || "";
    if (options && options.required && !val) throw new Error(`Input required and not supplied: ${name}`);
    return val.trim();
}
module.exports.getInput = $0c40449c87a39485$var$getInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */ // eslint-disable-next-line @typescript-eslint/no-explicit-any
function $0c40449c87a39485$var$setOutput(name, value) {
    process.stdout.write($0c40449c87a39485$var$os.EOL);
    $loWO8.issueCommand("set-output", {
        name: name
    }, value);
}
module.exports.setOutput = $0c40449c87a39485$var$setOutput;
/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */ function $0c40449c87a39485$var$setCommandEcho(enabled) {
    $loWO8.issue("echo", enabled ? "on" : "off");
}
module.exports.setCommandEcho = $0c40449c87a39485$var$setCommandEcho;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */ function $0c40449c87a39485$var$setFailed(message) {
    process.exitCode = $0c40449c87a39485$var$ExitCode.Failure;
    $0c40449c87a39485$var$error(message);
}
module.exports.setFailed = $0c40449c87a39485$var$setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Gets whether Actions Step Debug is on or not
 */ function $0c40449c87a39485$var$isDebug() {
    return process.env["RUNNER_DEBUG"] === "1";
}
module.exports.isDebug = $0c40449c87a39485$var$isDebug;
/**
 * Writes debug message to user log
 * @param message debug message
 */ function $0c40449c87a39485$var$debug(message) {
    $loWO8.issueCommand("debug", {}, message);
}
module.exports.debug = $0c40449c87a39485$var$debug;
/**
 * Adds an error issue
 * @param message error issue message. Errors will be converted to string via toString()
 */ function $0c40449c87a39485$var$error(message) {
    $loWO8.issue("error", message instanceof Error ? message.toString() : message);
}
module.exports.error = $0c40449c87a39485$var$error;
/**
 * Adds an warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 */ function $0c40449c87a39485$var$warning(message) {
    $loWO8.issue("warning", message instanceof Error ? message.toString() : message);
}
module.exports.warning = $0c40449c87a39485$var$warning;
/**
 * Writes info to log with console.log.
 * @param message info message
 */ function $0c40449c87a39485$var$info(message) {
    process.stdout.write(message + $0c40449c87a39485$var$os.EOL);
}
module.exports.info = $0c40449c87a39485$var$info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */ function $0c40449c87a39485$var$startGroup(name) {
    $loWO8.issue("group", name);
}
module.exports.startGroup = $0c40449c87a39485$var$startGroup;
/**
 * End an output group.
 */ function $0c40449c87a39485$var$endGroup() {
    $loWO8.issue("endgroup");
}
module.exports.endGroup = $0c40449c87a39485$var$endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */ function $0c40449c87a39485$var$group(name, fn) {
    return $0c40449c87a39485$var$__awaiter(this, void 0, void 0, function*() {
        $0c40449c87a39485$var$startGroup(name);
        let result;
        try {
            result = yield fn();
        } finally{
            $0c40449c87a39485$var$endGroup();
        }
        return result;
    });
}
module.exports.group = $0c40449c87a39485$var$group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */ // eslint-disable-next-line @typescript-eslint/no-explicit-any
function $0c40449c87a39485$var$saveState(name, value) {
    $loWO8.issueCommand("save-state", {
        name: name
    }, value);
}
module.exports.saveState = $0c40449c87a39485$var$saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */ function $0c40449c87a39485$var$getState(name) {
    return process.env[`STATE_${name}`] || "";
}
module.exports.getState = $0c40449c87a39485$var$getState;

});
parcelRequire.register("loWO8", function(module, exports) {
"use strict";
var $f94974d8c27f43cb$var$__importStar = module.exports && module.exports.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    }
    result["default"] = mod;
    return result;
};
Object.defineProperty(module.exports, "__esModule", {
    value: true
});

const $f94974d8c27f43cb$var$os = $f94974d8c27f43cb$var$__importStar($8EjUb$os);

var $biVhD = parcelRequire("biVhD");
/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */ function $f94974d8c27f43cb$var$issueCommand(command, properties, message) {
    const cmd = new $f94974d8c27f43cb$var$Command(command, properties, message);
    process.stdout.write(cmd.toString() + $f94974d8c27f43cb$var$os.EOL);
}
module.exports.issueCommand = $f94974d8c27f43cb$var$issueCommand;
function $f94974d8c27f43cb$var$issue(name, message = "") {
    $f94974d8c27f43cb$var$issueCommand(name, {}, message);
}
module.exports.issue = $f94974d8c27f43cb$var$issue;
const $f94974d8c27f43cb$var$CMD_STRING = "::";
class $f94974d8c27f43cb$var$Command {
    constructor(command, properties, message){
        if (!command) command = "missing.command";
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = $f94974d8c27f43cb$var$CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += " ";
            let first = true;
            for(const key in this.properties)if (this.properties.hasOwnProperty(key)) {
                const val = this.properties[key];
                if (val) {
                    if (first) first = false;
                    else cmdStr += ",";
                    cmdStr += `${key}=${$f94974d8c27f43cb$var$escapeProperty(val)}`;
                }
            }
        }
        cmdStr += `${$f94974d8c27f43cb$var$CMD_STRING}${$f94974d8c27f43cb$var$escapeData(this.message)}`;
        return cmdStr;
    }
}
function $f94974d8c27f43cb$var$escapeData(s) {
    return $biVhD.toCommandValue(s).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
}
function $f94974d8c27f43cb$var$escapeProperty(s) {
    return $biVhD.toCommandValue(s).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A").replace(/:/g, "%3A").replace(/,/g, "%2C");
}

});
parcelRequire.register("biVhD", function(module, exports) {
"use strict";
// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */ Object.defineProperty(module.exports, "__esModule", {
    value: true
});
/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */ function $83adcf6f31361051$var$toCommandValue(input) {
    if (input === null || input === undefined) return "";
    else if (typeof input === "string" || input instanceof String) return input;
    return JSON.stringify(input);
}
module.exports.toCommandValue = $83adcf6f31361051$var$toCommandValue;

});


parcelRequire.register("2C42i", function(module, exports) {
"use strict";
// For internal use, subject to change.
var $1e7242d8f7d8a15b$var$__importStar = module.exports && module.exports.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    }
    result["default"] = mod;
    return result;
};
Object.defineProperty(module.exports, "__esModule", {
    value: true
});

// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */ const $1e7242d8f7d8a15b$var$fs = $1e7242d8f7d8a15b$var$__importStar($8EjUb$fs);

const $1e7242d8f7d8a15b$var$os = $1e7242d8f7d8a15b$var$__importStar($8EjUb$os);

var $biVhD = parcelRequire("biVhD");
function $1e7242d8f7d8a15b$var$issueCommand(command, message) {
    const filePath = process.env[`GITHUB_${command}`];
    if (!filePath) throw new Error(`Unable to find environment variable for file command ${command}`);
    if (!$1e7242d8f7d8a15b$var$fs.existsSync(filePath)) throw new Error(`Missing file at path: ${filePath}`);
    $1e7242d8f7d8a15b$var$fs.appendFileSync(filePath, `${$biVhD.toCommandValue(message)}${$1e7242d8f7d8a15b$var$os.EOL}`, {
        encoding: "utf8"
    });
}
module.exports.issueCommand = $1e7242d8f7d8a15b$var$issueCommand;

});


parcelRequire.register("lH4cv", function(module, exports) {
"use strict";
var $fcb0df4a0c269e31$var$__createBinding = module.exports && module.exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
        enumerable: true,
        get: function() {
            return m[k];
        }
    });
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var $fcb0df4a0c269e31$var$__setModuleDefault = module.exports && module.exports.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var $fcb0df4a0c269e31$var$__importStar = module.exports && module.exports.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.hasOwnProperty.call(mod, k)) $fcb0df4a0c269e31$var$__createBinding(result, mod, k);
    }
    $fcb0df4a0c269e31$var$__setModuleDefault(result, mod);
    return result;
};
var $fcb0df4a0c269e31$var$__awaiter = module.exports && module.exports.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.findInPath = module.exports.which = module.exports.mkdirP = module.exports.rmRF = module.exports.mv = module.exports.cp = void 0;


const $fcb0df4a0c269e31$var$childProcess = $fcb0df4a0c269e31$var$__importStar($8EjUb$child_process);

const $fcb0df4a0c269e31$var$path = $fcb0df4a0c269e31$var$__importStar($8EjUb$path);


const $fcb0df4a0c269e31$var$ioUtil = $fcb0df4a0c269e31$var$__importStar((parcelRequire("lnbQp")));
const $fcb0df4a0c269e31$var$exec = $8EjUb$util.promisify($fcb0df4a0c269e31$var$childProcess.exec);
const $fcb0df4a0c269e31$var$execFile = $8EjUb$util.promisify($fcb0df4a0c269e31$var$childProcess.execFile);
/**
 * Copies a file or folder.
 * Based off of shelljs - https://github.com/shelljs/shelljs/blob/9237f66c52e5daa40458f94f9565e18e8132f5a6/src/cp.js
 *
 * @param     source    source path
 * @param     dest      destination path
 * @param     options   optional. See CopyOptions.
 */ function $fcb0df4a0c269e31$var$cp(source, dest, options = {}) {
    return $fcb0df4a0c269e31$var$__awaiter(this, void 0, void 0, function*() {
        const { force: force , recursive: recursive , copySourceDirectory: copySourceDirectory  } = $fcb0df4a0c269e31$var$readCopyOptions(options);
        const destStat = (yield $fcb0df4a0c269e31$var$ioUtil.exists(dest)) ? yield $fcb0df4a0c269e31$var$ioUtil.stat(dest) : null;
        // Dest is an existing file, but not forcing
        if (destStat && destStat.isFile() && !force) return;
        // If dest is an existing directory, should copy inside.
        const newDest = destStat && destStat.isDirectory() && copySourceDirectory ? $fcb0df4a0c269e31$var$path.join(dest, $fcb0df4a0c269e31$var$path.basename(source)) : dest;
        if (!(yield $fcb0df4a0c269e31$var$ioUtil.exists(source))) throw new Error(`no such file or directory: ${source}`);
        const sourceStat = yield $fcb0df4a0c269e31$var$ioUtil.stat(source);
        if (sourceStat.isDirectory()) {
            if (!recursive) throw new Error(`Failed to copy. ${source} is a directory, but tried to copy without recursive flag.`);
            else yield $fcb0df4a0c269e31$var$cpDirRecursive(source, newDest, 0, force);
        } else {
            if ($fcb0df4a0c269e31$var$path.relative(source, newDest) === "") // a file cannot be copied to itself
            throw new Error(`'${newDest}' and '${source}' are the same file`);
            yield $fcb0df4a0c269e31$var$copyFile(source, newDest, force);
        }
    });
}
module.exports.cp = $fcb0df4a0c269e31$var$cp;
/**
 * Moves a path.
 *
 * @param     source    source path
 * @param     dest      destination path
 * @param     options   optional. See MoveOptions.
 */ function $fcb0df4a0c269e31$var$mv(source, dest, options = {}) {
    return $fcb0df4a0c269e31$var$__awaiter(this, void 0, void 0, function*() {
        if (yield $fcb0df4a0c269e31$var$ioUtil.exists(dest)) {
            let destExists = true;
            if (yield $fcb0df4a0c269e31$var$ioUtil.isDirectory(dest)) {
                // If dest is directory copy src into dest
                dest = $fcb0df4a0c269e31$var$path.join(dest, $fcb0df4a0c269e31$var$path.basename(source));
                destExists = yield $fcb0df4a0c269e31$var$ioUtil.exists(dest);
            }
            if (destExists) {
                if (options.force == null || options.force) yield $fcb0df4a0c269e31$var$rmRF(dest);
                else throw new Error("Destination already exists");
            }
        }
        yield $fcb0df4a0c269e31$var$mkdirP($fcb0df4a0c269e31$var$path.dirname(dest));
        yield $fcb0df4a0c269e31$var$ioUtil.rename(source, dest);
    });
}
module.exports.mv = $fcb0df4a0c269e31$var$mv;
/**
 * Remove a path recursively with force
 *
 * @param inputPath path to remove
 */ function $fcb0df4a0c269e31$var$rmRF(inputPath) {
    return $fcb0df4a0c269e31$var$__awaiter(this, void 0, void 0, function*() {
        if ($fcb0df4a0c269e31$var$ioUtil.IS_WINDOWS) {
            // Node doesn't provide a delete operation, only an unlink function. This means that if the file is being used by another
            // program (e.g. antivirus), it won't be deleted. To address this, we shell out the work to rd/del.
            // Check for invalid characters
            // https://docs.microsoft.com/en-us/windows/win32/fileio/naming-a-file
            if (/[*"<>|]/.test(inputPath)) throw new Error('File path must not contain `*`, `"`, `<`, `>` or `|` on Windows');
            try {
                const cmdPath = $fcb0df4a0c269e31$var$ioUtil.getCmdPath();
                if (yield $fcb0df4a0c269e31$var$ioUtil.isDirectory(inputPath, true)) yield $fcb0df4a0c269e31$var$exec(`${cmdPath} /s /c "rd /s /q "%inputPath%""`, {
                    env: {
                        inputPath: inputPath
                    }
                });
                else yield $fcb0df4a0c269e31$var$exec(`${cmdPath} /s /c "del /f /a "%inputPath%""`, {
                    env: {
                        inputPath: inputPath
                    }
                });
            } catch (err) {
                // if you try to delete a file that doesn't exist, desired result is achieved
                // other errors are valid
                if (err.code !== "ENOENT") throw err;
            }
            // Shelling out fails to remove a symlink folder with missing source, this unlink catches that
            try {
                yield $fcb0df4a0c269e31$var$ioUtil.unlink(inputPath);
            } catch (err) {
                // if you try to delete a file that doesn't exist, desired result is achieved
                // other errors are valid
                if (err.code !== "ENOENT") throw err;
            }
        } else {
            let isDir = false;
            try {
                isDir = yield $fcb0df4a0c269e31$var$ioUtil.isDirectory(inputPath);
            } catch (err) {
                // if you try to delete a file that doesn't exist, desired result is achieved
                // other errors are valid
                if (err.code !== "ENOENT") throw err;
                return;
            }
            if (isDir) yield $fcb0df4a0c269e31$var$execFile(`rm`, [
                `-rf`,
                `${inputPath}`
            ]);
            else yield $fcb0df4a0c269e31$var$ioUtil.unlink(inputPath);
        }
    });
}
module.exports.rmRF = $fcb0df4a0c269e31$var$rmRF;
/**
 * Make a directory.  Creates the full path with folders in between
 * Will throw if it fails
 *
 * @param   fsPath        path to create
 * @returns Promise<void>
 */ function $fcb0df4a0c269e31$var$mkdirP(fsPath) {
    return $fcb0df4a0c269e31$var$__awaiter(this, void 0, void 0, function*() {
        $8EjUb$assert.ok(fsPath, "a path argument must be provided");
        yield $fcb0df4a0c269e31$var$ioUtil.mkdir(fsPath, {
            recursive: true
        });
    });
}
module.exports.mkdirP = $fcb0df4a0c269e31$var$mkdirP;
/**
 * Returns path of a tool had the tool actually been invoked.  Resolves via paths.
 * If you check and the tool does not exist, it will throw.
 *
 * @param     tool              name of the tool
 * @param     check             whether to check if tool exists
 * @returns   Promise<string>   path to tool
 */ function $fcb0df4a0c269e31$var$which(tool, check) {
    return $fcb0df4a0c269e31$var$__awaiter(this, void 0, void 0, function*() {
        if (!tool) throw new Error("parameter 'tool' is required");
        // recursive when check=true
        if (check) {
            const result = yield $fcb0df4a0c269e31$var$which(tool, false);
            if (!result) {
                if ($fcb0df4a0c269e31$var$ioUtil.IS_WINDOWS) throw new Error(`Unable to locate executable file: ${tool}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also verify the file has a valid extension for an executable file.`);
                else throw new Error(`Unable to locate executable file: ${tool}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also check the file mode to verify the file is executable.`);
            }
            return result;
        }
        const matches = yield $fcb0df4a0c269e31$var$findInPath(tool);
        if (matches && matches.length > 0) return matches[0];
        return "";
    });
}
module.exports.which = $fcb0df4a0c269e31$var$which;
/**
 * Returns a list of all occurrences of the given tool on the system path.
 *
 * @returns   Promise<string[]>  the paths of the tool
 */ function $fcb0df4a0c269e31$var$findInPath(tool) {
    return $fcb0df4a0c269e31$var$__awaiter(this, void 0, void 0, function*() {
        if (!tool) throw new Error("parameter 'tool' is required");
        // build the list of extensions to try
        const extensions = [];
        if ($fcb0df4a0c269e31$var$ioUtil.IS_WINDOWS && process.env["PATHEXT"]) {
            for (const extension of process.env["PATHEXT"].split($fcb0df4a0c269e31$var$path.delimiter))if (extension) extensions.push(extension);
        }
        // if it's rooted, return it if exists. otherwise return empty.
        if ($fcb0df4a0c269e31$var$ioUtil.isRooted(tool)) {
            const filePath = yield $fcb0df4a0c269e31$var$ioUtil.tryGetExecutablePath(tool, extensions);
            if (filePath) return [
                filePath
            ];
            return [];
        }
        // if any path separators, return empty
        if (tool.includes($fcb0df4a0c269e31$var$path.sep)) return [];
        // build the list of directories
        //
        // Note, technically "where" checks the current directory on Windows. From a toolkit perspective,
        // it feels like we should not do this. Checking the current directory seems like more of a use
        // case of a shell, and the which() function exposed by the toolkit should strive for consistency
        // across platforms.
        const directories = [];
        if (process.env.PATH) {
            for (const p of process.env.PATH.split($fcb0df4a0c269e31$var$path.delimiter))if (p) directories.push(p);
        }
        // find all matches
        const matches = [];
        for (const directory of directories){
            const filePath = yield $fcb0df4a0c269e31$var$ioUtil.tryGetExecutablePath($fcb0df4a0c269e31$var$path.join(directory, tool), extensions);
            if (filePath) matches.push(filePath);
        }
        return matches;
    });
}
module.exports.findInPath = $fcb0df4a0c269e31$var$findInPath;
function $fcb0df4a0c269e31$var$readCopyOptions(options) {
    const force = options.force == null ? true : options.force;
    const recursive = Boolean(options.recursive);
    const copySourceDirectory = options.copySourceDirectory == null ? true : Boolean(options.copySourceDirectory);
    return {
        force: force,
        recursive: recursive,
        copySourceDirectory: copySourceDirectory
    };
}
function $fcb0df4a0c269e31$var$cpDirRecursive(sourceDir, destDir, currentDepth, force) {
    return $fcb0df4a0c269e31$var$__awaiter(this, void 0, void 0, function*() {
        // Ensure there is not a run away recursive copy
        if (currentDepth >= 255) return;
        currentDepth++;
        yield $fcb0df4a0c269e31$var$mkdirP(destDir);
        const files = yield $fcb0df4a0c269e31$var$ioUtil.readdir(sourceDir);
        for (const fileName of files){
            const srcFile = `${sourceDir}/${fileName}`;
            const destFile = `${destDir}/${fileName}`;
            const srcFileStat = yield $fcb0df4a0c269e31$var$ioUtil.lstat(srcFile);
            if (srcFileStat.isDirectory()) // Recurse
            yield $fcb0df4a0c269e31$var$cpDirRecursive(srcFile, destFile, currentDepth, force);
            else yield $fcb0df4a0c269e31$var$copyFile(srcFile, destFile, force);
        }
        // Change the mode for the newly created directory
        yield $fcb0df4a0c269e31$var$ioUtil.chmod(destDir, (yield $fcb0df4a0c269e31$var$ioUtil.stat(sourceDir)).mode);
    });
}
// Buffered file copy
function $fcb0df4a0c269e31$var$copyFile(srcFile, destFile, force) {
    return $fcb0df4a0c269e31$var$__awaiter(this, void 0, void 0, function*() {
        if ((yield $fcb0df4a0c269e31$var$ioUtil.lstat(srcFile)).isSymbolicLink()) {
            // unlink/re-link it
            try {
                yield $fcb0df4a0c269e31$var$ioUtil.lstat(destFile);
                yield $fcb0df4a0c269e31$var$ioUtil.unlink(destFile);
            } catch (e) {
                // Try to override file permission
                if (e.code === "EPERM") {
                    yield $fcb0df4a0c269e31$var$ioUtil.chmod(destFile, "0666");
                    yield $fcb0df4a0c269e31$var$ioUtil.unlink(destFile);
                }
            // other errors = it doesn't exist, no work to do
            }
            // Copy over symlink
            const symlinkFull = yield $fcb0df4a0c269e31$var$ioUtil.readlink(srcFile);
            yield $fcb0df4a0c269e31$var$ioUtil.symlink(symlinkFull, destFile, $fcb0df4a0c269e31$var$ioUtil.IS_WINDOWS ? "junction" : null);
        } else if (!(yield $fcb0df4a0c269e31$var$ioUtil.exists(destFile)) || force) yield $fcb0df4a0c269e31$var$ioUtil.copyFile(srcFile, destFile);
    });
}

});
parcelRequire.register("lnbQp", function(module, exports) {
"use strict";
var $f8f4eefdd2ce4d0d$var$__createBinding = module.exports && module.exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
        enumerable: true,
        get: function() {
            return m[k];
        }
    });
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var $f8f4eefdd2ce4d0d$var$__setModuleDefault = module.exports && module.exports.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var $f8f4eefdd2ce4d0d$var$__importStar = module.exports && module.exports.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.hasOwnProperty.call(mod, k)) $f8f4eefdd2ce4d0d$var$__createBinding(result, mod, k);
    }
    $f8f4eefdd2ce4d0d$var$__setModuleDefault(result, mod);
    return result;
};
var $f8f4eefdd2ce4d0d$var$__awaiter = module.exports && module.exports.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var $f8f4eefdd2ce4d0d$var$_a;
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.getCmdPath = module.exports.tryGetExecutablePath = module.exports.isRooted = module.exports.isDirectory = module.exports.exists = module.exports.IS_WINDOWS = module.exports.unlink = module.exports.symlink = module.exports.stat = module.exports.rmdir = module.exports.rename = module.exports.readlink = module.exports.readdir = module.exports.mkdir = module.exports.lstat = module.exports.copyFile = module.exports.chmod = void 0;

const $f8f4eefdd2ce4d0d$var$fs = $f8f4eefdd2ce4d0d$var$__importStar($8EjUb$fs);

const $f8f4eefdd2ce4d0d$var$path = $f8f4eefdd2ce4d0d$var$__importStar($8EjUb$path);
$f8f4eefdd2ce4d0d$var$_a = $f8f4eefdd2ce4d0d$var$fs.promises, module.exports.chmod = $f8f4eefdd2ce4d0d$var$_a.chmod, module.exports.copyFile = $f8f4eefdd2ce4d0d$var$_a.copyFile, module.exports.lstat = $f8f4eefdd2ce4d0d$var$_a.lstat, module.exports.mkdir = $f8f4eefdd2ce4d0d$var$_a.mkdir, module.exports.readdir = $f8f4eefdd2ce4d0d$var$_a.readdir, module.exports.readlink = $f8f4eefdd2ce4d0d$var$_a.readlink, module.exports.rename = $f8f4eefdd2ce4d0d$var$_a.rename, module.exports.rmdir = $f8f4eefdd2ce4d0d$var$_a.rmdir, module.exports.stat = $f8f4eefdd2ce4d0d$var$_a.stat, module.exports.symlink = $f8f4eefdd2ce4d0d$var$_a.symlink, module.exports.unlink = $f8f4eefdd2ce4d0d$var$_a.unlink;
module.exports.IS_WINDOWS = process.platform === "win32";
function $f8f4eefdd2ce4d0d$var$exists(fsPath) {
    return $f8f4eefdd2ce4d0d$var$__awaiter(this, void 0, void 0, function*() {
        try {
            yield module.exports.stat(fsPath);
        } catch (err) {
            if (err.code === "ENOENT") return false;
            throw err;
        }
        return true;
    });
}
module.exports.exists = $f8f4eefdd2ce4d0d$var$exists;
function $f8f4eefdd2ce4d0d$var$isDirectory(fsPath, useStat = false) {
    return $f8f4eefdd2ce4d0d$var$__awaiter(this, void 0, void 0, function*() {
        const stats = useStat ? yield module.exports.stat(fsPath) : yield module.exports.lstat(fsPath);
        return stats.isDirectory();
    });
}
module.exports.isDirectory = $f8f4eefdd2ce4d0d$var$isDirectory;
/**
 * On OSX/Linux, true if path starts with '/'. On Windows, true for paths like:
 * \, \hello, \\hello\share, C:, and C:\hello (and corresponding alternate separator cases).
 */ function $f8f4eefdd2ce4d0d$var$isRooted(p) {
    p = $f8f4eefdd2ce4d0d$var$normalizeSeparators(p);
    if (!p) throw new Error('isRooted() parameter "p" cannot be empty');
    if (module.exports.IS_WINDOWS) return p.startsWith("\\") || /^[A-Z]:/i.test(p) // e.g. \ or \hello or \\hello
    ; // e.g. C: or C:\hello
    return p.startsWith("/");
}
module.exports.isRooted = $f8f4eefdd2ce4d0d$var$isRooted;
/**
 * Best effort attempt to determine whether a file exists and is executable.
 * @param filePath    file path to check
 * @param extensions  additional file extensions to try
 * @return if file exists and is executable, returns the file path. otherwise empty string.
 */ function $f8f4eefdd2ce4d0d$var$tryGetExecutablePath(filePath, extensions) {
    return $f8f4eefdd2ce4d0d$var$__awaiter(this, void 0, void 0, function*() {
        let stats = undefined;
        try {
            // test file exists
            stats = yield module.exports.stat(filePath);
        } catch (err) {
            if (err.code !== "ENOENT") // eslint-disable-next-line no-console
            console.log(`Unexpected error attempting to determine if executable file exists '${filePath}': ${err}`);
        }
        if (stats && stats.isFile()) {
            if (module.exports.IS_WINDOWS) {
                // on Windows, test for valid extension
                const upperExt = $f8f4eefdd2ce4d0d$var$path.extname(filePath).toUpperCase();
                if (extensions.some((validExt)=>validExt.toUpperCase() === upperExt)) return filePath;
            } else {
                if ($f8f4eefdd2ce4d0d$var$isUnixExecutable(stats)) return filePath;
            }
        }
        // try each extension
        const originalFilePath = filePath;
        for (const extension of extensions){
            filePath = originalFilePath + extension;
            stats = undefined;
            try {
                stats = yield module.exports.stat(filePath);
            } catch (err) {
                if (err.code !== "ENOENT") // eslint-disable-next-line no-console
                console.log(`Unexpected error attempting to determine if executable file exists '${filePath}': ${err}`);
            }
            if (stats && stats.isFile()) {
                if (module.exports.IS_WINDOWS) {
                    // preserve the case of the actual file (since an extension was appended)
                    try {
                        const directory = $f8f4eefdd2ce4d0d$var$path.dirname(filePath);
                        const upperName = $f8f4eefdd2ce4d0d$var$path.basename(filePath).toUpperCase();
                        for (const actualName of yield module.exports.readdir(directory))if (upperName === actualName.toUpperCase()) {
                            filePath = $f8f4eefdd2ce4d0d$var$path.join(directory, actualName);
                            break;
                        }
                    } catch (err) {
                        // eslint-disable-next-line no-console
                        console.log(`Unexpected error attempting to determine the actual case of the file '${filePath}': ${err}`);
                    }
                    return filePath;
                } else {
                    if ($f8f4eefdd2ce4d0d$var$isUnixExecutable(stats)) return filePath;
                }
            }
        }
        return "";
    });
}
module.exports.tryGetExecutablePath = $f8f4eefdd2ce4d0d$var$tryGetExecutablePath;
function $f8f4eefdd2ce4d0d$var$normalizeSeparators(p) {
    p = p || "";
    if (module.exports.IS_WINDOWS) {
        // convert slashes on Windows
        p = p.replace(/\//g, "\\");
        // remove redundant slashes
        return p.replace(/\\\\+/g, "\\");
    }
    // remove redundant slashes
    return p.replace(/\/\/+/g, "/");
}
// on Mac/Linux, test the execute bit
//     R   W  X  R  W X R W X
//   256 128 64 32 16 8 4 2 1
function $f8f4eefdd2ce4d0d$var$isUnixExecutable(stats) {
    return (stats.mode & 1) > 0 || (stats.mode & 8) > 0 && stats.gid === process.getgid() || (stats.mode & 64) > 0 && stats.uid === process.getuid();
}
// Get the path of cmd.exe in windows
function $f8f4eefdd2ce4d0d$var$getCmdPath() {
    var _a;
    return (_a = process.env["COMSPEC"]) !== null && _a !== void 0 ? _a : `cmd.exe`;
}
module.exports.getCmdPath = $f8f4eefdd2ce4d0d$var$getCmdPath;

});


parcelRequire.register("dB6sP", function(module, exports) {
"use strict";
var $9e63beac3e2bdb61$var$__createBinding = module.exports && module.exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
        enumerable: true,
        get: function() {
            return m[k];
        }
    });
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var $9e63beac3e2bdb61$var$__setModuleDefault = module.exports && module.exports.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var $9e63beac3e2bdb61$var$__importStar = module.exports && module.exports.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.hasOwnProperty.call(mod, k)) $9e63beac3e2bdb61$var$__createBinding(result, mod, k);
    }
    $9e63beac3e2bdb61$var$__setModuleDefault(result, mod);
    return result;
};
var $9e63beac3e2bdb61$var$__awaiter = module.exports && module.exports.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports._readLinuxVersionFile = module.exports._getOsVersion = module.exports._findMatch = void 0;

const $9e63beac3e2bdb61$var$semver = $9e63beac3e2bdb61$var$__importStar((parcelRequire("fMMin")));

var $13d93 = parcelRequire("13d93");



function $9e63beac3e2bdb61$var$_findMatch(versionSpec, stable, candidates, archFilter) {
    return $9e63beac3e2bdb61$var$__awaiter(this, void 0, void 0, function*() {
        const platFilter = $8EjUb$os.platform();
        let result;
        let match;
        let file;
        for (const candidate of candidates){
            const version = candidate.version;
            $13d93.debug(`check ${version} satisfies ${versionSpec}`);
            if ($9e63beac3e2bdb61$var$semver.satisfies(version, versionSpec) && (!stable || candidate.stable === stable)) {
                file = candidate.files.find((item)=>{
                    $13d93.debug(`${item.arch}===${archFilter} && ${item.platform}===${platFilter}`);
                    let chk = item.arch === archFilter && item.platform === platFilter;
                    if (chk && item.platform_version) {
                        const osVersion = module.exports._getOsVersion();
                        if (osVersion === item.platform_version) chk = true;
                        else chk = $9e63beac3e2bdb61$var$semver.satisfies(osVersion, item.platform_version);
                    }
                    return chk;
                });
                if (file) {
                    $13d93.debug(`matched ${candidate.version}`);
                    match = candidate;
                    break;
                }
            }
        }
        if (match && file) {
            // clone since we're mutating the file list to be only the file that matches
            result = Object.assign({}, match);
            result.files = [
                file
            ];
        }
        return result;
    });
}
module.exports._findMatch = $9e63beac3e2bdb61$var$_findMatch;
function $9e63beac3e2bdb61$var$_getOsVersion() {
    // TODO: add windows and other linux, arm variants
    // right now filtering on version is only an ubuntu and macos scenario for tools we build for hosted (python)
    const plat = $8EjUb$os.platform();
    let version = "";
    if (plat === "darwin") version = $8EjUb$child_process.execSync("sw_vers -productVersion").toString();
    else if (plat === "linux") {
        // lsb_release process not in some containers, readfile
        // Run cat /etc/lsb-release
        // DISTRIB_ID=Ubuntu
        // DISTRIB_RELEASE=18.04
        // DISTRIB_CODENAME=bionic
        // DISTRIB_DESCRIPTION="Ubuntu 18.04.4 LTS"
        const lsbContents = module.exports._readLinuxVersionFile();
        if (lsbContents) {
            const lines = lsbContents.split("\n");
            for (const line of lines){
                const parts = line.split("=");
                if (parts.length === 2 && (parts[0].trim() === "VERSION_ID" || parts[0].trim() === "DISTRIB_RELEASE")) {
                    version = parts[1].trim().replace(/^"/, "").replace(/"$/, "");
                    break;
                }
            }
        }
    }
    return version;
}
module.exports._getOsVersion = $9e63beac3e2bdb61$var$_getOsVersion;
function $9e63beac3e2bdb61$var$_readLinuxVersionFile() {
    const lsbReleaseFile = "/etc/lsb-release";
    const osReleaseFile = "/etc/os-release";
    let contents = "";
    if ($8EjUb$fs.existsSync(lsbReleaseFile)) contents = $8EjUb$fs.readFileSync(lsbReleaseFile).toString();
    else if ($8EjUb$fs.existsSync(osReleaseFile)) contents = $8EjUb$fs.readFileSync(osReleaseFile).toString();
    return contents;
}
module.exports._readLinuxVersionFile = $9e63beac3e2bdb61$var$_readLinuxVersionFile;

});
parcelRequire.register("fMMin", function(module, exports) {
exports = module.exports = SemVer;
var debug;
/* istanbul ignore next */ if (typeof process === "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG)) debug = function() {
    var args = Array.prototype.slice.call(arguments, 0);
    args.unshift("SEMVER");
    console.log.apply(console, args);
};
else debug = function() {};
// Note: this is the semver.org version of the spec that it implements
// Not necessarily the package version of this code.
exports.SEMVER_SPEC_VERSION = "2.0.0";
var MAX_LENGTH = 256;
var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */ 9007199254740991;
// Max safe segment length for coercion.
var MAX_SAFE_COMPONENT_LENGTH = 16;
// The actual regexps go on exports.re
var re = exports.re = [];
var src = exports.src = [];
var t = exports.tokens = {};
var R = 0;
function tok(n) {
    t[n] = R++;
}
// The following Regular Expressions can be used for tokenizing,
// validating, and parsing SemVer version strings.
// ## Numeric Identifier
// A single `0`, or a non-zero digit followed by zero or more digits.
tok("NUMERICIDENTIFIER");
src[t.NUMERICIDENTIFIER] = "0|[1-9]\\d*";
tok("NUMERICIDENTIFIERLOOSE");
src[t.NUMERICIDENTIFIERLOOSE] = "[0-9]+";
// ## Non-numeric Identifier
// Zero or more digits, followed by a letter or hyphen, and then zero or
// more letters, digits, or hyphens.
tok("NONNUMERICIDENTIFIER");
src[t.NONNUMERICIDENTIFIER] = "\\d*[a-zA-Z-][a-zA-Z0-9-]*";
// ## Main Version
// Three dot-separated numeric identifiers.
tok("MAINVERSION");
src[t.MAINVERSION] = "(" + src[t.NUMERICIDENTIFIER] + ")\\." + "(" + src[t.NUMERICIDENTIFIER] + ")\\." + "(" + src[t.NUMERICIDENTIFIER] + ")";
tok("MAINVERSIONLOOSE");
src[t.MAINVERSIONLOOSE] = "(" + src[t.NUMERICIDENTIFIERLOOSE] + ")\\." + "(" + src[t.NUMERICIDENTIFIERLOOSE] + ")\\." + "(" + src[t.NUMERICIDENTIFIERLOOSE] + ")";
// ## Pre-release Version Identifier
// A numeric identifier, or a non-numeric identifier.
tok("PRERELEASEIDENTIFIER");
src[t.PRERELEASEIDENTIFIER] = "(?:" + src[t.NUMERICIDENTIFIER] + "|" + src[t.NONNUMERICIDENTIFIER] + ")";
tok("PRERELEASEIDENTIFIERLOOSE");
src[t.PRERELEASEIDENTIFIERLOOSE] = "(?:" + src[t.NUMERICIDENTIFIERLOOSE] + "|" + src[t.NONNUMERICIDENTIFIER] + ")";
// ## Pre-release Version
// Hyphen, followed by one or more dot-separated pre-release version
// identifiers.
tok("PRERELEASE");
src[t.PRERELEASE] = "(?:-(" + src[t.PRERELEASEIDENTIFIER] + "(?:\\." + src[t.PRERELEASEIDENTIFIER] + ")*))";
tok("PRERELEASELOOSE");
src[t.PRERELEASELOOSE] = "(?:-?(" + src[t.PRERELEASEIDENTIFIERLOOSE] + "(?:\\." + src[t.PRERELEASEIDENTIFIERLOOSE] + ")*))";
// ## Build Metadata Identifier
// Any combination of digits, letters, or hyphens.
tok("BUILDIDENTIFIER");
src[t.BUILDIDENTIFIER] = "[0-9A-Za-z-]+";
// ## Build Metadata
// Plus sign, followed by one or more period-separated build metadata
// identifiers.
tok("BUILD");
src[t.BUILD] = "(?:\\+(" + src[t.BUILDIDENTIFIER] + "(?:\\." + src[t.BUILDIDENTIFIER] + ")*))";
// ## Full Version String
// A main version, followed optionally by a pre-release version and
// build metadata.
// Note that the only major, minor, patch, and pre-release sections of
// the version string are capturing groups.  The build metadata is not a
// capturing group, because it should not ever be used in version
// comparison.
tok("FULL");
tok("FULLPLAIN");
src[t.FULLPLAIN] = "v?" + src[t.MAINVERSION] + src[t.PRERELEASE] + "?" + src[t.BUILD] + "?";
src[t.FULL] = "^" + src[t.FULLPLAIN] + "$";
// like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
// common in the npm registry.
tok("LOOSEPLAIN");
src[t.LOOSEPLAIN] = "[v=\\s]*" + src[t.MAINVERSIONLOOSE] + src[t.PRERELEASELOOSE] + "?" + src[t.BUILD] + "?";
tok("LOOSE");
src[t.LOOSE] = "^" + src[t.LOOSEPLAIN] + "$";
tok("GTLT");
src[t.GTLT] = "((?:<|>)?=?)";
// Something like "2.*" or "1.2.x".
// Note that "x.x" is a valid xRange identifer, meaning "any version"
// Only the first item is strictly required.
tok("XRANGEIDENTIFIERLOOSE");
src[t.XRANGEIDENTIFIERLOOSE] = src[t.NUMERICIDENTIFIERLOOSE] + "|x|X|\\*";
tok("XRANGEIDENTIFIER");
src[t.XRANGEIDENTIFIER] = src[t.NUMERICIDENTIFIER] + "|x|X|\\*";
tok("XRANGEPLAIN");
src[t.XRANGEPLAIN] = "[v=\\s]*(" + src[t.XRANGEIDENTIFIER] + ")" + "(?:\\.(" + src[t.XRANGEIDENTIFIER] + ")" + "(?:\\.(" + src[t.XRANGEIDENTIFIER] + ")" + "(?:" + src[t.PRERELEASE] + ")?" + src[t.BUILD] + "?" + ")?)?";
tok("XRANGEPLAINLOOSE");
src[t.XRANGEPLAINLOOSE] = "[v=\\s]*(" + src[t.XRANGEIDENTIFIERLOOSE] + ")" + "(?:\\.(" + src[t.XRANGEIDENTIFIERLOOSE] + ")" + "(?:\\.(" + src[t.XRANGEIDENTIFIERLOOSE] + ")" + "(?:" + src[t.PRERELEASELOOSE] + ")?" + src[t.BUILD] + "?" + ")?)?";
tok("XRANGE");
src[t.XRANGE] = "^" + src[t.GTLT] + "\\s*" + src[t.XRANGEPLAIN] + "$";
tok("XRANGELOOSE");
src[t.XRANGELOOSE] = "^" + src[t.GTLT] + "\\s*" + src[t.XRANGEPLAINLOOSE] + "$";
// Coercion.
// Extract anything that could conceivably be a part of a valid semver
tok("COERCE");
src[t.COERCE] = "(^|[^\\d])(\\d{1," + MAX_SAFE_COMPONENT_LENGTH + "})" + "(?:\\.(\\d{1," + MAX_SAFE_COMPONENT_LENGTH + "}))?" + "(?:\\.(\\d{1," + MAX_SAFE_COMPONENT_LENGTH + "}))?" + "(?:$|[^\\d])";
tok("COERCERTL");
re[t.COERCERTL] = new RegExp(src[t.COERCE], "g");
// Tilde ranges.
// Meaning is "reasonably at or greater than"
tok("LONETILDE");
src[t.LONETILDE] = "(?:~>?)";
tok("TILDETRIM");
src[t.TILDETRIM] = "(\\s*)" + src[t.LONETILDE] + "\\s+";
re[t.TILDETRIM] = new RegExp(src[t.TILDETRIM], "g");
var tildeTrimReplace = "$1~";
tok("TILDE");
src[t.TILDE] = "^" + src[t.LONETILDE] + src[t.XRANGEPLAIN] + "$";
tok("TILDELOOSE");
src[t.TILDELOOSE] = "^" + src[t.LONETILDE] + src[t.XRANGEPLAINLOOSE] + "$";
// Caret ranges.
// Meaning is "at least and backwards compatible with"
tok("LONECARET");
src[t.LONECARET] = "(?:\\^)";
tok("CARETTRIM");
src[t.CARETTRIM] = "(\\s*)" + src[t.LONECARET] + "\\s+";
re[t.CARETTRIM] = new RegExp(src[t.CARETTRIM], "g");
var caretTrimReplace = "$1^";
tok("CARET");
src[t.CARET] = "^" + src[t.LONECARET] + src[t.XRANGEPLAIN] + "$";
tok("CARETLOOSE");
src[t.CARETLOOSE] = "^" + src[t.LONECARET] + src[t.XRANGEPLAINLOOSE] + "$";
// A simple gt/lt/eq thing, or just "" to indicate "any version"
tok("COMPARATORLOOSE");
src[t.COMPARATORLOOSE] = "^" + src[t.GTLT] + "\\s*(" + src[t.LOOSEPLAIN] + ")$|^$";
tok("COMPARATOR");
src[t.COMPARATOR] = "^" + src[t.GTLT] + "\\s*(" + src[t.FULLPLAIN] + ")$|^$";
// An expression to strip any whitespace between the gtlt and the thing
// it modifies, so that `> 1.2.3` ==> `>1.2.3`
tok("COMPARATORTRIM");
src[t.COMPARATORTRIM] = "(\\s*)" + src[t.GTLT] + "\\s*(" + src[t.LOOSEPLAIN] + "|" + src[t.XRANGEPLAIN] + ")";
// this one has to use the /g flag
re[t.COMPARATORTRIM] = new RegExp(src[t.COMPARATORTRIM], "g");
var comparatorTrimReplace = "$1$2$3";
// Something like `1.2.3 - 1.2.4`
// Note that these all use the loose form, because they'll be
// checked against either the strict or loose comparator form
// later.
tok("HYPHENRANGE");
src[t.HYPHENRANGE] = "^\\s*(" + src[t.XRANGEPLAIN] + ")" + "\\s+-\\s+" + "(" + src[t.XRANGEPLAIN] + ")" + "\\s*$";
tok("HYPHENRANGELOOSE");
src[t.HYPHENRANGELOOSE] = "^\\s*(" + src[t.XRANGEPLAINLOOSE] + ")" + "\\s+-\\s+" + "(" + src[t.XRANGEPLAINLOOSE] + ")" + "\\s*$";
// Star ranges basically just allow anything at all.
tok("STAR");
src[t.STAR] = "(<|>)?=?\\s*\\*";
// Compile to actual regexp objects.
// All are flag-free, unless they were created above with a flag.
for(var i = 0; i < R; i++){
    debug(i, src[i]);
    if (!re[i]) re[i] = new RegExp(src[i]);
}
exports.parse = parse;
function parse(version, options) {
    if (!options || typeof options !== "object") options = {
        loose: !!options,
        includePrerelease: false
    };
    if (version instanceof SemVer) return version;
    if (typeof version !== "string") return null;
    if (version.length > MAX_LENGTH) return null;
    var r = options.loose ? re[t.LOOSE] : re[t.FULL];
    if (!r.test(version)) return null;
    try {
        return new SemVer(version, options);
    } catch (er) {
        return null;
    }
}
exports.valid = valid;
function valid(version, options) {
    var v = parse(version, options);
    return v ? v.version : null;
}
exports.clean = clean;
function clean(version, options) {
    var s = parse(version.trim().replace(/^[=v]+/, ""), options);
    return s ? s.version : null;
}
exports.SemVer = SemVer;
function SemVer(version, options) {
    if (!options || typeof options !== "object") options = {
        loose: !!options,
        includePrerelease: false
    };
    if (version instanceof SemVer) {
        if (version.loose === options.loose) return version;
        else version = version.version;
    } else if (typeof version !== "string") throw new TypeError("Invalid Version: " + version);
    if (version.length > MAX_LENGTH) throw new TypeError("version is longer than " + MAX_LENGTH + " characters");
    if (!(this instanceof SemVer)) return new SemVer(version, options);
    debug("SemVer", version, options);
    this.options = options;
    this.loose = !!options.loose;
    var m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL]);
    if (!m) throw new TypeError("Invalid Version: " + version);
    this.raw = version;
    // these are actually numbers
    this.major = +m[1];
    this.minor = +m[2];
    this.patch = +m[3];
    if (this.major > MAX_SAFE_INTEGER || this.major < 0) throw new TypeError("Invalid major version");
    if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) throw new TypeError("Invalid minor version");
    if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) throw new TypeError("Invalid patch version");
    // numberify any prerelease numeric ids
    if (!m[4]) this.prerelease = [];
    else this.prerelease = m[4].split(".").map(function(id) {
        if (/^[0-9]+$/.test(id)) {
            var num = +id;
            if (num >= 0 && num < MAX_SAFE_INTEGER) return num;
        }
        return id;
    });
    this.build = m[5] ? m[5].split(".") : [];
    this.format();
}
SemVer.prototype.format = function() {
    this.version = this.major + "." + this.minor + "." + this.patch;
    if (this.prerelease.length) this.version += "-" + this.prerelease.join(".");
    return this.version;
};
SemVer.prototype.toString = function() {
    return this.version;
};
SemVer.prototype.compare = function(other) {
    debug("SemVer.compare", this.version, this.options, other);
    if (!(other instanceof SemVer)) other = new SemVer(other, this.options);
    return this.compareMain(other) || this.comparePre(other);
};
SemVer.prototype.compareMain = function(other) {
    if (!(other instanceof SemVer)) other = new SemVer(other, this.options);
    return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
};
SemVer.prototype.comparePre = function(other) {
    if (!(other instanceof SemVer)) other = new SemVer(other, this.options);
    // NOT having a prerelease is > having one
    if (this.prerelease.length && !other.prerelease.length) return -1;
    else if (!this.prerelease.length && other.prerelease.length) return 1;
    else if (!this.prerelease.length && !other.prerelease.length) return 0;
    var i = 0;
    do {
        var a = this.prerelease[i];
        var b = other.prerelease[i];
        debug("prerelease compare", i, a, b);
        if (a === undefined && b === undefined) return 0;
        else if (b === undefined) return 1;
        else if (a === undefined) return -1;
        else if (a === b) continue;
        else return compareIdentifiers(a, b);
    }while (++i);
};
SemVer.prototype.compareBuild = function(other) {
    if (!(other instanceof SemVer)) other = new SemVer(other, this.options);
    var i = 0;
    do {
        var a = this.build[i];
        var b = other.build[i];
        debug("prerelease compare", i, a, b);
        if (a === undefined && b === undefined) return 0;
        else if (b === undefined) return 1;
        else if (a === undefined) return -1;
        else if (a === b) continue;
        else return compareIdentifiers(a, b);
    }while (++i);
};
// preminor will bump the version up to the next minor release, and immediately
// down to pre-release. premajor and prepatch work the same way.
SemVer.prototype.inc = function(release, identifier) {
    switch(release){
        case "premajor":
            this.prerelease.length = 0;
            this.patch = 0;
            this.minor = 0;
            this.major++;
            this.inc("pre", identifier);
            break;
        case "preminor":
            this.prerelease.length = 0;
            this.patch = 0;
            this.minor++;
            this.inc("pre", identifier);
            break;
        case "prepatch":
            // If this is already a prerelease, it will bump to the next version
            // drop any prereleases that might already exist, since they are not
            // relevant at this point.
            this.prerelease.length = 0;
            this.inc("patch", identifier);
            this.inc("pre", identifier);
            break;
        // If the input is a non-prerelease version, this acts the same as
        // prepatch.
        case "prerelease":
            if (this.prerelease.length === 0) this.inc("patch", identifier);
            this.inc("pre", identifier);
            break;
        case "major":
            // If this is a pre-major version, bump up to the same major version.
            // Otherwise increment major.
            // 1.0.0-5 bumps to 1.0.0
            // 1.1.0 bumps to 2.0.0
            if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) this.major++;
            this.minor = 0;
            this.patch = 0;
            this.prerelease = [];
            break;
        case "minor":
            // If this is a pre-minor version, bump up to the same minor version.
            // Otherwise increment minor.
            // 1.2.0-5 bumps to 1.2.0
            // 1.2.1 bumps to 1.3.0
            if (this.patch !== 0 || this.prerelease.length === 0) this.minor++;
            this.patch = 0;
            this.prerelease = [];
            break;
        case "patch":
            // If this is not a pre-release version, it will increment the patch.
            // If it is a pre-release it will bump up to the same patch version.
            // 1.2.0-5 patches to 1.2.0
            // 1.2.0 patches to 1.2.1
            if (this.prerelease.length === 0) this.patch++;
            this.prerelease = [];
            break;
        // This probably shouldn't be used publicly.
        // 1.0.0 "pre" would become 1.0.0-0 which is the wrong direction.
        case "pre":
            if (this.prerelease.length === 0) this.prerelease = [
                0
            ];
            else {
                var i = this.prerelease.length;
                while(--i >= 0)if (typeof this.prerelease[i] === "number") {
                    this.prerelease[i]++;
                    i = -2;
                }
                if (i === -1) // didn't increment anything
                this.prerelease.push(0);
            }
            if (identifier) {
                // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
                // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
                if (this.prerelease[0] === identifier) {
                    if (isNaN(this.prerelease[1])) this.prerelease = [
                        identifier,
                        0
                    ];
                } else this.prerelease = [
                    identifier,
                    0
                ];
            }
            break;
        default:
            throw new Error("invalid increment argument: " + release);
    }
    this.format();
    this.raw = this.version;
    return this;
};
exports.inc = inc;
function inc(version, release, loose, identifier) {
    if (typeof loose === "string") {
        identifier = loose;
        loose = undefined;
    }
    try {
        return new SemVer(version, loose).inc(release, identifier).version;
    } catch (er) {
        return null;
    }
}
exports.diff = diff;
function diff(version1, version2) {
    if (eq(version1, version2)) return null;
    else {
        var v1 = parse(version1);
        var v2 = parse(version2);
        var prefix = "";
        if (v1.prerelease.length || v2.prerelease.length) {
            prefix = "pre";
            var defaultResult = "prerelease";
        }
        for(var key in v1)if (key === "major" || key === "minor" || key === "patch") {
            if (v1[key] !== v2[key]) return prefix + key;
        }
        return defaultResult // may be undefined
        ;
    }
}
exports.compareIdentifiers = compareIdentifiers;
var numeric = /^[0-9]+$/;
function compareIdentifiers(a, b) {
    var anum = numeric.test(a);
    var bnum = numeric.test(b);
    if (anum && bnum) {
        a = +a;
        b = +b;
    }
    return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
}
exports.rcompareIdentifiers = rcompareIdentifiers;
function rcompareIdentifiers(a, b) {
    return compareIdentifiers(b, a);
}
exports.major = major;
function major(a, loose) {
    return new SemVer(a, loose).major;
}
exports.minor = minor;
function minor(a, loose) {
    return new SemVer(a, loose).minor;
}
exports.patch = patch;
function patch(a, loose) {
    return new SemVer(a, loose).patch;
}
exports.compare = compare;
function compare(a, b, loose) {
    return new SemVer(a, loose).compare(new SemVer(b, loose));
}
exports.compareLoose = compareLoose;
function compareLoose(a, b) {
    return compare(a, b, true);
}
exports.compareBuild = compareBuild;
function compareBuild(a, b, loose) {
    var versionA = new SemVer(a, loose);
    var versionB = new SemVer(b, loose);
    return versionA.compare(versionB) || versionA.compareBuild(versionB);
}
exports.rcompare = rcompare;
function rcompare(a, b, loose) {
    return compare(b, a, loose);
}
exports.sort = sort;
function sort(list, loose) {
    return list.sort(function(a, b) {
        return exports.compareBuild(a, b, loose);
    });
}
exports.rsort = rsort;
function rsort(list, loose) {
    return list.sort(function(a, b) {
        return exports.compareBuild(b, a, loose);
    });
}
exports.gt = gt;
function gt(a, b, loose) {
    return compare(a, b, loose) > 0;
}
exports.lt = lt;
function lt(a, b, loose) {
    return compare(a, b, loose) < 0;
}
exports.eq = eq;
function eq(a, b, loose) {
    return compare(a, b, loose) === 0;
}
exports.neq = neq;
function neq(a, b, loose) {
    return compare(a, b, loose) !== 0;
}
exports.gte = gte;
function gte(a, b, loose) {
    return compare(a, b, loose) >= 0;
}
exports.lte = lte;
function lte(a, b, loose) {
    return compare(a, b, loose) <= 0;
}
exports.cmp = cmp;
function cmp(a, op, b, loose) {
    switch(op){
        case "===":
            if (typeof a === "object") a = a.version;
            if (typeof b === "object") b = b.version;
            return a === b;
        case "!==":
            if (typeof a === "object") a = a.version;
            if (typeof b === "object") b = b.version;
            return a !== b;
        case "":
        case "=":
        case "==":
            return eq(a, b, loose);
        case "!=":
            return neq(a, b, loose);
        case ">":
            return gt(a, b, loose);
        case ">=":
            return gte(a, b, loose);
        case "<":
            return lt(a, b, loose);
        case "<=":
            return lte(a, b, loose);
        default:
            throw new TypeError("Invalid operator: " + op);
    }
}
exports.Comparator = Comparator;
function Comparator(comp, options) {
    if (!options || typeof options !== "object") options = {
        loose: !!options,
        includePrerelease: false
    };
    if (comp instanceof Comparator) {
        if (comp.loose === !!options.loose) return comp;
        else comp = comp.value;
    }
    if (!(this instanceof Comparator)) return new Comparator(comp, options);
    debug("comparator", comp, options);
    this.options = options;
    this.loose = !!options.loose;
    this.parse(comp);
    if (this.semver === ANY) this.value = "";
    else this.value = this.operator + this.semver.version;
    debug("comp", this);
}
var ANY = {};
Comparator.prototype.parse = function(comp) {
    var r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
    var m = comp.match(r);
    if (!m) throw new TypeError("Invalid comparator: " + comp);
    this.operator = m[1] !== undefined ? m[1] : "";
    if (this.operator === "=") this.operator = "";
    // if it literally is just '>' or '' then allow anything.
    if (!m[2]) this.semver = ANY;
    else this.semver = new SemVer(m[2], this.options.loose);
};
Comparator.prototype.toString = function() {
    return this.value;
};
Comparator.prototype.test = function(version) {
    debug("Comparator.test", version, this.options.loose);
    if (this.semver === ANY || version === ANY) return true;
    if (typeof version === "string") try {
        version = new SemVer(version, this.options);
    } catch (er) {
        return false;
    }
    return cmp(version, this.operator, this.semver, this.options);
};
Comparator.prototype.intersects = function(comp, options) {
    if (!(comp instanceof Comparator)) throw new TypeError("a Comparator is required");
    if (!options || typeof options !== "object") options = {
        loose: !!options,
        includePrerelease: false
    };
    var rangeTmp;
    if (this.operator === "") {
        if (this.value === "") return true;
        rangeTmp = new Range(comp.value, options);
        return satisfies(this.value, rangeTmp, options);
    } else if (comp.operator === "") {
        if (comp.value === "") return true;
        rangeTmp = new Range(this.value, options);
        return satisfies(comp.semver, rangeTmp, options);
    }
    var sameDirectionIncreasing = (this.operator === ">=" || this.operator === ">") && (comp.operator === ">=" || comp.operator === ">");
    var sameDirectionDecreasing = (this.operator === "<=" || this.operator === "<") && (comp.operator === "<=" || comp.operator === "<");
    var sameSemVer = this.semver.version === comp.semver.version;
    var differentDirectionsInclusive = (this.operator === ">=" || this.operator === "<=") && (comp.operator === ">=" || comp.operator === "<=");
    var oppositeDirectionsLessThan = cmp(this.semver, "<", comp.semver, options) && (this.operator === ">=" || this.operator === ">") && (comp.operator === "<=" || comp.operator === "<");
    var oppositeDirectionsGreaterThan = cmp(this.semver, ">", comp.semver, options) && (this.operator === "<=" || this.operator === "<") && (comp.operator === ">=" || comp.operator === ">");
    return sameDirectionIncreasing || sameDirectionDecreasing || sameSemVer && differentDirectionsInclusive || oppositeDirectionsLessThan || oppositeDirectionsGreaterThan;
};
exports.Range = Range;
function Range(range, options) {
    if (!options || typeof options !== "object") options = {
        loose: !!options,
        includePrerelease: false
    };
    if (range instanceof Range) {
        if (range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease) return range;
        else return new Range(range.raw, options);
    }
    if (range instanceof Comparator) return new Range(range.value, options);
    if (!(this instanceof Range)) return new Range(range, options);
    this.options = options;
    this.loose = !!options.loose;
    this.includePrerelease = !!options.includePrerelease;
    // First, split based on boolean or ||
    this.raw = range;
    this.set = range.split(/\s*\|\|\s*/).map(function(range) {
        return this.parseRange(range.trim());
    }, this).filter(function(c) {
        // throw out any that are not relevant for whatever reason
        return c.length;
    });
    if (!this.set.length) throw new TypeError("Invalid SemVer Range: " + range);
    this.format();
}
Range.prototype.format = function() {
    this.range = this.set.map(function(comps) {
        return comps.join(" ").trim();
    }).join("||").trim();
    return this.range;
};
Range.prototype.toString = function() {
    return this.range;
};
Range.prototype.parseRange = function(range) {
    var loose = this.options.loose;
    range = range.trim();
    // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
    var hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE];
    range = range.replace(hr, hyphenReplace);
    debug("hyphen replace", range);
    // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
    range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace);
    debug("comparator trim", range, re[t.COMPARATORTRIM]);
    // `~ 1.2.3` => `~1.2.3`
    range = range.replace(re[t.TILDETRIM], tildeTrimReplace);
    // `^ 1.2.3` => `^1.2.3`
    range = range.replace(re[t.CARETTRIM], caretTrimReplace);
    // normalize spaces
    range = range.split(/\s+/).join(" ");
    // At this point, the range is completely trimmed and
    // ready to be split into comparators.
    var compRe = loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
    var set = range.split(" ").map(function(comp) {
        return parseComparator(comp, this.options);
    }, this).join(" ").split(/\s+/);
    if (this.options.loose) // in loose mode, throw out any that are not valid comparators
    set = set.filter(function(comp) {
        return !!comp.match(compRe);
    });
    set = set.map(function(comp) {
        return new Comparator(comp, this.options);
    }, this);
    return set;
};
Range.prototype.intersects = function(range, options) {
    if (!(range instanceof Range)) throw new TypeError("a Range is required");
    return this.set.some(function(thisComparators) {
        return isSatisfiable(thisComparators, options) && range.set.some(function(rangeComparators) {
            return isSatisfiable(rangeComparators, options) && thisComparators.every(function(thisComparator) {
                return rangeComparators.every(function(rangeComparator) {
                    return thisComparator.intersects(rangeComparator, options);
                });
            });
        });
    });
};
// take a set of comparators and determine whether there
// exists a version which can satisfy it
function isSatisfiable(comparators, options) {
    var result = true;
    var remainingComparators = comparators.slice();
    var testComparator = remainingComparators.pop();
    while(result && remainingComparators.length){
        result = remainingComparators.every(function(otherComparator) {
            return testComparator.intersects(otherComparator, options);
        });
        testComparator = remainingComparators.pop();
    }
    return result;
}
// Mostly just for testing and legacy API reasons
exports.toComparators = toComparators;
function toComparators(range, options) {
    return new Range(range, options).set.map(function(comp) {
        return comp.map(function(c) {
            return c.value;
        }).join(" ").trim().split(" ");
    });
}
// comprised of xranges, tildes, stars, and gtlt's at this point.
// already replaced the hyphen ranges
// turn into a set of JUST comparators.
function parseComparator(comp, options) {
    debug("comp", comp, options);
    comp = replaceCarets(comp, options);
    debug("caret", comp);
    comp = replaceTildes(comp, options);
    debug("tildes", comp);
    comp = replaceXRanges(comp, options);
    debug("xrange", comp);
    comp = replaceStars(comp, options);
    debug("stars", comp);
    return comp;
}
function isX(id) {
    return !id || id.toLowerCase() === "x" || id === "*";
}
// ~, ~> --> * (any, kinda silly)
// ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0
// ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0
// ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0
// ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0
// ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0
function replaceTildes(comp, options) {
    return comp.trim().split(/\s+/).map(function(comp) {
        return replaceTilde(comp, options);
    }).join(" ");
}
function replaceTilde(comp, options) {
    var r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE];
    return comp.replace(r, function(_, M, m, p, pr) {
        debug("tilde", comp, _, M, m, p, pr);
        var ret;
        if (isX(M)) ret = "";
        else if (isX(m)) ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0";
        else if (isX(p)) // ~1.2 == >=1.2.0 <1.3.0
        ret = ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0";
        else if (pr) {
            debug("replaceTilde pr", pr);
            ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + M + "." + (+m + 1) + ".0";
        } else // ~1.2.3 == >=1.2.3 <1.3.0
        ret = ">=" + M + "." + m + "." + p + " <" + M + "." + (+m + 1) + ".0";
        debug("tilde return", ret);
        return ret;
    });
}
// ^ --> * (any, kinda silly)
// ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0
// ^2.0, ^2.0.x --> >=2.0.0 <3.0.0
// ^1.2, ^1.2.x --> >=1.2.0 <2.0.0
// ^1.2.3 --> >=1.2.3 <2.0.0
// ^1.2.0 --> >=1.2.0 <2.0.0
function replaceCarets(comp, options) {
    return comp.trim().split(/\s+/).map(function(comp) {
        return replaceCaret(comp, options);
    }).join(" ");
}
function replaceCaret(comp, options) {
    debug("caret", comp, options);
    var r = options.loose ? re[t.CARETLOOSE] : re[t.CARET];
    return comp.replace(r, function(_, M, m, p, pr) {
        debug("caret", comp, _, M, m, p, pr);
        var ret;
        if (isX(M)) ret = "";
        else if (isX(m)) ret = ">=" + M + ".0.0 <" + (+M + 1) + ".0.0";
        else if (isX(p)) {
            if (M === "0") ret = ">=" + M + "." + m + ".0 <" + M + "." + (+m + 1) + ".0";
            else ret = ">=" + M + "." + m + ".0 <" + (+M + 1) + ".0.0";
        } else if (pr) {
            debug("replaceCaret pr", pr);
            if (M === "0") {
                if (m === "0") ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + M + "." + m + "." + (+p + 1);
                else ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + M + "." + (+m + 1) + ".0";
            } else ret = ">=" + M + "." + m + "." + p + "-" + pr + " <" + (+M + 1) + ".0.0";
        } else {
            debug("no pr");
            if (M === "0") {
                if (m === "0") ret = ">=" + M + "." + m + "." + p + " <" + M + "." + m + "." + (+p + 1);
                else ret = ">=" + M + "." + m + "." + p + " <" + M + "." + (+m + 1) + ".0";
            } else ret = ">=" + M + "." + m + "." + p + " <" + (+M + 1) + ".0.0";
        }
        debug("caret return", ret);
        return ret;
    });
}
function replaceXRanges(comp, options) {
    debug("replaceXRanges", comp, options);
    return comp.split(/\s+/).map(function(comp) {
        return replaceXRange(comp, options);
    }).join(" ");
}
function replaceXRange(comp, options) {
    comp = comp.trim();
    var r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE];
    return comp.replace(r, function(ret, gtlt, M, m, p, pr) {
        debug("xRange", comp, ret, gtlt, M, m, p, pr);
        var xM = isX(M);
        var xm = xM || isX(m);
        var xp = xm || isX(p);
        var anyX = xp;
        if (gtlt === "=" && anyX) gtlt = "";
        // if we're including prereleases in the match, then we need
        // to fix this to -0, the lowest possible prerelease value
        pr = options.includePrerelease ? "-0" : "";
        if (xM) {
            if (gtlt === ">" || gtlt === "<") // nothing is allowed
            ret = "<0.0.0-0";
            else // nothing is forbidden
            ret = "*";
        } else if (gtlt && anyX) {
            // we know patch is an x, because we have any x at all.
            // replace X with 0
            if (xm) m = 0;
            p = 0;
            if (gtlt === ">") {
                // >1 => >=2.0.0
                // >1.2 => >=1.3.0
                // >1.2.3 => >= 1.2.4
                gtlt = ">=";
                if (xm) {
                    M = +M + 1;
                    m = 0;
                    p = 0;
                } else {
                    m = +m + 1;
                    p = 0;
                }
            } else if (gtlt === "<=") {
                // <=0.7.x is actually <0.8.0, since any 0.7.x should
                // pass.  Similarly, <=7.x is actually <8.0.0, etc.
                gtlt = "<";
                if (xm) M = +M + 1;
                else m = +m + 1;
            }
            ret = gtlt + M + "." + m + "." + p + pr;
        } else if (xm) ret = ">=" + M + ".0.0" + pr + " <" + (+M + 1) + ".0.0" + pr;
        else if (xp) ret = ">=" + M + "." + m + ".0" + pr + " <" + M + "." + (+m + 1) + ".0" + pr;
        debug("xRange return", ret);
        return ret;
    });
}
// Because * is AND-ed with everything else in the comparator,
// and '' means "any version", just remove the *s entirely.
function replaceStars(comp, options) {
    debug("replaceStars", comp, options);
    // Looseness is ignored here.  star is always as loose as it gets!
    return comp.trim().replace(re[t.STAR], "");
}
// This function is passed to string.replace(re[t.HYPHENRANGE])
// M, m, patch, prerelease, build
// 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
// 1.2.3 - 3.4 => >=1.2.0 <3.5.0 Any 3.4.x will do
// 1.2 - 3.4 => >=1.2.0 <3.5.0
function hyphenReplace($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb) {
    if (isX(fM)) from = "";
    else if (isX(fm)) from = ">=" + fM + ".0.0";
    else if (isX(fp)) from = ">=" + fM + "." + fm + ".0";
    else from = ">=" + from;
    if (isX(tM)) to = "";
    else if (isX(tm)) to = "<" + (+tM + 1) + ".0.0";
    else if (isX(tp)) to = "<" + tM + "." + (+tm + 1) + ".0";
    else if (tpr) to = "<=" + tM + "." + tm + "." + tp + "-" + tpr;
    else to = "<=" + to;
    return (from + " " + to).trim();
}
// if ANY of the sets match ALL of its comparators, then pass
Range.prototype.test = function(version) {
    if (!version) return false;
    if (typeof version === "string") try {
        version = new SemVer(version, this.options);
    } catch (er) {
        return false;
    }
    for(var i = 0; i < this.set.length; i++){
        if (testSet(this.set[i], version, this.options)) return true;
    }
    return false;
};
function testSet(set, version, options) {
    for(var i = 0; i < set.length; i++){
        if (!set[i].test(version)) return false;
    }
    if (version.prerelease.length && !options.includePrerelease) {
        // Find the set of versions that are allowed to have prereleases
        // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
        // That should allow `1.2.3-pr.2` to pass.
        // However, `1.2.4-alpha.notready` should NOT be allowed,
        // even though it's within the range set by the comparators.
        for(i = 0; i < set.length; i++){
            debug(set[i].semver);
            if (set[i].semver === ANY) continue;
            if (set[i].semver.prerelease.length > 0) {
                var allowed = set[i].semver;
                if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) return true;
            }
        }
        // Version has a -pre, but it's not one of the ones we like.
        return false;
    }
    return true;
}
exports.satisfies = satisfies;
function satisfies(version, range, options) {
    try {
        range = new Range(range, options);
    } catch (er) {
        return false;
    }
    return range.test(version);
}
exports.maxSatisfying = maxSatisfying;
function maxSatisfying(versions, range, options) {
    var max = null;
    var maxSV = null;
    try {
        var rangeObj = new Range(range, options);
    } catch (er) {
        return null;
    }
    versions.forEach(function(v) {
        if (rangeObj.test(v)) // satisfies(v, range, options)
        {
            if (!max || maxSV.compare(v) === -1) {
                // compare(max, v, true)
                max = v;
                maxSV = new SemVer(max, options);
            }
        }
    });
    return max;
}
exports.minSatisfying = minSatisfying;
function minSatisfying(versions, range, options) {
    var min = null;
    var minSV = null;
    try {
        var rangeObj = new Range(range, options);
    } catch (er) {
        return null;
    }
    versions.forEach(function(v) {
        if (rangeObj.test(v)) // satisfies(v, range, options)
        {
            if (!min || minSV.compare(v) === 1) {
                // compare(min, v, true)
                min = v;
                minSV = new SemVer(min, options);
            }
        }
    });
    return min;
}
exports.minVersion = minVersion;
function minVersion(range, loose) {
    range = new Range(range, loose);
    var minver = new SemVer("0.0.0");
    if (range.test(minver)) return minver;
    minver = new SemVer("0.0.0-0");
    if (range.test(minver)) return minver;
    minver = null;
    for(var i = 0; i < range.set.length; ++i){
        var comparators = range.set[i];
        comparators.forEach(function(comparator) {
            // Clone to avoid manipulating the comparator's semver object.
            var compver = new SemVer(comparator.semver.version);
            switch(comparator.operator){
                case ">":
                    if (compver.prerelease.length === 0) compver.patch++;
                    else compver.prerelease.push(0);
                    compver.raw = compver.format();
                /* fallthrough */ case "":
                case ">=":
                    if (!minver || gt(minver, compver)) minver = compver;
                    break;
                case "<":
                case "<=":
                    break;
                /* istanbul ignore next */ default:
                    throw new Error("Unexpected operation: " + comparator.operator);
            }
        });
    }
    if (minver && range.test(minver)) return minver;
    return null;
}
exports.validRange = validRange;
function validRange(range, options) {
    try {
        // Return '*' instead of '' so that truthiness works.
        // This will throw if it's invalid anyway
        return new Range(range, options).range || "*";
    } catch (er) {
        return null;
    }
}
// Determine if version is less than all the versions possible in the range
exports.ltr = ltr;
function ltr(version, range, options) {
    return outside(version, range, "<", options);
}
// Determine if version is greater than all the versions possible in the range.
exports.gtr = gtr;
function gtr(version, range, options) {
    return outside(version, range, ">", options);
}
exports.outside = outside;
function outside(version, range, hilo, options) {
    version = new SemVer(version, options);
    range = new Range(range, options);
    var gtfn, ltefn, ltfn, comp, ecomp;
    switch(hilo){
        case ">":
            gtfn = gt;
            ltefn = lte;
            ltfn = lt;
            comp = ">";
            ecomp = ">=";
            break;
        case "<":
            gtfn = lt;
            ltefn = gte;
            ltfn = gt;
            comp = "<";
            ecomp = "<=";
            break;
        default:
            throw new TypeError('Must provide a hilo val of "<" or ">"');
    }
    // If it satisifes the range it is not outside
    if (satisfies(version, range, options)) return false;
    // From now on, variable terms are as if we're in "gtr" mode.
    // but note that everything is flipped for the "ltr" function.
    for(var i = 0; i < range.set.length; ++i){
        var comparators = range.set[i];
        var high = null;
        var low = null;
        comparators.forEach(function(comparator) {
            if (comparator.semver === ANY) comparator = new Comparator(">=0.0.0");
            high = high || comparator;
            low = low || comparator;
            if (gtfn(comparator.semver, high.semver, options)) high = comparator;
            else if (ltfn(comparator.semver, low.semver, options)) low = comparator;
        });
        // If the edge version comparator has a operator then our version
        // isn't outside it
        if (high.operator === comp || high.operator === ecomp) return false;
        // If the lowest version comparator has an operator and our version
        // is less than it then it isn't higher than the range
        if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) return false;
        else if (low.operator === ecomp && ltfn(version, low.semver)) return false;
    }
    return true;
}
exports.prerelease = prerelease;
function prerelease(version, options) {
    var parsed = parse(version, options);
    return parsed && parsed.prerelease.length ? parsed.prerelease : null;
}
exports.intersects = intersects;
function intersects(r1, r2, options) {
    r1 = new Range(r1, options);
    r2 = new Range(r2, options);
    return r1.intersects(r2);
}
exports.coerce = coerce;
function coerce(version, options) {
    if (version instanceof SemVer) return version;
    if (typeof version === "number") version = String(version);
    if (typeof version !== "string") return null;
    options = options || {};
    var match = null;
    if (!options.rtl) match = version.match(re[t.COERCE]);
    else {
        // Find the right-most coercible string that does not share
        // a terminus with a more left-ward coercible string.
        // Eg, '1.2.3.4' wants to coerce '2.3.4', not '3.4' or '4'
        //
        // Walk through the string checking with a /g regexp
        // Manually set the index so as to pick up overlapping matches.
        // Stop when we get a match that ends at the string end, since no
        // coercible string can be more right-ward without the same terminus.
        var next;
        while((next = re[t.COERCERTL].exec(version)) && (!match || match.index + match[0].length !== version.length)){
            if (!match || next.index + next[0].length !== match.index + match[0].length) match = next;
            re[t.COERCERTL].lastIndex = next.index + next[1].length + next[2].length;
        }
        // leave it in a clean state
        re[t.COERCERTL].lastIndex = -1;
    }
    if (match === null) return null;
    return parse(match[2] + "." + (match[3] || "0") + "." + (match[4] || "0"), options);
}

});


parcelRequire.register("geuwa", function(module, exports) {

var $91NtI = parcelRequire("91NtI");

var $jJzfm = parcelRequire("jJzfm");
function $bd15a05c48f73562$var$v4(options, buf, offset) {
    var i = buf && offset || 0;
    if (typeof options == "string") {
        buf = options === "binary" ? new Array(16) : null;
        options = null;
    }
    options = options || {};
    var rnds = options.random || (options.rng || $91NtI)();
    // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
    rnds[6] = rnds[6] & 0x0f | 0x40;
    rnds[8] = rnds[8] & 0x3f | 0x80;
    // Copy bytes to buffer, if provided
    if (buf) for(var ii = 0; ii < 16; ++ii)buf[i + ii] = rnds[ii];
    return buf || $jJzfm(rnds);
}
module.exports = $bd15a05c48f73562$var$v4;

});
parcelRequire.register("91NtI", function(module, exports) {
// Unique ID creation requires a high quality random # generator.  In node.js
// this is pretty straight-forward - we use the crypto API.

module.exports = function nodeRNG() {
    return $8EjUb$crypto.randomBytes(16);
};

});

parcelRequire.register("jJzfm", function(module, exports) {
/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */ var $e5dd8f91359a1efe$var$byteToHex = [];
for(var $e5dd8f91359a1efe$var$i = 0; $e5dd8f91359a1efe$var$i < 256; ++$e5dd8f91359a1efe$var$i)$e5dd8f91359a1efe$var$byteToHex[$e5dd8f91359a1efe$var$i] = ($e5dd8f91359a1efe$var$i + 0x100).toString(16).substr(1);
function $e5dd8f91359a1efe$var$bytesToUuid(buf, offset) {
    var i = offset || 0;
    var bth = $e5dd8f91359a1efe$var$byteToHex;
    // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
    return [
        bth[buf[i++]],
        bth[buf[i++]],
        bth[buf[i++]],
        bth[buf[i++]],
        "-",
        bth[buf[i++]],
        bth[buf[i++]],
        "-",
        bth[buf[i++]],
        bth[buf[i++]],
        "-",
        bth[buf[i++]],
        bth[buf[i++]],
        "-",
        bth[buf[i++]],
        bth[buf[i++]],
        bth[buf[i++]],
        bth[buf[i++]],
        bth[buf[i++]],
        bth[buf[i++]]
    ].join("");
}
module.exports = $e5dd8f91359a1efe$var$bytesToUuid;

});


parcelRequire.register("2YVDU", function(module, exports) {
"use strict";
var $22bde602ace90018$var$__awaiter = module.exports && module.exports.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var $22bde602ace90018$var$__importStar = module.exports && module.exports.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    }
    result["default"] = mod;
    return result;
};
Object.defineProperty(module.exports, "__esModule", {
    value: true
});

const $22bde602ace90018$var$tr = $22bde602ace90018$var$__importStar((parcelRequire("hlEiO")));
/**
 * Exec a command.
 * Output will be streamed to the live console.
 * Returns promise with return code
 *
 * @param     commandLine        command to execute (can include additional args). Must be correctly escaped.
 * @param     args               optional arguments for tool. Escaping is handled by the lib.
 * @param     options            optional exec options.  See ExecOptions
 * @returns   Promise<number>    exit code
 */ function $22bde602ace90018$var$exec(commandLine, args, options) {
    return $22bde602ace90018$var$__awaiter(this, void 0, void 0, function*() {
        const commandArgs = $22bde602ace90018$var$tr.argStringToArray(commandLine);
        if (commandArgs.length === 0) throw new Error(`Parameter 'commandLine' cannot be null or empty.`);
        // Path to tool to execute should be first arg
        const toolPath = commandArgs[0];
        args = commandArgs.slice(1).concat(args || []);
        const runner = new $22bde602ace90018$var$tr.ToolRunner(toolPath, args, options);
        return runner.exec();
    });
}
module.exports.exec = $22bde602ace90018$var$exec;

});
parcelRequire.register("hlEiO", function(module, exports) {
"use strict";
var $ca13a90f6d3d82ae$var$__awaiter = module.exports && module.exports.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var $ca13a90f6d3d82ae$var$__importStar = module.exports && module.exports.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    }
    result["default"] = mod;
    return result;
};
Object.defineProperty(module.exports, "__esModule", {
    value: true
});

const $ca13a90f6d3d82ae$var$os = $ca13a90f6d3d82ae$var$__importStar($8EjUb$os);

const $ca13a90f6d3d82ae$var$events = $ca13a90f6d3d82ae$var$__importStar($8EjUb$events);

const $ca13a90f6d3d82ae$var$child = $ca13a90f6d3d82ae$var$__importStar($8EjUb$child_process);

const $ca13a90f6d3d82ae$var$path = $ca13a90f6d3d82ae$var$__importStar($8EjUb$path);

const $ca13a90f6d3d82ae$var$io = $ca13a90f6d3d82ae$var$__importStar((parcelRequire("JugeB")));

const $ca13a90f6d3d82ae$var$ioUtil = $ca13a90f6d3d82ae$var$__importStar((parcelRequire("gKs7H")));
/* eslint-disable @typescript-eslint/unbound-method */ const $ca13a90f6d3d82ae$var$IS_WINDOWS = process.platform === "win32";
/*
 * Class for running command line tools. Handles quoting and arg parsing in a platform agnostic way.
 */ class $ca13a90f6d3d82ae$var$ToolRunner extends $ca13a90f6d3d82ae$var$events.EventEmitter {
    constructor(toolPath, args, options){
        super();
        if (!toolPath) throw new Error("Parameter 'toolPath' cannot be null or empty.");
        this.toolPath = toolPath;
        this.args = args || [];
        this.options = options || {};
    }
    _debug(message) {
        if (this.options.listeners && this.options.listeners.debug) this.options.listeners.debug(message);
    }
    _getCommandString(options, noPrefix) {
        const toolPath = this._getSpawnFileName();
        const args = this._getSpawnArgs(options);
        let cmd = noPrefix ? "" : "[command]"; // omit prefix when piped to a second tool
        if ($ca13a90f6d3d82ae$var$IS_WINDOWS) {
            // Windows + cmd file
            if (this._isCmdFile()) {
                cmd += toolPath;
                for (const a of args)cmd += ` ${a}`;
            } else if (options.windowsVerbatimArguments) {
                cmd += `"${toolPath}"`;
                for (const a of args)cmd += ` ${a}`;
            } else {
                cmd += this._windowsQuoteCmdArg(toolPath);
                for (const a of args)cmd += ` ${this._windowsQuoteCmdArg(a)}`;
            }
        } else {
            // OSX/Linux - this can likely be improved with some form of quoting.
            // creating processes on Unix is fundamentally different than Windows.
            // on Unix, execvp() takes an arg array.
            cmd += toolPath;
            for (const a of args)cmd += ` ${a}`;
        }
        return cmd;
    }
    _processLineBuffer(data, strBuffer, onLine) {
        try {
            let s = strBuffer + data.toString();
            let n = s.indexOf($ca13a90f6d3d82ae$var$os.EOL);
            while(n > -1){
                const line = s.substring(0, n);
                onLine(line);
                // the rest of the string ...
                s = s.substring(n + $ca13a90f6d3d82ae$var$os.EOL.length);
                n = s.indexOf($ca13a90f6d3d82ae$var$os.EOL);
            }
            strBuffer = s;
        } catch (err) {
            // streaming lines to console is best effort.  Don't fail a build.
            this._debug(`error processing line. Failed with error ${err}`);
        }
    }
    _getSpawnFileName() {
        if ($ca13a90f6d3d82ae$var$IS_WINDOWS) {
            if (this._isCmdFile()) return process.env["COMSPEC"] || "cmd.exe";
        }
        return this.toolPath;
    }
    _getSpawnArgs(options) {
        if ($ca13a90f6d3d82ae$var$IS_WINDOWS) {
            if (this._isCmdFile()) {
                let argline = `/D /S /C "${this._windowsQuoteCmdArg(this.toolPath)}`;
                for (const a of this.args){
                    argline += " ";
                    argline += options.windowsVerbatimArguments ? a : this._windowsQuoteCmdArg(a);
                }
                argline += '"';
                return [
                    argline
                ];
            }
        }
        return this.args;
    }
    _endsWith(str, end) {
        return str.endsWith(end);
    }
    _isCmdFile() {
        const upperToolPath = this.toolPath.toUpperCase();
        return this._endsWith(upperToolPath, ".CMD") || this._endsWith(upperToolPath, ".BAT");
    }
    _windowsQuoteCmdArg(arg) {
        // for .exe, apply the normal quoting rules that libuv applies
        if (!this._isCmdFile()) return this._uvQuoteCmdArg(arg);
        // otherwise apply quoting rules specific to the cmd.exe command line parser.
        // the libuv rules are generic and are not designed specifically for cmd.exe
        // command line parser.
        //
        // for a detailed description of the cmd.exe command line parser, refer to
        // http://stackoverflow.com/questions/4094699/how-does-the-windows-command-interpreter-cmd-exe-parse-scripts/7970912#7970912
        // need quotes for empty arg
        if (!arg) return '""';
        // determine whether the arg needs to be quoted
        const cmdSpecialChars = [
            " ",
            "	",
            "&",
            "(",
            ")",
            "[",
            "]",
            "{",
            "}",
            "^",
            "=",
            ";",
            "!",
            "'",
            "+",
            ",",
            "`",
            "~",
            "|",
            "<",
            ">",
            '"'
        ];
        let needsQuotes = false;
        for (const char of arg)if (cmdSpecialChars.some((x)=>x === char)) {
            needsQuotes = true;
            break;
        }
        // short-circuit if quotes not needed
        if (!needsQuotes) return arg;
        // the following quoting rules are very similar to the rules that by libuv applies.
        //
        // 1) wrap the string in quotes
        //
        // 2) double-up quotes - i.e. " => ""
        //
        //    this is different from the libuv quoting rules. libuv replaces " with \", which unfortunately
        //    doesn't work well with a cmd.exe command line.
        //
        //    note, replacing " with "" also works well if the arg is passed to a downstream .NET console app.
        //    for example, the command line:
        //          foo.exe "myarg:""my val"""
        //    is parsed by a .NET console app into an arg array:
        //          [ "myarg:\"my val\"" ]
        //    which is the same end result when applying libuv quoting rules. although the actual
        //    command line from libuv quoting rules would look like:
        //          foo.exe "myarg:\"my val\""
        //
        // 3) double-up slashes that precede a quote,
        //    e.g.  hello \world    => "hello \world"
        //          hello\"world    => "hello\\""world"
        //          hello\\"world   => "hello\\\\""world"
        //          hello world\    => "hello world\\"
        //
        //    technically this is not required for a cmd.exe command line, or the batch argument parser.
        //    the reasons for including this as a .cmd quoting rule are:
        //
        //    a) this is optimized for the scenario where the argument is passed from the .cmd file to an
        //       external program. many programs (e.g. .NET console apps) rely on the slash-doubling rule.
        //
        //    b) it's what we've been doing previously (by deferring to node default behavior) and we
        //       haven't heard any complaints about that aspect.
        //
        // note, a weakness of the quoting rules chosen here, is that % is not escaped. in fact, % cannot be
        // escaped when used on the command line directly - even though within a .cmd file % can be escaped
        // by using %%.
        //
        // the saving grace is, on the command line, %var% is left as-is if var is not defined. this contrasts
        // the line parsing rules within a .cmd file, where if var is not defined it is replaced with nothing.
        //
        // one option that was explored was replacing % with ^% - i.e. %var% => ^%var^%. this hack would
        // often work, since it is unlikely that var^ would exist, and the ^ character is removed when the
        // variable is used. the problem, however, is that ^ is not removed when %* is used to pass the args
        // to an external program.
        //
        // an unexplored potential solution for the % escaping problem, is to create a wrapper .cmd file.
        // % can be escaped within a .cmd file.
        let reverse = '"';
        let quoteHit = true;
        for(let i = arg.length; i > 0; i--){
            // walk the string in reverse
            reverse += arg[i - 1];
            if (quoteHit && arg[i - 1] === "\\") reverse += "\\"; // double the slash
            else if (arg[i - 1] === '"') {
                quoteHit = true;
                reverse += '"'; // double the quote
            } else quoteHit = false;
        }
        reverse += '"';
        return reverse.split("").reverse().join("");
    }
    _uvQuoteCmdArg(arg) {
        // Tool runner wraps child_process.spawn() and needs to apply the same quoting as
        // Node in certain cases where the undocumented spawn option windowsVerbatimArguments
        // is used.
        //
        // Since this function is a port of quote_cmd_arg from Node 4.x (technically, lib UV,
        // see https://github.com/nodejs/node/blob/v4.x/deps/uv/src/win/process.c for details),
        // pasting copyright notice from Node within this function:
        //
        //      Copyright Joyent, Inc. and other Node contributors. All rights reserved.
        //
        //      Permission is hereby granted, free of charge, to any person obtaining a copy
        //      of this software and associated documentation files (the "Software"), to
        //      deal in the Software without restriction, including without limitation the
        //      rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
        //      sell copies of the Software, and to permit persons to whom the Software is
        //      furnished to do so, subject to the following conditions:
        //
        //      The above copyright notice and this permission notice shall be included in
        //      all copies or substantial portions of the Software.
        //
        //      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
        //      IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
        //      FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
        //      AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
        //      LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
        //      FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
        //      IN THE SOFTWARE.
        if (!arg) // Need double quotation for empty argument
        return '""';
        if (!arg.includes(" ") && !arg.includes("	") && !arg.includes('"')) // No quotation needed
        return arg;
        if (!arg.includes('"') && !arg.includes("\\")) // No embedded double quotes or backslashes, so I can just wrap
        // quote marks around the whole thing.
        return `"${arg}"`;
        // Expected input/output:
        //   input : hello"world
        //   output: "hello\"world"
        //   input : hello""world
        //   output: "hello\"\"world"
        //   input : hello\world
        //   output: hello\world
        //   input : hello\\world
        //   output: hello\\world
        //   input : hello\"world
        //   output: "hello\\\"world"
        //   input : hello\\"world
        //   output: "hello\\\\\"world"
        //   input : hello world\
        //   output: "hello world\\" - note the comment in libuv actually reads "hello world\"
        //                             but it appears the comment is wrong, it should be "hello world\\"
        let reverse = '"';
        let quoteHit = true;
        for(let i = arg.length; i > 0; i--){
            // walk the string in reverse
            reverse += arg[i - 1];
            if (quoteHit && arg[i - 1] === "\\") reverse += "\\";
            else if (arg[i - 1] === '"') {
                quoteHit = true;
                reverse += "\\";
            } else quoteHit = false;
        }
        reverse += '"';
        return reverse.split("").reverse().join("");
    }
    _cloneExecOptions(options) {
        options = options || {};
        const result = {
            cwd: options.cwd || process.cwd(),
            env: options.env || process.env,
            silent: options.silent || false,
            windowsVerbatimArguments: options.windowsVerbatimArguments || false,
            failOnStdErr: options.failOnStdErr || false,
            ignoreReturnCode: options.ignoreReturnCode || false,
            delay: options.delay || 10000
        };
        result.outStream = options.outStream || process.stdout;
        result.errStream = options.errStream || process.stderr;
        return result;
    }
    _getSpawnOptions(options, toolPath) {
        options = options || {};
        const result = {};
        result.cwd = options.cwd;
        result.env = options.env;
        result["windowsVerbatimArguments"] = options.windowsVerbatimArguments || this._isCmdFile();
        if (options.windowsVerbatimArguments) result.argv0 = `"${toolPath}"`;
        return result;
    }
    /**
     * Exec a tool.
     * Output will be streamed to the live console.
     * Returns promise with return code
     *
     * @param     tool     path to tool to exec
     * @param     options  optional exec options.  See ExecOptions
     * @returns   number
     */ exec() {
        return $ca13a90f6d3d82ae$var$__awaiter(this, void 0, void 0, function*() {
            // root the tool path if it is unrooted and contains relative pathing
            if (!$ca13a90f6d3d82ae$var$ioUtil.isRooted(this.toolPath) && (this.toolPath.includes("/") || $ca13a90f6d3d82ae$var$IS_WINDOWS && this.toolPath.includes("\\"))) // prefer options.cwd if it is specified, however options.cwd may also need to be rooted
            this.toolPath = $ca13a90f6d3d82ae$var$path.resolve(process.cwd(), this.options.cwd || process.cwd(), this.toolPath);
            // if the tool is only a file name, then resolve it from the PATH
            // otherwise verify it exists (add extension on Windows if necessary)
            this.toolPath = yield $ca13a90f6d3d82ae$var$io.which(this.toolPath, true);
            return new Promise((resolve, reject)=>{
                this._debug(`exec tool: ${this.toolPath}`);
                this._debug("arguments:");
                for (const arg of this.args)this._debug(`   ${arg}`);
                const optionsNonNull = this._cloneExecOptions(this.options);
                if (!optionsNonNull.silent && optionsNonNull.outStream) optionsNonNull.outStream.write(this._getCommandString(optionsNonNull) + $ca13a90f6d3d82ae$var$os.EOL);
                const state = new $ca13a90f6d3d82ae$var$ExecState(optionsNonNull, this.toolPath);
                state.on("debug", (message)=>{
                    this._debug(message);
                });
                const fileName = this._getSpawnFileName();
                const cp = $ca13a90f6d3d82ae$var$child.spawn(fileName, this._getSpawnArgs(optionsNonNull), this._getSpawnOptions(this.options, fileName));
                const stdbuffer = "";
                if (cp.stdout) cp.stdout.on("data", (data)=>{
                    if (this.options.listeners && this.options.listeners.stdout) this.options.listeners.stdout(data);
                    if (!optionsNonNull.silent && optionsNonNull.outStream) optionsNonNull.outStream.write(data);
                    this._processLineBuffer(data, stdbuffer, (line)=>{
                        if (this.options.listeners && this.options.listeners.stdline) this.options.listeners.stdline(line);
                    });
                });
                const errbuffer = "";
                if (cp.stderr) cp.stderr.on("data", (data)=>{
                    state.processStderr = true;
                    if (this.options.listeners && this.options.listeners.stderr) this.options.listeners.stderr(data);
                    if (!optionsNonNull.silent && optionsNonNull.errStream && optionsNonNull.outStream) {
                        const s = optionsNonNull.failOnStdErr ? optionsNonNull.errStream : optionsNonNull.outStream;
                        s.write(data);
                    }
                    this._processLineBuffer(data, errbuffer, (line)=>{
                        if (this.options.listeners && this.options.listeners.errline) this.options.listeners.errline(line);
                    });
                });
                cp.on("error", (err)=>{
                    state.processError = err.message;
                    state.processExited = true;
                    state.processClosed = true;
                    state.CheckComplete();
                });
                cp.on("exit", (code)=>{
                    state.processExitCode = code;
                    state.processExited = true;
                    this._debug(`Exit code ${code} received from tool '${this.toolPath}'`);
                    state.CheckComplete();
                });
                cp.on("close", (code)=>{
                    state.processExitCode = code;
                    state.processExited = true;
                    state.processClosed = true;
                    this._debug(`STDIO streams have closed for tool '${this.toolPath}'`);
                    state.CheckComplete();
                });
                state.on("done", (error, exitCode)=>{
                    if (stdbuffer.length > 0) this.emit("stdline", stdbuffer);
                    if (errbuffer.length > 0) this.emit("errline", errbuffer);
                    cp.removeAllListeners();
                    if (error) reject(error);
                    else resolve(exitCode);
                });
                if (this.options.input) {
                    if (!cp.stdin) throw new Error("child process missing stdin");
                    cp.stdin.end(this.options.input);
                }
            });
        });
    }
}
module.exports.ToolRunner = $ca13a90f6d3d82ae$var$ToolRunner;
/**
 * Convert an arg string to an array of args. Handles escaping
 *
 * @param    argString   string of arguments
 * @returns  string[]    array of arguments
 */ function $ca13a90f6d3d82ae$var$argStringToArray(argString) {
    const args = [];
    let inQuotes = false;
    let escaped = false;
    let arg = "";
    function append(c) {
        // we only escape double quotes.
        if (escaped && c !== '"') arg += "\\";
        arg += c;
        escaped = false;
    }
    for(let i = 0; i < argString.length; i++){
        const c = argString.charAt(i);
        if (c === '"') {
            if (!escaped) inQuotes = !inQuotes;
            else append(c);
            continue;
        }
        if (c === "\\" && escaped) {
            append(c);
            continue;
        }
        if (c === "\\" && inQuotes) {
            escaped = true;
            continue;
        }
        if (c === " " && !inQuotes) {
            if (arg.length > 0) {
                args.push(arg);
                arg = "";
            }
            continue;
        }
        append(c);
    }
    if (arg.length > 0) args.push(arg.trim());
    return args;
}
module.exports.argStringToArray = $ca13a90f6d3d82ae$var$argStringToArray;
class $ca13a90f6d3d82ae$var$ExecState extends $ca13a90f6d3d82ae$var$events.EventEmitter {
    constructor(options, toolPath){
        super();
        this.processClosed = false; // tracks whether the process has exited and stdio is closed
        this.processError = "";
        this.processExitCode = 0;
        this.processExited = false; // tracks whether the process has exited
        this.processStderr = false; // tracks whether stderr was written to
        this.delay = 10000; // 10 seconds
        this.done = false;
        this.timeout = null;
        if (!toolPath) throw new Error("toolPath must not be empty");
        this.options = options;
        this.toolPath = toolPath;
        if (options.delay) this.delay = options.delay;
    }
    CheckComplete() {
        if (this.done) return;
        if (this.processClosed) this._setResult();
        else if (this.processExited) this.timeout = setTimeout($ca13a90f6d3d82ae$var$ExecState.HandleTimeout, this.delay, this);
    }
    _debug(message) {
        this.emit("debug", message);
    }
    _setResult() {
        // determine whether there is an error
        let error;
        if (this.processExited) {
            if (this.processError) error = new Error(`There was an error when attempting to execute the process '${this.toolPath}'. This may indicate the process failed to start. Error: ${this.processError}`);
            else if (this.processExitCode !== 0 && !this.options.ignoreReturnCode) error = new Error(`The process '${this.toolPath}' failed with exit code ${this.processExitCode}`);
            else if (this.processStderr && this.options.failOnStdErr) error = new Error(`The process '${this.toolPath}' failed because one or more lines were written to the STDERR stream`);
        }
        // clear the timeout
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
        this.done = true;
        this.emit("done", error, this.processExitCode);
    }
    static HandleTimeout(state) {
        if (state.done) return;
        if (!state.processClosed && state.processExited) {
            const message = `The STDIO streams did not close within ${state.delay / 1000} seconds of the exit event from process '${state.toolPath}'. This may indicate a child process inherited the STDIO streams and has not yet exited.`;
            state._debug(message);
        }
        state._setResult();
    }
}

});
parcelRequire.register("JugeB", function(module, exports) {
"use strict";
var $088bad41f25e8ad0$var$__awaiter = module.exports && module.exports.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var $088bad41f25e8ad0$var$__importStar = module.exports && module.exports.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    }
    result["default"] = mod;
    return result;
};
Object.defineProperty(module.exports, "__esModule", {
    value: true
});

const $088bad41f25e8ad0$var$childProcess = $088bad41f25e8ad0$var$__importStar($8EjUb$child_process);

const $088bad41f25e8ad0$var$path = $088bad41f25e8ad0$var$__importStar($8EjUb$path);


const $088bad41f25e8ad0$var$ioUtil = $088bad41f25e8ad0$var$__importStar((parcelRequire("gKs7H")));
const $088bad41f25e8ad0$var$exec = $8EjUb$util.promisify($088bad41f25e8ad0$var$childProcess.exec);
/**
 * Copies a file or folder.
 * Based off of shelljs - https://github.com/shelljs/shelljs/blob/9237f66c52e5daa40458f94f9565e18e8132f5a6/src/cp.js
 *
 * @param     source    source path
 * @param     dest      destination path
 * @param     options   optional. See CopyOptions.
 */ function $088bad41f25e8ad0$var$cp(source, dest, options = {}) {
    return $088bad41f25e8ad0$var$__awaiter(this, void 0, void 0, function*() {
        const { force: force , recursive: recursive  } = $088bad41f25e8ad0$var$readCopyOptions(options);
        const destStat = (yield $088bad41f25e8ad0$var$ioUtil.exists(dest)) ? yield $088bad41f25e8ad0$var$ioUtil.stat(dest) : null;
        // Dest is an existing file, but not forcing
        if (destStat && destStat.isFile() && !force) return;
        // If dest is an existing directory, should copy inside.
        const newDest = destStat && destStat.isDirectory() ? $088bad41f25e8ad0$var$path.join(dest, $088bad41f25e8ad0$var$path.basename(source)) : dest;
        if (!(yield $088bad41f25e8ad0$var$ioUtil.exists(source))) throw new Error(`no such file or directory: ${source}`);
        const sourceStat = yield $088bad41f25e8ad0$var$ioUtil.stat(source);
        if (sourceStat.isDirectory()) {
            if (!recursive) throw new Error(`Failed to copy. ${source} is a directory, but tried to copy without recursive flag.`);
            else yield $088bad41f25e8ad0$var$cpDirRecursive(source, newDest, 0, force);
        } else {
            if ($088bad41f25e8ad0$var$path.relative(source, newDest) === "") // a file cannot be copied to itself
            throw new Error(`'${newDest}' and '${source}' are the same file`);
            yield $088bad41f25e8ad0$var$copyFile(source, newDest, force);
        }
    });
}
module.exports.cp = $088bad41f25e8ad0$var$cp;
/**
 * Moves a path.
 *
 * @param     source    source path
 * @param     dest      destination path
 * @param     options   optional. See MoveOptions.
 */ function $088bad41f25e8ad0$var$mv(source, dest, options = {}) {
    return $088bad41f25e8ad0$var$__awaiter(this, void 0, void 0, function*() {
        if (yield $088bad41f25e8ad0$var$ioUtil.exists(dest)) {
            let destExists = true;
            if (yield $088bad41f25e8ad0$var$ioUtil.isDirectory(dest)) {
                // If dest is directory copy src into dest
                dest = $088bad41f25e8ad0$var$path.join(dest, $088bad41f25e8ad0$var$path.basename(source));
                destExists = yield $088bad41f25e8ad0$var$ioUtil.exists(dest);
            }
            if (destExists) {
                if (options.force == null || options.force) yield $088bad41f25e8ad0$var$rmRF(dest);
                else throw new Error("Destination already exists");
            }
        }
        yield $088bad41f25e8ad0$var$mkdirP($088bad41f25e8ad0$var$path.dirname(dest));
        yield $088bad41f25e8ad0$var$ioUtil.rename(source, dest);
    });
}
module.exports.mv = $088bad41f25e8ad0$var$mv;
/**
 * Remove a path recursively with force
 *
 * @param inputPath path to remove
 */ function $088bad41f25e8ad0$var$rmRF(inputPath) {
    return $088bad41f25e8ad0$var$__awaiter(this, void 0, void 0, function*() {
        if ($088bad41f25e8ad0$var$ioUtil.IS_WINDOWS) {
            // Node doesn't provide a delete operation, only an unlink function. This means that if the file is being used by another
            // program (e.g. antivirus), it won't be deleted. To address this, we shell out the work to rd/del.
            try {
                if (yield $088bad41f25e8ad0$var$ioUtil.isDirectory(inputPath, true)) yield $088bad41f25e8ad0$var$exec(`rd /s /q "${inputPath}"`);
                else yield $088bad41f25e8ad0$var$exec(`del /f /a "${inputPath}"`);
            } catch (err) {
                // if you try to delete a file that doesn't exist, desired result is achieved
                // other errors are valid
                if (err.code !== "ENOENT") throw err;
            }
            // Shelling out fails to remove a symlink folder with missing source, this unlink catches that
            try {
                yield $088bad41f25e8ad0$var$ioUtil.unlink(inputPath);
            } catch (err) {
                // if you try to delete a file that doesn't exist, desired result is achieved
                // other errors are valid
                if (err.code !== "ENOENT") throw err;
            }
        } else {
            let isDir = false;
            try {
                isDir = yield $088bad41f25e8ad0$var$ioUtil.isDirectory(inputPath);
            } catch (err) {
                // if you try to delete a file that doesn't exist, desired result is achieved
                // other errors are valid
                if (err.code !== "ENOENT") throw err;
                return;
            }
            if (isDir) yield $088bad41f25e8ad0$var$exec(`rm -rf "${inputPath}"`);
            else yield $088bad41f25e8ad0$var$ioUtil.unlink(inputPath);
        }
    });
}
module.exports.rmRF = $088bad41f25e8ad0$var$rmRF;
/**
 * Make a directory.  Creates the full path with folders in between
 * Will throw if it fails
 *
 * @param   fsPath        path to create
 * @returns Promise<void>
 */ function $088bad41f25e8ad0$var$mkdirP(fsPath) {
    return $088bad41f25e8ad0$var$__awaiter(this, void 0, void 0, function*() {
        yield $088bad41f25e8ad0$var$ioUtil.mkdirP(fsPath);
    });
}
module.exports.mkdirP = $088bad41f25e8ad0$var$mkdirP;
/**
 * Returns path of a tool had the tool actually been invoked.  Resolves via paths.
 * If you check and the tool does not exist, it will throw.
 *
 * @param     tool              name of the tool
 * @param     check             whether to check if tool exists
 * @returns   Promise<string>   path to tool
 */ function $088bad41f25e8ad0$var$which(tool, check) {
    return $088bad41f25e8ad0$var$__awaiter(this, void 0, void 0, function*() {
        if (!tool) throw new Error("parameter 'tool' is required");
        // recursive when check=true
        if (check) {
            const result = yield $088bad41f25e8ad0$var$which(tool, false);
            if (!result) {
                if ($088bad41f25e8ad0$var$ioUtil.IS_WINDOWS) throw new Error(`Unable to locate executable file: ${tool}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also verify the file has a valid extension for an executable file.`);
                else throw new Error(`Unable to locate executable file: ${tool}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also check the file mode to verify the file is executable.`);
            }
            return result;
        }
        const matches = yield $088bad41f25e8ad0$var$findInPath(tool);
        if (matches && matches.length > 0) return matches[0];
        return "";
    });
}
module.exports.which = $088bad41f25e8ad0$var$which;
/**
 * Returns a list of all occurrences of the given tool on the system path.
 *
 * @returns   Promise<string[]>  the paths of the tool
 */ function $088bad41f25e8ad0$var$findInPath(tool) {
    return $088bad41f25e8ad0$var$__awaiter(this, void 0, void 0, function*() {
        if (!tool) throw new Error("parameter 'tool' is required");
        // build the list of extensions to try
        const extensions = [];
        if ($088bad41f25e8ad0$var$ioUtil.IS_WINDOWS && process.env["PATHEXT"]) {
            for (const extension of process.env["PATHEXT"].split($088bad41f25e8ad0$var$path.delimiter))if (extension) extensions.push(extension);
        }
        // if it's rooted, return it if exists. otherwise return empty.
        if ($088bad41f25e8ad0$var$ioUtil.isRooted(tool)) {
            const filePath = yield $088bad41f25e8ad0$var$ioUtil.tryGetExecutablePath(tool, extensions);
            if (filePath) return [
                filePath
            ];
            return [];
        }
        // if any path separators, return empty
        if (tool.includes($088bad41f25e8ad0$var$path.sep)) return [];
        // build the list of directories
        //
        // Note, technically "where" checks the current directory on Windows. From a toolkit perspective,
        // it feels like we should not do this. Checking the current directory seems like more of a use
        // case of a shell, and the which() function exposed by the toolkit should strive for consistency
        // across platforms.
        const directories = [];
        if (process.env.PATH) {
            for (const p of process.env.PATH.split($088bad41f25e8ad0$var$path.delimiter))if (p) directories.push(p);
        }
        // find all matches
        const matches = [];
        for (const directory of directories){
            const filePath = yield $088bad41f25e8ad0$var$ioUtil.tryGetExecutablePath($088bad41f25e8ad0$var$path.join(directory, tool), extensions);
            if (filePath) matches.push(filePath);
        }
        return matches;
    });
}
module.exports.findInPath = $088bad41f25e8ad0$var$findInPath;
function $088bad41f25e8ad0$var$readCopyOptions(options) {
    const force = options.force == null ? true : options.force;
    const recursive = Boolean(options.recursive);
    return {
        force: force,
        recursive: recursive
    };
}
function $088bad41f25e8ad0$var$cpDirRecursive(sourceDir, destDir, currentDepth, force) {
    return $088bad41f25e8ad0$var$__awaiter(this, void 0, void 0, function*() {
        // Ensure there is not a run away recursive copy
        if (currentDepth >= 255) return;
        currentDepth++;
        yield $088bad41f25e8ad0$var$mkdirP(destDir);
        const files = yield $088bad41f25e8ad0$var$ioUtil.readdir(sourceDir);
        for (const fileName of files){
            const srcFile = `${sourceDir}/${fileName}`;
            const destFile = `${destDir}/${fileName}`;
            const srcFileStat = yield $088bad41f25e8ad0$var$ioUtil.lstat(srcFile);
            if (srcFileStat.isDirectory()) // Recurse
            yield $088bad41f25e8ad0$var$cpDirRecursive(srcFile, destFile, currentDepth, force);
            else yield $088bad41f25e8ad0$var$copyFile(srcFile, destFile, force);
        }
        // Change the mode for the newly created directory
        yield $088bad41f25e8ad0$var$ioUtil.chmod(destDir, (yield $088bad41f25e8ad0$var$ioUtil.stat(sourceDir)).mode);
    });
}
// Buffered file copy
function $088bad41f25e8ad0$var$copyFile(srcFile, destFile, force) {
    return $088bad41f25e8ad0$var$__awaiter(this, void 0, void 0, function*() {
        if ((yield $088bad41f25e8ad0$var$ioUtil.lstat(srcFile)).isSymbolicLink()) {
            // unlink/re-link it
            try {
                yield $088bad41f25e8ad0$var$ioUtil.lstat(destFile);
                yield $088bad41f25e8ad0$var$ioUtil.unlink(destFile);
            } catch (e) {
                // Try to override file permission
                if (e.code === "EPERM") {
                    yield $088bad41f25e8ad0$var$ioUtil.chmod(destFile, "0666");
                    yield $088bad41f25e8ad0$var$ioUtil.unlink(destFile);
                }
            // other errors = it doesn't exist, no work to do
            }
            // Copy over symlink
            const symlinkFull = yield $088bad41f25e8ad0$var$ioUtil.readlink(srcFile);
            yield $088bad41f25e8ad0$var$ioUtil.symlink(symlinkFull, destFile, $088bad41f25e8ad0$var$ioUtil.IS_WINDOWS ? "junction" : null);
        } else if (!(yield $088bad41f25e8ad0$var$ioUtil.exists(destFile)) || force) yield $088bad41f25e8ad0$var$ioUtil.copyFile(srcFile, destFile);
    });
}

});
parcelRequire.register("gKs7H", function(module, exports) {
"use strict";
var $c316c1e64fe37d24$var$__awaiter = module.exports && module.exports.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var $c316c1e64fe37d24$var$__importStar = module.exports && module.exports.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    }
    result["default"] = mod;
    return result;
};
var $c316c1e64fe37d24$var$_a;
Object.defineProperty(module.exports, "__esModule", {
    value: true
});


const $c316c1e64fe37d24$var$fs = $c316c1e64fe37d24$var$__importStar($8EjUb$fs);

const $c316c1e64fe37d24$var$path = $c316c1e64fe37d24$var$__importStar($8EjUb$path);
$c316c1e64fe37d24$var$_a = $c316c1e64fe37d24$var$fs.promises, module.exports.chmod = $c316c1e64fe37d24$var$_a.chmod, module.exports.copyFile = $c316c1e64fe37d24$var$_a.copyFile, module.exports.lstat = $c316c1e64fe37d24$var$_a.lstat, module.exports.mkdir = $c316c1e64fe37d24$var$_a.mkdir, module.exports.readdir = $c316c1e64fe37d24$var$_a.readdir, module.exports.readlink = $c316c1e64fe37d24$var$_a.readlink, module.exports.rename = $c316c1e64fe37d24$var$_a.rename, module.exports.rmdir = $c316c1e64fe37d24$var$_a.rmdir, module.exports.stat = $c316c1e64fe37d24$var$_a.stat, module.exports.symlink = $c316c1e64fe37d24$var$_a.symlink, module.exports.unlink = $c316c1e64fe37d24$var$_a.unlink;
module.exports.IS_WINDOWS = process.platform === "win32";
function $c316c1e64fe37d24$var$exists(fsPath) {
    return $c316c1e64fe37d24$var$__awaiter(this, void 0, void 0, function*() {
        try {
            yield module.exports.stat(fsPath);
        } catch (err) {
            if (err.code === "ENOENT") return false;
            throw err;
        }
        return true;
    });
}
module.exports.exists = $c316c1e64fe37d24$var$exists;
function $c316c1e64fe37d24$var$isDirectory(fsPath, useStat = false) {
    return $c316c1e64fe37d24$var$__awaiter(this, void 0, void 0, function*() {
        const stats = useStat ? yield module.exports.stat(fsPath) : yield module.exports.lstat(fsPath);
        return stats.isDirectory();
    });
}
module.exports.isDirectory = $c316c1e64fe37d24$var$isDirectory;
/**
 * On OSX/Linux, true if path starts with '/'. On Windows, true for paths like:
 * \, \hello, \\hello\share, C:, and C:\hello (and corresponding alternate separator cases).
 */ function $c316c1e64fe37d24$var$isRooted(p) {
    p = $c316c1e64fe37d24$var$normalizeSeparators(p);
    if (!p) throw new Error('isRooted() parameter "p" cannot be empty');
    if (module.exports.IS_WINDOWS) return p.startsWith("\\") || /^[A-Z]:/i.test(p) // e.g. \ or \hello or \\hello
    ; // e.g. C: or C:\hello
    return p.startsWith("/");
}
module.exports.isRooted = $c316c1e64fe37d24$var$isRooted;
/**
 * Recursively create a directory at `fsPath`.
 *
 * This implementation is optimistic, meaning it attempts to create the full
 * path first, and backs up the path stack from there.
 *
 * @param fsPath The path to create
 * @param maxDepth The maximum recursion depth
 * @param depth The current recursion depth
 */ function $c316c1e64fe37d24$var$mkdirP(fsPath, maxDepth = 1000, depth = 1) {
    return $c316c1e64fe37d24$var$__awaiter(this, void 0, void 0, function*() {
        $8EjUb$assert.ok(fsPath, "a path argument must be provided");
        fsPath = $c316c1e64fe37d24$var$path.resolve(fsPath);
        if (depth >= maxDepth) return module.exports.mkdir(fsPath);
        try {
            yield module.exports.mkdir(fsPath);
            return;
        } catch (err) {
            switch(err.code){
                case "ENOENT":
                    yield $c316c1e64fe37d24$var$mkdirP($c316c1e64fe37d24$var$path.dirname(fsPath), maxDepth, depth + 1);
                    yield module.exports.mkdir(fsPath);
                    return;
                default:
                    {
                        let stats;
                        try {
                            stats = yield module.exports.stat(fsPath);
                        } catch (err2) {
                            throw err;
                        }
                        if (!stats.isDirectory()) throw err;
                    }
            }
        }
    });
}
module.exports.mkdirP = $c316c1e64fe37d24$var$mkdirP;
/**
 * Best effort attempt to determine whether a file exists and is executable.
 * @param filePath    file path to check
 * @param extensions  additional file extensions to try
 * @return if file exists and is executable, returns the file path. otherwise empty string.
 */ function $c316c1e64fe37d24$var$tryGetExecutablePath(filePath, extensions) {
    return $c316c1e64fe37d24$var$__awaiter(this, void 0, void 0, function*() {
        let stats = undefined;
        try {
            // test file exists
            stats = yield module.exports.stat(filePath);
        } catch (err) {
            if (err.code !== "ENOENT") // eslint-disable-next-line no-console
            console.log(`Unexpected error attempting to determine if executable file exists '${filePath}': ${err}`);
        }
        if (stats && stats.isFile()) {
            if (module.exports.IS_WINDOWS) {
                // on Windows, test for valid extension
                const upperExt = $c316c1e64fe37d24$var$path.extname(filePath).toUpperCase();
                if (extensions.some((validExt)=>validExt.toUpperCase() === upperExt)) return filePath;
            } else {
                if ($c316c1e64fe37d24$var$isUnixExecutable(stats)) return filePath;
            }
        }
        // try each extension
        const originalFilePath = filePath;
        for (const extension of extensions){
            filePath = originalFilePath + extension;
            stats = undefined;
            try {
                stats = yield module.exports.stat(filePath);
            } catch (err) {
                if (err.code !== "ENOENT") // eslint-disable-next-line no-console
                console.log(`Unexpected error attempting to determine if executable file exists '${filePath}': ${err}`);
            }
            if (stats && stats.isFile()) {
                if (module.exports.IS_WINDOWS) {
                    // preserve the case of the actual file (since an extension was appended)
                    try {
                        const directory = $c316c1e64fe37d24$var$path.dirname(filePath);
                        const upperName = $c316c1e64fe37d24$var$path.basename(filePath).toUpperCase();
                        for (const actualName of yield module.exports.readdir(directory))if (upperName === actualName.toUpperCase()) {
                            filePath = $c316c1e64fe37d24$var$path.join(directory, actualName);
                            break;
                        }
                    } catch (err) {
                        // eslint-disable-next-line no-console
                        console.log(`Unexpected error attempting to determine the actual case of the file '${filePath}': ${err}`);
                    }
                    return filePath;
                } else {
                    if ($c316c1e64fe37d24$var$isUnixExecutable(stats)) return filePath;
                }
            }
        }
        return "";
    });
}
module.exports.tryGetExecutablePath = $c316c1e64fe37d24$var$tryGetExecutablePath;
function $c316c1e64fe37d24$var$normalizeSeparators(p) {
    p = p || "";
    if (module.exports.IS_WINDOWS) {
        // convert slashes on Windows
        p = p.replace(/\//g, "\\");
        // remove redundant slashes
        return p.replace(/\\\\+/g, "\\");
    }
    // remove redundant slashes
    return p.replace(/\/\/+/g, "/");
}
// on Mac/Linux, test the execute bit
//     R   W  X  R  W X R W X
//   256 128 64 32 16 8 4 2 1
function $c316c1e64fe37d24$var$isUnixExecutable(stats) {
    return (stats.mode & 1) > 0 || (stats.mode & 8) > 0 && stats.gid === process.getgid() || (stats.mode & 64) > 0 && stats.uid === process.getuid();
}

});




parcelRequire.register("7nWFL", function(module, exports) {
"use strict";
var $5608318a289d2628$var$__createBinding = module.exports && module.exports.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
        enumerable: true,
        get: function() {
            return m[k];
        }
    });
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var $5608318a289d2628$var$__setModuleDefault = module.exports && module.exports.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var $5608318a289d2628$var$__importStar = module.exports && module.exports.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.hasOwnProperty.call(mod, k)) $5608318a289d2628$var$__createBinding(result, mod, k);
    }
    $5608318a289d2628$var$__setModuleDefault(result, mod);
    return result;
};
var $5608318a289d2628$var$__awaiter = module.exports && module.exports.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.RetryHelper = void 0;

const $5608318a289d2628$var$core = $5608318a289d2628$var$__importStar((parcelRequire("13d93")));
/**
 * Internal class for retries
 */ class $5608318a289d2628$var$RetryHelper {
    constructor(maxAttempts, minSeconds, maxSeconds){
        if (maxAttempts < 1) throw new Error("max attempts should be greater than or equal to 1");
        this.maxAttempts = maxAttempts;
        this.minSeconds = Math.floor(minSeconds);
        this.maxSeconds = Math.floor(maxSeconds);
        if (this.minSeconds > this.maxSeconds) throw new Error("min seconds should be less than or equal to max seconds");
    }
    execute(action, isRetryable) {
        return $5608318a289d2628$var$__awaiter(this, void 0, void 0, function*() {
            let attempt = 1;
            while(attempt < this.maxAttempts){
                // Try
                try {
                    return yield action();
                } catch (err) {
                    if (isRetryable && !isRetryable(err)) throw err;
                    $5608318a289d2628$var$core.info(err.message);
                }
                // Sleep
                const seconds = this.getSleepAmount();
                $5608318a289d2628$var$core.info(`Waiting ${seconds} seconds before trying again`);
                yield this.sleep(seconds);
                attempt++;
            }
            // Last attempt
            return yield action();
        });
    }
    getSleepAmount() {
        return Math.floor(Math.random() * (this.maxSeconds - this.minSeconds + 1)) + this.minSeconds;
    }
    sleep(seconds) {
        return $5608318a289d2628$var$__awaiter(this, void 0, void 0, function*() {
            return new Promise((resolve)=>setTimeout(resolve, seconds * 1000));
        });
    }
}
module.exports.RetryHelper = $5608318a289d2628$var$RetryHelper;

});




parcelRequire("bHHsC");

//# sourceMappingURL=index.js.map
