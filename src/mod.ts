import { DependencyContainer } from "tsyringe";

import { Weapons } from "@spt/models/enums/Weapons";
import { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { DatabaseService } from "@spt/services/DatabaseService";

import CONFIG from "../config/config.json";
import GUNSMITHGUNS from "../Gunsmith Tweaks/GunsmithGuns.json";
import IDS from "../Gunsmith Tweaks/GunsmithIDs.json";
import GUNSMITHDESC from "../Gunsmith Tweaks/GunsmithDescriptions.json";
import GUNSMITHPARTS from "../Gunsmith Tweaks/GunsmithParts.json";
import { ItemType } from "@spt/models/eft/common/tables/ITemplateItem";
import { QuestRewardType } from "@spt/models/enums/QuestRewardType";
import { warn } from "console";


class Mod implements IPostDBLoadMod {

    public postDBLoad(container: DependencyContainer): void {
        const logger = container.resolve<ILogger>("WinstonLogger");
        const log = (msg: string) => logger.info(`[Gunsmith Tweaks] ${msg}`);

        const db = container.resolve<DatabaseService>("DatabaseService");
        const quests = db.getQuests();

        if (CONFIG.enabled) { // Enable or disable the mod
            warn("[GUNSMITH CONFIG ENABLED]: Applying Gunsmith tweaks...");

			let X = 0;
			for (const GUNS in GUNSMITHGUNS) {
				if (X == 1) X++;
				if (CONFIG.Debug) {
					log (`Adding ${GUNSMITHGUNS[GUNS].name} to Gunsmith quests... ${IDS[X].name}... ID is ${IDS[X].id}`);
					log (`Quest Generated: ${IDS[X].name}`);
				}
				const questID = IDS[X].id;
				const setupGunsmith = quests[questID].rewards.Started;
				const newGPReward = {
					"findInRaid": true,
					"id": GUNSMITHGUNS[GUNS].id,
					"index": 0,
					"items": GUNSMITHGUNS[GUNS].items,
					"target": GUNSMITHGUNS[GUNS].target,
					"type": QuestRewardType.ITEM,
					"unknown": false,
					"value": 1
				}
				setupGunsmith.push(newGPReward);
				X++;
			}
        }
    }
}

export const mod = new Mod();
