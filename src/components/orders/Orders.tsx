import React from 'react';
import { Link } from 'react-router-dom';
import { IOrder } from '../../api/types';

import './Orders.scss';

export default function OrdersPage({ items }:{ items: IOrder[] }) {
  const orderList = items.map((order: any) => (
    // finna góða leið til þess að linka á pöntun
    <tr className="orders__row"key={order.id}>
        <td className="orders__th">
          <Link className="orders__link" to={`/orders/${order.id}`}>
            {`Pöntun #${order.id}`}
          </Link>
        </td>
        <td>{order.name}</td>
        <td>{order.address}</td>
        <td>{order.created}</td>
    </tr>
  ));


  return (
    <div className="order_container">
      <h1 className="order_heading">Þínar pantanir</h1>
      <table className="orders">
        <thead className="orders__head">
          <tr>
            <th className="orders__th">Pöntun</th>
            <th>Nafn</th>
            <th>Heimilisfang</th>
            <th>Búin til</th>
          </tr>
        </thead>
        <tbody>
          { orderList }
        </tbody>
      </table>
    </div>
  );
}
