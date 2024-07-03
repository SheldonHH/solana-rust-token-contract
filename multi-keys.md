
# 0. 查看当前在哪一个钱包？
```bash
solana config get

solana balance
solana airdrop 100

```


```bash
solana config set --url https://api.devnet.solana.com
```

# 1. 创建多个钱包
```bash
solana-keygen new --outfile ~/wallet1.json
solana-keygen new --outfile ~/wallet2.json
solana-keygen new --outfile ~/wallet3.json
```


# 2. 切换不同的钱包

```bash
solana config set --keypair ~/wallet1.json
```


# 3. 检查钱包地址
```bash
solana address
```



# 4. 管理多个钱包
```bash
#!/bin/bash

# 创建钱包
solana-keygen new --outfile ~/wallet1.json
solana-keygen new --outfile ~/wallet2.json
solana-keygen new --outfile ~/wallet3.json

# 显示钱包地址
echo "Wallet 1 address:"
solana-keygen pubkey ~/wallet1.json

echo "Wallet 2 address:"
solana-keygen pubkey ~/wallet2.json

echo "Wallet 3 address:"
solana-keygen pubkey ~/wallet3.json

# 切换到钱包1
solana config set --keypair ~/wallet1.json
echo "Current wallet address (Wallet 1):"
solana address

# 切换到钱包2
solana config set --keypair ~/wallet2.json
echo "Current wallet address (Wallet 2):"
solana address

# 切换到钱包3
solana config set --keypair ~/wallet3.json
echo "Current wallet address (Wallet 3):"
solana address
```