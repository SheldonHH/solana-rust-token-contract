1. 创建Rust项目
```bash
cargo new --lib token_contract
cd token_contract

```


2. 更新Cargo.toml文件
```bash
[package]
name = "token_contract"
version = "0.1.0"
edition = "2018"

[dependencies]
solana-program = "1.7.11"
borsh = "0.9.1"
```