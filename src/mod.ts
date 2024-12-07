import { DependencyContainer } from "tsyringe";

import { Weapons } from "@spt/models/enums/Weapons";
import { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { DatabaseService } from "@spt/services/DatabaseService";

import CONFIG from "../config/config.json";
import GUNSMITHGUNS from "../Gunsmith Tweaks/GunsmithGuns.json";
import IDS from "../Gunsmith Tweaks/GunsmithIDs.json";
import GUNSMITHDESC from "../Gunsmith Tweaks/GunsmithDescriptions.json";
import GUNSMITHPART4 from "../Gunsmith Tweaks/GunsmithPart4/GunsmithParts.json";
import GUNSMITHPART5 from "../Gunsmith Tweaks/GunsmithPart5/GunsmithParts.json";
import GUNSMITHPART6 from "../Gunsmith Tweaks/GunsmithPart6/GunsmithParts.json";
import GUNSMITHPART7 from "../Gunsmith Tweaks/GunsmithPart7/GunsmithParts.json";
import GUNSMITHPART8 from "../Gunsmith Tweaks/GunsmithPart8/GunsmithParts.json";
import GUNSMITHPART9 from "../Gunsmith Tweaks/GunsmithPart9/GunsmithParts.json";
import GUNSMITHPART10 from "../Gunsmith Tweaks/GunsmithPart10/GunsmithParts.json";
import GUNSMITHPART11 from "../Gunsmith Tweaks/GunsmithPart11/GunsmithParts.json";
import GUNSMITHPART12 from "../Gunsmith Tweaks/GunsmithPart12/GunsmithParts.json";
import GUNSMITHPART13 from "../Gunsmith Tweaks/GunsmithPart13/GunsmithParts.json";
import GUNSMITHPART14 from "../Gunsmith Tweaks/GunsmithPart14/GunsmithParts.json";
import GUNSMITHPART15 from "../Gunsmith Tweaks/GunsmithPart15/GunsmithParts.json";
import GUNSMITHPART17 from "../Gunsmith Tweaks/GunsmithPart17/GunsmithParts.json";
import GUNSMITHPART18 from "../Gunsmith Tweaks/GunsmithPart18/GunsmithParts.json";
import GUNSMITHPART19 from "../Gunsmith Tweaks/GunsmithPart19/GunsmithParts.json";
import GUNSMITHPART20 from "../Gunsmith Tweaks/GunsmithPart20/GunsmithParts.json";
import GUNSMITHPART21 from "../Gunsmith Tweaks/GunsmithPart21/GunsmithParts.json";
import GUNSMITHPART22 from "../Gunsmith Tweaks/GunsmithPart22/GunsmithParts.json";
import GUNSMITHPART23 from "../Gunsmith Tweaks/GunsmithPart23/GunsmithParts.json";
import GUNSMITHPART24 from "../Gunsmith Tweaks/GunsmithPart24/GunsmithParts.json";
import GUNSMITHPART25 from "../Gunsmith Tweaks/GunsmithPart25/GunsmithParts.json";
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

			for (let GUID in IDS) {
				if (GUID === "1") GUID = "2";
				if (GUID === "25") break;
				if (CONFIG.Debug) {
					log (`Adding ${GUNSMITHGUNS[GUID].name} to Gunsmith quests... ${IDS[GUID].name}... ID is ${IDS[GUID].id}`);
					log (`GUID: ${GUID}`);
				}
				const questID = IDS[GUID].id;
				const setupGunsmith = quests[questID].rewards.Started;
				const newGPReward = {
					"findInRaid": true,
					"id": GUNSMITHGUNS[GUID].id,
					"index": 0,
					"items": GUNSMITHGUNS[GUID].items,
					"target": GUNSMITHGUNS[GUID].target,
					"type": QuestRewardType.ITEM,
					"unknown": false,
					"value": 1
				}
				setupGunsmith.push(newGPReward);
			}
		}
    }
}

export const mod = new Mod();
