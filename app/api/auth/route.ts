import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Only return non-sensitive configuration
  return NextResponse.json({
    projectName: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME,
    walletConfig: process.env.NEXT_PUBLIC_ONCHAINKIT_WALLET_CONFIG,
  });
}

// This endpoint will be used for authenticated requests that need API keys
export async function POST(request: NextRequest) {
  try {
    // In a real app, you would validate the request here
    // For example, check for a valid session or API token

    // Log environment variables for debugging (without exposing actual values)
    console.log("Environment variables in API route:", {
      walletConnectProjectId: process.env.WALLETCONNECT_PROJECT_ID ? "Set" : "Not set",
      onchainKitApiKey: process.env.ONCHAINKIT_API_KEY ? "Set" : "Not set",
      cdpProjectId: process.env.CDP_PROJECT_ID ? "Set" : "Not set",
    });

    // For Vercel deployment, make sure these environment variables are set
    const walletConnectProjectId = process.env.WALLETCONNECT_PROJECT_ID || '';
    const onchainKitApiKey = process.env.ONCHAINKIT_API_KEY || '';
    const cdpProjectId = process.env.CDP_PROJECT_ID || '';

    // Check if any of the required environment variables are missing
    if (!walletConnectProjectId || !onchainKitApiKey || !cdpProjectId) {
      console.warn("Some environment variables are missing:", {
        walletConnectProjectId: !!walletConnectProjectId,
        onchainKitApiKey: !!onchainKitApiKey,
        cdpProjectId: !!cdpProjectId,
      });
    }

    // For demo purposes, we're just returning the config
    // In production, you would implement proper authentication
    return NextResponse.json({
      success: true,
      config: {
        walletConnectProjectId,
        onchainKitApiKey,
        cdpProjectId,
      }
    });
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }
}
