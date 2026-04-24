export function convertToSlug(text: string) {
  if (!text) return '';
  return text
    .toLowerCase()
    .normalize('NFD') // Chuẩn hóa Unicode để tách dấu
    .replace(/[\u0300-\u036f]/g, '') // Xóa dấu tiếng Việt
    .replace(/[đĐ]/g, 'd')
    .replace(/([^0-9a-z-\s])/g, '') // Xóa ký tự đặc biệt
    .replace(/(\s+)/g, '-') // Thay khoảng trắng bằng gạch ngang
    .replace(/-+/g, '-') // Tránh nhiều gạch ngang liên tiếp
    .replace(/^-+|-+$/g, ''); // Xóa gạch ngang ở đầu và cuối
}
