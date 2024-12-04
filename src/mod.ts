import { DependencyContainer } from "tsyringe";

import { Weapons } from "@spt/models/enums/Weapons";
import { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { DatabaseService } from "@spt/services/DatabaseService";

import CONFIG from "../config/config.json";
import { ItemType } from "@spt/models/eft/common/tables/ITemplateItem";
import { QuestRewardType } from "@spt/models/enums/QuestRewardType";
import { warn } from "console";


export const IDS = {
    GunsmithPart1: "5ac23c6186f7741247042bad", // Gunsmith Part 1 - GUN: MP-133
    GunsmithPart2: "5ac2426c86f774138762edfe", // Gunsmith Part 2 - GUN: AKS-74U
    GunsmithPart3: "5ac2428686f77412450b42bf", // Gunsmith Part 3 - GUN: MP5
    GunsmithPart4: "639872f9decada40426d3447", // Gunsmith Part 4 - GUN: OP-SKS - Parts: 6
    GunsmithPart5: "5ae3267986f7742a413592fe", // Gunsmith Part 5 - GUN: Remington Model 870 - Parts: 4
    GunsmithPart6: "5ae3270f86f77445ba41d4dd", // Gunsmith Part 6 - GUN: AKM - Parts: 4
    GunsmithPart7: "5ac244eb86f7741356335af1", // Gunsmith Part 7 - GUN: M4A1 - Parts: 5
    GunsmithPart8: "5ae3277186f7745973054106", // Gunsmith Part 8 - GUN: AKS-74N - Parts: 4
    GunsmithPart9: "639872fa9b4fb827b200d8e5", // Gunsmith Part 9 - GUN: P226R - Parts: 4
    GunsmithPart10: "5ae327c886f7745c7b3f2f3f", // Gunsmith Part 10 - GUN: AK-105 - Parts: 6
    GunsmithPart11: "639872fc93ae507d5858c3a6", // Gunsmith Part 11 - GUN: KRISS Vector 9x19 - Parts: 5
    GunsmithPart12: "5b47799d86f7746c5d6a5fd8", // Gunsmith Part 12 - GUN: SIG MPX - Parts: 2
    GunsmithPart13: "5ac244c486f77413e12cf945", // Gunsmith Part 13 - GUN: R11 RSASS - Parts: 3
    GunsmithPart14: "639872fe8871e1272b10ccf6", // Gunsmith Part 14 - GUN: HK 416A5 - Parts: 9
    GunsmithPart15: "5ae3280386f7742a41359364", // Gunsmith Part 15 - GUN: AS VAL - Parts: 3
    GunsmithPart16: "5ac242ab86f77412464f68b4", // Gunsmith Part 16 - GUN: DVL-10
    GunsmithPart17: "5b47749f86f7746c5d6a5fd4", // Gunsmith Part 17 - GUN: AK-102 - Parts: 6
    GunsmithPart18: "5b477b6f86f7747290681823", // Gunsmith Part 18 - GUN: AKMN - Parts: 4
    GunsmithPart19: "639873003693c63d86328f25", // Gunsmith Part 19 - GUN: SVDS - Parts: 4
    GunsmithPart20: "5b477f7686f7744d1b23c4d2", // Gunsmith Part 20 - GUN: M1A - Parts: 5
    GunsmithPart21: "63987301e11ec11ff5504036", // Gunsmith Part 21 - GUN: M700 & M1911 - Parts: M700 - 3 | M1911 - 4
    GunsmithPart22: "5b47825886f77468074618d3", // Gunsmith Part 22 - GUN: M4A1 - Parts: 8
    GunsmithPart23: "64f83bb69878a0569d6ecfbe", // Gunsmith Part 23 - GUN: CMMG Mk47 Mutant - Parts: 6
    GunsmithPart24: "64f83bcdde58fc437700d8fa", // Gunsmith Part 24 - GUN: KAC SR-25 - Parts: 10
    GunsmithPart25: "64f83bd983cfca080a362c82", // Gunsmith Part 25 - GUN: PKP machine gun - Parts: 10
};


class Mod implements IPostDBLoadMod {

    public postDBLoad(container: DependencyContainer): void {
        const logger = container.resolve<ILogger>("WinstonLogger");
        const log = (msg: string) => logger.info(`[Gunsmith Tweaks] ${msg}`);

        const db = container.resolve<DatabaseService>("DatabaseService");
        const quests = db.getQuests();

        if (CONFIG.enabled) { // Enable or disable the mod
            warn("[GUNSMITH CONFIG ENABLED]: Applying Gunsmith tweaks...");

            // Gunsmith Part 1
            const setupGunsmith1 = quests[IDS.GunsmithPart1].rewards.Started;
            const newGP1Reward = {
                "findInRaid": true,
				"id": "674f4246cc0bbde12f5bcc1e",
                "index": 0,
                "items": [
					{
						"_id": "674f242414121869ec032c84",
						"_tpl": "54491c4f4bdc2db1078b4568",
						"upd": {
							"Repairable": {
								"MaxDurability": 100,
								"Durability": 100
							},
							"FireMode": {
								"FireMode": "single"
							}
						}
					},
					{
						"_id": "674f242414121869ec032c85",
						"_tpl": "55d4491a4bdc2d882f8b456e",
						"slotId": "mod_barrel",
						"parentId": "674f242414121869ec032c84"
					},
					{
						"_id": "674f242414121869ec032c86",
						"_tpl": "55d45d3f4bdc2d972f8b456c",
						"slotId": "mod_handguard",
						"parentId": "674f242414121869ec032c84"
					},
					{
						"_id": "674f242414121869ec032c87",
						"_tpl": "55d484b44bdc2d1d4e8b456d",
						"slotId": "mod_magazine",
						"parentId": "674f242414121869ec032c84"
					},
					{
						"_id": "674f242414121869ec032c88",
						"_tpl": "56083cba4bdc2de22e8b456f",
						"slotId": "mod_stock",
						"parentId": "674f242414121869ec032c84"
					}
				],
                "target": "674f242414121869ec032c84",
                "type": QuestRewardType.ITEM,
                "unknown": false,
                "value": 1
            }
            setupGunsmith1.push(newGP1Reward);

            // Gunsmith Part 3
            const setupGunsmith3 = quests[IDS.GunsmithPart3].rewards.Started;
            const newGP3Reward = {
                "findInRaid": true,
				"id": "674f426d3f4dca929209ef99",
                "index": 0,
                "items": [
					{
						"_id": "674f2cb8ac7331365c031faa",
						"_tpl": "5926bb2186f7744b1c6c6e60",
						"upd": {
							"Repairable": {
								"MaxDurability": 100,
								"Durability": 100
							},
							"FireMode": {
								"FireMode": "single"
							}
						}
					},
					{
						"_id": "674f2cb8ac7331365c031fab",
						"_tpl": "5926c3b286f774640d189b6b",
						"slotId": "mod_magazine",
						"parentId": "674f2cb8ac7331365c031faa"
					},
					{
						"_id": "674f2cb8ac7331365c031fac",
						"_tpl": "5926c0df86f77462f647f764",
						"slotId": "mod_reciever",
						"parentId": "674f2cb8ac7331365c031faa"
					},
					{
						"_id": "674f2cb8ac7331365c031fad",
						"_tpl": "5926c32286f774616e42de99",
						"slotId": "mod_charge",
						"parentId": "674f2cb8ac7331365c031faa"
					},
					{
						"_id": "674f2cb8ac7331365c031fae",
						"_tpl": "5926c36d86f77467a92a8629",
						"slotId": "mod_handguard",
						"parentId": "674f2cb8ac7331365c031fac"
					},
					{
						"_id": "674f2cb8ac7331365c031faf",
						"_tpl": "5926d2be86f774134d668e4e",
						"slotId": "mod_sight_rear",
						"upd": {
							"Sight": {
								"ScopesCurrentCalibPointIndexes": [
									0
								],
								"ScopesSelectedModes": [
									0
								],
								"SelectedScope": 0,
								"ScopeZoomValue": 0
							}
						},
						"parentId": "674f2cb8ac7331365c031fac"
					},
					{
						"_id": "674f2cb8ac7331365c031fb0",
						"_tpl": "5926d3c686f77410de68ebc8",
						"slotId": "mod_stock",
						"parentId": "674f2cb8ac7331365c031fac"
					},
					{
						"_id": "674f2cb8ac7331365c031fb1",
						"_tpl": "5926e16e86f7742f5a0f7ecb",
						"slotId": "mod_muzzle",
						"parentId": "674f2cb8ac7331365c031fac"
					}
				],
                "target": "674f2cb8ac7331365c031faa",
                "type": QuestRewardType.ITEM,
                "unknown": false,
                "value": 1
            }
            setupGunsmith3.push(newGP3Reward);

            // Gunsmith Part 4
            const setupGunsmith4 = quests[IDS.GunsmithPart4].rewards.Started;
            const newGP4Reward = {
                "findInRaid": true,
				"id": "674f4257f4f927f030145097",
                "index": 0,
				"items": [
					{
						"_id": "674f2cd2ac7331365c031fbc",
						"_tpl": "587e02ff24597743df3deaeb",
						"upd": {
							"Repairable": {
								"MaxDurability": 100,
								"Durability": 100
							},
							"FireMode": {
								"FireMode": "single"
							}
						}
					},
					{
						"_id": "674f2cd2ac7331365c031fbd",
						"_tpl": "587e0531245977466077a0f7",
						"slotId": "mod_stock",
						"parentId": "674f2cd2ac7331365c031fbc"
					},
					{
						"_id": "674f2cd2ac7331365c031fbe",
						"_tpl": "634eff66517ccc8a960fc735",
						"slotId": "mod_barrel",
						"parentId": "674f2cd2ac7331365c031fbc"
					},
					{
						"_id": "674f2cd2ac7331365c031fbf",
						"_tpl": "587df3a12459772c28142567",
						"slotId": "mod_magazine",
						"parentId": "674f2cd2ac7331365c031fbc"
					},
					{
						"_id": "674f2cd2ac7331365c031fc0",
						"_tpl": "634f06262e5def262d0b30ca",
						"slotId": "mod_reciever",
						"parentId": "674f2cd2ac7331365c031fbc"
					},
					{
						"_id": "674f2cd2ac7331365c031fc1",
						"_tpl": "634f05a21f9f536910079b56",
						"slotId": "mod_mount_000",
						"parentId": "674f2cd2ac7331365c031fbe"
					},
					{
						"_id": "674f2cd2ac7331365c031fc2",
						"_tpl": "634f036a517ccc8a960fc746",
						"slotId": "mod_gas_block",
						"parentId": "674f2cd2ac7331365c031fc1"
					},
					{
						"_id": "674f2cd2ac7331365c031fc3",
						"_tpl": "574db213245977459a2f3f5d",
						"slotId": "mod_sight_rear",
						"upd": {
							"Sight": {
								"ScopesCurrentCalibPointIndexes": [
									0
								],
								"ScopesSelectedModes": [
									0
								],
								"SelectedScope": 0,
								"ScopeZoomValue": 0
							}
						},
						"parentId": "674f2cd2ac7331365c031fc1"
					},
					{
						"_id": "674f2cd2ac7331365c031fc4",
						"_tpl": "634f03d40384a3ba4f06f874",
						"slotId": "mod_mount_000",
						"parentId": "674f2cd2ac7331365c031fc2"
					}
				],
                "target": "674f2cd2ac7331365c031fbc",
                "type": QuestRewardType.ITEM,
                "unknown": false,
                "value": 1
            }
            setupGunsmith4.push(newGP4Reward);

            // Gunsmith Part 5
            const setupGunsmith5 = quests[IDS.GunsmithPart5].rewards.Started;
            const newGP5Reward = {
                "findInRaid": true,
				"id": "674f427975f61bbb17602a9a",
                "index": 0,
				"items": [
					{
						"_id": "674f2d57ac7331365c032e6a",
						"_tpl": "5a7828548dc32e5a9c28b516",
						"upd": {
							"Repairable": {
								"MaxDurability": 100,
								"Durability": 100
							},
							"FireMode": {
								"FireMode": "single"
							}
						}
					},
					{
						"_id": "674f2d57ac7331365c032e6b",
						"_tpl": "5a787f7ac5856700177af660",
						"slotId": "mod_barrel",
						"parentId": "674f2d57ac7331365c032e6a"
					},
					{
						"_id": "674f2d57ac7331365c032e6c",
						"_tpl": "5a788089c5856700142fdd9c",
						"slotId": "mod_handguard",
						"parentId": "674f2d57ac7331365c032e6a"
					},
					{
						"_id": "674f2d57ac7331365c032e6d",
						"_tpl": "5a7882dcc5856700177af662",
						"slotId": "mod_magazine",
						"parentId": "674f2d57ac7331365c032e6a"
					},
					{
						"_id": "674f2d57ac7331365c032e6e",
						"_tpl": "5a7880d0c5856700142fdd9d",
						"slotId": "mod_stock",
						"parentId": "674f2d57ac7331365c032e6a"
					}
				],
                "target": "674f2d57ac7331365c032e6a",
                "type": QuestRewardType.ITEM,
                "unknown": false,
                "value": 1
            }
            setupGunsmith5.push(newGP5Reward);

            // Gunsmith Part 6
            const setupGunsmith6 = quests[IDS.GunsmithPart6].rewards.Started;
            const newGP6Reward = {
                "findInRaid": true,
				"id": "674f428a2f4365f0c7a8732d",
                "index": 0,
				"items": [
					{
						"_id": "674f2d76ac7331365c032e79",
						"_tpl": "59d6088586f774275f37482f",
						"upd": {
							"Repairable": {
								"MaxDurability": 100,
								"Durability": 100
							},
							"FireMode": {
								"FireMode": "single"
							}
						}
					},
					{
						"_id": "674f2d76ac7331365c032e7a",
						"_tpl": "59d64ec286f774171d1e0a42",
						"slotId": "mod_gas_block",
						"parentId": "674f2d76ac7331365c032e79"
					},
					{
						"_id": "674f2d76ac7331365c032e7b",
						"_tpl": "59d64fc686f774171b243fe2",
						"slotId": "mod_muzzle",
						"parentId": "674f2d76ac7331365c032e79"
					},
					{
						"_id": "674f2d76ac7331365c032e7c",
						"_tpl": "59e62cc886f77440d40b52a1",
						"slotId": "mod_pistol_grip",
						"parentId": "674f2d76ac7331365c032e79"
					},
					{
						"_id": "674f2d76ac7331365c032e7d",
						"_tpl": "59d6507c86f7741b846413a2",
						"slotId": "mod_reciever",
						"parentId": "674f2d76ac7331365c032e79"
					},
					{
						"_id": "674f2d76ac7331365c032e7e",
						"_tpl": "59d650cf86f7741b846413a4",
						"slotId": "mod_sight_rear",
						"upd": {
							"Sight": {
								"ScopesCurrentCalibPointIndexes": [
									0
								],
								"ScopesSelectedModes": [
									0
								],
								"SelectedScope": 0,
								"ScopeZoomValue": 0
							}
						},
						"parentId": "674f2d76ac7331365c032e79"
					},
					{
						"_id": "674f2d76ac7331365c032e7f",
						"_tpl": "59d6514b86f774171a068a08",
						"slotId": "mod_stock",
						"parentId": "674f2d76ac7331365c032e79"
					},
					{
						"_id": "674f2d76ac7331365c032e80",
						"_tpl": "59d625f086f774661516605d",
						"slotId": "mod_magazine",
						"parentId": "674f2d76ac7331365c032e79"
					},
					{
						"_id": "674f2d76ac7331365c032e81",
						"_tpl": "59d64f2f86f77417193ef8b3",
						"slotId": "mod_handguard",
						"parentId": "674f2d76ac7331365c032e7a"
					}
				],
                "target": "674f2d76ac7331365c032e79",
                "type": QuestRewardType.ITEM,
                "unknown": false,
                "value": 1
            }
            setupGunsmith6.push(newGP6Reward);

            // Gunsmith Part 7
            const setupGunsmith7 = quests[IDS.GunsmithPart7].rewards.Started;
			const newGP7Reward = {
				"findInRaid": true,
				"id": "674f535c40c5421a4fffe754",
				"index": 0,
				"items": [
					{
						"_id": "674f5c6a6341e68384033f7e",
						"_tpl": "5447a9cd4bdc2dbd208b4567",
						"upd": {
							"Repairable": {
								"MaxDurability": 100,
								"Durability": 100
							},
							"FireMode": {
								"FireMode": "single"
							}
						}
					},
					{
						"_id": "674f5c6a6341e68384033f7f",
						"_tpl": "55d4b9964bdc2d1d4e8b456e",
						"slotId": "mod_pistol_grip",
						"parentId": "674f5c6a6341e68384033f7e"
					},
					{
						"_id": "674f5c6a6341e68384033f80",
						"_tpl": "55d4887d4bdc2d962f8b4570",
						"slotId": "mod_magazine",
						"parentId": "674f5c6a6341e68384033f7e"
					},
					{
						"_id": "674f5c6a6341e68384033f81",
						"_tpl": "55d355e64bdc2d962f8b4569",
						"slotId": "mod_reciever",
						"parentId": "674f5c6a6341e68384033f7e"
					},
					{
						"_id": "674f5c6a6341e68384033f82",
						"_tpl": "5649be884bdc2d79388b4577",
						"slotId": "mod_stock",
						"parentId": "674f5c6a6341e68384033f7e"
					},
					{
						"_id": "674f5c6a6341e68384033f83",
						"_tpl": "55d44fd14bdc2d962f8b456e",
						"slotId": "mod_charge",
						"parentId": "674f5c6a6341e68384033f7e"
					},
					{
						"_id": "674f5c6a6341e68384033f84",
						"_tpl": "55d3632e4bdc2d972f8b4569",
						"slotId": "mod_barrel",
						"parentId": "674f5c6a6341e68384033f81"
					},
					{
						"_id": "674f5c6a6341e68384033f85",
						"_tpl": "5ae30db85acfc408fb139a05",
						"slotId": "mod_handguard",
						"parentId": "674f5c6a6341e68384033f81"
					},
					{
						"_id": "674f5c6a6341e68384033f86",
						"_tpl": "5ae30bad5acfc400185c2dc4",
						"slotId": "mod_sight_rear",
						"upd": {
							"Sight": {
								"ScopesCurrentCalibPointIndexes": [
									0
								],
								"ScopesSelectedModes": [
									0
								],
								"SelectedScope": 0,
								"ScopeZoomValue": 0
							}
						},
						"parentId": "674f5c6a6341e68384033f81"
					},
					{
						"_id": "674f5c6a6341e68384033f87",
						"_tpl": "55d4ae6c4bdc2d8b2f8b456e",
						"slotId": "mod_stock_000",
						"parentId": "674f5c6a6341e68384033f82"
					},
					{
						"_id": "674f5c6a6341e68384033f88",
						"_tpl": "544a38634bdc2d58388b4568",
						"slotId": "mod_muzzle",
						"parentId": "674f5c6a6341e68384033f84"
					},
					{
						"_id": "674f5c6a6341e68384033f89",
						"_tpl": "5ae30e795acfc408fb139a0b",
						"slotId": "mod_gas_block",
						"parentId": "674f5c6a6341e68384033f84"
					},
					{
						"_id": "674f5c6a6341e68384033f8a",
						"_tpl": "637f57a68d137b27f70c4968",
						"slotId": "mod_handguard",
						"parentId": "674f5c6a6341e68384033f85"
					}
				],
				"target": "674f5c6a6341e68384033f7e",
                "type": QuestRewardType.ITEM,
                "unknown": false,
                "value": 1
			}
			setupGunsmith7.push(newGP7Reward);

            // Gunsmith Part 8
            const setupGunsmith8 = quests[IDS.GunsmithPart8].rewards.Started;
			const newGP8Reward = {
				"findInRaid": true,
				"id": "674f5365b6de80b3784ef1d8",
				"index": 0,
				"items": [
					{
						"_id": "674f4f1b67b1cd4418031f47",
						"_tpl": "5ab8e9fcd8ce870019439434",
						"upd": {
							"Repairable": {
								"MaxDurability": 100,
								"Durability": 100
							},
							"Foldable": {
								"Folded": false
							},
							"FireMode": {
								"FireMode": "single"
							}
						}
					},
					{
						"_id": "674f4f1b67b1cd4418031f48",
						"_tpl": "59c6633186f7740cf0493bb9",
						"slotId": "mod_gas_block",
						"parentId": "674f4f1b67b1cd4418031f47"
					},
					{
						"_id": "674f4f1b67b1cd4418031f49",
						"_tpl": "5649aa744bdc2ded0b8b457e",
						"slotId": "mod_muzzle",
						"parentId": "674f4f1b67b1cd4418031f47"
					},
					{
						"_id": "674f4f1b67b1cd4418031f4a",
						"_tpl": "57e3dba62459770f0c32322b",
						"slotId": "mod_pistol_grip",
						"parentId": "674f4f1b67b1cd4418031f47"
					},
					{
						"_id": "674f4f1b67b1cd4418031f4b",
						"_tpl": "5649af094bdc2df8348b4586",
						"slotId": "mod_reciever",
						"parentId": "674f4f1b67b1cd4418031f47"
					},
					{
						"_id": "674f4f1b67b1cd4418031f4c",
						"_tpl": "5649b0544bdc2d1b2b8b458a",
						"slotId": "mod_sight_rear",
						"upd": {
							"Sight": {
								"ScopesCurrentCalibPointIndexes": [
									0
								],
								"ScopesSelectedModes": [
									0
								],
								"SelectedScope": 0,
								"ScopeZoomValue": 0
							}
						},
						"parentId": "674f4f1b67b1cd4418031f47"
					},
					{
						"_id": "674f4f1b67b1cd4418031f4d",
						"_tpl": "5ab626e4d8ce87272e4c6e43",
						"slotId": "mod_stock",
						"parentId": "674f4f1b67b1cd4418031f47"
					},
					{
						"_id": "674f4f1b67b1cd4418031f4e",
						"_tpl": "564ca99c4bdc2d16268b4589",
						"slotId": "mod_magazine",
						"parentId": "674f4f1b67b1cd4418031f47"
					},
					{
						"_id": "674f4f1b67b1cd4418031f4f",
						"_tpl": "5648b0744bdc2d363b8b4578",
						"slotId": "mod_handguard",
						"parentId": "674f4f1b67b1cd4418031f48"
					}
				],
				"target": "674f4f1b67b1cd4418031f47",
				"type": QuestRewardType.ITEM,
				"unknown": false,
				"value": 1
			}
			setupGunsmith8.push(newGP8Reward);

            // Gunsmith Part 9
            const setupGunsmith9 = quests[IDS.GunsmithPart9].rewards.Started;
			const newGP9Reward = {
				"findInRaid": true,
				"id": "674f5369ffbc6d86d0b4d8ee",
				"index": 0,
				"items": [
					{
						"_id": "674f4f3567b1cd4418031f58",
						"_tpl": "56d59856d2720bd8418b456a",
						"upd": {
							"Repairable": {
								"MaxDurability": 100,
								"Durability": 100
							},
							"FireMode": {
								"FireMode": "single"
							}
						}
					},
					{
						"_id": "674f4f3567b1cd4418031f59",
						"_tpl": "56d5a1f7d2720bb3418b456a",
						"slotId": "mod_barrel",
						"parentId": "674f4f3567b1cd4418031f58"
					},
					{
						"_id": "674f4f3567b1cd4418031f5a",
						"_tpl": "56d5a2bbd2720bb8418b456a",
						"slotId": "mod_pistol_grip",
						"parentId": "674f4f3567b1cd4418031f58"
					},
					{
						"_id": "674f4f3567b1cd4418031f5b",
						"_tpl": "56d5a407d2720bb3418b456b",
						"slotId": "mod_reciever",
						"parentId": "674f4f3567b1cd4418031f58"
					},
					{
						"_id": "674f4f3567b1cd4418031f5c",
						"_tpl": "56d59948d2720bb7418b4582",
						"slotId": "mod_magazine",
						"parentId": "674f4f3567b1cd4418031f58"
					},
					{
						"_id": "674f4f3567b1cd4418031f5d",
						"_tpl": "56d5a77ed2720b90418b4568",
						"slotId": "mod_sight_rear",
						"upd": {
							"Sight": {
								"ScopesCurrentCalibPointIndexes": [
									0
								],
								"ScopesSelectedModes": [
									0
								],
								"SelectedScope": 0,
								"ScopeZoomValue": 0
							}
						},
						"parentId": "674f4f3567b1cd4418031f5b"
					},
					{
						"_id": "674f4f3567b1cd4418031f5e",
						"_tpl": "56d5a661d2720bd8418b456b",
						"slotId": "mod_sight_front",
						"upd": {
							"Sight": {
								"ScopesCurrentCalibPointIndexes": [
									0
								],
								"ScopesSelectedModes": [
									0
								],
								"SelectedScope": 0,
								"ScopeZoomValue": 0
							}
						},
						"parentId": "674f4f3567b1cd4418031f5b"
					}
				],
				"target": "674f4f3567b1cd4418031f58",
				"type": QuestRewardType.ITEM,
				"unknown": false,
				"value": 1
			}
			setupGunsmith9.push(newGP9Reward);

            // Gunsmith Part 10
            const setupGunsmith10 = quests[IDS.GunsmithPart10].rewards.Started;
			const newGP10Reward = {
				"findInRaid": true,
				"id": "674f536ef07d9eadf07be803",
				"index": 0,
				"items": [
					{
						"_id": "674f4f5167b1cd4418031f69",
						"_tpl": "5ac66d9b5acfc4001633997a",
						"upd": {
							"Repairable": {
								"MaxDurability": 100,
								"Durability": 100
							},
							"Foldable": {
								"Folded": false
							},
							"FireMode": {
								"FireMode": "single"
							}
						}
					},
					{
						"_id": "674f4f5167b1cd4418031f6a",
						"_tpl": "59c6633186f7740cf0493bb9",
						"slotId": "mod_gas_block",
						"parentId": "674f4f5167b1cd4418031f69"
					},
					{
						"_id": "674f4f5167b1cd4418031f6b",
						"_tpl": "5ac72e945acfc43f3b691116",
						"slotId": "mod_muzzle",
						"parentId": "674f4f5167b1cd4418031f69"
					},
					{
						"_id": "674f4f5167b1cd4418031f6c",
						"_tpl": "5649ade84bdc2d1b2b8b4587",
						"slotId": "mod_pistol_grip",
						"parentId": "674f4f5167b1cd4418031f69"
					},
					{
						"_id": "674f4f5167b1cd4418031f6d",
						"_tpl": "5ac50da15acfc4001718d287",
						"slotId": "mod_reciever",
						"parentId": "674f4f5167b1cd4418031f69"
					},
					{
						"_id": "674f4f5167b1cd4418031f6e",
						"_tpl": "5ac733a45acfc400192630e2",
						"slotId": "mod_sight_rear",
						"upd": {
							"Sight": {
								"ScopesCurrentCalibPointIndexes": [
									0
								],
								"ScopesSelectedModes": [
									0
								],
								"SelectedScope": 0,
								"ScopeZoomValue": 0
							}
						},
						"parentId": "674f4f5167b1cd4418031f69"
					},
					{
						"_id": "674f4f5167b1cd4418031f6f",
						"_tpl": "5ac50c185acfc400163398d4",
						"slotId": "mod_stock",
						"parentId": "674f4f5167b1cd4418031f69"
					},
					{
						"_id": "674f4f5167b1cd4418031f70",
						"_tpl": "55d480c04bdc2d1d4e8b456a",
						"slotId": "mod_magazine",
						"parentId": "674f4f5167b1cd4418031f69"
					},
					{
						"_id": "674f4f5167b1cd4418031f71",
						"_tpl": "5648b1504bdc2d9d488b4584",
						"slotId": "mod_handguard",
						"parentId": "674f4f5167b1cd4418031f6a"
					}
				],
				"target": "674f4f5167b1cd4418031f69",
				"type": QuestRewardType.ITEM,
				"unknown": false,
				"value": 1
			}
			setupGunsmith10.push(newGP10Reward);

            // Gunsmith Part 11
            const setupGunsmith11 = quests[IDS.GunsmithPart11].rewards.Started;
			const newGP11Reward = {
				"findInRaid": true,
				"id": "674f53719ee2d6144c998540",
				"index": 0,
				"items": [
					{
						"_id": "674f552f67b1cd441803feee",
						"_tpl": "5fc3f2d5900b1d5091531e57",
						"upd": {
							"Repairable": {
								"MaxDurability": 100,
								"Durability": 100
							},
							"Foldable": {
								"Folded": false
							},
							"FireMode": {
								"FireMode": "single"
							}
						}
					},
					{
						"_id": "674f552f67b1cd441803feef",
						"_tpl": "5a718b548dc32e000d46d262",
						"slotId": "mod_magazine",
						"parentId": "674f552f67b1cd441803feee"
					},
					{
						"_id": "674f552f67b1cd441803fef0",
						"_tpl": "5fb6567747ce63734e3fa1dc",
						"slotId": "mod_sight_front",
						"upd": {
							"Sight": {
								"ScopesCurrentCalibPointIndexes": [
									0
								],
								"ScopesSelectedModes": [
									0
								],
								"SelectedScope": 0,
								"ScopeZoomValue": 0
							}
						},
						"parentId": "674f552f67b1cd441803feee"
					},
					{
						"_id": "674f552f67b1cd441803fef1",
						"_tpl": "5fb6564947ce63734e3fa1da",
						"slotId": "mod_sight_rear",
						"upd": {
							"Sight": {
								"ScopesCurrentCalibPointIndexes": [
									0
								],
								"ScopesSelectedModes": [
									0
								],
								"SelectedScope": 0,
								"ScopeZoomValue": 0
							}
						},
						"parentId": "674f552f67b1cd441803feee"
					},
					{
						"_id": "674f552f67b1cd441803fef2",
						"_tpl": "5fb6558ad6f0b2136f2d7eb7",
						"slotId": "mod_stock",
						"parentId": "674f552f67b1cd441803feee"
					},
					{
						"_id": "674f552f67b1cd441803fef3",
						"_tpl": "5fbbc366ca32ed67276c1557",
						"slotId": "mod_barrel",
						"parentId": "674f552f67b1cd441803feee"
					},
					{
						"_id": "674f552f67b1cd441803fef4",
						"_tpl": "5fbb976df9986c4cff3fe5f2",
						"slotId": "mod_mount",
						"parentId": "674f552f67b1cd441803feee"
					},
					{
						"_id": "674f552f67b1cd441803fef5",
						"_tpl": "5fce0f9b55375d18a253eff2",
						"slotId": "mod_mount_001",
						"parentId": "674f552f67b1cd441803feee"
					},
					{
						"_id": "674f552f67b1cd441803fef6",
						"_tpl": "5fce0f9b55375d18a253eff2",
						"slotId": "mod_mount_002",
						"parentId": "674f552f67b1cd441803feee"
					},
					{
						"_id": "674f552f67b1cd441803fef7",
						"_tpl": "5fbbc34106bde7524f03cbe9",
						"slotId": "mod_muzzle",
						"parentId": "674f552f67b1cd441803fef3"
					}
				],
				"target": "674f552f67b1cd441803feee",
				"type": QuestRewardType.ITEM,
				"unknown": false,
				"value": 1
			}
			setupGunsmith11.push(newGP11Reward);
				
            // Gunsmith Part 12
            const setupGunsmith12 = quests[IDS.GunsmithPart12].rewards.Started;
			const newGP12Reward = {
				"findInRaid": true,
				"id": "674f5378aaa384d5db83a96f",
				"index": 0,
				"items": [
					{
						"_id": "674f554867b1cd4418040daf",
						"_tpl": "58948c8e86f77409493f7266",
						"upd": {
							"Repairable": {
								"MaxDurability": 100,
								"Durability": 100
							},
							"FireMode": {
								"FireMode": "single"
							}
						}
					},
					{
						"_id": "674f554867b1cd4418040db0",
						"_tpl": "5894a51286f77426d13baf02",
						"slotId": "mod_pistol_grip",
						"parentId": "674f554867b1cd4418040daf"
					},
					{
						"_id": "674f554867b1cd4418040db1",
						"_tpl": "5894a05586f774094708ef75",
						"slotId": "mod_magazine",
						"parentId": "674f554867b1cd4418040daf"
					},
					{
						"_id": "674f554867b1cd4418040db2",
						"_tpl": "5894a5b586f77426d2590767",
						"slotId": "mod_reciever",
						"parentId": "674f554867b1cd4418040daf"
					},
					{
						"_id": "674f554867b1cd4418040db3",
						"_tpl": "5894a13e86f7742405482982",
						"slotId": "mod_stock",
						"parentId": "674f554867b1cd4418040daf"
					},
					{
						"_id": "674f554867b1cd4418040db4",
						"_tpl": "58949edd86f77409483e16a9",
						"slotId": "mod_charge",
						"parentId": "674f554867b1cd4418040daf"
					},
					{
						"_id": "674f554867b1cd4418040db5",
						"_tpl": "5894a2c386f77427140b8342",
						"slotId": "mod_barrel",
						"parentId": "674f554867b1cd4418040db2"
					},
					{
						"_id": "674f554867b1cd4418040db6",
						"_tpl": "5894a42086f77426d2590762",
						"slotId": "mod_handguard",
						"parentId": "674f554867b1cd4418040db2"
					},
					{
						"_id": "674f554867b1cd4418040db7",
						"_tpl": "5894a81786f77427140b8347",
						"slotId": "mod_sight_rear",
						"upd": {
							"Sight": {
								"ScopesCurrentCalibPointIndexes": [
									0
								],
								"ScopesSelectedModes": [
									0
								],
								"SelectedScope": 0,
								"ScopeZoomValue": 0
							}
						},
						"parentId": "674f554867b1cd4418040db2"
					},
					{
						"_id": "674f554867b1cd4418040db8",
						"_tpl": "58949dea86f77409483e16a8",
						"slotId": "mod_muzzle",
						"parentId": "674f554867b1cd4418040db5"
					},
					{
						"_id": "674f554867b1cd4418040db9",
						"_tpl": "5894a73486f77426d259076c",
						"slotId": "mod_sight_front",
						"upd": {
							"Sight": {
								"ScopesCurrentCalibPointIndexes": [
									0
								],
								"ScopesSelectedModes": [
									0
								],
								"SelectedScope": 0,
								"ScopeZoomValue": 0
							}
						},
						"parentId": "674f554867b1cd4418040db6"
					},
					{
						"_id": "674f554867b1cd4418040dba",
						"_tpl": "58a56f8d86f774651579314c",
						"slotId": "mod_mount_000",
						"parentId": "674f554867b1cd4418040db6"
					},
					{
						"_id": "674f554867b1cd4418040dbb",
						"_tpl": "58a5c12e86f7745d585a2b9e",
						"slotId": "mod_mount_001",
						"parentId": "674f554867b1cd4418040db6"
					},
					{
						"_id": "674f554867b1cd4418040dbc",
						"_tpl": "58a56f8d86f774651579314c",
						"slotId": "mod_mount_002",
						"parentId": "674f554867b1cd4418040db6"
					}
				],
				"target": "674f554867b1cd4418040daf",
				"type": QuestRewardType.ITEM,
				"unknown": false,
				"value": 1
			}
			setupGunsmith12.push(newGP12Reward);
				
            // Gunsmith Part 13
            const setupGunsmith13 = quests[IDS.GunsmithPart13].rewards.Started;
			const newGP13Reward = {
				"findInRaid": true,
				"id": "674f537bc4e4ba7150c3d662",
				"index": 0,
				"items": [
					{
						"_id": "674f55b067b1cd4418041cf3",
						"_tpl": "5a367e5dc4a282000e49738f",
						"upd": {
							"Repairable": {
								"MaxDurability": 100,
								"Durability": 100
							},
							"FireMode": {
								"FireMode": "single"
							}
						}
					},
					{
						"_id": "674f55b067b1cd4418041cf4",
						"_tpl": "5a339805c4a2826c6e06d73d",
						"slotId": "mod_pistol_grip",
						"parentId": "674f55b067b1cd4418041cf3"
					},
					{
						"_id": "674f55b067b1cd4418041cf5",
						"_tpl": "5a3501acc4a282000d72293a",
						"slotId": "mod_magazine",
						"parentId": "674f55b067b1cd4418041cf3"
					},
					{
						"_id": "674f55b067b1cd4418041cf6",
						"_tpl": "5a33ca0fc4a282000d72292f",
						"slotId": "mod_stock",
						"parentId": "674f55b067b1cd4418041cf3"
					},
					{
						"_id": "674f55b067b1cd4418041cf7",
						"_tpl": "5a329052c4a28200741e22d3",
						"slotId": "mod_handguard",
						"parentId": "674f55b067b1cd4418041cf3"
					},
					{
						"_id": "674f55b067b1cd4418041cf8",
						"_tpl": "5a34fae7c4a2826c6e06d760",
						"slotId": "mod_barrel",
						"parentId": "674f55b067b1cd4418041cf3"
					},
					{
						"_id": "674f55b067b1cd4418041cf9",
						"_tpl": "5a33cae9c4a28232980eb086",
						"slotId": "mod_stock",
						"parentId": "674f55b067b1cd4418041cf6"
					},
					{
						"_id": "674f55b067b1cd4418041cfa",
						"_tpl": "5a34fd2bc4a282329a73b4c5",
						"slotId": "mod_muzzle",
						"parentId": "674f55b067b1cd4418041cf8"
					},
					{
						"_id": "674f55b067b1cd4418041cfb",
						"_tpl": "5a34fbadc4a28200741e230a",
						"slotId": "mod_gas_block",
						"parentId": "674f55b067b1cd4418041cf8"
					}
				],
				"target": "674f55b067b1cd4418041cf3",
				"type": QuestRewardType.ITEM,
				"unknown": false,
				"value": 1
			}
			setupGunsmith13.push(newGP13Reward);
				
            // Gunsmith Part 14
            const setupGunsmith14 = quests[IDS.GunsmithPart14].rewards.Started;
			const newGP14Reward = {
				"findInRaid": true,
				"id": "674f5384eae96a94550eb378",
				"index": 0,
				"items": [
					{
						"_id": "674f568467b1cd441804598e",
						"_tpl": "5bb2475ed4351e00853264e3",
						"upd": {
							"Repairable": {
								"MaxDurability": 100,
								"Durability": 100
							},
							"FireMode": {
								"FireMode": "single"
							}
						}
					},
					{
						"_id": "674f568467b1cd441804598f",
						"_tpl": "5bb20e0ed4351e3bac1212dc",
						"slotId": "mod_pistol_grip",
						"parentId": "674f568467b1cd441804598e"
					},
					{
						"_id": "674f568467b1cd4418045990",
						"_tpl": "5c05413a0db834001c390617",
						"slotId": "mod_magazine",
						"parentId": "674f568467b1cd441804598e"
					},
					{
						"_id": "674f568467b1cd4418045991",
						"_tpl": "5bb20d53d4351e4502010a69",
						"slotId": "mod_reciever",
						"parentId": "674f568467b1cd441804598e"
					},
					{
						"_id": "674f568467b1cd4418045992",
						"_tpl": "5bb20e58d4351e00320205d7",
						"slotId": "mod_stock",
						"parentId": "674f568467b1cd441804598e"
					},
					{
						"_id": "674f568467b1cd4418045993",
						"_tpl": "5bb20dbcd4351e44f824c04e",
						"slotId": "mod_charge",
						"parentId": "674f568467b1cd441804598e"
					},
					{
						"_id": "674f568467b1cd4418045994",
						"_tpl": "5bb20d9cd4351e00334c9d8a",
						"slotId": "mod_barrel",
						"parentId": "674f568467b1cd4418045991"
					},
					{
						"_id": "674f568467b1cd4418045995",
						"_tpl": "5bb20de5d4351e0035629e59",
						"slotId": "mod_handguard",
						"parentId": "674f568467b1cd4418045991"
					},
					{
						"_id": "674f568467b1cd4418045996",
						"_tpl": "5bb20e49d4351e3bac1212de",
						"slotId": "mod_sight_rear",
						"upd": {
							"Sight": {
								"ScopesCurrentCalibPointIndexes": [
									0
								],
								"ScopesSelectedModes": [
									0
								],
								"SelectedScope": 0,
								"ScopeZoomValue": 0
							}
						},
						"parentId": "674f568467b1cd4418045991"
					},
					{
						"_id": "674f568467b1cd4418045997",
						"_tpl": "5bb20e70d4351e0035629f8f",
						"slotId": "mod_stock_000",
						"parentId": "674f568467b1cd4418045992"
					},
					{
						"_id": "674f568467b1cd4418045998",
						"_tpl": "544a38634bdc2d58388b4568",
						"slotId": "mod_muzzle",
						"parentId": "674f568467b1cd4418045994"
					},
					{
						"_id": "674f568467b1cd4418045999",
						"_tpl": "5bb20dcad4351e3bac1212da",
						"slotId": "mod_gas_block",
						"parentId": "674f568467b1cd4418045994"
					}
				],
				"target": "674f568467b1cd441804598e",
				"type": QuestRewardType.ITEM,
				"unknown": false,
				"value": 1
			}
			setupGunsmith14.push(newGP14Reward);
				
            // Gunsmith Part 15
            const setupGunsmith15 = quests[IDS.GunsmithPart15].rewards.Started;
			const newGP15Reward = {
				"findInRaid": true,
				"id": "674f538901dfe29c49f2dfa7",
				"index": 0,
				"items": [
					{
						"_id": "674f569967b1cd44180459a3",
						"_tpl": "57c44b372459772d2b39b8ce",
						"upd": {
							"Repairable": {
								"MaxDurability": 100,
								"Durability": 100
							},
							"Foldable": {
								"Folded": false
							},
							"FireMode": {
								"FireMode": "single"
							}
						}
					},
					{
						"_id": "674f569967b1cd44180459a4",
						"_tpl": "57c44dd02459772d2e0ae249",
						"slotId": "mod_muzzle",
						"parentId": "674f569967b1cd44180459a3"
					},
					{
						"_id": "674f569967b1cd44180459a5",
						"_tpl": "57c44f4f2459772d2c627113",
						"slotId": "mod_reciever",
						"parentId": "674f569967b1cd44180459a3"
					},
					{
						"_id": "674f569967b1cd44180459a6",
						"_tpl": "57838f9f2459774a150289a0",
						"slotId": "mod_magazine",
						"parentId": "674f569967b1cd44180459a3"
					},
					{
						"_id": "674f569967b1cd44180459a7",
						"_tpl": "57c44fa82459772d2d75e415",
						"slotId": "mod_pistol_grip",
						"parentId": "674f569967b1cd44180459a3"
					},
					{
						"_id": "674f569967b1cd44180459a8",
						"_tpl": "57c450252459772d28133253",
						"slotId": "mod_stock",
						"parentId": "674f569967b1cd44180459a3"
					},
					{
						"_id": "674f569967b1cd44180459a9",
						"_tpl": "651178336cad06c37c049eb4",
						"slotId": "mod_handguard",
						"parentId": "674f569967b1cd44180459a3"
					},
					{
						"_id": "674f569967b1cd44180459aa",
						"_tpl": "57c44e7b2459772d28133248",
						"slotId": "mod_sight_rear",
						"upd": {
							"Sight": {
								"ScopesCurrentCalibPointIndexes": [
									0
								],
								"ScopesSelectedModes": [
									0
								],
								"SelectedScope": 0,
								"ScopeZoomValue": 0
							}
						},
						"parentId": "674f569967b1cd44180459a4"
					}
				],
				"target": "674f569967b1cd44180459a3",
				"type": QuestRewardType.ITEM,
				"unknown": false,
				"value": 1
			}
			setupGunsmith15.push(newGP15Reward);
				
            // Gunsmith Part 16
            const setupGunsmith16 = quests[IDS.GunsmithPart16].rewards.Started;
			const newGP16Reward = {
				"findInRaid": true,
				"id": "674f538b392a4f5c8bf79d93",
				"index": 0,
				"items": [
					{
						"_id": "674f57b867b1cd441804a290",
						"_tpl": "588892092459774ac91d4b11",
						"upd": {
							"Repairable": {
								"MaxDurability": 100,
								"Durability": 100
							},
							"Foldable": {
								"Folded": false
							},
							"FireMode": {
								"FireMode": "single"
							}
						}
					},
					{
						"_id": "674f57b867b1cd441804a291",
						"_tpl": "5888988e24597752fe43a6fa",
						"slotId": "mod_magazine",
						"parentId": "674f57b867b1cd441804a290"
					},
					{
						"_id": "674f57b867b1cd441804a292",
						"_tpl": "5888956924597752983e182d",
						"slotId": "mod_barrel",
						"parentId": "674f57b867b1cd441804a290"
					},
					{
						"_id": "674f57b867b1cd441804a293",
						"_tpl": "57c55f172459772d27602381",
						"slotId": "mod_pistol_grip",
						"parentId": "674f57b867b1cd441804a290"
					},
					{
						"_id": "674f57b867b1cd441804a294",
						"_tpl": "58889d0c2459775bc215d981",
						"slotId": "mod_stock",
						"parentId": "674f57b867b1cd441804a290"
					},
					{
						"_id": "674f57b867b1cd441804a295",
						"_tpl": "5888996c24597754281f9419",
						"slotId": "mod_muzzle",
						"parentId": "674f57b867b1cd441804a292"
					},
					{
						"_id": "674f57b867b1cd441804a296",
						"_tpl": "5888976c24597754281f93f5",
						"slotId": "mod_handguard",
						"parentId": "674f57b867b1cd441804a292"
					}
				],
				"target": "674f57b867b1cd441804a290",
				"type": QuestRewardType.ITEM,
				"unknown": false,
				"value": 1
			}
			setupGunsmith16.push(newGP16Reward);
				
            // Gunsmith Part 17
            const setupGunsmith17 = quests[IDS.GunsmithPart17].rewards.Started;
			const newGP17Reward = {
				"findInRaid": true,
				"id": "674f538fddf997c7f080b89a",
				"index": 0,
				"items": [
					{
						"_id": "674f57d167b1cd441804a2a1",
						"_tpl": "5ac66d015acfc400180ae6e4",
						"upd": {
							"Repairable": {
								"MaxDurability": 100,
								"Durability": 100
							},
							"Foldable": {
								"Folded": false
							},
							"FireMode": {
								"FireMode": "single"
							}
						}
					},
					{
						"_id": "674f57d167b1cd441804a2a2",
						"_tpl": "59c6633186f7740cf0493bb9",
						"slotId": "mod_gas_block",
						"parentId": "674f57d167b1cd441804a2a1"
					},
					{
						"_id": "674f57d167b1cd441804a2a3",
						"_tpl": "5ac72e725acfc400180ae701",
						"slotId": "mod_muzzle",
						"parentId": "674f57d167b1cd441804a2a1"
					},
					{
						"_id": "674f57d167b1cd441804a2a4",
						"_tpl": "5649ade84bdc2d1b2b8b4587",
						"slotId": "mod_pistol_grip",
						"parentId": "674f57d167b1cd441804a2a1"
					},
					{
						"_id": "674f57d167b1cd441804a2a5",
						"_tpl": "5ac50da15acfc4001718d287",
						"slotId": "mod_reciever",
						"parentId": "674f57d167b1cd441804a2a1"
					},
					{
						"_id": "674f57d167b1cd441804a2a6",
						"_tpl": "5ac733a45acfc400192630e2",
						"slotId": "mod_sight_rear",
						"upd": {
							"Sight": {
								"ScopesCurrentCalibPointIndexes": [
									0
								],
								"ScopesSelectedModes": [
									0
								],
								"SelectedScope": 0,
								"ScopeZoomValue": 0
							}
						},
						"parentId": "674f57d167b1cd441804a2a1"
					},
					{
						"_id": "674f57d167b1cd441804a2a7",
						"_tpl": "5ac50c185acfc400163398d4",
						"slotId": "mod_stock",
						"parentId": "674f57d167b1cd441804a2a1"
					},
					{
						"_id": "674f57d167b1cd441804a2a8",
						"_tpl": "5ac66c5d5acfc4001718d314",
						"slotId": "mod_magazine",
						"parentId": "674f57d167b1cd441804a2a1"
					},
					{
						"_id": "674f57d167b1cd441804a2a9",
						"_tpl": "5648b1504bdc2d9d488b4584",
						"slotId": "mod_handguard",
						"parentId": "674f57d167b1cd441804a2a2"
					}
				],
				"target": "674f57d167b1cd441804a2a1",
				"type": QuestRewardType.ITEM,
				"unknown": false,
				"value": 1
			}
			setupGunsmith17.push(newGP17Reward);
				
            // Gunsmith Part 18
            const setupGunsmith18 = quests[IDS.GunsmithPart18].rewards.Started;
			const newGP18Reward = {
				"findInRaid": true,
				"id": "674f53943a1b494d1d6926f4",
				"index": 0,
				"items": [
					{
						"_id": "674f57ec67b1cd441804b16c",
						"_tpl": "5a0ec13bfcdbcb00165aa685",
						"upd": {
							"Repairable": {
								"MaxDurability": 100,
								"Durability": 100
							},
							"FireMode": {
								"FireMode": "single"
							}
						}
					},
					{
						"_id": "674f57ec67b1cd441804b16d",
						"_tpl": "59d64ec286f774171d1e0a42",
						"slotId": "mod_gas_block",
						"parentId": "674f57ec67b1cd441804b16c"
					},
					{
						"_id": "674f57ec67b1cd441804b16e",
						"_tpl": "59d64fc686f774171b243fe2",
						"slotId": "mod_muzzle",
						"parentId": "674f57ec67b1cd441804b16c"
					},
					{
						"_id": "674f57ec67b1cd441804b16f",
						"_tpl": "59e62cc886f77440d40b52a1",
						"slotId": "mod_pistol_grip",
						"parentId": "674f57ec67b1cd441804b16c"
					},
					{
						"_id": "674f57ec67b1cd441804b170",
						"_tpl": "59d6507c86f7741b846413a2",
						"slotId": "mod_reciever",
						"parentId": "674f57ec67b1cd441804b16c"
					},
					{
						"_id": "674f57ec67b1cd441804b171",
						"_tpl": "59d650cf86f7741b846413a4",
						"slotId": "mod_sight_rear",
						"upd": {
							"Sight": {
								"ScopesCurrentCalibPointIndexes": [
									0
								],
								"ScopesSelectedModes": [
									0
								],
								"SelectedScope": 0,
								"ScopeZoomValue": 0
							}
						},
						"parentId": "674f57ec67b1cd441804b16c"
					},
					{
						"_id": "674f57ec67b1cd441804b172",
						"_tpl": "59d6514b86f774171a068a08",
						"slotId": "mod_stock",
						"parentId": "674f57ec67b1cd441804b16c"
					},
					{
						"_id": "674f57ec67b1cd441804b173",
						"_tpl": "5a01c29586f77474660c694c",
						"slotId": "mod_magazine",
						"parentId": "674f57ec67b1cd441804b16c"
					},
					{
						"_id": "674f57ec67b1cd441804b174",
						"_tpl": "59d64f2f86f77417193ef8b3",
						"slotId": "mod_handguard",
						"parentId": "674f57ec67b1cd441804b16d"
					}
				],
				"target": "674f57ec67b1cd441804b16c",
				"type": QuestRewardType.ITEM,
				"unknown": false,
				"value": 1
			}
			setupGunsmith18.push(newGP18Reward);
				
            // Gunsmith Part 19
            const setupGunsmith19 = quests[IDS.GunsmithPart19].rewards.Started;
			const newGP19Reward = {
				"findInRaid": true,
				"id": "674f5397b1f465c9d4b650c3",
				"index": 0,
				"items": [
					{
						"_id": "674f580467b1cd441804b182",
						"_tpl": "5c46fbd72e2216398b5a8c9c",
						"upd": {
							"Repairable": {
								"MaxDurability": 100,
								"Durability": 100
							},
							"Foldable": {
								"Folded": false
							},
							"FireMode": {
								"FireMode": "single"
							}
						}
					},
					{
						"_id": "674f580467b1cd441804b183",
						"_tpl": "5c471be12e221602b66cd9ac",
						"slotId": "mod_pistol_grip",
						"parentId": "674f580467b1cd441804b182"
					},
					{
						"_id": "674f580467b1cd441804b184",
						"_tpl": "5c471c442e221602b542a6f8",
						"slotId": "mod_magazine",
						"parentId": "674f580467b1cd441804b182"
					},
					{
						"_id": "674f580467b1cd441804b185",
						"_tpl": "5c471b5d2e221602b21d4e14",
						"slotId": "mod_stock",
						"parentId": "674f580467b1cd441804b182"
					},
					{
						"_id": "674f580467b1cd441804b186",
						"_tpl": "5c471cb32e221602b177afaa",
						"slotId": "mod_barrel",
						"parentId": "674f580467b1cd441804b182"
					},
					{
						"_id": "674f580467b1cd441804b187",
						"_tpl": "5c471c2d2e22164bef5d077f",
						"slotId": "mod_mount_001",
						"parentId": "674f580467b1cd441804b182"
					},
					{
						"_id": "674f580467b1cd441804b188",
						"_tpl": "5c471bd12e221602b4129c3a",
						"slotId": "mod_reciever",
						"parentId": "674f580467b1cd441804b182"
					},
					{
						"_id": "674f580467b1cd441804b189",
						"_tpl": "5c471bfc2e221602b21d4e17",
						"slotId": "mod_muzzle",
						"parentId": "674f580467b1cd441804b186"
					},
					{
						"_id": "674f580467b1cd441804b18a",
						"_tpl": "5c471c842e221615214259b5",
						"slotId": "mod_gas_block",
						"parentId": "674f580467b1cd441804b186"
					},
					{
						"_id": "674f580467b1cd441804b18b",
						"_tpl": "5c471c6c2e221602b66cd9ae",
						"slotId": "mod_handguard",
						"parentId": "674f580467b1cd441804b187"
					},
					{
						"_id": "674f580467b1cd441804b18c",
						"_tpl": "5c471b7e2e2216152006e46c",
						"slotId": "mod_sight_rear",
						"upd": {
							"Sight": {
								"ScopesCurrentCalibPointIndexes": [
									0
								],
								"ScopesSelectedModes": [
									0
								],
								"SelectedScope": 0,
								"ScopeZoomValue": 0
							}
						},
						"parentId": "674f580467b1cd441804b187"
					},
					{
						"_id": "674f580467b1cd441804b18d",
						"_tpl": "5c471ba12e221602b3137d76",
						"slotId": "mod_sight_front",
						"upd": {
							"Sight": {
								"ScopesCurrentCalibPointIndexes": [
									0
								],
								"ScopesSelectedModes": [
									0
								],
								"SelectedScope": 0,
								"ScopeZoomValue": 0
							}
						},
						"parentId": "674f580467b1cd441804b189"
					}
				],
				"target": "674f580467b1cd441804b182",
				"type": QuestRewardType.ITEM,
				"unknown": false,
				"value": 1
			}
			setupGunsmith19.push(newGP19Reward);
				
            // Gunsmith Part 20
            const setupGunsmith20 = quests[IDS.GunsmithPart20].rewards.Started;
			const newGP20Reward = {
				"findInRaid": true,
				"id": "674f539bfcab30c62a899427",
				"index": 0,
				"items": [
					{
						"_id": "674f582067b1cd441804c0ef",
						"_tpl": "5aafa857e5b5b00018480968",
						"upd": {
							"Repairable": {
								"MaxDurability": 100,
								"Durability": 100
							},
							"FireMode": {
								"FireMode": "single"
							}
						}
					},
					{
						"_id": "674f582067b1cd441804c0f0",
						"_tpl": "64b9e2037fdfb81df81e3c25",
						"slotId": "mod_magazine",
						"parentId": "674f582067b1cd441804c0ef"
					},
					{
						"_id": "674f582067b1cd441804c0f1",
						"_tpl": "5aaf8e43e5b5b00015693246",
						"slotId": "mod_stock",
						"parentId": "674f582067b1cd441804c0ef"
					},
					{
						"_id": "674f582067b1cd441804c0f2",
						"_tpl": "5aaf9d53e5b5b00015042a52",
						"slotId": "mod_barrel",
						"parentId": "674f582067b1cd441804c0ef"
					},
					{
						"_id": "674f582067b1cd441804c0f3",
						"_tpl": "5abcbb20d8ce87001773e258",
						"slotId": "mod_sight_rear",
						"upd": {
							"Sight": {
								"ScopesCurrentCalibPointIndexes": [
									0
								],
								"ScopesSelectedModes": [
									0
								],
								"SelectedScope": 0,
								"ScopeZoomValue": 0
							}
						},
						"parentId": "674f582067b1cd441804c0ef"
					},
					{
						"_id": "674f582067b1cd441804c0f4",
						"_tpl": "5ab24ef9e5b5b00fe93c9209",
						"slotId": "mod_mount",
						"parentId": "674f582067b1cd441804c0f1"
					},
					{
						"_id": "674f582067b1cd441804c0f5",
						"_tpl": "5aafa1c2e5b5b00015042a56",
						"slotId": "mod_muzzle",
						"parentId": "674f582067b1cd441804c0f2"
					},
					{
						"_id": "674f582067b1cd441804c0f6",
						"_tpl": "5aafa49ae5b5b00015042a58",
						"slotId": "mod_sight_front",
						"upd": {
							"Sight": {
								"ScopesCurrentCalibPointIndexes": [
									0
								],
								"ScopesSelectedModes": [
									0
								],
								"SelectedScope": 0,
								"ScopeZoomValue": 0
							}
						},
						"parentId": "674f582067b1cd441804c0f5"
					}
				],
				"target": "674f582067b1cd441804c0ef",
				"type": QuestRewardType.ITEM,
				"unknown": false,
				"value": 1
			}
			setupGunsmith20.push(newGP20Reward);
				
            // Gunsmith Part 21
            const setupGunsmith21 = quests[IDS.GunsmithPart21].rewards.Started;
            const setupGunsmith21M1911 = quests[IDS.GunsmithPart21].rewards.Started;
			const newGP21Reward = {
				"findInRaid": true,
				"id": "674f539e509d1abb910daf93",
				"index": 0,
				"items": [
					{
						"_id": "674f584e67b1cd441804cec9",
						"_tpl": "5bfea6e90db834001b7347f3",
						"upd": {
							"Repairable": {
								"MaxDurability": 100,
								"Durability": 100
							},
							"FireMode": {
								"FireMode": "single"
							}
						}
					},
					{
						"_id": "674f584e67b1cd441804ceca",
						"_tpl": "5bfea7ad0db834001c38f1ee",
						"slotId": "mod_magazine",
						"parentId": "674f584e67b1cd441804cec9"
					},
					{
						"_id": "674f584e67b1cd441804cecb",
						"_tpl": "5bfeb32b0db834001a6694d9",
						"slotId": "mod_stock",
						"parentId": "674f584e67b1cd441804cec9"
					},
					{
						"_id": "674f584e67b1cd441804cecc",
						"_tpl": "5bfebc320db8340019668d79",
						"slotId": "mod_barrel",
						"parentId": "674f584e67b1cd441804cec9"
					},
					{
						"_id": "674f584e67b1cd441804cecd",
						"_tpl": "5d270b3c8abbc3105335cfb8",
						"slotId": "mod_muzzle",
						"parentId": "674f584e67b1cd441804cecc"
					}
				],
				"target": "674f584e67b1cd441804cec9",
				"type": QuestRewardType.ITEM,
				"unknown": false,
				"value": 1
			}
			const newGP21M1Reward = {
				"findInRaid": true,
				"id": "674f53a92b8089ce5377a9cf",
				"index": 1,
				"items": [
					{
						"_id": "674f585b67b1cd441804cece",
						"_tpl": "5e81c3cbac2bb513793cdc75",
						"upd": {
							"Repairable": {
								"MaxDurability": 100,
								"Durability": 100
							},
							"FireMode": {
								"FireMode": "single"
							}
						}
					},
					{
						"_id": "674f585b67b1cd441804cecf",
						"_tpl": "5e81c519cb2b95385c177551",
						"slotId": "mod_barrel",
						"parentId": "674f585b67b1cd441804cece"
					},
					{
						"_id": "674f585b67b1cd441804ced0",
						"_tpl": "5e81c6bf763d9f754677beff",
						"slotId": "mod_pistol_grip",
						"parentId": "674f585b67b1cd441804cece"
					},
					{
						"_id": "674f585b67b1cd441804ced1",
						"_tpl": "5e81edc13397a21db957f6a1",
						"slotId": "mod_reciever",
						"parentId": "674f585b67b1cd441804cece"
					},
					{
						"_id": "674f585b67b1cd441804ced2",
						"_tpl": "5e81c4ca763d9f754677befa",
						"slotId": "mod_magazine",
						"parentId": "674f585b67b1cd441804cece"
					},
					{
						"_id": "674f585b67b1cd441804ced3",
						"_tpl": "5e81c6a2ac2bb513793cdc7f",
						"slotId": "mod_trigger",
						"parentId": "674f585b67b1cd441804cece"
					},
					{
						"_id": "674f585b67b1cd441804ced4",
						"_tpl": "5e81c550763d9f754677befd",
						"slotId": "mod_hammer",
						"parentId": "674f585b67b1cd441804cece"
					},
					{
						"_id": "674f585b67b1cd441804ced5",
						"_tpl": "5e81c539cb2b95385c177553",
						"slotId": "mod_catch",
						"parentId": "674f585b67b1cd441804cece"
					},
					{
						"_id": "674f585b67b1cd441804ced6",
						"_tpl": "5e81ee4dcb2b95385c177582",
						"slotId": "mod_sight_rear",
						"upd": {
							"Sight": {
								"ScopesCurrentCalibPointIndexes": [
									0
								],
								"ScopesSelectedModes": [
									0
								],
								"SelectedScope": 0,
								"ScopeZoomValue": 0
							}
						},
						"parentId": "674f585b67b1cd441804ced1"
					},
					{
						"_id": "674f585b67b1cd441804ced7",
						"_tpl": "5e81ee213397a21db957f6a6",
						"slotId": "mod_sight_front",
						"upd": {
							"Sight": {
								"ScopesCurrentCalibPointIndexes": [
									0
								],
								"ScopesSelectedModes": [
									0
								],
								"SelectedScope": 0,
								"ScopeZoomValue": 0
							}
						},
						"parentId": "674f585b67b1cd441804ced1"
					}
				],
				"target": "674f585b67b1cd441804cece",
				"type": QuestRewardType.ITEM,
				"unknown": false,
				"value": 1
			}
			setupGunsmith21.push(newGP21Reward);
			setupGunsmith21M1911.push(newGP21M1Reward);
				
            // Gunsmith Part 22
            const setupGunsmith22 = quests[IDS.GunsmithPart22].rewards.Started;
			const newGP22Reward = {
				"findInRaid": true,
				"id": "674f53aba3070b0ec8b33c9f",
				"index": 0,
				"items": [
					{
						"_id": "674f587667b1cd441804ced8",
						"_tpl": "5447a9cd4bdc2dbd208b4567",
						"upd": {
							"Repairable": {
								"MaxDurability": 100,
								"Durability": 100
							},
							"FireMode": {
								"FireMode": "single"
							}
						}
					},
					{
						"_id": "674f587667b1cd441804ced9",
						"_tpl": "55d4b9964bdc2d1d4e8b456e",
						"slotId": "mod_pistol_grip",
						"parentId": "674f587667b1cd441804ced8"
					},
					{
						"_id": "674f587667b1cd441804ceda",
						"_tpl": "55d4887d4bdc2d962f8b4570",
						"slotId": "mod_magazine",
						"parentId": "674f587667b1cd441804ced8"
					},
					{
						"_id": "674f587667b1cd441804cedb",
						"_tpl": "55d355e64bdc2d962f8b4569",
						"slotId": "mod_reciever",
						"parentId": "674f587667b1cd441804ced8"
					},
					{
						"_id": "674f587667b1cd441804cedc",
						"_tpl": "5649be884bdc2d79388b4577",
						"slotId": "mod_stock",
						"parentId": "674f587667b1cd441804ced8"
					},
					{
						"_id": "674f587667b1cd441804cedd",
						"_tpl": "55d44fd14bdc2d962f8b456e",
						"slotId": "mod_charge",
						"parentId": "674f587667b1cd441804ced8"
					},
					{
						"_id": "674f587667b1cd441804cede",
						"_tpl": "55d3632e4bdc2d972f8b4569",
						"slotId": "mod_barrel",
						"parentId": "674f587667b1cd441804cedb"
					},
					{
						"_id": "674f587667b1cd441804cedf",
						"_tpl": "5ae30db85acfc408fb139a05",
						"slotId": "mod_handguard",
						"parentId": "674f587667b1cd441804cedb"
					},
					{
						"_id": "674f587667b1cd441804cee0",
						"_tpl": "5ae30bad5acfc400185c2dc4",
						"slotId": "mod_sight_rear",
						"upd": {
							"Sight": {
								"ScopesCurrentCalibPointIndexes": [
									0
								],
								"ScopesSelectedModes": [
									0
								],
								"SelectedScope": 0,
								"ScopeZoomValue": 0
							}
						},
						"parentId": "674f587667b1cd441804cedb"
					},
					{
						"_id": "674f587667b1cd441804cee1",
						"_tpl": "55d4ae6c4bdc2d8b2f8b456e",
						"slotId": "mod_stock_000",
						"parentId": "674f587667b1cd441804cedc"
					},
					{
						"_id": "674f587667b1cd441804cee2",
						"_tpl": "544a38634bdc2d58388b4568",
						"slotId": "mod_muzzle",
						"parentId": "674f587667b1cd441804cede"
					},
					{
						"_id": "674f587667b1cd441804cee3",
						"_tpl": "5ae30e795acfc408fb139a0b",
						"slotId": "mod_gas_block",
						"parentId": "674f587667b1cd441804cede"
					},
					{
						"_id": "674f587667b1cd441804cee4",
						"_tpl": "637f57a68d137b27f70c4968",
						"slotId": "mod_handguard",
						"parentId": "674f587667b1cd441804cedf"
					}
				],
				"target": "674f587667b1cd441804ced8",
				"type": QuestRewardType.ITEM,
				"unknown": false,
				"value": 1
			}
			setupGunsmith22.push(newGP22Reward);
				
            // Gunsmith Part 23
            const setupGunsmith23 = quests[IDS.GunsmithPart23].rewards.Started;
			const newGP23Reward = {
				"findInRaid": true,
				"id": "674f53ae5fb0e1be2c50b2b1",
				"index": 0,
				"items": [
					{
						"_id": "674f588b67b1cd441804df11",
						"_tpl": "606587252535c57a13424cfd",
						"upd": {
							"Repairable": {
								"MaxDurability": 100,
								"Durability": 100
							},
							"FireMode": {
								"FireMode": "single"
							}
						}
					},
					{
						"_id": "674f588b67b1cd441804df12",
						"_tpl": "55802f5d4bdc2dac148b458f",
						"slotId": "mod_pistol_grip",
						"parentId": "674f588b67b1cd441804df11"
					},
					{
						"_id": "674f588b67b1cd441804df13",
						"_tpl": "59d6272486f77466146386ff",
						"slotId": "mod_magazine",
						"parentId": "674f588b67b1cd441804df11"
					},
					{
						"_id": "674f588b67b1cd441804df14",
						"_tpl": "606587a88900dc2d9a55b659",
						"slotId": "mod_reciever",
						"parentId": "674f588b67b1cd441804df11"
					},
					{
						"_id": "674f588b67b1cd441804df15",
						"_tpl": "606587e18900dc2d9a55b65f",
						"slotId": "mod_stock_001",
						"parentId": "674f588b67b1cd441804df11"
					},
					{
						"_id": "674f588b67b1cd441804df16",
						"_tpl": "606587bd6d0bd7580617bacc",
						"slotId": "mod_charge",
						"parentId": "674f588b67b1cd441804df11"
					},
					{
						"_id": "674f588b67b1cd441804df17",
						"_tpl": "60658776f2cb2e02a42ace2b",
						"slotId": "mod_barrel",
						"parentId": "674f588b67b1cd441804df14"
					},
					{
						"_id": "674f588b67b1cd441804df18",
						"_tpl": "6065880c132d4d12c81fd8da",
						"slotId": "mod_handguard",
						"parentId": "674f588b67b1cd441804df14"
					},
					{
						"_id": "674f588b67b1cd441804df19",
						"_tpl": "5bc09a18d4351e003562b68e",
						"slotId": "mod_sight_rear",
						"upd": {
							"Sight": {
								"ScopesCurrentCalibPointIndexes": [
									0
								],
								"ScopesSelectedModes": [
									0
								],
								"SelectedScope": 0,
								"ScopeZoomValue": 0
							}
						},
						"parentId": "674f588b67b1cd441804df14"
					},
					{
						"_id": "674f588b67b1cd441804df1a",
						"_tpl": "606587d11246154cad35d635",
						"slotId": "mod_stock_000",
						"parentId": "674f588b67b1cd441804df15"
					},
					{
						"_id": "674f588b67b1cd441804df1b",
						"_tpl": "6065c6e7132d4d12c81fd8e1",
						"slotId": "mod_muzzle",
						"parentId": "674f588b67b1cd441804df17"
					},
					{
						"_id": "674f588b67b1cd441804df1c",
						"_tpl": "6065dc8a132d4d12c81fd8e3",
						"slotId": "mod_gas_block",
						"parentId": "674f588b67b1cd441804df17"
					},
					{
						"_id": "674f588b67b1cd441804df1d",
						"_tpl": "5bc09a30d4351e00367fb7c8",
						"slotId": "mod_sight_front",
						"upd": {
							"Sight": {
								"ScopesCurrentCalibPointIndexes": [
									0
								],
								"ScopesSelectedModes": [
									0
								],
								"SelectedScope": 0,
								"ScopeZoomValue": 0
							}
						},
						"parentId": "674f588b67b1cd441804df18"
					}
				],
				"target": "674f588b67b1cd441804df11",
				"type": QuestRewardType.ITEM,
				"unknown": false,
				"value": 1
			}
			setupGunsmith23.push(newGP23Reward);
				
            // Gunsmith Part 24
            const setupGunsmith24 = quests[IDS.GunsmithPart24].rewards.Started;
			const newGP24Reward = {
				"findInRaid": true,
				"id": "674f53b1da81d1ef9d30c9e8",
				"index": 0,
				"items": [
					{
						"_id": "674f58a567b1cd441804df2c",
						"_tpl": "5df8ce05b11454561e39243b",
						"upd": {
							"Repairable": {
								"MaxDurability": 100,
								"Durability": 100
							},
							"FireMode": {
								"FireMode": "single"
							}
						}
					},
					{
						"_id": "674f58a567b1cd441804df2d",
						"_tpl": "55d4b9964bdc2d1d4e8b456e",
						"slotId": "mod_pistol_grip",
						"parentId": "674f58a567b1cd441804df2c"
					},
					{
						"_id": "674f58a567b1cd441804df2e",
						"_tpl": "5df8f541c41b2312ea3335e3",
						"slotId": "mod_magazine",
						"parentId": "674f58a567b1cd441804df2c"
					},
					{
						"_id": "674f58a567b1cd441804df2f",
						"_tpl": "5649be884bdc2d79388b4577",
						"slotId": "mod_stock",
						"parentId": "674f58a567b1cd441804df2c"
					},
					{
						"_id": "674f58a567b1cd441804df30",
						"_tpl": "5df8e4080b92095fd441e594",
						"slotId": "mod_reciever",
						"parentId": "674f58a567b1cd441804df2c"
					},
					{
						"_id": "674f58a567b1cd441804df31",
						"_tpl": "5df8e053bb49d91fb446d6a6",
						"slotId": "mod_charge",
						"parentId": "674f58a567b1cd441804df2c"
					},
					{
						"_id": "674f58a567b1cd441804df32",
						"_tpl": "5ae30c9a5acfc408fb139a03",
						"slotId": "mod_stock_000",
						"parentId": "674f58a567b1cd441804df2f"
					},
					{
						"_id": "674f58a567b1cd441804df33",
						"_tpl": "5df917564a9f347bc92edca3",
						"slotId": "mod_barrel",
						"parentId": "674f58a567b1cd441804df30"
					},
					{
						"_id": "674f58a567b1cd441804df34",
						"_tpl": "5df916dfbb49d91fb446d6b9",
						"slotId": "mod_handguard",
						"parentId": "674f58a567b1cd441804df30"
					},
					{
						"_id": "674f58a567b1cd441804df35",
						"_tpl": "5dfa3d7ac41b2312ea33362a",
						"slotId": "mod_sight_rear",
						"upd": {
							"Sight": {
								"ScopesCurrentCalibPointIndexes": [
									0
								],
								"ScopesSelectedModes": [
									0
								],
								"SelectedScope": 0,
								"ScopeZoomValue": 0
							}
						},
						"parentId": "674f58a567b1cd441804df30"
					},
					{
						"_id": "674f58a567b1cd441804df36",
						"_tpl": "5dfa3cd1b33c0951220c079b",
						"slotId": "mod_muzzle",
						"parentId": "674f58a567b1cd441804df33"
					},
					{
						"_id": "674f58a567b1cd441804df37",
						"_tpl": "5dfa3d45dfc58d14537c20b0",
						"slotId": "mod_gas_block",
						"parentId": "674f58a567b1cd441804df33"
					},
					{
						"_id": "674f58a567b1cd441804df38",
						"_tpl": "5dfa3d950dee1b22f862eae0",
						"slotId": "mod_sight_front",
						"upd": {
							"Sight": {
								"ScopesCurrentCalibPointIndexes": [
									0
								],
								"ScopesSelectedModes": [
									0
								],
								"SelectedScope": 0,
								"ScopeZoomValue": 0
							}
						},
						"parentId": "674f58a567b1cd441804df34"
					}
				],
				"target": "674f58a567b1cd441804df2c",
				"type": QuestRewardType.ITEM,
				"unknown": false,
				"value": 1
			}
			setupGunsmith24.push(newGP24Reward);
				
            if (CONFIG.LoreAccurate) { // If Lore Accurate is enabled, apply the changes
                    warn("[GUNSMITH PARTS CONFIG ENABLED]: Applying Gunsmith parts tweaks...");

                    // Gunsmith Part 4
                    log("Adding OP-SKS Parts to Gunsmith Part 4...");
                    const setupGunsmithP4 = quests[IDS.GunsmithPart4].rewards.Started;
					const newGP4P1Reward = {
						"findInRaid": true,
						"id": "675079a7a4526a19276fb027",
						"index": 1,
						"items": [
							{
								"_id": "675079ccc43f367b623af637",
								"_tpl": "587df583245977373c4f1129", // SKS 7.62x39 TAPCO 6610 20-round magazine
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "675079ccc43f367b623af637",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP4P2Reward = {
						"findInRaid": true,
						"id": "675079ad6d85aa47d33b5f63",
						"index": 1,
						"items": [
							{
								"_id": "675079cf030dc9cfe79e971b",
								"_tpl": "6415d33eda439c6a97048b5b", // SKS CHOATE scope mount
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "675079cf030dc9cfe79e971b",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP4P3Reward = {
						"findInRaid": true,
						"id": "675079b4209092e864cf5592",
						"index": 1,
						"items": [
							{
								"_id": "675079dc45c943a15018803e",
								"_tpl": "5dff772da3651922b360bf91", // VOMZ Pilad 4x32 25.4mm riflescope
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "675079dc45c943a15018803e",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP4P4Reward = {
						"findInRaid": true,
						"id": "675079ba508fcae575865146",
						"index": 1,
						"items": [
							{
								"_id": "675079d2ef74cb400ff2e750",
								"_tpl": "5dff77c759400025ea5150cf", // Leapers UTG 25mm ring scope mount
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "675079d2ef74cb400ff2e750",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP4P5Reward = {
						"findInRaid": true,
						"id": "675079beff282cd662eaee11",
						"index": 1,
						"items": [
							{
								"_id": "675079e75941f5faf6c7329c",
								"_tpl": "5afd7e445acfc4001637e35a", // SKS TAPCO Intrafuse SAW-Style pistol grip
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "675079e75941f5faf6c7329c",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP4P6Reward = {
						"findInRaid": true,
						"id": "675079c2e57f6bc7c7454cef",
						"index": 1,
						"items": [
							{
								"_id": "675079ea95cc0274820db342",
								"_tpl": "55d4ae6c4bdc2d8b2f8b456e", // AR-15 High Standard M4SS Stock
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "675079ea95cc0274820db342",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					setupGunsmithP4.push(newGP4P1Reward);
					setupGunsmithP4.push(newGP4P2Reward);
					setupGunsmithP4.push(newGP4P3Reward);
					setupGunsmithP4.push(newGP4P4Reward);
					setupGunsmithP4.push(newGP4P5Reward);
					setupGunsmithP4.push(newGP4P6Reward);

                    // Gunsmith Part 5
                    log("Adding Remington Model 870 Parts to Gunsmith Part 5...");
                    const setupGunsmithP5 = quests[IDS.GunsmithPart5].rewards.Started;
					const newGP5P1Reward = {
						"findInRaid": true,
						"id": "675082bce7bfb3ea5f342aea",
						"index": 1,
						"items": [
							{
								"_id": "675082c052af424beb67ffb5",
								"_tpl": "5c0111ab0db834001966914d", // ME Cylinder 12ga muzzle adapter
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "675082c052af424beb67ffb5",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP5P2Reward = {
						"findInRaid": true,
						"id": "675082c5eb33ca3457850364",
						"index": 1,
						"items": [
							{
								"_id": "675082c9bb06572827961a69",
								"_tpl": "58272d7f2459774f6311ddfd", // GK-02 12ga muzzle brake
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "675082c9bb06572827961a69",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP5P3Reward = {
						"findInRaid": true,
						"id": "675082d064383a9f81792c66",
						"index": 1,
						"items": [
							{
								"_id": "675082d59d6c0314fb0ec26c",
								"_tpl": "5c87ca002e221600114cb150", // KAC vertical foregrip
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "675082d59d6c0314fb0ec26c",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP5P4Reward = {
						"findInRaid": true,
						"id": "675082dbd08fb6d98e257c83",
						"index": 1,
						"items": [
							{
								"_id": "675082ded8b4c46ac5544ea2",
								"_tpl": "5cc9c20cd7f00c001336c65d", // NcSTAR Tactical blue laser LAM-module
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "675082ded8b4c46ac5544ea2",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					setupGunsmithP5.push(newGP5P1Reward);
					setupGunsmithP5.push(newGP5P2Reward);
					setupGunsmithP5.push(newGP5P3Reward);
					setupGunsmithP5.push(newGP5P4Reward);

                    // Gunsmith Part 6
                    log("Adding AKM Parts to Gunsmith Part 6...");
                    const setupGunsmithP6 = quests[IDS.GunsmithPart6].rewards.Started;
					const newGP6P1Reward = {
						"findInRaid": true,
						"id": "675085970c7e09fd0bd1707e",
						"index": 1,
						"items": [
							{
								"_id": "6750859a1d72f1fa207d527c",
								"_tpl": "5947f92f86f77427344a76b1", // AK TAPCO SAW-Style pistol grip (Black)
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "6750859a1d72f1fa207d527c",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP6P2Reward = {
						"findInRaid": true,
						"id": "675085a04e4d8e584b02cbd1",
						"index": 1,
						"items": [
							{
								"_id": "675085a3e771a92bbdd206f4",
								"_tpl": "57cff947245977638e6f2a19", // AK Magpul MOE AKM handguard (Black)
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "675085a3e771a92bbdd206f4",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP6P3Reward = {
						"findInRaid": true,
						"id": "675085a91b22eaf9d2c951a7",
						"index": 1,
						"items": [
							{
								"_id": "675085ace88c46c030b33cdb",
								"_tpl": "5b7be4895acfc400170e2dd5", // Magpul M-LOK 4.1 inch rail
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "675085ace88c46c030b33cdb",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP6P4Reward = {
						"findInRaid": true,
						"id": "675085b2ff324f266e384d02",
						"index": 1,
						"items": [
							{
								"_id": "675085b68b62ec817ad76b4e",
								"_tpl": "5d2c76ed48f03532f2136169", // AK AKademia Bastion dust cover
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "675085b68b62ec817ad76b4e",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					setupGunsmithP6.push(newGP6P1Reward);
					setupGunsmithP6.push(newGP6P2Reward);
					setupGunsmithP6.push(newGP6P3Reward);
					setupGunsmithP6.push(newGP6P4Reward);

                    // Gunsmith Part 7
                    log("Adding M4A1 Parts to Gunsmith Part 7...");
                    const setupGunsmithP7 = quests[IDS.GunsmithPart7].rewards.Started;
					const newGP7P1Reward = {
						"findInRaid": true,
						"id": "67508ffdb9add1f7b640dd47",
						"index": 1,
						"items": [
							{
								"_id": "67509001c3393929d741c013",
								"_tpl": "59db7e1086f77448be30ddf3", // Trijicon ACOG TA11D 3.5x35 scope
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "67509001c3393929d741c013",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP7P2Reward = {
						"findInRaid": true,
						"id": "67509006f1fc4102327c754d",
						"index": 1,
						"items": [
							{
								"_id": "67509009ae16fe9d0d7c2d13",
								"_tpl": "5c78f2792e221600106f4683", // AR-15 Magpul MOE SL carbine length M-LOK handguard
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "67509009ae16fe9d0d7c2d13",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP7P3Reward = {
						"findInRaid": true,
						"id": "6750900f485d37a2811c72f1",
						"index": 1,
						"items": [
							{
								"_id": "6750901220fd8205771499bf",
								"_tpl": "55d35ee94bdc2d61338b4568", // AR-15 5.56x45 260mm barrel
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "6750901220fd8205771499bf",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP7P4Reward = {
						"findInRaid": true,
						"id": "675090197a945a692b583072",
						"index": 1,
						"items": [
							{
								"_id": "6750901cc4dc688d03d58c50",
								"_tpl": "56ea8d2fd2720b7c698b4570", // AR-15 Windham Weaponry Rail Gas Block
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "6750901cc4dc688d03d58c50",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP7P5Reward = {
						"findInRaid": true,
						"id": "67509045dae21bc4ff8e02a4",
						"index": 1,
						"items": [
							{
								"_id": "6750904855eb7c41229802b7",
								"_tpl": "651a8bf3a8520e48047bf708", // Daniel Defense Enhanced M-LOK Vertical Foregrip (Black)
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "6750904855eb7c41229802b7",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					setupGunsmithP7.push(newGP7P1Reward);
					setupGunsmithP7.push(newGP7P2Reward);
					setupGunsmithP7.push(newGP7P3Reward);
					setupGunsmithP7.push(newGP7P4Reward);
					setupGunsmithP7.push(newGP7P5Reward);

                    // Gunsmith Part 8
                    log("Adding AKS-74N Parts to Gunsmith Part 8...");
                    const setupGunsmithP8 = quests[IDS.GunsmithPart8].rewards.Started;
					const newGP8P1Reward = {
						"findInRaid": true,
						"id": "6750904dd46003f3e73a1385",
						"index": 1,
						"items": [
							{
								"_id": "67509050a1a5d11cd1521fa7",
								"_tpl": "59ecc28286f7746d7a68aa8c", // AKS-74/AKS-74U Zenit PT Lock
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "67509050a1a5d11cd1521fa7",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP8P2Reward = {
						"findInRaid": true,
						"id": "67509056c66228828fea81a7",
						"index": 1,
						"items": [
							{
								"_id": "6750905cdcf1bf4e1d8c9bb5",
								"_tpl": "5c1bc4812e22164bef5cfde7", // Zenit RK-0 tactical foregrip
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "6750905cdcf1bf4e1d8c9bb5",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP8P3Reward = {
						"findInRaid": true,
						"id": "675090613818835515d2aa4f",
						"index": 1,
						"items": [
							{
								"_id": "67509064c0052d3c6d59ce95",
								"_tpl": "5bed61680db834001d2c45ab", // AK-12 5.45x39 30-round magazine
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "67509064c0052d3c6d59ce95",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP8P4Reward = {
						"findInRaid": true,
						"id": "6750906903421d89148b017d",
						"index": 1,
						"items": [
							{
								"_id": "6750906b0ba6847d69d74f07",
								"_tpl": "5a5f1ce64f39f90b401987bc", // Zenit Klesch-2IKS IR illuminator with laser
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "6750906b0ba6847d69d74f07",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					setupGunsmithP8.push(newGP8P1Reward);
					setupGunsmithP8.push(newGP8P2Reward);
					setupGunsmithP8.push(newGP8P3Reward);
					setupGunsmithP8.push(newGP8P4Reward);

                    // Gunsmith Part 9
                    log("Adding P226R Parts to Gunsmith Part 9...");
                    const setupGunsmithP9 = quests[IDS.GunsmithPart9].rewards.Started;
					const newGP9P1Reward = {
						"findInRaid": true,
						"id": "67509071f6bd0c21d2b90e69",
						"index": 1,
						"items": [
							{
								"_id": "675090742f149c5818fe84b5",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "675090742f149c5818fe84b5",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP9P2Reward = {
						"findInRaid": true,
						"id": "675090794699d0bc552915a2",
						"index": 1,
						"items": [
							{
								"_id": "6750907c1211cd8fbc492d1a",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "6750907c1211cd8fbc492d1a",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP9P3Reward = {
						"findInRaid": true,
						"id": "675090811470385d2b66ca5f",
						"index": 1,
						"items": [
							{
								"_id": "6750908493e0e1098552bab1",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "6750908493e0e1098552bab1",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP9P4Reward = {
						"findInRaid": true,
						"id": "6750908a5df41774ae4422c6",
						"index": 1,
						"items": [
							{
								"_id": "6750908de75a42ae567a1a3e",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "6750908de75a42ae567a1a3e",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					setupGunsmithP9.push(newGP9P1Reward);
					setupGunsmithP9.push(newGP9P2Reward);
					setupGunsmithP9.push(newGP9P3Reward);
					setupGunsmithP9.push(newGP9P4Reward);

                    // Gunsmith Part 10
                    log("Adding AK-105 Parts to Gunsmith Part 10...");
                    const setupGunsmithP10 = quests[IDS.GunsmithPart10].rewards.Started;
					const newGP10P1Reward = {
						"findInRaid": true,
						"id": "67509093f1097198c6eb4d9f",
						"index": 1,
						"items": [
							{
								"_id": "67509097c39a942bca18bbe3",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "67509097c39a942bca18bbe3",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP10P2Reward = {
						"findInRaid": true,
						"id": "6750909e4e2fce86297ac46d",
						"index": 1,
						"items": [
							{
								"_id": "675090a445a93e057eaaff81",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "675090a445a93e057eaaff81",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP10P3Reward = {
						"findInRaid": true,
						"id": "675090aaf8bf9751fe38d4b1",
						"index": 1,
						"items": [
							{
								"_id": "675090ad4124db0e7a975530",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "675090ad4124db0e7a975530",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP10P4Reward = {
						"findInRaid": true,
						"id": "675090b63f6461d21a729272",
						"index": 1,
						"items": [
							{
								"_id": "675090b9c36c4cf0892bb8b1",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "675090b9c36c4cf0892bb8b1",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP10P5Reward = {
						"findInRaid": true,
						"id": "675090be6f1a9ffd4d8ac668",
						"index": 1,
						"items": [
							{
								"_id": "675090c10360553b83ea0805",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "675090c10360553b83ea0805",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP10P6Reward = {
						"findInRaid": true,
						"id": "675090c787ca088b935acb0a",
						"index": 1,
						"items": [
							{
								"_id": "675090ca4aa0669556f637c9",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "675090ca4aa0669556f637c9",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					setupGunsmithP10.push(newGP10P1Reward);
					setupGunsmithP10.push(newGP10P2Reward);
					setupGunsmithP10.push(newGP10P3Reward);
					setupGunsmithP10.push(newGP10P4Reward);
					setupGunsmithP10.push(newGP10P5Reward);
					setupGunsmithP10.push(newGP10P6Reward);

                    // Gunsmith Part 11
                    log("Adding KRISS Vector 9x19 Parts to Gunsmith Part 11...");
                    const setupGunsmithP11 = quests[IDS.GunsmithPart11].rewards.Started;
					const newGP11P1Reward = {
						"findInRaid": true,
						"id": "675090d293d47e5dbb88b77d",
						"index": 1,
						"items": [
							{
								"_id": "675090d5b8531502bd70f839",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "675090d5b8531502bd70f839",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP11P2Reward = {
						"findInRaid": true,
						"id": "675090da839785858927f2db",
						"index": 1,
						"items": [
							{
								"_id": "675090df8774a580f25f9296",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "675090df8774a580f25f9296",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP11P3Reward = {
						"findInRaid": true,
						"id": "675090e58da6bae371ac7dd7",
						"index": 1,
						"items": [
							{
								"_id": "675090e86ee51e4414b13c34",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "675090e86ee51e4414b13c34",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP11P4Reward = {
						"findInRaid": true,
						"id": "675090ed33035d3302c6002f",
						"index": 1,
						"items": [
							{
								"_id": "675090f3810d5a4ef18b2761",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "675090f3810d5a4ef18b2761",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP11P5Reward = {
						"findInRaid": true,
						"id": "675090f898cc4c60862dbc0a",
						"index": 1,
						"items": [
							{
								"_id": "675090fb3f9cd0d5a92982e5",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "675090fb3f9cd0d5a92982e5",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					setupGunsmithP11.push(newGP11P1Reward);
					setupGunsmithP11.push(newGP11P2Reward);
					setupGunsmithP11.push(newGP11P3Reward);
					setupGunsmithP11.push(newGP11P4Reward);
					setupGunsmithP11.push(newGP11P5Reward);

                    // Gunsmith Part 12
                    log("Adding SIG MPX Parts to Gunsmith Part 12...");
                    const setupGunsmithP12 = quests[IDS.GunsmithPart12].rewards.Started;
					const newGP12P1Reward = {
						"findInRaid": true,
						"id": "67509100093b6747e8b4c370",
						"index": 1,
						"items": [
							{
								"_id": "6750910240735a2e9baf0278",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "6750910240735a2e9baf0278",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP12P2Reward = {
						"findInRaid": true,
						"id": "6750910c398e683d167b6ea9",
						"index": 1,
						"items": [
							{
								"_id": "6750910f81cd06a3999f1db7",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "6750910f81cd06a3999f1db7",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					setupGunsmithP12.push(newGP12P1Reward);
					setupGunsmithP12.push(newGP12P2Reward);

                    // Gunsmith Part 13
                    log("Adding R11 RSASS Parts to Gunsmith Part 13...");
                    const setupGunsmithP13 = quests[IDS.GunsmithPart13].rewards.Started;
					const newGP13P1Reward = {
						"findInRaid": true,
						"id": "6750911551384364fba6376d",
						"index": 1,
						"items": [
							{
								"_id": "67509118e5b69e8fb25746d2",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "67509118e5b69e8fb25746d2",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP13P2Reward = {
						"findInRaid": true,
						"id": "6750911e665ebbfe7f19881d",
						"index": 1,
						"items": [
							{
								"_id": "67509122df6689a1aeb94705",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "67509122df6689a1aeb94705",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP13P3Reward = {
						"findInRaid": true,
						"id": "6750912782f8428c658daaa7",
						"index": 1,
						"items": [
							{
								"_id": "6750912aae48fd5dcb8c378e",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "6750912aae48fd5dcb8c378e",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					setupGunsmithP13.push(newGP13P1Reward);
					setupGunsmithP13.push(newGP13P2Reward);
					setupGunsmithP13.push(newGP13P3Reward);

                    // Gunsmith Part 14
                    log("Adding HK 416A5 Parts to Gunsmith Part 14...");
                    const setupGunsmithP14 = quests[IDS.GunsmithPart14].rewards.Started;
					const newGP14P1Reward = {
						"findInRaid": true,
						"id": "67509130f2650b9c0e7689e4",
						"index": 1,
						"items": [
							{
								"_id": "67509135ea1cd3788be0d8aa",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "67509135ea1cd3788be0d8aa",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP14P2Reward = {
						"findInRaid": true,
						"id": "6750913a6ca9944952de9956",
						"index": 1,
						"items": [
							{
								"_id": "6750913d91f4ec2622361c61",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "6750913d91f4ec2622361c61",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP14P3Reward = {
						"findInRaid": true,
						"id": "675091436efec302daa680ac",
						"index": 1,
						"items": [
							{
								"_id": "67509146d90256e24fab10e8",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "67509146d90256e24fab10e8",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP14P4Reward = {
						"findInRaid": true,
						"id": "6750914c30a6adca38353eb4",
						"index": 1,
						"items": [
							{
								"_id": "6750914f6b833a0afc294bb0",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "6750914f6b833a0afc294bb0",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP14P5Reward = {
						"findInRaid": true,
						"id": "675091546051bdc0acfdba05",
						"index": 1,
						"items": [
							{
								"_id": "675091580b6795407710a277",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "675091580b6795407710a277",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP14P6Reward = {
						"findInRaid": true,
						"id": "6750915df6130c67f8caeb42",
						"index": 1,
						"items": [
							{
								"_id": "6750916026c5fde13b362007",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "6750916026c5fde13b362007",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP14P7Reward = {
						"findInRaid": true,
						"id": "6750916753e8eb89d3fa2d86",
						"index": 1,
						"items": [
							{
								"_id": "6750916a7ef9822583f1b730",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "6750916a7ef9822583f1b730",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP14P8Reward = {
						"findInRaid": true,
						"id": "67509170069bb34ed94c2654",
						"index": 1,
						"items": [
							{
								"_id": "675091721efcda1f398971a5",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "675091721efcda1f398971a5",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP14P9Reward = {
						"findInRaid": true,
						"id": "67509177557a9dc847a11f53",
						"index": 1,
						"items": [
							{
								"_id": "6750917a97c5afa70cb9337f",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "6750917a97c5afa70cb9337f",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					setupGunsmithP14.push(newGP14P1Reward);
					setupGunsmithP14.push(newGP14P2Reward);
					setupGunsmithP14.push(newGP14P3Reward);
					setupGunsmithP14.push(newGP14P4Reward);
					setupGunsmithP14.push(newGP14P5Reward);
					setupGunsmithP14.push(newGP14P6Reward);
					setupGunsmithP14.push(newGP14P7Reward);
					setupGunsmithP14.push(newGP14P8Reward);
					setupGunsmithP14.push(newGP14P9Reward);

                    // Gunsmith Part 15
                    log("Adding AS VAL Parts to Gunsmith Part 15...");
                    const setupGunsmithP15 = quests[IDS.GunsmithPart15].rewards.Started;
					const newGP15P1Reward = {
						"findInRaid": true,
						"id": "67509187e2b95d0f582b74d2",
						"index": 1,
						"items": [
							{
								"_id": "6750918ca9ced55f6ec85b60",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "6750918ca9ced55f6ec85b60",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP15P2Reward = {
						"findInRaid": true,
						"id": "675091926d52c8831754f4ef",
						"index": 1,
						"items": [
							{
								"_id": "67509197b48bea78705f43de",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "67509197b48bea78705f43de",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP15P3Reward = {
						"findInRaid": true,
						"id": "6750919dd4df0b73e9906d03",
						"index": 1,
						"items": [
							{
								"_id": "6750919f039e29701b728fff",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "6750919f039e29701b728fff",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					setupGunsmithP15.push(newGP15P1Reward);
					setupGunsmithP15.push(newGP15P2Reward);
					setupGunsmithP15.push(newGP15P3Reward);

                    // Gunsmith Part 17
                    log("Adding AK-102 Parts to Gunsmith Part 17...");
                    const setupGunsmithP17 = quests[IDS.GunsmithPart17].rewards.Started;
					const newGP17P1Reward = {
						"findInRaid": true,
						"id": "675091a350364322fcd50f40",
						"index": 1,
						"items": [
							{
								"_id": "675091a69ad43771b4de7c36",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "675091a69ad43771b4de7c36",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP17P2Reward = {
						"findInRaid": true,
						"id": "675091ab6becc3193e8ce16a",
						"index": 1,
						"items": [
							{
								"_id": "675091afd5dba995699fcea8",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "675091afd5dba995699fcea8",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP17P3Reward = {
						"findInRaid": true,
						"id": "675091b4106d888cc9388bd0",
						"index": 1,
						"items": [
							{
								"_id": "675091b79b1d017bbfa25daa",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "675091b79b1d017bbfa25daa",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP17P4Reward = {
						"findInRaid": true,
						"id": "675091bb66e9becc2cbef0ce",
						"index": 1,
						"items": [
							{
								"_id": "675091bed73fb7886a6845a1",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "675091bed73fb7886a6845a1",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP17P5Reward = {
						"findInRaid": true,
						"id": "675091c3d8c8ee7e652302a0",
						"index": 1,
						"items": [
							{
								"_id": "675091c5996daf04ab1d2a73",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "675091c5996daf04ab1d2a73",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP17P6Reward = {
						"findInRaid": true,
						"id": "675091c9fab19813c45df981",
						"index": 1,
						"items": [
							{
								"_id": "675091cc6c4c1389785e781f",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "675091cc6c4c1389785e781f",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					setupGunsmithP17.push(newGP17P1Reward);
					setupGunsmithP17.push(newGP17P2Reward);
					setupGunsmithP17.push(newGP17P3Reward);
					setupGunsmithP17.push(newGP17P4Reward);
					setupGunsmithP17.push(newGP17P5Reward);
					setupGunsmithP17.push(newGP17P6Reward);

                    // Gunsmith Part 18
                    log("Adding AKMN Parts to Gunsmith Part 18...");
                    const setupGunsmithP18 = quests[IDS.GunsmithPart18].rewards.Started;
					const newGP18P1Reward = {
						"findInRaid": true,
						"id": "675091d7253443752582d462",
						"index": 1,
						"items": [
							{
								"_id": "675091dac1d51950a9cede00",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "675091dac1d51950a9cede00",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP18P2Reward = {
						"findInRaid": true,
						"id": "675091dfcaf38f057119eaeb",
						"index": 1,
						"items": [
							{
								"_id": "675091e24b3bb75ffebd8a57",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "675091e24b3bb75ffebd8a57",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP18P3Reward = {
						"findInRaid": true,
						"id": "675091e7d01cbb59cd3853a5",
						"index": 1,
						"items": [
							{
								"_id": "675091ea49c9bc35e8a78828",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "675091ea49c9bc35e8a78828",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP18P4Reward = {
						"findInRaid": true,
						"id": "675091f1be60ff2c2bdcec9c",
						"index": 1,
						"items": [
							{
								"_id": "675091f3ae49f1fbad5a824f",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "675091f3ae49f1fbad5a824f",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					setupGunsmithP18.push(newGP18P1Reward);
					setupGunsmithP18.push(newGP18P2Reward);
					setupGunsmithP18.push(newGP18P3Reward);
					setupGunsmithP18.push(newGP18P4Reward);

                    // Gunsmith Part 19
                    log("Adding SVDS Parts to Gunsmith Part 19...");
                    const setupGunsmithP19 = quests[IDS.GunsmithPart19].rewards.Started;
					const newGP19P1Reward = {
						"findInRaid": true,
						"id": "675091f9816903632738644f",
						"index": 1,
						"items": [
							{
								"_id": "675091fd3b6e0ea6df29bdba",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "675091fd3b6e0ea6df29bdba",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP19P2Reward = {
						"findInRaid": true,
						"id": "675092033fa46daf05abfd10",
						"index": 1,
						"items": [
							{
								"_id": "6750920514b1a8fee1c9ca45",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "6750920514b1a8fee1c9ca45",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP19P3Reward = {
						"findInRaid": true,
						"id": "6750920aaefb4456a0ff4361",
						"index": 1,
						"items": [
							{
								"_id": "6750920c4fffabd8f941a00c",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "6750920c4fffabd8f941a00c",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP19P4Reward = {
						"findInRaid": true,
						"id": "67509211f48a74529ad451e3",
						"index": 1,
						"items": [
							{
								"_id": "67509213ead8feddb5807c63",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "67509213ead8feddb5807c63",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					setupGunsmithP19.push(newGP19P1Reward);
					setupGunsmithP19.push(newGP19P2Reward);
					setupGunsmithP19.push(newGP19P3Reward);
					setupGunsmithP19.push(newGP19P4Reward);

                    // Gunsmith Part 20
                    log("Adding M1A Parts to Gunsmith Part 20...");
                    const setupGunsmithP20 = quests[IDS.GunsmithPart20].rewards.Started;
					const newGP20P1Reward = {
						"findInRaid": true,
						"id": "6750921929aee52b1a456935",
						"index": 1,
						"items": [
							{
								"_id": "6750921c10a0a0db1a2527fb",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "6750921c10a0a0db1a2527fb",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP20P2Reward = {
						"findInRaid": true,
						"id": "67509221d97b89bf825dacb5",
						"index": 1,
						"items": [
							{
								"_id": "6750922785db1f93a56367ca",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "6750922785db1f93a56367ca",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP20P3Reward = {
						"findInRaid": true,
						"id": "6750922b0237397b7b237f44",
						"index": 1,
						"items": [
							{
								"_id": "6750922e2882a267d7485961",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "6750922e2882a267d7485961",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP20P4Reward = {
						"findInRaid": true,
						"id": "67509232ec5a6afc4bf0c133",
						"index": 1,
						"items": [
							{
								"_id": "67509234b87d50d395934717",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "67509234b87d50d395934717",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP20P5Reward = {
						"findInRaid": true,
						"id": "67509239e2d220b6c3374337",
						"index": 1,
						"items": [
							{
								"_id": "6750923c121b03b798a43e04",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "6750923c121b03b798a43e04",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					setupGunsmithP20.push(newGP20P1Reward);
					setupGunsmithP20.push(newGP20P2Reward);
					setupGunsmithP20.push(newGP20P3Reward);
					setupGunsmithP20.push(newGP20P4Reward);
					setupGunsmithP20.push(newGP20P5Reward);

                    // Gunsmith Part 21
                    log("Adding M700 & M1911 Parts to Gunsmith Part 21...");
                    const setupGunsmithP21 = quests[IDS.GunsmithPart21].rewards.Started;
                    const setupGunsmithP21M1911 = quests[IDS.GunsmithPart21].rewards.Started;
					const newGP21P1Reward = {
						"findInRaid": true,
						"id": "6750924336d3e6b01db5d53e",
						"index": 2,
						"items": [
							{
								"_id": "67509246f8e8dabe87367f98",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "67509246f8e8dabe87367f98",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP21P2Reward = {
						"findInRaid": true,
						"id": "6750924b18957ba0d9e7bb94",
						"index": 2,
						"items": [
							{
								"_id": "6750924d004d9ea6a72e5283",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "6750924d004d9ea6a72e5283",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP21P3Reward = {
						"findInRaid": true,
						"id": "67509254e5ab5e544650c72b",
						"index": 2,
						"items": [
							{
								"_id": "67509256ac7e1840344fedb3",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "67509256ac7e1840344fedb3",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP21M1P1Reward = {
						"findInRaid": true,
						"id": "6750925c4fa4627c741aa6f6",
						"index": 3,
						"items": [
							{
								"_id": "6750925e0f5066d3bf875aec",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "6750925e0f5066d3bf875aec",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP21M1P2Reward = {
						"findInRaid": true,
						"id": "6750926730f9f6cabedcae6e",
						"index": 3,
						"items": [
							{
								"_id": "6750926c9a3c3e8700b128c2",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "6750926c9a3c3e8700b128c2",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP21M1P3Reward = {
						"findInRaid": true,
						"id": "67509273933f5b59f3187a46",
						"index": 3,
						"items": [
							{
								"_id": "6750927529c9da993301531e",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "6750927529c9da993301531e",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP21M1P4Reward = {
						"findInRaid": true,
						"id": "675092798af96212f9cfaf63",
						"index": 3,
						"items": [
							{
								"_id": "6750927c4dacee3fb43b83ea",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "6750927c4dacee3fb43b83ea",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					setupGunsmithP21.push(newGP21P1Reward);
					setupGunsmithP21.push(newGP21P2Reward);
					setupGunsmithP21.push(newGP21P3Reward);
					setupGunsmithP21M1911.push(newGP21M1P1Reward);
					setupGunsmithP21M1911.push(newGP21M1P2Reward);
					setupGunsmithP21M1911.push(newGP21M1P3Reward);
					setupGunsmithP21M1911.push(newGP21M1P4Reward);

                    // Gunsmith Part 22
                    log("Adding M4A1 Parts to Gunsmith Part 22...");
                    const setupGunsmithP22 = quests[IDS.GunsmithPart22].rewards.Started;
					const newGP22P1Reward = {
						"findInRaid": true,
						"id": "67509282ae9ee27f130d8d5e",
						"index": 1,
						"items": [
							{
								"_id": "675092859e7b9552789b1663",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "675092859e7b9552789b1663",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP22P2Reward = {
						"findInRaid": true,
						"id": "6750928c768c1021a35f75be",
						"index": 1,
						"items": [
							{
								"_id": "6750928e70bd242a0e07ebc1",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "6750928e70bd242a0e07ebc1",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP22P3Reward = {
						"findInRaid": true,
						"id": "6750929420a9ac29be963b5c",
						"index": 1,
						"items": [
							{
								"_id": "67509298d6d2c4afffa2c19f",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "67509298d6d2c4afffa2c19f",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP22P4Reward = {
						"findInRaid": true,
						"id": "6750929dde8cf9c69d423bb6",
						"index": 1,
						"items": [
							{
								"_id": "675092a09f2972010db11abc",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "675092a09f2972010db11abc",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP22P5Reward = {
						"findInRaid": true,
						"id": "675092a50aa6a0745238ae4c",
						"index": 1,
						"items": [
							{
								"_id": "675092a871d1d95fa5574d20",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "675092a871d1d95fa5574d20",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP22P6Reward = {
						"findInRaid": true,
						"id": "675092ad57a00f87e61eb96f",
						"index": 1,
						"items": [
							{
								"_id": "675092b0a80b97875ddff1ca",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "675092b0a80b97875ddff1ca",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP22P7Reward = {
						"findInRaid": true,
						"id": "675092b4d9de68696cdde7fb",
						"index": 1,
						"items": [
							{
								"_id": "675092b6215fcb05d7f90a22",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "675092b6215fcb05d7f90a22",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP22P8Reward = {
						"findInRaid": true,
						"id": "675092ba69e1be41c89a1ce1",
						"index": 1,
						"items": [
							{
								"_id": "675092bedac30450033ee21a",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "675092bedac30450033ee21a",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					setupGunsmithP22.push(newGP22P1Reward);
					setupGunsmithP22.push(newGP22P2Reward);
					setupGunsmithP22.push(newGP22P3Reward);
					setupGunsmithP22.push(newGP22P4Reward);
					setupGunsmithP22.push(newGP22P5Reward);
					setupGunsmithP22.push(newGP22P6Reward);
					setupGunsmithP22.push(newGP22P7Reward);
					setupGunsmithP22.push(newGP22P8Reward);

                    // Gunsmith Part 23
                    log("Adding CMMG Mk47 Mutant Parts to Gunsmith Part 23...");
                    const setupGunsmithP23 = quests[IDS.GunsmithPart23].rewards.Started;
					const newGP23P1Reward = {
						"findInRaid": true,
						"id": "675092c3ba1594f7967c754c",
						"index": 1,
						"items": [
							{
								"_id": "675092c6babe36b3e7473576",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "675092c6babe36b3e7473576",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP23P2Reward = {
						"findInRaid": true,
						"id": "675092cb84955f0dbba37f01",
						"index": 1,
						"items": [
							{
								"_id": "675092cd2a9c49f2814cb7a0",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "675092cd2a9c49f2814cb7a0",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP23P3Reward = {
						"findInRaid": true,
						"id": "675092d2ca7124a42f92237b",
						"index": 1,
						"items": [
							{
								"_id": "675092d46ce3306f6eda8103",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "675092d46ce3306f6eda8103",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP23P4Reward = {
						"findInRaid": true,
						"id": "675092da054196eb4b0a09b3",
						"index": 1,
						"items": [
							{
								"_id": "675092dc937210903d910d6b",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "675092dc937210903d910d6b",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP23P5Reward = {
						"findInRaid": true,
						"id": "675092e08b53cbe0ed824d1f",
						"index": 1,
						"items": [
							{
								"_id": "675092e294e8bbdc928f8e38",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "675092e294e8bbdc928f8e38",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP23P6Reward = {
						"findInRaid": true,
						"id": "675092e7ae351e7a01f1c720",
						"index": 1,
						"items": [
							{
								"_id": "675092e965a27723a98f2b6c",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "675092e965a27723a98f2b6c",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					setupGunsmithP23.push(newGP23P1Reward);
					setupGunsmithP23.push(newGP23P2Reward);
					setupGunsmithP23.push(newGP23P3Reward);
					setupGunsmithP23.push(newGP23P4Reward);
					setupGunsmithP23.push(newGP23P5Reward);
					setupGunsmithP23.push(newGP23P6Reward);

                    // Gunsmith Part 24
                    log("Adding KAC SR-25 Parts to Gunsmith Part 24...");
                    const setupGunsmithP24 = quests[IDS.GunsmithPart24].rewards.Started;
					const newGP24P1Reward = {
						"findInRaid": true,
						"id": "675092ef6b51eebf7264a301",
						"index": 1,
						"items": [
							{
								"_id": "675092f1eabe96111184473b",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "675092f1eabe96111184473b",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP24P2Reward = {
						"findInRaid": true,
						"id": "675092f6864643b2542a84fd",
						"index": 1,
						"items": [
							{
								"_id": "675092f9484da94d530bd201",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "675092f9484da94d530bd201",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP24P3Reward = {
						"findInRaid": true,
						"id": "675092ff9fd2070147fb4ecf",
						"index": 1,
						"items": [
							{
								"_id": "675093022f2d098df6677938",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "675093022f2d098df6677938",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP24P4Reward = {
						"findInRaid": true,
						"id": "6750930ce05fac807353474c",
						"index": 1,
						"items": [
							{
								"_id": "67509306e908e129f52401ac",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "67509306e908e129f52401ac",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP24P5Reward = {
						"findInRaid": true,
						"id": "6750931140652a7a60dd7023",
						"index": 1,
						"items": [
							{
								"_id": "6750931338c18fe65fd3691b",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "6750931338c18fe65fd3691b",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP24P6Reward = {
						"findInRaid": true,
						"id": "6750931a7205721e2f9af740",
						"index": 1,
						"items": [
							{
								"_id": "6750931d8c1394b99aefe289",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "6750931d8c1394b99aefe289",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP24P7Reward = {
						"findInRaid": true,
						"id": "67509323fae53b1a6f1a80b0",
						"index": 1,
						"items": [
							{
								"_id": "67509326cf42ffc280bbd4b6",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "67509326cf42ffc280bbd4b6",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP24P8Reward = {
						"findInRaid": true,
						"id": "6750932d80e35e245e9b4675",
						"index": 1,
						"items": [
							{
								"_id": "67509330575903d69f2bd702",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "67509330575903d69f2bd702",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP24P9Reward = {
						"findInRaid": true,
						"id": "675093393fd7f49918eedff9",
						"index": 1,
						"items": [
							{
								"_id": "6750933c0fc38c8e1ed38d26",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "6750933c0fc38c8e1ed38d26",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP24P10Reward = {
						"findInRaid": true,
						"id": "67509340c71323581f954873",
						"index": 1,
						"items": [
							{
								"_id": "67509345354a97ac59c170e3",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "67509345354a97ac59c170e3",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					setupGunsmithP24.push(newGP24P1Reward);
					setupGunsmithP24.push(newGP24P2Reward);
					setupGunsmithP24.push(newGP24P3Reward);
					setupGunsmithP24.push(newGP24P4Reward);
					setupGunsmithP24.push(newGP24P5Reward);
					setupGunsmithP24.push(newGP24P6Reward);
					setupGunsmithP24.push(newGP24P7Reward);
					setupGunsmithP24.push(newGP24P8Reward);
					setupGunsmithP24.push(newGP24P9Reward);
					setupGunsmithP24.push(newGP24P10Reward);

					// Gunsmith Part 25
                    log("Adding PKP machine gun Parts to Gunsmith Part 25...");
                    const setupGunsmithP25 = quests[IDS.GunsmithPart25].rewards.Started;
					const newGP25P1Reward = {
						"findInRaid": true,
						"id": "6750934b1b7da4536e9abea5",
						"index": 1,
						"items": [
							{
								"_id": "6750934d7f9908e32161b2f9",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "6750934d7f9908e32161b2f9",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP25P2Reward = {
						"findInRaid": true,
						"id": "67509352979353c88d8dee2a",
						"index": 1,
						"items": [
							{
								"_id": "675093557f4e63abdee53c59",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "675093557f4e63abdee53c59",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP25P3Reward = {
						"findInRaid": true,
						"id": "67509359471a776e16f0c5e1",
						"index": 1,
						"items": [
							{
								"_id": "6750935cac2e61b901ecb945",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "6750935cac2e61b901ecb945",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP25P4Reward = {
						"findInRaid": true,
						"id": "675093609dd00a83de04274d",
						"index": 1,
						"items": [
							{
								"_id": "675093641d96c2764dfbc625",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "675093641d96c2764dfbc625",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP25P5Reward = {
						"findInRaid": true,
						"id": "67509367060c646700d0f772",
						"index": 1,
						"items": [
							{
								"_id": "6750936b073a57cd64097bfb",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "6750936b073a57cd64097bfb",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP25P6Reward = {
						"findInRaid": true,
						"id": "675093700ef6e2b52926c0e2",
						"index": 1,
						"items": [
							{
								"_id": "67509372b5a1e85e1bf0d100",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "67509372b5a1e85e1bf0d100",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP25P7Reward = {
						"findInRaid": true,
						"id": "67509378627fd5abab7e4a9a",
						"index": 1,
						"items": [
							{
								"_id": "6750937a8c07122db1cc146b",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "6750937a8c07122db1cc146b",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP25P8Reward = {
						"findInRaid": true,
						"id": "675093808b692d7fc9309fbb",
						"index": 1,
						"items": [
							{
								"_id": "67509382adac582c8bae3843",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "67509382adac582c8bae3843",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP25P9Reward = {
						"findInRaid": true,
						"id": "675093878c1c3e82f907ccae",
						"index": 1,
						"items": [
							{
								"_id": "67509389fb51235b74970e2c",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "67509389fb51235b74970e2c",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					const newGP25P10Reward = {
						"findInRaid": true,
						"id": "6750938c4ea584b383340e69",
						"index": 1,
						"items": [
							{
								"_id": "67509390365bb819f65bcfe9",
								"_tpl": "", // 
								"upd": {
									"StackObjectsCount": 1
								}
							}
						],
						"target": "67509390365bb819f65bcfe9",
						"type": QuestRewardType.ITEM,
						"unknown": false,
						"value": 1
					}
					setupGunsmithP25.push(newGP25P1Reward);
					setupGunsmithP25.push(newGP25P2Reward);
					setupGunsmithP25.push(newGP25P3Reward);
					setupGunsmithP25.push(newGP25P4Reward);
					setupGunsmithP25.push(newGP25P5Reward);
					setupGunsmithP25.push(newGP25P6Reward);
					setupGunsmithP25.push(newGP25P7Reward);
					setupGunsmithP25.push(newGP25P8Reward);
					setupGunsmithP25.push(newGP25P9Reward);
					setupGunsmithP25.push(newGP25P10Reward);
                }
        }
    }
}

export const mod = new Mod();
