import { spellName } from "../../assets/string/spell/spellName.ts";
import { spellDesc } from "../../assets/string/spell/spellDesc.ts";
import { SpellSlotOptions } from "./spellSlot.ts";
import type { Spell } from "./Spell.ts";
import heavyBlowImage from "../../assets/sprite/spell/heavy-blow.png";
import { strikeAction } from "./spellAction/strikeAction.ts";
import { heavyBlowAction } from "./spellAction/heavyBlowAction.ts";
import { sparkAction } from "./spellAction/sparkAction.ts";
import { healingSalveAction } from "./spellAction/healingSalveAction.ts";
import { reapAction } from "./spellAction/reapAction.ts";
import { leftHookAction } from "./spellAction/leftHookAction.ts";
import { rightHookAction } from "./spellAction/rightHookAction.ts";
import { eviscerateAction } from "./spellAction/eviscerateAction.ts";
import { lightningBoltAction } from "./spellAction/lightningBoltAction.ts";
import { igniteAction } from "./spellAction/igniteAction.ts";
import { overTheLimitsAction } from "./spellAction/overTheLimitsAction.ts";
import { sprinkleAction } from "./spellAction/sprinkleAction.ts";
import { preciseCutAction } from "./spellAction/preciseCutAction.ts";
import { scrapeAction } from "./spellAction/scrapeAction.ts";
import { chaosBoltAction } from "./spellAction/chaosBoltAction.ts";
import { dualCastAction } from "./spellAction/dualCastAction.ts";
import { curseAction } from "./spellAction/curseAction.ts";
import { crashAction } from "./spellAction/crashAction.ts";
import { weakeningChainsAction } from "./spellAction/weakeningChainsAction.ts";
import { waterSwipeAction } from "./spellAction/waterSwipeAction.ts";
import { prepareAction } from "./spellAction/prepareAction.ts";

