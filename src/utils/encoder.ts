const soil = btoa(new Date().toLocaleDateString());

export const encode = (str: string) => btoa(`${soil}:${btoa(str)}:${soil}`);
