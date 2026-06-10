export function generateJoinCode(name: string): string {
  const code = (name.replace(/[^a-zA-Z]/g, "").substring(0, 3).toUpperCase() + "001").substring(0, 6).padEnd(6, "0");
  return code;
}

export function generateSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}
