const Side = {
    WHITE: "white",
    BLACK: "black",
    values() {
        return [this.WHITE, this.BLACK];
    },
    findByString: function (s) {
        const lowerCased = s.toLowerCase();
        return this.values().filter(value => lowerCased === s.toLowerCase() || value[0] === lowerCased.toLowerCase())[0];
    },
    another: function () {
        return this === Side.WHITE ? Side.BLACK : Side.WHITE;
    }
};

export default Side;
