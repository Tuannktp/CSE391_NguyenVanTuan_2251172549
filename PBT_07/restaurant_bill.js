"use strict";

function formatMoney(value) {
  return new Intl.NumberFormat('vi-VN').format(value) + 'đ';
}

function padRight(text, width) {
  return text + ' '.repeat(Math.max(0, width - text.length));
}

function padLeft(text, width) {
  return ' '.repeat(Math.max(0, width - text.length)) + text;
}

function generateRestaurantBill(items, dayOfWeek, includeTip = false) {
  const billWidth = 38;
  const line = '═'.repeat(billWidth - 2);
  const headerTitle = 'HÓA ĐƠN NHÀ HÀNG';

  let result = '';
  result += '╔' + line + '╗\n';
  result += '║' + padRight(headerTitle, billWidth - 2) + '║\n';
  result += '╠' + line + '╣\n';

  let subtotal = 0;
  items.forEach((item, index) => {
    const totalK = item.price * item.quantity;
    const totalAmount = totalK * 1000;
    subtotal += totalAmount;
    const no = `${index + 1}.`;
    const name = padRight(item.name, 12);
    const qty = `x${item.quantity}`;
    const price = `@${item.price}k`;
    const totalLabel = `${totalK}k`;
    const lineText = `${no} ${name} ${qty} ${price}`;
    const padded = padRight(lineText, 24) + padLeft(totalLabel, 8);
    result += '║ ' + padded + ' ║\n';
  });

  result += '╠' + line + '╣\n';

  const discountPercent = subtotal > 1000000 ? 15 : subtotal > 500000 ? 10 : 0;
  const discount = Math.round((subtotal * discountPercent) / 100);
  const wednesdayDiscount = dayOfWeek.toLowerCase() === 'wednesday' ? Math.round((subtotal - discount) * 0.05) : 0;
  const vat = Math.round((subtotal - discount - wednesdayDiscount) * 0.08);
  const tip = includeTip ? Math.round((subtotal - discount - wednesdayDiscount + vat) * 0.05) : 0;
  const totalPayment = subtotal - discount - wednesdayDiscount + vat + tip;

  const row = (label, value) => {
    const left = padRight(label, 23);
    const right = padLeft(value, 11);
    return `║ ${left}${right} ║\n`;
  };

  result += row('Tổng cộng:', formatMoney(subtotal));
  result += row(`Giảm giá (${discountPercent}%):`, formatMoney(discount));
  if (wednesdayDiscount > 0) {
    result += row('Giảm thêm (Wednesday):', formatMoney(wednesdayDiscount));
  }
  result += row('VAT (8%):', formatMoney(vat));
  result += row(`Tip (${includeTip ? '5%' : '0%'}):`, formatMoney(tip));
  result += '╠' + line + '╣\n';
  result += row('THANH TOÁN:', formatMoney(totalPayment));
  result += '╚' + line + '╝\n';

  return result;
}

if (require.main === module) {
  const items = [
    { name: 'Phở bò', price: 65, quantity: 2 },
    { name: 'Trà đá', price: 5, quantity: 3 },
    { name: 'Bún chả', price: 55, quantity: 1 }
  ];

  const bill = generateRestaurantBill(items, 'Wednesday', true);
  console.log(bill);
}

module.exports = { generateRestaurantBill };
