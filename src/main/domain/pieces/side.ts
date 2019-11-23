enum Side {
    WHITE = "white",
    BLACK = "black"
}

namespace Side {
    export function values(): Side[] {
        return [Side.WHITE, Side.BLACK];
    }

    export function findByString(s: string) {
        const lowerCased = s.toLowerCase();
        return values().filter((value: Side) => lowerCased === s.toLowerCase() || value[0] === lowerCased.toLowerCase())[0];
    }

}

export default Side;
