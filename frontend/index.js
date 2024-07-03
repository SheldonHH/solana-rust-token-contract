import {
    Connection,
    PublicKey,
    Keypair,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction
} from '@solana/web3.js';

const PROGRAM_ID = new PublicKey('YourProgramIdHere'); // Replace with your program ID
const connection = new Connection('https://api.testnet.solana.com');

document.getElementById('mint').addEventListener('click', async () => {
    const walletAddress = document.getElementById('wallet').value;
    const amount = parseInt(document.getElementById('amount').value);
    const payer = Keypair.generate();
    
    await connection.requestAirdrop(payer.publicKey, 1000000000); // Request some SOL to pay for the transaction

    const tokenAccount = new PublicKey(walletAddress);
    const instructionData = Buffer.concat([
        Buffer.from([0]), // Mint instruction
        Buffer.from(new Uint8Array(new BigUint64Array([BigInt(amount)]).buffer))
    ]);

    const transaction = new Transaction().add({
        keys: [{ pubkey: tokenAccount, isSigner: false, isWritable: true }],
        programId: PROGRAM_ID,
        data: instructionData
    });

    const signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [payer]
    );

    document.getElementById('result').innerText = `Minted ${amount} tokens. Transaction signature: ${signature}`;
});

document.getElementById('transfer').addEventListener('click', async () => {
    const walletAddress = document.getElementById('wallet').value;
    const amount = parseInt(document.getElementById('amount').value);
    const payer = Keypair.generate();
    
    await connection.requestAirdrop(payer.publicKey, 1000000000); // Request some SOL to pay for the transaction

    const fromAccount = new PublicKey(walletAddress);
    const toAccount = Keypair.generate().publicKey;
    const instructionData = Buffer.concat([
        Buffer.from([1]), // Transfer instruction
        Buffer.from(new Uint8Array(new BigUint64Array([BigInt(amount)]).buffer))
    ]);

    const transaction = new Transaction().add({
        keys: [
            { pubkey: fromAccount, isSigner: false, isWritable: true },
            { pubkey: toAccount, isSigner: false, isWritable: true }
        ],
        programId: PROGRAM_ID,
        data: instructionData
    });

    const signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [payer]
    );

    document.getElementById('result').innerText = `Transferred ${amount} tokens to ${toAccount.toString()}. Transaction signature: ${signature}`;
});
