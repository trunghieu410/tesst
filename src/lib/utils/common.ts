export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export const text = (text: string | null | undefined | number, placeholder: string = "--") => {
  if (text === null || text === undefined || text === "") return placeholder;
  return `${text}`;
};
