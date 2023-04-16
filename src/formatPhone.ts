export const formatPhone = (phone: string) => {
  const match = phone.replace(/\D/g, '').match(/^(\d{2})(\d{4,5})(\d{4})$/);
  return match ? `(${match[1]}) ${match[2]}-${match[3]}` : phone;
};
