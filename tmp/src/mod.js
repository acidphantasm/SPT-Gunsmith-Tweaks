"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mod = exports.IDS = void 0;
const Weapons_1 = require("@spt/models/enums/Weapons");
const config_json_1 = __importDefault(require("../config/config.json"));
const ITemplateItem_1 = require("@spt/models/eft/common/tables/ITemplateItem");
exports.IDS = {
    GunsmithPart1: "5ac23c6186f7741247042bad", // Gunsmith Part 1 - GUN: MP-133 - Parts: 
    GunsmithPart2: "5ac2426c86f774138762edfe", // Gunsmith Part 2 - GUN: AKS-74U - Parts: 
    GunsmithPart3: "5ac2428686f77412450b42bf", // Gunsmith Part 3 - GUN: MP5 - Parts: 
    GunsmithPart4: "639872f9decada40426d3447", // Gunsmith Part 4 - GUN: OP-SKS - Parts: 
    GunsmithPart5: "5ae3267986f7742a413592fe", // Gunsmith Part 5 - GUN: Remington Model 870 - Parts: 
    GunsmithPart6: "5ae3270f86f77445ba41d4dd", // Gunsmith Part 6 - GUN: AKM - Parts: 
    GunsmithPart7: "5ac244eb86f7741356335af1", // Gunsmith Part 7 - GUN: M4A1 - Parts: 
    GunsmithPart8: "5ae3277186f7745973054106", // Gunsmith Part 8 - GUN: AKS-74N - Parts: 
    GunsmithPart9: "639872fa9b4fb827b200d8e5", // Gunsmith Part 9 - GUN: P226R - Parts: 
    GunsmithPart10: "5ae327c886f7745c7b3f2f3f", // Gunsmith Part 10 - GUN: AK-105 - Parts: 
    GunsmithPart11: "639872fc93ae507d5858c3a6", // Gunsmith Part 11 - GUN: KRISS Vector 9x19 - Parts: 
    GunsmithPart12: "5b47799d86f7746c5d6a5fd8", // Gunsmith Part 12 - GUN: SIG MPX - Parts: 
    GunsmithPart13: "5ac244c486f77413e12cf945", // Gunsmith Part 13 - GUN: R11 RSASS - Parts: 
    GunsmithPart14: "639872fe8871e1272b10ccf6", // Gunsmith Part 14 - GUN: HK 416A5 - Parts: 
    GunsmithPart15: "5ae3280386f7742a41359364", // Gunsmith Part 15 - GUN: AS VAL - Parts: 
    GunsmithPart16: "5ac242ab86f77412464f68b4", // Gunsmith Part 16 - GUN: DVL-10 - Parts: 
    GunsmithPart17: "5b47749f86f7746c5d6a5fd4", // Gunsmith Part 17 - GUN: AK-102 - Parts: 
    GunsmithPart18: "5b477b6f86f7747290681823", // Gunsmith Part 18 - GUN: AKMN - Parts: 
    GunsmithPart19: "639873003693c63d86328f25", // Gunsmith Part 19 - GUN: SVDS - Parts: 
    GunsmithPart20: "5b477f7686f7744d1b23c4d2", // Gunsmith Part 20 - GUN: M1A - Parts: 
    GunsmithPart21: "63987301e11ec11ff5504036", // Gunsmith Part 21 - GUN: M700 & M1911 - Parts: 
    GunsmithPart22: "5b47825886f77468074618d3", // Gunsmith Part 22 - GUN: M4A1 - Parts: 
    GunsmithPart23: "64f83bb69878a0569d6ecfbe", // Gunsmith Part 23 - GUN: CMMG Mk47 Mutant - Parts: 
    GunsmithPart24: "64f83bcdde58fc437700d8fa", // Gunsmith Part 24 - GUN: KAC SR-25 - Parts: 
    GunsmithPart25: "64f83bd983cfca080a362c82", // Gunsmith Part 25 - GUN: PKP machine gun - Parts: 
};
class Mod {
    postDBLoad(container) {
        const logger = container.resolve("WinstonLogger");
        const log = (msg) => logger.info(`[QuestTweaks] ${msg}`);
        const db = container.resolve("DatabaseService");
        const quests = db.getQuests();
        if (config_json_1.default.enabled) {
            // Gunsmith Part 1
            log("Adding MP-133 to Gunsmith Part 1...");
            const setupGunsmith1 = quests[exports.IDS.GunsmithPart1].rewards.Started[0];
            setupGunsmith1.target = Weapons_1.Weapons.SHOTGUN_12G_MP_133;
            log("Done.");
            // Gunsmith Part 2
            log("Adding AKS-74U to Gunsmith Part 2...");
        }
        if (config_json_1.default.LoreAccurate) {
            // Gunsmith Part 1
            log("Adding MP-133 Parts to Gunsmith Part 1...");
            const setupGunsmith1 = quests[exports.IDS.GunsmithPart1].rewards.Started[0];
            setupGunsmith1.target = ITemplateItem_1.ItemType.ITEM["5a0abb6e1526d8000a025282"];
            log("Done.");
        }
    }
}
exports.mod = new Mod();
