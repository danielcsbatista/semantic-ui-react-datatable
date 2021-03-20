import { isValid, format } from "date-fns";
import { numberFormat } from "../utils/format";

function ExtractJSONValues(data: any, rowValue: any) {
  let valueResponse = data[rowValue.key] || "";
  if (typeof valueResponse === "object") {
    valueResponse =
      rowValue.subKey && rowValue.subKey !== ""
        ? data[rowValue.key][rowValue.subKey]
        : "";
  }

  if (rowValue.type === "date")
    valueResponse = isValid(valueResponse)
      ? format(valueResponse, "LLL")
      : valueResponse;

  if (rowValue.key === "action") valueResponse = rowValue.render(data) || null;

  if (rowValue.type === "money") valueResponse = numberFormat(valueResponse);

  return valueResponse;
}

export default ExtractJSONValues;
