export const errorRequired = "* Povinné pole";

export const errorMin = (label: string, minCount: number) =>
  `${label} musí mít alespoň ${minCount} znaků`;

export const errorMax = (label: string, maxCount: number) =>
  `${label} musí mít maximálně ${maxCount} znaků`;

export const errorBadName = "Tento uživatel neexistuje";

export const errorBadPassword = "Špatné heslo";

export const errorNameExists = "Tento uživatel už existuje";

export const errorEmailInUse = "Tento email je již používán";
