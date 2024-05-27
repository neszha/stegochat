import Randomstring from 'randomstring'
import rsa from '../rsa'

describe('Test RSA Module', () => {
    it('Success generate RSA public and private key', () => {
        const rsaKey = rsa.generateKeys()
        expect(rsaKey.keyLength).toEqual(2048)
        expect(rsaKey.private).toBeDefined()
        expect(rsaKey.public).toBeDefined()
        expect(rsaKey.private).not.toEqual(rsaKey.public)
    })

    it('Success encrypt and decrypt plaintext using RSA keys', () => {
        const message = 'Hello World!'
        const rsaKey = rsa.generateKeys()
        const chipertext = rsa.encrypt(message, rsaKey.public)
        const decryptMessage = rsa.decrypt(chipertext, rsaKey.private)
        expect(message).toEqual(decryptMessage)
    })
})

describe('Performe Test RSA Module', () => {
    it('Performance test RSA: Generate key, encript, and decrypt speed', () => {
        const keyLengthVarians = [1024, 2048, 3072, 4096, 8192]
        const plainText32Bytes = Randomstring.generate(32)

        // Run test each key variansts.
        const result: any[] = []
        for (const keyLength of keyLengthVarians) {
            let startTime = new Date().getTime()

            // Calculate generate key duration.
            const rsaKey = rsa.generateKeys(keyLength)
            const generateKeyDuration = new Date().getTime() - startTime

            // Calculate encrypt speed (encrypt/s).
            startTime = new Date().getTime()
            let chipertext = ''
            for (let i = 0; i < 100; i++) {
                chipertext = rsa.encrypt(plainText32Bytes, rsaKey.public)
            }
            const encryptDurationInSecond = (new Date().getTime() - startTime) / 1000
            const encryptPerSecond = 100 / encryptDurationInSecond

            // Calculate decrypt speed (decrypt/s).
            startTime = new Date().getTime()
            for (let i = 0; i < 100; i++) {
                rsa.decrypt(chipertext, rsaKey.private)
            }
            const decryptDurationInSecond = (new Date().getTime() - startTime) / 1000
            const decryptPerSecond = 100 / decryptDurationInSecond

            // Done.
            result.push({
                keyLength,
                generateKeyDuration,
                encryptPerSecond,
                decryptPerSecond
            })
        }

        // Show result.
        console.table(result)
    })
})
