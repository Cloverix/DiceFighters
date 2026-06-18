import type {EffectTemplate} from "./Effect.ts";
import {EffectName} from "../../assets/string/effect/effectName.ts";
import {burnAction, stunAction, wetAction} from "./effectAction.ts";
import {EffectDesc} from "../../assets/string/effect/effectDesc.ts";

export const effectList: Record<string, EffectTemplate> = {
    [EffectName.burn]: {
        id: 1,
        name: EffectName.burn,
        desc: EffectDesc.burn,
        effectAction: burnAction,
        triggerOn: 'StartTurn',
        icon: ""    //TODO: add sprite
    },

    [EffectName.stun]: {
        id: 2,
        name: EffectName.stun,
        desc: EffectDesc.stun,
        effectAction: stunAction,
        triggerOn: 'StartTurn',
        icon: ""    //TODO: add sprite
    },

    [EffectName.wet]: {
        id: 3,
        name: EffectName.wet,
        desc: EffectDesc.wet,
        effectAction: wetAction,
        triggerOn: 'OnApply',
        icon: ""    //TODO: add sprite
    }
}