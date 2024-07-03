1. Solana CLI
```bash
sh -c "$(curl -sSfL https://release.solana.com/v1.18.17/install)"
export PATH="/home/your_username/.local/share/solana/install/active_release/bin:$PATH"
solana --version

```

2.  配置Solana CLI以使用测试网
```bash
solana config set --url https://api.testnet.solana.com
solana config get
```

3. 创建钱包并获取测试网SOL：
```bash
solana-keygen new --outfile ~/my-solana-wallet.json
solana config set --keypair ~/my-solana-wallet.json
solana airdrop 2
solana balance
```