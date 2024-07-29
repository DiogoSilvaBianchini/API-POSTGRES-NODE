
const sum = (first, second) => {
    return first + second
}

describe("Soma dos fatos.", () => {
    it("Primeiro test", () => {
        const first = 1
        const second = 2

        let results = sum(first, second)

        expect(results).toEqual(first + second)
    })
})