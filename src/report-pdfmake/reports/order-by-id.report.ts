import type {
    Content,
    StyleDictionary,
    TDocumentDefinitions,
  } from 'pdfmake/interfaces';
  import { DateFormatter } from 'src/report-pdfmake/helpers/date-formatter';
  import { footerSection } from './sections/footer.section';
import { CurrencyFormatter } from 'src/report-pdfmake/helpers/currency-formatter';
  
  const logo: Content = {
    image: 'assets/images/logo.png',
    width: 75,
    height: 75,
    margin: [10, 10],
  };
  
  const styles: StyleDictionary = {
    header: {
      fontSize: 20,
      bold: true,
      margin: [0, 30, 0, 0],
    },
    subHeader: {
      fontSize: 16,
      bold: true,
      margin: [0, 20, 0, 0],
    },
  };
  
  export interface CompleteOrder {
    order_id: number;
    customer_id: number;
    order_date: Date;
    customers: Customers;
    order_details: OrderDetail[];
  }
  
  export interface Customers {
    customer_id: number;
    customer_name: string;
    contact_name: string;
    address: string;
    city: string;
    postal_code: string;
    country: string;
  }
  
  export interface OrderDetail {
    order_detail_id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    products: Products;
  }
  
  export interface Products {
    product_id: number;
    product_name: string;
    category_id: number;
    unit: string;
    price: string;
  }
  
  interface ReportValues {
    title?: string;
    subTitle?: string;
    data: CompleteOrder;
  }
  
  export const orderByIdReport = (value: ReportValues): TDocumentDefinitions => {
    const { data } = value;
  
    const { customers, order_details } = data;
  
    const subTotal = order_details.reduce(
      (acc, detail) => acc + detail.quantity * +detail.products.price,
      0,
    );
  
    const total = subTotal * 1.15;
  
    return {
      styles: styles,
      header: logo,
      pageMargins: [40, 60, 40, 60],
      footer: footerSection,
      content: [
        // Headers
        {
          text: 'TECHFORGE SOLUTIONS',
          style: 'header',
        },
  
        // Address y número recibo
        {
          columns: [
            {
              text: '47 Atalaya carrera 100, \nCúcuta ON K2Y 9X1, COLOMBIA\nBN: 12783671823\nhttps://google.com',
            },
            {
              text: [
                {
                  text: `Recibo No. ${data.order_id}\n`,
                  bold: true,
                },
                `Fecha del recibo ${DateFormatter.getDDMMMMYYYY(data.order_date)}\nPagar antes de: ${DateFormatter.getDDMMMMYYYY(new Date())}\n`,
              ],
              alignment: 'right',
            },
          ],
        },
  
        // QR
        { qr: 'https://google.com', fit: 85, alignment: 'right' },
  
        // Dirección del cliente
        {
          text: [
            {
              text: 'Cobrar a: \n',
              style: 'subHeader',
            },
            `Razón Social: ${customers.customer_name},
            Contacto: ${customers.contact_name}`,
          ],
        },
  
        // Table del detalle de la orden
        {
          layout: 'headerLineOnly',
          margin: [0, 20],
          table: {
            headerRows: 1,
            widths: [50, '*', 'auto', 'auto', 'auto'],
            body: [
              ['ID', 'Descripción', 'Cantidad', 'Precio', 'Total'],
  
              ...order_details.map((detail) => [
                detail.order_detail_id.toString(),
                detail.products.product_name,
                detail.quantity.toString(),
                {
                  text: CurrencyFormatter.formatCurrency(+detail.products.price),
                  alignment: 'right',
                },
                {
                  text: CurrencyFormatter.formatCurrency(
                    +detail.products.price * detail.quantity,
                  ),
                  alignment: 'right',
                },
              ]),
            ],
          },
        },
  
        // Salto de línea
        '\n',
  
        // Totales
        {
          columns: [
            {
              width: '*',
              text: '',
            },
            {
              width: 'auto',
              layout: 'noBorders',
              table: {
                body: [
                  [
                    'Subtotal',
                    {
                      text: CurrencyFormatter.formatCurrency(subTotal),
                      alignment: 'right',
                    },
                  ],
                  [
                    { text: 'Total', bold: true },
                    {
                      text: CurrencyFormatter.formatCurrency(total),
                      alignment: 'right',
                      bold: true,
                    },
                  ],
                ],
              },
            },
          ],
        },
      ],
    };
  };