import { Button, Table, TableProps } from "antd";
import { useGetTransactions } from "../hooks/transactions";
import { Transaction } from "../types/Transaction";

export default function TransactionPage() {
  const { data } = useGetTransactions();
  const columns: TableProps<Transaction>["columns"] = [
    {
      title: "Nama sampah",
      dataIndex: "trash_id",
    },
    {
      title: "Member",
      dataIndex: "member_id",
    },
    {
      title: "Berat",
      dataIndex: "weight",
    },
    {
      title: "Harga per unit",
      dataIndex: "price_per_unit",
    },
    {
      title: "Total",
      dataIndex: "total_price",
    },
    {
      title: "Aksi",
      render: () => <Button type="primary">Hapus</Button>,
    },
  ];
  return (
    <Table dataSource={data?.data} columns={columns} className="w-[90%]" />
  );
}
