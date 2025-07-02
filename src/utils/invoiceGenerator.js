
// Invoice Number Generator Utility

export const generateInvoiceNumber = (type = 'shop') => {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2); // Last 2 digits of year
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  
  // Generate random 4-digit number
  const random = Math.floor(1000 + Math.random() * 9000);
  
  // Create prefix based on type
  const prefix = type === 'service' ? 'SVC' : 'INV';
  
  // Format: PREFIX-YYMMDD-XXXX
  return `${prefix}-${year}${month}${day}-${random}`;
};

export const generateOrderNumber = () => {
  // Keep the existing format for order numbers
  return `SS-${Date.now().toString().slice(-6)}`;
};

export const formatInvoiceData = (orderData, invoiceNumber) => {
  const now = new Date();
  
  return {
    ...orderData,
    invoiceNumber,
    invoiceDate: now.toISOString(),
    invoiceDateFormatted: now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    dueDate: new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000)).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  };
};
