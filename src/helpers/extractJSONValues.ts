import moment from 'moment';
import { numberFormat } from '../../../utils/format';

function ExtractJSONValues(data: any, rowValue: any) {
  moment.locale('pt-BR');
  let valueResponse = data[rowValue.key] || '';
  if (typeof valueResponse === 'object') {
    valueResponse =
      rowValue.subKey && rowValue.subKey !== ''
        ? data[rowValue.key][rowValue.subKey]
        : '';
  }

  if (rowValue.type === 'date')
    valueResponse = moment(valueResponse, moment.ISO_8601, true).isValid()
      ? moment.utc(valueResponse, moment.ISO_8601, true).format('LLL')
      : valueResponse;

  if (rowValue.key === 'action') valueResponse = rowValue.render(data) || null;

  if (rowValue.type === 'money') valueResponse = numberFormat(valueResponse);

  return valueResponse;
}

export default ExtractJSONValues;
