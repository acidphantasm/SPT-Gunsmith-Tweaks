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


class Mod implements IPostDBLoadMod {

    public postDBLoad(container: DependencyContainer): void {
        const logger = container.resolve<ILogger>("WinstonLogger");
        const log = (msg: string) => logger.info(`[Gunsmith Tweaks] ${msg}`);

        const db = container.resolve<DatabaseService>("DatabaseService");
        const quests = db.getQuests();

        if (CONFIG.enabled) {
            warn("[GUNSMITH CONFIG ENABLED]: Applying Gunsmith tweaks...");

            // Gunsmith Part 1
            log("Adding MP-133 to Gunsmith Part 1...");
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

            // Gunsmith Part 2
            log("Adding AKS-74U to Gunsmith Part 2... ERROR: Already exist.");

            // Gunsmith Part 3
            log("Adding MP5 to Gunsmith Part 3...");
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
            log("Adding OP-SKS to Gunsmith Part 4...");
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
            log("Adding Remington Model 870 to Gunsmith Part 5...");
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
            log("Adding AKM to Gunsmith Part 6...");
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
            log("Adding M4A1 to Gunsmith Part 7...");
            const setupGunsmith7 = quests[IDS.GunsmithPart7].rewards.Started;

            // Gunsmith Part 8
            log("Adding AKS-74N to Gunsmith Part 8...");
            const setupGunsmith8 = quests[IDS.GunsmithPart8].rewards.Started;

            // Gunsmith Part 9
            log("Adding P226R to Gunsmith Part 9...");
            const setupGunsmith9 = quests[IDS.GunsmithPart9].rewards.Started;

            // Gunsmith Part 10
            log("Adding AK-105 to Gunsmith Part 10...");
            const setupGunsmith10 = quests[IDS.GunsmithPart10].rewards.Started;

            // Gunsmith Part 11
            log("Adding KRISS Vector 9x19 to Gunsmith Part 11...");
            const setupGunsmith11 = quests[IDS.GunsmithPart11].rewards.Started;

            // Gunsmith Part 12
            log("Adding SIG MPX to Gunsmith Part 12...");
            const setupGunsmith12 = quests[IDS.GunsmithPart12].rewards.Started;

            // Gunsmith Part 13
            log("Adding R11 RSASS to Gunsmith Part 13...");
            const setupGunsmith13 = quests[IDS.GunsmithPart13].rewards.Started;

            // Gunsmith Part 14
            log("Adding HK 416A5 to Gunsmith Part 14...");
            const setupGunsmith14 = quests[IDS.GunsmithPart14].rewards.Started;

            // Gunsmith Part 15
            log("Adding AS VAL to Gunsmith Part 15...");
            const setupGunsmith15 = quests[IDS.GunsmithPart15].rewards.Started;

            // Gunsmith Part 16
            log("Adding DVL-10 to Gunsmith Part 16...");
            const setupGunsmith16 = quests[IDS.GunsmithPart16].rewards.Started;

            // Gunsmith Part 17
            log("Adding AK-102 to Gunsmith Part 17...");
            const setupGunsmith17 = quests[IDS.GunsmithPart17].rewards.Started;

            // Gunsmith Part 18
            log("Adding AKMN to Gunsmith Part 18...");
            const setupGunsmith18 = quests[IDS.GunsmithPart18].rewards.Started;

            // Gunsmith Part 19
            log("Adding SVDS to Gunsmith Part 19...");
            const setupGunsmith19 = quests[IDS.GunsmithPart19].rewards.Started;

            // Gunsmith Part 20
            log("Adding M1A to Gunsmith Part 20...");
            const setupGunsmith20 = quests[IDS.GunsmithPart20].rewards.Started;

            // Gunsmith Part 21
            log("Adding M700 & M1911 to Gunsmith Part 21...");
            const setupGunsmith21 = quests[IDS.GunsmithPart21].rewards.Started;
            const setupGunsmith21M1911 = quests[IDS.GunsmithPart21].rewards.Started;

            // Gunsmith Part 22
            log("Adding M4A1 to Gunsmith Part 22...");
            const setupGunsmith22 = quests[IDS.GunsmithPart22].rewards.Started;

            // Gunsmith Part 23
            log("Adding CMMG Mk47 Mutant to Gunsmith Part 23...");
            const setupGunsmith23 = quests[IDS.GunsmithPart23].rewards.Started;

            // Gunsmith Part 24
            log("Adding KAC SR-25 to Gunsmith Part 24...");
            const setupGunsmith24 = quests[IDS.GunsmithPart24].rewards.Started;

            // Gunsmith Part 25
            log("Adding PKP machine gun to Gunsmith Part 25...");
            const setupGunsmith25 = quests[IDS.GunsmithPart25].rewards.Started;
            if (CONFIG.parts)
                {
                    warn("[GUNSMITH PARTS CONFIG ENABLED]: Applying Gunsmith parts tweaks...");

                    // Gunsmith Part 1
                    log("Adding MP-133 Parts to Gunsmith Part 1...");
                    const setupGunsmith1 = quests[IDS.GunsmithPart1].rewards.Started;

                    // Gunsmith Part 2
                    log("Adding AKS-74U Parts to Gunsmith Part 2...");
                    const setupGunsmith2 = quests[IDS.GunsmithPart2].rewards.Started;

                    // Gunsmith Part 3
                    log("Adding MP5 to Parts Gunsmith Part 3...");
                    const setupGunsmith3 = quests[IDS.GunsmithPart3].rewards.Started;

                    // Gunsmith Part 4
                    log("Adding OP-SKS Parts to Gunsmith Part 4...");
                    const setupGunsmith4 = quests[IDS.GunsmithPart4].rewards.Started;

                    // Gunsmith Part 5
                    log("Adding Remington Model 870 Parts to Gunsmith Part 5...");
                    const setupGunsmith5 = quests[IDS.GunsmithPart5].rewards.Started;

                    // Gunsmith Part 6
                    log("Adding AKM Parts to Gunsmith Part 6...");
                    const setupGunsmith6 = quests[IDS.GunsmithPart6].rewards.Started;

                    // Gunsmith Part 7
                    log("Adding M4A1 Parts to Gunsmith Part 7...");
                    const setupGunsmith7 = quests[IDS.GunsmithPart7].rewards.Started;

                    // Gunsmith Part 8
                    log("Adding AKS-74N Parts to Gunsmith Part 8...");
                    const setupGunsmith8 = quests[IDS.GunsmithPart8].rewards.Started;

                    // Gunsmith Part 9
                    log("Adding P226R Parts to Gunsmith Part 9...");
                    const setupGunsmith9 = quests[IDS.GunsmithPart9].rewards.Started;

                    // Gunsmith Part 10
                    log("Adding AK-105 Parts to Gunsmith Part 10...");
                    const setupGunsmith10 = quests[IDS.GunsmithPart10].rewards.Started;

                    // Gunsmith Part 11
                    log("Adding KRISS Vector 9x19 Parts to Gunsmith Part 11...");
                    const setupGunsmith11 = quests[IDS.GunsmithPart11].rewards.Started;

                    // Gunsmith Part 12
                    log("Adding SIG MPX Parts to Gunsmith Part 12...");
                    const setupGunsmith12 = quests[IDS.GunsmithPart12].rewards.Started;

                    // Gunsmith Part 13
                    log("Adding R11 RSASS Parts to Gunsmith Part 13...");
                    const setupGunsmith13 = quests[IDS.GunsmithPart13].rewards.Started;

                    // Gunsmith Part 14
                    log("Adding HK 416A5 Parts to Gunsmith Part 14...");
                    const setupGunsmith14 = quests[IDS.GunsmithPart14].rewards.Started;

                    // Gunsmith Part 15
                    log("Adding AS VAL Parts to Gunsmith Part 15...");
                    const setupGunsmith15 = quests[IDS.GunsmithPart15].rewards.Started;

                    // Gunsmith Part 16
                    log("Adding DVL-10 Parts to Gunsmith Part 16...");
                    const setupGunsmith16 = quests[IDS.GunsmithPart16].rewards.Started;

                    // Gunsmith Part 17
                    log("Adding AK-102 Parts to Gunsmith Part 17...");
                    const setupGunsmith17 = quests[IDS.GunsmithPart17].rewards.Started;

                    // Gunsmith Part 18
                    log("Adding AKMN Parts to Gunsmith Part 18...");
                    const setupGunsmith18 = quests[IDS.GunsmithPart18].rewards.Started;

                    // Gunsmith Part 19
                    log("Adding SVDS Parts to Gunsmith Part 19...");
                    const setupGunsmith19 = quests[IDS.GunsmithPart19].rewards.Started;

                    // Gunsmith Part 20
                    log("Adding M1A Parts to Gunsmith Part 20...");
                    const setupGunsmith20 = quests[IDS.GunsmithPart20].rewards.Started;

                    // Gunsmith Part 21
                    log("Adding M700 & M1911 Parts to Gunsmith Part 21...");
                    const setupGunsmith21 = quests[IDS.GunsmithPart21].rewards.Started;
                    const setupGunsmith21M1911 = quests[IDS.GunsmithPart21].rewards.Started;

                    // Gunsmith Part 22
                    log("Adding M4A1 Parts to Gunsmith Part 22...");
                    const setupGunsmith22 = quests[IDS.GunsmithPart22].rewards.Started;

                    // Gunsmith Part 23
                    log("Adding CMMG Mk47 Mutant Parts to Gunsmith Part 23...");
                    const setupGunsmith23 = quests[IDS.GunsmithPart23].rewards.Started;

                    // Gunsmith Part 24
                    log("Adding KAC SR-25 Parts to Gunsmith Part 24...");
                    const setupGunsmith24 = quests[IDS.GunsmithPart24].rewards.Started;

                    // Gunsmith Part 25
                    log("Adding PKP machine gun Parts to Gunsmith Part 25...");
                    const setupGunsmith25 = quests[IDS.GunsmithPart25].rewards.Started;
                }
        }
    }
}

export const mod = new Mod();
