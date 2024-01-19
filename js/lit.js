import * as LitJsSdk from '@lit-protocol/lit-node-client';

const client = new LitJsSdk.LitNodeClient()
const chain = 'ethereum'

const accessControlConditionsNFT = [
    {
        contractAddress: '0x89b597199dac806ceecfc091e56044d34e59985c',
        standardContractType: 'ERC721',
        chain,
        method: 'balanceOf',
        parameters: [
            ':userAddress'
        ],
        returnValueTest: {
            comparator: '>',
            value: '0'
        }
    }
]

class Lit {
    litNodeClient

    async connect() {
        await client.connect()
        this.litNodeClient = client
    }

    async encryptString(str) {
        if (!this.litNodeClient) {
            await this.connect()
        }
        const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain })
        const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(str)

        const encryptedSymmetricKey = await this.litNodeClient.saveEncryptionKey({
            accessControlConditions: accessControlConditionsNFT,
            symmetricKey,
            authSig,
            chain,
        })

        return {
            encryptedFile: encryptedString,
            encryptedSymmetricKey: LitJsSdk.uint8arrayToString(encryptedSymmetricKey, "base16")
        }
    }

    async decryptString(encryptedStr, encryptedSymmetricKey) {
        if (!this.litNodeClient) {
            await this.connect()
        }
        const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain })
        const symmetricKey = await this.litNodeClient.getEncryptionKey({
            accessControlConditions: accessControlConditionsNFT,
            toDecrypt: encryptedSymmetricKey,
            chain,
            authSig
        })
        const decryptedFile = await LitJsSdk.decryptString(
            encryptedStr,
            symmetricKey
        );
        // eslint-disable-next-line no-console
        console.log({
            decryptedFile
        })
        return { decryptedFile }
    }

    async encryptFile(file) {
        if (!this.litNodeClient) {
            await this.connect()
        }

        const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain: chain })
        const { encryptedFile, symmetricKey } = await LitJsSdk.encryptFileAndZipWithMetadata(file)

        const encryptedSymmetricKey = await this.litNodeClient.saveEncryptionKey({
            accessControlConditions: accessControlConditionsNFT,
            symmetricKey,
            authSig,
            chain,
        })

        return {
            encryptedFile,
            encryptedSymmetricKey: LitJsSdk.uint8arrayToString(encryptedSymmetricKey, "base16")
        }
    }

    async decryptFile(encryptedFile, encryptedSymmetricKey) {
        if (!this.litNodeClient) {
            await this.connect()
        }

        const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain: chain })
        const symmetricKey = await this.litNodeClient.getEncryptionKey({
            accessControlConditions: accessControlConditionsNFT,
            toDecrypt: encryptedSymmetricKey,
            chain,
            authSig
        })

        const decryptedFile = await LitJsSdk.decryptFileAndUnzip(encryptedFile, symmetricKey)
        console.log({
            decryptedFile
        })
        return { decryptedFile }
    }

    async App() {
        try {
            const lit = new Lit()
            await lit.connect()
            await lit.encryptString("test")
            console.log(await lit.decryptString(lit.encryptString("test")))
        } catch (error) {
            console.error(error)
        }
    }
}

export default new Lit()