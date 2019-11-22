enum Side {
    WHITE = "white",
    BLACK = "black"
}

namespace Side {
    export function values(): Side[] {
        return [this.WHITE, this.BLACK];
    }

    export function findByString(s: string) {
        const lowerCased = s.toLowerCase();
        return this.values().filter((value: Side) => lowerCased === s.toLowerCase() || value[0] === lowerCased.toLowerCase())[0];
    }

    export function another() {
        return this === Side.WHITE ? Side.BLACK : Side.WHITE;
    }
}

export default Side;
