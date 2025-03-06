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

## Integration Options

### Fund Card

The Fund Card provides a pre-built UI component from Coinbase that handles the entire on-ramp process with minimal configuration.

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
