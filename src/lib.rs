use borsh::{BorshDeserialize, BorshSerialize};
use std::convert::TryInto;
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    program_error::ProgramError,
    pubkey::Pubkey,
};

// 定义Token的状态
#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct TokenAccount {
    pub owner: Pubkey,
    pub balance: u64,
}

// 合约入口点
entrypoint!(process_instruction);

pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let accounts_iter = &mut accounts.iter();
    let account = next_account_info(accounts_iter)?;
    let mut token_account = TokenAccount::try_from_slice(&account.data.borrow())?;

    match instruction_data[0] {
        // Mint new tokens
        0 => {
            let amount = u64::from_le_bytes(instruction_data[1..9].try_into().unwrap());
            token_account.balance += amount;
        }
        // Transfer tokens
        1 => {
            let to_account = next_account_info(accounts_iter)?;
            let mut to_token_account = TokenAccount::try_from_slice(&to_account.data.borrow())?;
            let amount = u64::from_le_bytes(instruction_data[1..9].try_into().unwrap());

            if token_account.balance < amount {
                return Err(ProgramError::InsufficientFunds);
            }

            token_account.balance -= amount;
            to_token_account.balance += amount;
            to_token_account.serialize(&mut &mut to_account.data.borrow_mut()[..])?;
        }
        _ => return Err(ProgramError::InvalidInstructionData),
    }

    token_account.serialize(&mut &mut account.data.borrow_mut()[..])?;
    Ok(())
}
