/*
Provides a way to store values on fixed places without overflowing provided size.
Data is stored in a map where empty places are represented as null objects.
This class is primarily used to represent spells equipped
on specific slots of the dices.

Indexation starts at 0, hence to get, for example, spell that is equipped
on the 5th slot you need to call get(4).
*/

export class FixedMap<T> {
    private readonly data: Map<number, T | null>;       //0-indexed
    private size: number;

    constructor(size: number) {
        this.data = new Map<number, T | null>();
        for (let i = 0; i < size; i++) {
            this.data.set(i, null);
        }
        this.size = size;
    }

    static clone<T>(other: FixedMap<T>): FixedMap<T> {
        const clonedObject = new FixedMap<T>(other.size);
        for (const [key, value] of other.data) {
            clonedObject.data.set(key, value);
        }
        return clonedObject;
    }

    //Warning: erases values if new size < current size
    setSize(newSize: number) {
        if (newSize < 0) return;
        let oldSize = this.size;
        if (newSize > oldSize) {
            for (let i = oldSize; i < newSize; i++) {
                this.data.set(i, null);
            }
        }
        else {
            while (oldSize > newSize) {
                this.data.delete(oldSize - 1);
                oldSize--;
            }
        }
        this.size = newSize;
    }

    get length() {
        return this.size;
    }

    //Returns true if set correctly
    set(value: T | null, index: number): boolean {
        if (index >= this.size || index < 0) {
            return false;
        }
        this.data.set(index, value);
        return true;
    }

    get(index: number): T | null {
        if (index >= this.size || index < 0) {
            return null;
        }
        return this.data.get(index) ?? null;
    }

    //Get all non-null values in ascending key order
    get values(): T[] {
        return [...this.data.values()].filter((it): it is T => it !== null);
    }

    //Get a copy of data Map object
    get items(): Map<number, T | null> {
        return new Map([...this.data]);
    }
}