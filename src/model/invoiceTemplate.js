export default function getHtmlTemplate(pevOrder) {
  const html = `<html>
  <head>
    <style>
      @font-face{
        font-family: IranYekan;
        src: url('../../assets/fonts/IRANYekanRegular.ttf');
      }
      table {
        font-family: 'IranYekan';
        border-collapse: collapse;
        width: 100%;
        //color:gray;
      }    
      th {
        border-bottom: 1px solid #D4D4DA;
        background-color: #dddddd;
        text-align: right;
        padding: 12px;
      }
       td,tr {
       
        border-bottom: 1px solid #D4D4DA;
        background-color: #ffffff;
        text-align: right;
        padding: 12px;
      } 
    </style>
  </head>
  <body style="text-align: right; margin: 80; margin-top:100; font-family: IranYekan;">
    <h2>پیش‌فاکتور شماره ${pevOrder.id}</h2>
    <p>سفارش دهنده : ${pevOrder.customer.full_name}</p>
    <p>تاریخ ثبت :${pevOrder.registration_date}</p>
    <p>تاریخ تحویل :${pevOrder.delivery_date}</p>
    <p>شیوه ارسال :${pevOrder.payment_type}</p>
    <table>
      <tr>
        <th>بهای کل</th>
        <th>فی</th>
        <th>تعداد</th>
        <th>سفارش</th>
      </tr>
      ${getItems(pevOrder.order_items)}
      <tr>
        <th>${pevOrder.prepaid}</th>
        <th>پیش پرداخت</th>
        <th></th>
        <th></th>
      </tr>
      <tr>
        <th>${getSumOfPrice(pevOrder.order_items, pevOrder.prepaid)}</th>
        <th>مجموع</th>
        <th></th>
        <th></th>
      </tr>
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
  return htmleItems;
}

function getSumOfPrice(items,prepaid) {
  let total=0;
  items.map(
    (item) => {
      total += item.total_price;
      return total;
    }
  );
  return (total-prepaid);
}

