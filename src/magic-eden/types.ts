/** 
 * Information about a royalty recipient and their share percentage.
 * For example, share = 100 means 100% of the royalty is assigned to this address.
 */
export interface RoyaltyRecipient {
    address: string;  // Wallet address receiving the royalty
    share: number;    // Percentage share (e.g., 100 = 100%)
  }
  
/** 
   * Identifies the currency used for payment, including blockchain and asset ID.
   */
export interface PriceCurrency {
    chain: string;    // Blockchain name (e.g., "monad-testnet")
    assetId: string;  // Asset identifier on the blockchain (e.g., token contract address)
  }
  
/**
   * Price information for a unit, including currency and raw price string.
   * Price is a string to avoid floating point precision issues.
   */
export interface Price {
    currency: PriceCurrency; // The currency used for payment
    raw: string;             // Raw price value as a string (e.g., "0" means free)
  }
  
/**
   * Details of a minting stage, including the kind, price, and time window.
   */
export interface MintStage {
    kind: string;       // Type of mint stage (e.g., "public", "presale")
    price: Price;       // Price applicable during this mint stage
    startTime: string;  // Start time of the mint stage (ISO 8601 format)
    endTime: string;    // End time of the mint stage (ISO 8601 format)
  }
  
/**
   * Overall minting configuration containing all mint stages and limits.
   */
export interface MintStages {
    stages: Array<MintStage>;    // List of mint stages
    walletLimit: number;         // Maximum number of tokens one wallet can mint (0 means no limit)
    maxSupply: number | null;    // Maximum total supply (null if unlimited)
    tokenId: number;             // Default token ID (useful for multi-token standards like ERC1155)
  }
  
/**
   * Describes an NFT collection with all its metadata and configuration.
   */
export interface CreateTokenRequest {
    name: string;                     // Collection name
    symbol: string;                   // Collection symbol/ticker
    description: string;              // Short description of the collection
    chain: string;                    // Blockchain name (e.g., "monad-testnet")
    protocol: string;                 // Token standard used (e.g., "ERC1155")
    creator: string;                  // Creator's wallet address
    royaltyBps: number;               // Royalty basis points (bps), e.g., 1000 = 10%
    royaltyRecipients: Array<RoyaltyRecipient>; // List of royalty recipients
    payoutRecipient: string;          // Wallet address to receive payouts
    mintStages: MintStages;           // Minting stages configuration
    imageUrl: string;                 // URL to the collection's image or logo
  }

/** 
 * Parameters for a blockchain transaction.
 * - from: sender's wallet address
 * - to: recipient's wallet address
 * - value: amount of native token to send (optional, as string)
 * - data: calldata or encoded smart contract function call
 */
export interface TransactionParams {
    from: string;
    to: string;
    value?: string;
    data: string;
  }
  
/**
   * Represents a single step or transaction in a multi-step process.
   * - id: unique identifier for the step (e.g. "create-token")
   * - chain: blockchain network name (e.g. "monad-testnet")
   * - method: RPC method to call (e.g. "eth_sendTransaction")
   * - params: transaction parameters
   */
export interface Step {
    id: string;
    chain: string;
    method: string;
    params: TransactionParams;
  }
  
/**
   * Metadata information related to the transaction or token.
   * - imageUrl: URL of the image (usually hosted on IPFS)
   * - metadataUrl: URL to the metadata JSON (usually hosted on IPFS)
   */
export interface Metadata {
    imageUrl: string;
    metadataUrl: string;
  }
  
/**
   * Full response object containing the transaction steps and related metadata.
   */
export interface CreateTokenResponse {
    steps: Array<Step>;
    metadata: Metadata;
  }