export interface InquiryItem {
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  priceIdr: number;
}

export interface Inquiry {
  id: string;
  inquiryNumber: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  country: string;
  city: string;
  address: string;
  postalCode: string;
  notes: string;
  preferredContact: 'WhatsApp' | 'Email';
  source: string;
  status: 'new' | 'reviewing' | 'quoted' | 'waiting_payment' | 'paid' | 'processing' | 'shipped' | 'completed' | 'cancelled';
  subtotal: number;
  shippingFee: number;
  finalTotal: number;
  adminNotes: string;
  paymentInstruction: string;
  items: InquiryItem[];
  createdAt: number;
  updatedAt: number;
}
