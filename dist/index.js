"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core = __importStar(require("@actions/core"));
var glob = __importStar(require("@actions/glob"));
var fs_1 = require("fs");
var readline = __importStar(require("readline"));
function run() {
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function () {
        var version_1, globPattern, skipFile, includeSolutionInfo, fileStream, rl, rl_1, rl_1_1, line, e_1_1, globber, files, solutionInfoGlob, solutionInfos, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 19, , 20]);
                    version_1 = core.getInput('version');
                    globPattern = core.getInput('glob');
                    skipFile = core.getInput('skipFile');
                    includeSolutionInfo = core.getInput('includeSolutionInfo').toUpperCase() === "TRUE";
                    console.log("skipFile provided: ", skipFile);
                    if (!(skipFile !== null && skipFile.length > 0)) return [3 /*break*/, 13];
                    globPattern = "**/*.dnn";
                    fileStream = fs_1.createReadStream(skipFile);
                    rl = readline.createInterface({
                        input: fileStream,
                        crlfDelay: Infinity
                    });
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, 7, 12]);
                    rl_1 = __asyncValues(rl);
                    _b.label = 2;
                case 2: return [4 /*yield*/, rl_1.next()];
                case 3:
                    if (!(rl_1_1 = _b.sent(), !rl_1_1.done)) return [3 /*break*/, 5];
                    line = rl_1_1.value;
                    globPattern += "\n!" + line;
                    console.log("Adding " + line + " to ignored globs.");
                    _b.label = 4;
                case 4: return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_1_1 = _b.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _b.trys.push([7, , 10, 11]);
                    if (!(rl_1_1 && !rl_1_1.done && (_a = rl_1.return))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _a.call(rl_1)];
                case 8:
                    _b.sent();
                    _b.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12:
                    console.log("Using glob: ", globPattern);
                    core.debug("Using glob: " + globPattern);
                    _b.label = 13;
                case 13: return [4 /*yield*/, glob.create(globPattern)];
                case 14:
                    globber = _b.sent();
                    return [4 /*yield*/, globber.glob()];
                case 15:
                    files = _b.sent();
                    files.forEach(function (file) {
                        // Read the manifest
                        core.startGroup(file);
                        var manifestContent = fs_1.readFileSync(file).toString();
                        var manifestRegex = /<package.*name="(.*?)".*version="(.*)".*/gm;
                        var result;
                        while ((result = manifestRegex.exec(manifestContent)) !== null) {
                            // Log what we are doing
                            console.log("Setting " + result[1] + " from " + result[2] + " to " + version_1);
                        }
                        // Replace the version
                        var replaceRegex = /(<package.*name=".*?".*version=")(.*)(".*)/gm;
                        manifestContent = manifestContent.replace(replaceRegex, "$1" + version_1 + "$3");
                        // Save the file back
                        fs_1.writeFile(file, manifestContent, function (err) {
                            if (err) {
                                core.setFailed(err.message);
                            }
                            else {
                                console.log("Saved " + file);
                                core.endGroup();
                            }
                        });
                    });
                    if (!includeSolutionInfo) return [3 /*break*/, 18];
                    return [4 /*yield*/, glob.create('./**/SolutionInfo.cs', { followSymbolicLinks: false })];
                case 16:
                    solutionInfoGlob = _b.sent();
                    return [4 /*yield*/, solutionInfoGlob.glob()];
                case 17:
                    solutionInfos = _b.sent();
                    solutionInfos.forEach(function (solutionInfo) {
                        var versionInfo = getVersion(version_1);
                        var formatedVersion = formatVersionForSolutionInfo(versionInfo);
                        var solutionInfoContent = fs_1.readFileSync(solutionInfo).toString();
                        solutionInfoContent = solutionInfoContent.replace(/\[assembly: AssemblyVersion\(".*"\)\]/gm, "[assembly: AssemblyVersion(\"" + formatedVersion + "\")]");
                        solutionInfoContent = solutionInfoContent.replace(/\[assembly: AssemblyFileVersion\(".*"\)\]/gm, "[assembly: AssemblyFileVersion(\"" + formatedVersion + "\")]");
                        solutionInfoContent = solutionInfoContent.replace(/\[assembly: AssemblyInformationalVersion\(".*"\)\]/gm, "[assembly: AssemblyInformationalVersion(\"" + formatedVersion + " Custom Build\")]");
                        fs_1.writeFile(solutionInfo, solutionInfoContent, function (err) {
                            if (err) {
                                core.setFailed(err.message);
                            }
                            else {
                                console.log(solutionInfo + ' saved.');
                            }
                        });
                    });
                    _b.label = 18;
                case 18: return [3 /*break*/, 20];
                case 19:
                    error_1 = _b.sent();
                    core.setFailed(error_1.message);
                    return [3 /*break*/, 20];
                case 20: return [2 /*return*/];
            }
        });
    });
}
var getVersion = function (versionString) {
    var parts = versionString.split('.');
    return {
        major: parseInt(parts[0]),
        minor: parseInt(parts[1]),
        patch: parseInt(parts[2])
    };
};
var formatVersionForSolutionInfo = function (version) {
    return version.major + "." + version.minor + "." + version.patch + ".0";
};
run();
exports.default = run;
