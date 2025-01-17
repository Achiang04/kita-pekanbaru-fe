export type TGetParams =
  | { [param: string]: string | number | (string | number)[] | TGetParams }
  | (string | number)[];
export function createGetStr(
  params: TGetParams,
  skipRoot: string[] = [],
  prefix: string = ""
) {
  const out: string[] = [];
  const isArray = Array.isArray(params);

  Object.entries(params).forEach(([key, val]) => {
    if (skipRoot.indexOf(key) !== -1) {
      return;
    }

    let name;
    if (prefix !== "") {
      name = !isArray ? `${prefix}[${key}]` : `${prefix}[]`;
    } else {
      name = key;
    }

    if ((typeof val === "object" && val !== null) || Array.isArray(val)) {
      out.push(createGetStr(val as {}, [], name));
    } else {
      if (val === null) {
        val = "";
      }

      val = encodeURIComponent(val as string);
      out.push(`${name}=${val}`);
    }
  });

  return out.join("&");
}
