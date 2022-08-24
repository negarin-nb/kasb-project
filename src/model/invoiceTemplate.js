export default function getHtmlTemplate(pevOrder) {
  console.log(pevOrder);
  const html = `<html>
  <head>
    <style>
      @font-face{
        font-family: IranYekan;
        src: url(../../assets/fonts/IRANYekanRegular.ttf);
      }
      table {
        font-family: 'Iran Yekan', "IranYekan", IranYekan, "Iran Yekan";
        border-collapse: collapse;
        width: 100%;
        color:gray;
      }
      td,
      th {
        border: 1px solid #dddddd;
        text-align: right;
        padding: 10px;
      }
      tr:nth-child(even) {
        background-color: #dddddd;
      }
    </style>
  </head>
  <body style="text-align: center; margin: 20; font-family: IranYekan;">
    <table>
      <tr>
        <th>${pevOrder.customer.full_name}</th>
        <th>${pevOrder.delivery_date}</th>
        <th>${pevOrder.registration_date}</th>
        <th>${pevOrder.payment_type}</th>
      </tr>
         ${getItems(pevOrder.order_items)}
    </table>
  </body>
</html>`;
return html;
}
function getItems(items){
  const htmleItems = items.map((item) => (
         `<tr>
            <td>${item.total_price}</td>
            <td>${item.selling_price}</td>
            <td>${item.count}</td>
            <td>${item.name}</td>
          </tr>`)
  );
  console.log(htmleItems);
  return htmleItems;
}