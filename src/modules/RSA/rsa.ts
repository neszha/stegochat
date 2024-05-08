import NodeRSA from 'node-rsa'
import { type RSAKey } from './rsa-type'

export default {

    /**
     * Generate private and public key.
     */
    generateKeys (): RSAKey {
        const keyLength = 512
        const nodeRSA = new NodeRSA({ b: keyLength })
        nodeRSA.setOptions({ encryptionScheme: 'pkcs1' })
        return {
            keyLength,
            private: nodeRSA.exportKey('private'),
            public: nodeRSA.exportKey('public')
        }
    },

    /**
     * Encrypt plaintext with public key.
     */
    encrypt (plaintext: string, publicKey: string): string {
        const nodeRSA = new NodeRSA(publicKey)
        return nodeRSA.encrypt(plaintext, 'base64')
    },

    /**
     * Decrypt chipertext with private key.
     */
    decrypt (chipertext: string, privateKey: string): string {
        const nodeRSA = new NodeRSA(privateKey)
        return nodeRSA.decrypt(chipertext, 'utf8')
    }
}
