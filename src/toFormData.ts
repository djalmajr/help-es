export function toFormData<T extends object>(data: T) {
  const form = new FormData();
  for (const key in data) form.append(key, data[key as never]);
  return form;
}
