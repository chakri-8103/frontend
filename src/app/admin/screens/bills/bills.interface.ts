// bill.interface.ts
export interface Bill {
    id: string;
    data: BillData;
    uploadDate: Date;
    filename: string;
    category: string;
    description?: string;
  }
  
  export interface BillData {
    invoice_number: string;
    company_name: string;
    total_amount: number;
    date: string;
    category: string;
    items?: BillItem[];
  }
  
  export interface BillItem {
    description: string;
    quantity: number;
    unit_price: number;
    total: number;
  }