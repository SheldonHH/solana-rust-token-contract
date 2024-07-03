```bash
mac@macs-MacBook-Pro-2 token_contract % cargo install --git https://github.com/solana-labs/cargo-build-sbf --locked

    Updating git repository `https://github.com/solana-labs/cargo-build-sbf`
error: failed to clone into: /Users/mac/.cargo/git/db/cargo-build-sbf-df16512916071b78

Caused by:
  failed to authenticate when downloading repository

  * attempted to find username/password via git's `credential.helper` support, but failed

  if the git CLI succeeds then `net.git-fetch-with-cli` may help here
  https://doc.rust-lang.org/cargo/reference/config.html#netgit-fetch-with-cli

Caused by:
  failed to acquire username/password from local configuration
```


# GitHub访问权限问题
```bash
git config --global net.git-fetch-with-cli true
cargo install --git https://github.com/solana-labs/cargo-build-sbf --locked
```