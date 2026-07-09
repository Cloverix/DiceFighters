import {type Creature, CreatureBuilder} from "./Creature.ts";

export interface Enemy extends Creature {
}

export class EnemyBuilder extends CreatureBuilder {
    override build(): Enemy {
        return super.build() as Enemy;
    }
}