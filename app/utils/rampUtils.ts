/**
 * Utility functions for Coinbase Onramp and Offramp URL generation
 */

interface OnrampURLParams {
  asset: string;
  amount: string;
  network: string;
  paymentMethod: string;
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

/**
 * Generates a Coinbase Onramp URL with the provided parameters
 */
export function generateOnrampURL(params: OnrampURLParams): string {
  const {
    asset,
    amount,
    network,
    paymentMethod,
    address,
    redirectUrl,
    sessionId,
    enableGuestCheckout,
  } = params;

  // Base URL for Coinbase Onramp
  const baseUrl = "https://pay.coinbase.com/buy/select-asset";

  // Build query parameters
  const queryParams = new URLSearchParams();

  // Required parameters - use the specific appId
  queryParams.append("appId", "a353ad87-5af2-4bc7-af5b-884e6aabf088");

  // Create addresses object (replacing deprecated destinationWallets)
  const addressesObj: Record<string, string[]> = {};
  addressesObj[address] = [network];
  queryParams.append("addresses", JSON.stringify(addressesObj));

  // Add assets parameter - simple array of strings format
  if (asset) {
    queryParams.append("assets", JSON.stringify([asset]));
  }

  // Optional parameters
  if (asset) queryParams.append("defaultAsset", asset);
  if (amount) queryParams.append("presetFiatAmount", amount);
  if (network) queryParams.append("defaultNetwork", network);
  if (paymentMethod) queryParams.append("defaultPaymentMethod", paymentMethod);
  if (redirectUrl) queryParams.append("redirectUrl", redirectUrl);
  if (sessionId) queryParams.append("sessionId", sessionId);

  // Add guest checkout parameter if specified
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
  const baseUrl = "https://pay.coinbase.com/v3/sell/input";

  // Build query parameters
  const queryParams = new URLSearchParams();

  // Required parameters - use the specific appId
  queryParams.append("appId", "a353ad87-5af2-4bc7-af5b-884e6aabf088");
  queryParams.append("partnerUserId", address || "anonymous");

  // Create addresses object
  const addressesObj: Record<string, string[]> = {};
  addressesObj[address || "0x0000000000000000000000000000000000000000"] = [network];
  queryParams.append("addresses", JSON.stringify(addressesObj));

  // Optional parameters
  if (asset) queryParams.append("defaultAsset", asset);
  if (amount) queryParams.append("defaultAmount", amount);
  if (cashoutMethod) queryParams.append("defaultCashoutMethod", cashoutMethod);
  if (redirectUrl) queryParams.append("redirectUrl", redirectUrl);
  if (sessionId) queryParams.append("sessionId", sessionId);

  // Return the complete URL
  return `${baseUrl}?${queryParams.toString()}`;
}

/**
 * Generates a transaction status URL for checking the status of a transaction
 */
export function generateTransactionStatusURL(transactionId: string): string {
  return `https://pay.coinbase.com/api/v1/transactions/${transactionId}`;
}
