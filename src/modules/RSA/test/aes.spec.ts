import CryptoJS, { AES, enc } from 'crypto-js'
import randomString from 'randomstring'

describe('Test AES Algorithm Performance', () => {
    it('Test aes performance speed', () => {
        const messageSizeVariants = [
            256,
            1_024,
            4_096,
            10_240,
            51_200
        ]
        const result: any[] = []
        const key = randomString.generate(32)
        const iv = CryptoJS.lib.WordArray.random(16)
        for (const messageSize of messageSizeVariants) {
            const message = randomString.generate(messageSize)
            let start = new Date().getTime()
            for (let i = 0; i < 200; i++) {
                AES.encrypt(message, enc.Utf8.parse(key), { iv }).toString()
            }
            const encryptDuration = (new Date().getTime() - start) / 1000
            const encryptPerSecond = 200 / encryptDuration
            const chipertext = AES.encrypt(message, enc.Utf8.parse(key), { iv }).toString()
            start = new Date().getTime()
            for (let i = 0; i < 200; i++) {
                AES.decrypt(chipertext, enc.Utf8.parse(key), { iv }).toString()
            }
            const decryptDuration = (new Date().getTime() - start) / 1000
            const decryptPerSecond = 200 / decryptDuration
            result.push({
                messageSize,
                encryptPerSecond,
                decryptPerSecond
            })
        }
        console.table(result)
    })
})
