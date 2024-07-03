# Solana CLI for testnet
```bash
solana config set --url https://api.testnet.solana.com
solana config get

```


## 3. 创建新的钱包地址
```bash
solana-keygen new --outfile ~/my-solana-wallet.json
```

## 4. 配置CLI使用这个钱包
```bash
solana config set --keypair ~/my-solana-wallet.json
```


## 5. 请求测试网SOL
```bash
solana airdrop 2

solana balance

```

## 6. 获取钱包地址
```bash
solana address
```


