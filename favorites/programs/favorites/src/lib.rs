use anchor_lang::prelude::*;

declare_id!("3nPZkExy7JFxFiJTWNcX9wj7uYEuFTa3azAQLAoJNQJb");

pub const ANCHOR_DISCRIMINATOR_SIZE: usize = 8;

#[account]
#[derive(InitSpace)]
pub struct Favorites{
    pub number: u64, 
    #[max_len(50)] 
    pub color: String,
}

#[derive(Accounts)]
pub struct SetFavorites<'info>{
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(
        init,
        payer = user,
        space = ANCHOR_DISCRIMINATOR_SIZE + Favorites::INIT_SPACE,
        seeds = [b"favorites", user.key().as_ref()],
        bump,
    )]

pub favorites: Account<'info, Favorites>,

pub system_program: Program<'info, System>,
}

#[program]
pub mod favorites {
    use super::*;

    pub fn set_favorites(contex: Context <SetFavorites>, number: u64, color: String) -> Result<()> {
        let user_public_key = contex.accounts.user.key();
        msg!("Greetings from: {:?}", contex.program_id);
        msg!("User {}'s favorite number is {} and favorite color is: {}",
            user_public_key,
            number,
            color
        );
        contex
            .accounts
            .favorites
            .set_inner(Favorites{number, color});
        Ok(())
    }
}

