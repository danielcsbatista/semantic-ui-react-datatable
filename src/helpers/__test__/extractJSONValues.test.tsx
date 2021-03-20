import ExtractJSONValues from '../extractJSONValues';

describe('ExtractJSONValues Tests', () => {
  it('Should to call ExtractJSONValues', () => {
    const data = {
      authorizer: {
        authorizerId: 2,
        authorizerName: 'Buddy',
        status: 1
      },
      branchId: 882,
      channel: 'Não informado',
      createdAt: '2020-01-01',
      orderNumber: '581810206',
      paymentMethod: 'Visa',
      status: {
        color: 'green',
        status: 4,
        statusDescription: 'Confirmada'
      },
      transactionId: '7e593d93-e841-424f-9761-e31823e2ca4f',
      value: 999.9
    };

    const rowValue = [
      {
        config: {
          warning: true
        },
        subKey: ''
      },
      {
        config: {
          warning: false
        },
        key: 'value',
        title: 'Valor',
        money: true
      },
      {
        config: {
          warning: true
        },
        key: 'orderNumber',
        title: 'Referência'
      },
      {
        config: {
          warning: true
        },
        key: 'status',
        subKey: 'statusDescription'
      },
      {
        key: 'action',
        render: data => {
          return undefined;
        },
        sortable: false,
        title: 'Status'
      },
      {
        config: {
          warning: true
        },
        key: 'createdAt',
        subKey: ''
      },
      {
        config: {
          warning: true
        },
        title: 'Referência'
      },
      {
        config: {
          warning: true
        },
        key: 'createdAt',
        subKey: ''
      }
    ];

    rowValue.forEach(element => {
      const response = ExtractJSONValues(data, element);
      expect(response).not.toBeUndefined();
    });
  });

  it('Should to call ExtractJSONValues another values', () => {
    const data = {
      authorizer: {
        authorizerId: 2,
        authorizerName: 'Buddy',
        status: 1
      },
      branchId: 882,
      channel: 'Não informado',
      createdAt: 'teste',
      orderNumber: '581810206',
      paymentMethod: 'Visa',
      status: {
        color: 'green',
        status: 4,
        statusDescription: 'Confirmada'
      },
      transactionId: '7e593d93-e841-424f-9761-e31823e2ca4f',
      value: 999.9
    };

    const rowValue = {
      config: {
        warning: true
      },
      key: 'createdAt',
      subKey: ''
    };
    const response = ExtractJSONValues(data, rowValue);
    expect(response).not.toBeUndefined();
  });
});
