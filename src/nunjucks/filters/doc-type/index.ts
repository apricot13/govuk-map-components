import { supportedTypes } from "../entity-title";

function docType(type: string) {
  const types: Record<string, string> = Object.fromEntries(
    Object.entries(supportedTypes).map(([key, value]) => [key, value.singular])
  );

  if (Object.prototype.hasOwnProperty.call(types, type)) {
    return types[type];
  } else {
    return type;
  }
}

export default docType;
