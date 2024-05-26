import { SHA256 } from 'crypto-js'
import randomString from 'randomstring'

describe('Test SHA256 Algorithm Performance', () => {
    it('Test sha256 performance hash speed', () => {
        const messageSizeVariants = [
            256,
            1_024,
            4_096,
            10_240,
            51_200
        ]
        const result: any[] = []
        for (const messageSize of messageSizeVariants) {
            const message = randomString.generate(messageSize)
            const start = new Date().getTime()
            for (let i = 0; i < 200; i++) {
                SHA256(message).toString()
            }
            const hashDurationInSecond = (new Date().getTime() - start) / 1000
            const hashPerSecond = 200 / hashDurationInSecond
            result.push({
                messageSize,
                hashDurationInSecond,
                hashPerSecond
            })
        }
        console.table(result)
    })
})