export const spellList: Record<string, Spell> = {
  [spellName.strike]: {
    id: 1,
    name: spellName.strike,
    desc: spellDesc.strike,
    spellSlot: SpellSlotOptions.anySlot(),
    spellAction: strikeAction,
    sprite: "", //TODO: add sprite
  },

  [spellName.heavyBlow]: {
    id: 2,
    name: spellName.heavyBlow,
    desc: spellDesc.heavyBlow,
    spellSlot: SpellSlotOptions.exactSlot([6]),
    spellAction: heavyBlowAction,
    sprite: heavyBlowImage,
  },

  [spellName.spark]: {
    id: 3,
    name: spellName.spark,
    desc: spellDesc.spark,
    spellSlot: SpellSlotOptions.anySlot(),
    spellAction: sparkAction,
    sprite: "", //TODO: add sprite
  },

  [spellName.healingSalve]: {
    id: 4,
    name: spellName.healingSalve,
    desc: spellDesc.healingSalve,
    spellSlot: SpellSlotOptions.exactSlot([3, 6, 9, 12]),
    spellAction: healingSalveAction,
    sprite: "", //TODO: add sprite
  },

  [spellName.reap]: {
    id: 5,
    name: spellName.reap,
    desc: spellDesc.reap,
    spellSlot: SpellSlotOptions.anySlot(),
    spellAction: reapAction,
    sprite: "", //TODO: add sprite
  },

  [spellName.leftHook]: {
    id: 6,
    name: spellName.leftHook,
    desc: spellDesc.leftHook,
    category: ["unique"],
    spellSlot: SpellSlotOptions.oddSlot(),
    spellAction: leftHookAction,
    sprite: "", //TODO: add sprite
  },

  [spellName.rightHook]: {
    id: 7,
    name: spellName.rightHook,
    desc: spellDesc.rightHook,
    category: ["unique"],
    spellSlot: SpellSlotOptions.evenSlot(),
    spellAction: rightHookAction,
    sprite: "", //TODO: add sprite
  },

  [spellName.eviscerate]: {
    id: 8,
    name: spellName.eviscerate,
    desc: spellDesc.eviscerate,
    spellSlot: SpellSlotOptions.exactSlot([5]),
    spellAction: eviscerateAction,
    sprite: "", //TODO: add sprite
  },

  [spellName.dualWield]: {
    id: 9,
    name: spellName.dualWield,
    desc: spellDesc.dualWield,
    spellSlot: SpellSlotOptions.anySlot(),
    spellAction: dualCastAction,
    sprite: "", //TODO: add sprite
  },

  [spellName.lightningBolt]: {
    id: 10,
    name: spellName.lightningBolt,
    desc: spellDesc.LightningBolt,
    spellSlot: SpellSlotOptions.exactSlot([4, 5, 6, 10, 11, 12]),
    spellAction: lightningBoltAction,
    sprite: "", //TODO: add sprite
  },

  [spellName.ignite]: {
    id: 11,
    name: spellName.ignite,
    desc: spellDesc.ignite,
    spellSlot: SpellSlotOptions.rangesSlot([1, 5]),
    spellAction: igniteAction,
    sprite: "", //TODO: add sprite
  },

  [spellName.overTheLimits]: {
    id: 12,
    name: spellName.overTheLimits,
    desc: spellDesc.overTheLimits,
    spellSlot: SpellSlotOptions.anySlot(),
    spellAction: overTheLimitsAction,
    sprite: "", //TODO: add sprite
  },

  [spellName.sprinkle]: {
    id: 13,
    name: spellName.sprinkle,
    desc: spellDesc.sprinkle,
    spellSlot: SpellSlotOptions.exactSlot([1, 2]),
    spellAction: sprinkleAction,
    sprite: "", //TODO: add sprite
  },

  [spellName.preciseCut]: {
    id: 14,
    name: spellName.preciseCut,
    desc: spellDesc.preciseCut,
    spellSlot: SpellSlotOptions.evenSlot(),
    spellAction: preciseCutAction,
    sprite: "", //TODO: add sprite
  },

  [spellName.scrape]: {
    id: 15,
    name: spellName.scrape,
    desc: spellDesc.scrape,
    category: ["enemyExclusive"],
    spellSlot: SpellSlotOptions.anySlot(),
    spellAction: scrapeAction,
    sprite: "", //TODO: add sprite
  },

  [spellName.chaosBolt]: {
    id: 16,
    name: spellName.chaosBolt,
    desc: spellDesc.chaosBolt,
    spellSlot: SpellSlotOptions.anySlot(),
    spellAction: chaosBoltAction,
    sprite: "", //TODO: add sprite
  },

  [spellName.curse]: {
    id: 17,
    name: spellName.curse,
    desc: spellDesc.curse,
    spellSlot: SpellSlotOptions.anySlot(),
    spellAction: curseAction,
    sprite: "", //TODO: add sprite
  },

  [spellName.crash]: {
    id: 18,
    name: spellName.crash,
    desc: spellDesc.crash,
    spellSlot: SpellSlotOptions.anySlot(),
    spellAction: crashAction,
    sprite: "", //TODO: add sprite
  },

  [spellName.weakeningChains]: {
    id: 19,
    name: spellName.weakeningChains,
    desc: spellDesc.weakeningChains,
    spellSlot: SpellSlotOptions.anySlot(),
    spellAction: weakeningChainsAction,
    sprite: "", //TODO: add sprite
  },

  [spellName.waterSwipe]: {
    id: 20,
    name: spellName.waterSwipe,
    desc: spellDesc.waterSwipe,
    spellSlot: SpellSlotOptions.anySlot(),
    spellAction: waterSwipeAction,
    sprite: "", //TODO: add sprite
  },

  [spellName.prepare]: {
    id: 21,
    name: spellName.prepare,
    desc: spellDesc.prepare,
    spellSlot: SpellSlotOptions.evenSlot(),
    spellAction: prepareAction,
    sprite: "", //TODO: add sprite
  },
};
