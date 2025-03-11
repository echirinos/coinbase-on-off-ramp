# Coinbase On/Off Ramp Demo

A Next.js application demonstrating the integration of Coinbase's On-ramp and Off-ramp services, allowing users to easily convert between fiat and cryptocurrency.

## Features

- **Coinbase Onramp Integration**: Allows users to purchase crypto with fiat currency
- **Coinbase Offramp Integration**: Enables users to convert crypto back to fiat
- **Wallet Connection**: Integrates with Web3 wallets via WalletConnect
- **Responsive Design**: Modern UI that works across devices
- **Multiple Integration Options**:
  - **Fund Card**: Pre-built UI component from Coinbase
  - **Custom Integration**: Fully customizable UI with enhanced dropdown options

## Getting Started

### Environment Variables Setup

This project requires several API keys to function properly. For security reasons, these keys are not included in the repository.

1. Copy the `.env.example` file to `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

2. Obtain the necessary API keys:

   - **CDP Project ID**: Get this from the [Coinbase Developer Platform Dashboard](https://portal.cdp.coinbase.com/)
   - **OnchainKit API Key**: Get this from the [Coinbase Developer Platform Dashboard](https://portal.cdp.coinbase.com/)
   - **WalletConnect Project ID**: Get this from the [WalletConnect Dashboard](https://cloud.walletconnect.com/)

3. Add your API keys to the `.env.local` file:

   ```
   # Client-side variables (accessible in browser)
   NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_api_key
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
   NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME=Coinbase Ramp Demo

   # Server-side variables (not accessible in browser)
   CDP_PROJECT_ID=your_cdp_project_id
   ONCHAINKIT_API_KEY=your_onchainkit_api_key
   WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
   ```

   Note that some variables are duplicated with and without the `NEXT_PUBLIC_` prefix. This is because:

   - Variables with `NEXT_PUBLIC_` are accessible in client-side code
   - Variables without `NEXT_PUBLIC_` are only accessible in server-side code (API routes)

> **IMPORTANT**: Never commit your API keys to the repository. The `.env.local` and `.env.production` files are included in `.gitignore` to prevent accidental exposure.

## Integration Options

### Fund Card

The Fund Card provides a pre-built UI component from Coinbase that handles the entire on-ramp process with minimal configuration.

#### Troubleshooting FundCard Issues

If you're experiencing issues with the FundCard component:

1. **400 Bad Request Error**:

   - Ensure your CDP Project ID is correctly set in the `.env.local` file
   - Verify that your OnchainKit API Key is valid and active
   - Check that your wallet is connected to the correct network (Base is recommended)
   - Look for detailed error messages in the browser console

2. **Wallet Connection Issues**:

   - Make sure your WalletConnect Project ID is correctly set
   - Try disconnecting and reconnecting your wallet
   - Ensure you're using a compatible wallet (Coinbase Wallet is recommended)

3. **Testing with Simplified Components**:

   - Visit `/basic-fund` to test a minimal FundCard implementation
   - Visit `/simple-fund` to test a FundCard with CDP Project ID handling

4. **Environment Variable Verification**:
   - Both client-side (`NEXT_PUBLIC_*`) and server-side variables must be set
   - The API route at `/api/auth` must return a valid CDP Project ID

### Custom Integration

The Custom Integration demo showcases a fully customizable UI that gives you complete control over the user experience. Recent enhancements include:

- **Expanded Currency Options**: Support for USD, EUR, GBP, CAD, AUD, JPY, CHF, SGD
- **Multiple Cryptocurrency Assets**: USDC, ETH, BTC, SOL, MATIC, AVAX, LINK, UNI, AAVE, DAI
- **Diverse Network Support**: Base, Ethereum, Optimism, Arbitrum, Polygon, Avalanche, Solana, BNB Chain
- **Comprehensive Payment Methods**: Card, Bank, Apple Pay, Google Pay, PayPal, Coinbase, ACH, SEPA, iDEAL, SOFORT
- **Global Coverage**: Support for multiple countries including US, UK, Canada, Australia, Germany, France, Spain, Italy, Netherlands, Switzerland, Singapore, Japan

## Tech Stack

- Next.js 14
- React
- TypeScript
- Tailwind CSS
- @coinbase/onchainkit
- wagmi

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/echirinos/coinbase-on-off-ramp.git
   cd coinbase-on-off-ramp
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with the following variables:

   ```
   NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
   NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_api_key
   ```

4. Start the development server

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

This project can be easily deployed on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fechirinos%2Fcoinbase-on-off-ramp)

## Recent Updates

- **Enhanced Custom Integration**: Added comprehensive dropdown options for countries, currencies, payment methods, and networks
- **Improved Type Safety**: Fixed TypeScript type issues for better reliability
- **UI Enhancements**: Updated styling for better user experience

## License

MIT
