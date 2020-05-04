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
var xml2js = __importStar(require("xml2js"));
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var version_1, globPattern, globber, files, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    version_1 = core.getInput('version');
                    globPattern = core.getInput('glob');
                    return [4 /*yield*/, glob.create(globPattern)];
                case 1:
                    globber = _a.sent();
                    return [4 /*yield*/, globber.glob()];
                case 2:
                    files = _a.sent();
                    files.forEach(function (file) {
                        // Read the manifest
                        var manifestFile = fs_1.readFileSync(file);
                        var parser = new xml2js.Parser();
                        parser.parseStringPromise(manifestFile.toString())
                            .then(function (result) {
                            // Update manifest version
                            var packages = result.dotnetnuke.packages;
                            for (var i = 0; i < packages[0].package.length; i++) {
                                var dnnPackage = packages[0].package[i];
                                dnnPackage.$.version = version_1;
                                core.info("Set " + file + " to version " + version_1);
                            }
                            // Write back the manifest
                            var builder = new xml2js.Builder({
                                headless: true,
                                cdata: true
                            });
                            var newManifestXml = builder.buildObject(result);
                            fs_1.writeFile(file, newManifestXml, function (err) {
                                if (err) {
                                    core.setFailed(err.message);
                                }
                                else {
                                    core.info(file + ' saved.');
                                }
                            });
                        });
                    });
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    core.setFailed(error_1.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
run();
exports.default = run;
