// src/interfaces/plan.interfaces.ts
export interface PlanAttributes {
    id: number;
    name: string;             // e.g., "Basic", "Standard", "Premium"
    photoLimit: number;       // Maximum number of photos allowed
    musicAllowed: boolean;    // Whether background music is permitted
    customization?: any;      // JSON object for advanced customization options
    expiryDuration?: string | null; // e.g., "1 year", "3 years", or null for lifetime
    price: number;
  }
  