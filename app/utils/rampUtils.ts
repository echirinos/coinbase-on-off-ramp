/**
 * Utility functions for Coinbase Onramp and Offramp URL generation
 */
import { getOnrampBuyUrl } from '@coinbase/onchainkit/fund';

interface OnrampURLParams {
  asset: string;
  amount: string;
  network: string;
  paymentMethod: string;
  paymentCurrency?: string;
  address: string;
  redirectUrl: string;
  sessionId?: string;
  enableGuestCheckout?: boolean;
}

interface OfframpURLParams {
  asset: string;
  amount: string;
  network: string;
  cashoutMethod: string;
  address: string;
  redirectUrl: string;
  sessionId?: string;
}

// Coinbase Developer Platform Project ID
const CDP_PROJECT_ID = 'a353ad87-5af2-4bc7-af5b-884e6aabf088';

/**
 * Generates a Coinbase Onramp URL with the provided parameters
 */
export function generateOnrampURL(params: OnrampURLParams): string {
  const {
    asset,
    amount,
    network,
    paymentMethod,
    paymentCurrency,
    address,
    redirectUrl,
    sessionId,
    enableGuestCheckout,
  } = params;

  // Parse amount to a number for presetFiatAmount
  const numericAmount = parseFloat(amount);
  if (isNaN(numericAmount)) {
    throw new Error("Invalid amount provided");
  }

  // Base URL for Coinbase Onramp
  const baseUrl = "https://pay.coinbase.com/buy/select-asset";

  // Build query parameters
  const queryParams = new URLSearchParams();

  // Required parameters
  queryParams.append("appId", CDP_PROJECT_ID);

  // Format addresses as a JSON string: {"address":["network"]}
  const addressesObj: Record<string, string[]> = {};
  addressesObj[address || "0x0000000000000000000000000000000000000000"] = [network];
  queryParams.append("addresses", JSON.stringify(addressesObj));

  // Optional parameters
  if (asset) {
    queryParams.append("assets", JSON.stringify([asset]));
    queryParams.append("defaultAsset", asset);
  }

  if (network) queryParams.append("defaultNetwork", network);

  // Format payment method properly
  if (paymentMethod) {
    // Convert to uppercase for consistency with API expectations
    const formattedPaymentMethod = paymentMethod.toUpperCase();
    queryParams.append("defaultPaymentMethod", formattedPaymentMethod);
  }

  // Add fiat amount and currency
  if (numericAmount > 0) {
    queryParams.append("presetFiatAmount", numericAmount.toString());
  }

  if (paymentCurrency) {
    queryParams.append("fiatCurrency", paymentCurrency);
  }

  // Add partner user ID (limited to 49 chars)
  queryParams.append("partnerUserId", address.substring(0, 49));

  // Add redirect URL
  if (redirectUrl) {
    queryParams.append("redirectUrl", redirectUrl);
  }

  // Add session token if provided
  if (sessionId) {
    queryParams.append("sessionToken", sessionId);
  }

  // Add guest checkout parameter if provided
  if (enableGuestCheckout !== undefined) {
    queryParams.append("enableGuestCheckout", enableGuestCheckout.toString());
  }

  // Return the complete URL
  return `${baseUrl}?${queryParams.toString()}`;
}

/**
 * Generates a Coinbase Offramp URL with the provided parameters
 */
export function generateOfframpURL(params: OfframpURLParams): string {
  const {
    asset,
    amount,
    network,
    cashoutMethod,
    address,
    redirectUrl,
    sessionId,
  } = params;

  // Base URL for Coinbase Offramp
  const baseUrl = "https://pay.coinbase.com/sell/select-asset";

  // Build query parameters
  const queryParams = new URLSearchParams();

  // Required parameters - use the specific appId
  queryParams.append("appId", CDP_PROJECT_ID);

  // Partner user ID must be unique and less than 50 chars
  queryParams.append("partnerUserId", address ? address.substring(0, 49) : "anonymous");

  // Create addresses object - ensure proper formatting according to documentation
  // Format: {"network1":["address1","address2"]}
  const addressesObj: Record<string, string[]> = {};
  addressesObj[network] = [address || "0x0000000000000000000000000000000000000000"];
  queryParams.append("addresses", JSON.stringify(addressesObj));

  // Add assets parameter as a JSON array of strings
  if (asset) {
    queryParams.append("assets", JSON.stringify([asset]));
    queryParams.append("defaultAsset", asset);
  }

  // Format amount properly - for offramp we need to use presetCryptoAmount for crypto amount
  // or presetFiatAmount for fiat amount
  if (amount) {
    const numericAmount = parseFloat(amount);
    if (!isNaN(numericAmount)) {
      // For offramp, we're selling crypto for fiat, so we use presetCryptoAmount
      queryParams.append("presetCryptoAmount", numericAmount.toString());
    }
  }

  if (network) queryParams.append("defaultNetwork", network);
  if (cashoutMethod) queryParams.append("defaultCashoutMethod", cashoutMethod);

  // Allow users to edit their order
  queryParams.append("disableEdit", "false");

  // Redirect URL is required and must be in the allowed domains
  if (redirectUrl) {
    queryParams.append("redirectUrl", redirectUrl);
  } else {
    // Fallback to current origin if no redirect URL provided
    queryParams.append("redirectUrl", window.location.origin + "/offramp?status=success");
  }

  // Add session token if provided
  if (sessionId) {
    queryParams.append("sessionToken", sessionId);
  }

  // Return the complete URL
  return `${baseUrl}?${queryParams.toString()}`;
}

/**
 * Generates a transaction status URL for checking the status of a transaction
 */
export function generateTransactionStatusURL(transactionId: string): string {
  return `https://pay.coinbase.com/api/v1/transactions/${transactionId}`;
}
