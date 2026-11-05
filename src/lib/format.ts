import type { CartItem, Checkout, StoreSettings } from "../types";
export const money = (value: number, currency = "INR") =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency, maximumFractionDigits: 0 }).format(value);
export const totals = (items: CartItem[], settings: StoreSettings) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = settings.free_delivery_threshold !== null && subtotal >= settings.free_delivery_threshold ? 0 : settings.delivery_charge;
  return { subtotal, delivery, grandTotal: subtotal + delivery };
};
export const orderMessage = (items: CartItem[], checkout: Checkout, settings: StoreSettings) => {
  const { subtotal, delivery, grandTotal } = totals(items, settings);
  const lines = items.map((item, index) =>
    `${index + 1}. ${item.name}\nQuantity: ${item.quantity}\nUnit Price: ${money(item.price)}\nTotal: ${money(item.price * item.quantity)}`);
  return `Hello ${settings.store_name}! I would like to place an order.\n\nCUSTOMER DETAILS\nName: ${checkout.name}\n\nDELIVERY ADDRESS\nAddress: ${checkout.address}\nCity: ${checkout.city}\nState: ${checkout.state}\nPIN Code: ${checkout.pin}${checkout.instructions ? `\nInstructions: ${checkout.instructions}` : ""}\n\nORDER DETAILS\n${lines.join("\n\n")}\n\nSubtotal: ${money(subtotal)}\nDelivery Charges: ${money(delivery)}\nGrand Total: ${money(grandTotal)}\n\nPayment Method: Prepaid only.\nPlease confirm availability and payment instructions.`;
};
