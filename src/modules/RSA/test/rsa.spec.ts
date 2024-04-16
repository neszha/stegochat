import rsa from '../rsa'

describe('Test Node RSA', () => {
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
