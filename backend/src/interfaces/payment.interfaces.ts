// src/interfaces/payment.interfaces.ts
export interface PaymentAttributes {
    id?: number;  // Tornando opcional
    letterId?: number | null;  // Associated letter (optional)
    userId?: number | null;    // Associated user (optional)
    amount: number;
    currency: string;
    paymentMethod?: string;    // e.g., "Stripe", "Pix", "PayPal"
    paymentStatus: string;     // e.g., "paid", "pending", "failed"
    transactionId: string;
    metadata?: any;
    createdAt?: Date;
    updatedAt?: Date;
  }
  