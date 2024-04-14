/**
 * PRNG (Pseudo-Random Number Generator)
 */

export default class PRNG {
    private seed: number

    constructor (seed: number) {
        this.seed = seed
    }

    /**
     * Linear Congruential Generator (LCG) algorithm
     */
    private next (): number {
        const a = 1664525
        const c = 1013904223
        const m = Math.pow(2, 32)
        this.seed = (a * this.seed + c) % m
        return this.seed
    }

    /**
     * Generate random number between 0 and 1
     */
    public random (): number {
        return this.next() / Math.pow(2, 32)
    }
}
