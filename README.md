# Coinbase On/Off Ramp Demo

A Next.js application demonstrating the integration of Coinbase's On-ramp and Off-ramp services, allowing users to easily convert between fiat and cryptocurrency.

## Features

- **Coinbase Onramp Integration**: Allows users to purchase crypto with fiat currency
- **Coinbase Offramp Integration**: Enables users to convert crypto back to fiat
- **Wallet Connection**: Integrates with Web3 wallets via WalletConnect
- **Responsive Design**: Modern UI that works across devices

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
   git clone https://github.com/yourusername/on-off-ramp-demo.git
   cd on-off-ramp-demo
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

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fon-off-ramp-demo)

## License

MIT
