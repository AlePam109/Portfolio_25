// Advanced Encryption Utilities - AES & RSA Implementation
// This file provides enterprise-grade encryption for sensitive data

class CryptoUtils {
    constructor() {
        this.algorithm = 'AES-GCM';
        this.keyLength = 256;
        this.ivLength = 12;
        this.rsaKeySize = 2048;
        this.saltLength = 16;
    }

    // Generate cryptographically secure random bytes
    async generateRandomBytes(length) {
        const array = new Uint8Array(length);
        crypto.getRandomValues(array);
        return array;
    }

    // Convert ArrayBuffer to Base64
    arrayBufferToBase64(buffer) {
        const bytes = new Uint8Array(buffer);
        let binary = '';
        for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    }

    // Convert Base64 to ArrayBuffer
    base64ToArrayBuffer(base64) {
        const binaryString = atob(base64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
    }

    // Generate AES key from password
    async deriveAESKey(password, salt) {
        const encoder = new TextEncoder();
        const passwordBuffer = encoder.encode(password);
        
        const keyMaterial = await crypto.subtle.importKey(
            'raw',
            passwordBuffer,
            { name: 'PBKDF2' },
            false,
            ['deriveBits', 'deriveKey']
        );

        return crypto.subtle.deriveKey(
            {
                name: 'PBKDF2',
                salt: salt,
                iterations: 100000,
                hash: 'SHA-256'
            },
            keyMaterial,
            { name: this.algorithm, length: this.keyLength },
            false,
            ['encrypt', 'decrypt']
        );
    }

    // AES Encryption
    async encryptAES(data, password) {
        try {
            // Generate salt and IV
            const salt = await this.generateRandomBytes(this.saltLength);
            const iv = await this.generateRandomBytes(this.ivLength);
            
            // Derive key from password
            const key = await this.deriveAESKey(password, salt);
            
            // Encrypt data
            const encoder = new TextEncoder();
            const dataBuffer = encoder.encode(JSON.stringify(data));
            
            const encryptedBuffer = await crypto.subtle.encrypt(
                {
                    name: this.algorithm,
                    iv: iv
                },
                key,
                dataBuffer
            );

            // Combine salt, IV, and encrypted data
            const combined = new Uint8Array(salt.length + iv.length + encryptedBuffer.byteLength);
            combined.set(salt, 0);
            combined.set(iv, salt.length);
            combined.set(new Uint8Array(encryptedBuffer), salt.length + iv.length);

            return this.arrayBufferToBase64(combined);
        } catch (error) {
            console.error('AES encryption error:', error);
            throw new Error('Encryption failed');
        }
    }

    // AES Decryption
    async decryptAES(encryptedData, password) {
        try {
            // Convert from Base64
            const combined = new Uint8Array(this.base64ToArrayBuffer(encryptedData));
            
            // Extract salt, IV, and encrypted data
            const salt = combined.slice(0, this.saltLength);
            const iv = combined.slice(this.saltLength, this.saltLength + this.ivLength);
            const encryptedBuffer = combined.slice(this.saltLength + this.ivLength);
            
            // Derive key from password
            const key = await this.deriveAESKey(password, salt);
            
            // Decrypt data
            const decryptedBuffer = await crypto.subtle.decrypt(
                {
                    name: this.algorithm,
                    iv: iv
                },
                key,
                encryptedBuffer
            );

            const decoder = new TextDecoder();
            const decryptedText = decoder.decode(decryptedBuffer);
            
            return JSON.parse(decryptedText);
        } catch (error) {
            console.error('AES decryption error:', error);
            throw new Error('Decryption failed');
        }
    }

    // Generate RSA key pair
    async generateRSAKeyPair() {
        try {
            const keyPair = await crypto.subtle.generateKey(
                {
                    name: 'RSA-OAEP',
                    modulusLength: this.rsaKeySize,
                    publicExponent: new Uint8Array([1, 0, 1]),
                    hash: 'SHA-256'
                },
                true,
                ['encrypt', 'decrypt']
            );

            return {
                publicKey: keyPair.publicKey,
                privateKey: keyPair.privateKey
            };
        } catch (error) {
            console.error('RSA key generation error:', error);
            throw new Error('Key generation failed');
        }
    }

    // Export public key to Base64
    async exportPublicKey(publicKey) {
        try {
            const exported = await crypto.subtle.exportKey('spki', publicKey);
            return this.arrayBufferToBase64(exported);
        } catch (error) {
            console.error('Public key export error:', error);
            throw new Error('Key export failed');
        }
    }

    // Import public key from Base64
    async importPublicKey(base64Key) {
        try {
            const keyBuffer = this.base64ToArrayBuffer(base64Key);
            return await crypto.subtle.importKey(
                'spki',
                keyBuffer,
                {
                    name: 'RSA-OAEP',
                    hash: 'SHA-256'
                },
                false,
                ['encrypt']
            );
        } catch (error) {
            console.error('Public key import error:', error);
            throw new Error('Key import failed');
        }
    }

    // RSA Encryption
    async encryptRSA(data, publicKey) {
        try {
            const encoder = new TextEncoder();
            const dataBuffer = encoder.encode(JSON.stringify(data));
            
            // RSA can only encrypt small amounts of data, so we'll encrypt the AES key
            const encryptedBuffer = await crypto.subtle.encrypt(
                {
                    name: 'RSA-OAEP'
                },
                publicKey,
                dataBuffer
            );

            return this.arrayBufferToBase64(encryptedBuffer);
        } catch (error) {
            console.error('RSA encryption error:', error);
            throw new Error('RSA encryption failed');
        }
    }

    // Hybrid Encryption: RSA for key exchange, AES for data
    async hybridEncrypt(data, publicKey, sessionPassword) {
        try {
            // Encrypt data with AES
            const aesEncrypted = await this.encryptAES(data, sessionPassword);
            
            // Encrypt session password with RSA
            const rsaEncrypted = await this.encryptRSA(sessionPassword, publicKey);
            
            return {
                data: aesEncrypted,
                key: rsaEncrypted,
                timestamp: Date.now(),
                version: '1.0'
            };
        } catch (error) {
            console.error('Hybrid encryption error:', error);
            throw new Error('Encryption failed');
        }
    }

    // Generate secure session password
    async generateSessionPassword() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
        let password = '';
        const array = new Uint8Array(32);
        crypto.getRandomValues(array);
        
        for (let i = 0; i < 32; i++) {
            password += chars.charAt(array[i] % chars.length);
        }
        
        return password;
    }

    // Hash data for integrity verification
    async hashData(data) {
        try {
            const encoder = new TextEncoder();
            const dataBuffer = encoder.encode(JSON.stringify(data));
            
            const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
            return this.arrayBufferToBase64(hashBuffer);
        } catch (error) {
            console.error('Hashing error:', error);
            throw new Error('Hashing failed');
        }
    }

    // Verify data integrity
    async verifyIntegrity(data, expectedHash) {
        try {
            const actualHash = await this.hashData(data);
            return actualHash === expectedHash;
        } catch (error) {
            console.error('Integrity verification error:', error);
            return false;
        }
    }
}

// Initialize crypto utilities
const cryptoUtils = new CryptoUtils();

// Make available globally
window.cryptoUtils = cryptoUtils; 