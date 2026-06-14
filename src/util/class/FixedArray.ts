export class FixedArray<T> {
    private readonly data: T[]
    private readonly size: number;

    constructor(size: number) {
        this.data = [];
        this.size = size;
    }

    get length() {
        return this.size;
    }

    set(value: T, index: number) {
        this.data[index] = value;
    }

    get(index: number): T | null {
        if (index >= this.size) {
            return null
        }
        return this.data[index];
    }
}