export const getStorageData = (key: string) => {
  if (!key || typeof key !== "string") {
    throw new Error("Invalid key");
  }
  try {
    return JSON.parse(sessionStorage.getItem(key) as string);
  } catch {
    return JSON.parse(localStorage.getItem(key) as string);
  }
};

export const setStorageData = (key: string, value: any) => {
  if (!key || typeof key !== "string") {
    throw new Error("Invalid key");
  }

  if (typeof value === "object") {
    sessionStorage.setItem(key, JSON.stringify(value));
  } else {
    sessionStorage.setItem(key, value);
  }
};
