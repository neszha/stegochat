import crypto from 'crypto'
import { type RSAKey } from './rsa-type'

export default {

    /**
     * Generate private and public key.
     */
    generateKeys (keyLength: number = 2048): RSAKey {
        const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
            modulusLength: keyLength
        })
        return {
            keyLength,
            public: publicKey.export({ type: 'spki', format: 'pem' }).toString(),
            private: privateKey.export({ type: 'pkcs8', format: 'pem' }).toString()
        }
    },

    /**
     * Encrypt plaintext with public key.
     */
    encrypt (plaintext: string, publicKey: string): string {
        const publicKeyObject = crypto.createPublicKey(publicKey)
        const encryptedData = crypto.publicEncrypt({
            key: publicKeyObject,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: 'sha256'
        }, Buffer.from(plaintext))
        return encryptedData.toString('base64')
    },

    /**
     * Decrypt chipertext with private key.
     */
    decrypt (chipertext: string, privateKey: string): string {
        const privateKeyObject = crypto.createPrivateKey(privateKey)
        const decryptedData = crypto.privateDecrypt({
            key: privateKeyObject,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: 'sha256'
        }, Buffer.from(chipertext, 'base64'))
        return decryptedData.toString()
    }
}
