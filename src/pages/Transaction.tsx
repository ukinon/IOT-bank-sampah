import { Button, Pagination, Popconfirm, Table, TableProps } from "antd";
import { useGetTransactions } from "../hooks/transactions";
import { Transaction } from "../types/Transaction";
import { axiosInstance } from "../lib/axios";
import { useQueryClient } from "@tanstack/react-query";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { formatToIDR } from "../lib/formatToIDR";

export default function TransactionPage() {
  const queryClient = useQueryClient();
  const [currentQueryParameters, setSearchParams] = useSearchParams();
  const newQueryParameters: URLSearchParams = new URLSearchParams(
    currentQueryParameters.toString()
  );
  const { data, isLoading } = useGetTransactions(
    currentQueryParameters.get("page") as string
  );

  const handleDelete = async (id: number) => {
    await axiosInstance.delete(`/transactions/${id}`);
    queryClient.invalidateQueries({ queryKey: ["transactions"] });
  };

  useEffect(() => {
    if (!currentQueryParameters.get("page")) {
      newQueryParameters.set("page", "1");
      setSearchParams(newQueryParameters);
    }
  }, []);

  function handlePageChange(val: string) {
    newQueryParameters.set("page", val);
    setSearchParams(newQueryParameters);
  }

  const columns: TableProps<Transaction>["columns"] = [
    {
      title: "Member",
      render: (_, record) => <p>{record.member.name}</p>,
    },
    {
      title: "Nama sampah",
      render: (_, record) => <p>{record.trash.name}</p>,
    },

    {
      title: "Berat",
      render: (_, record) => (
        <p>
          {record.weight} {record.trash.unit}
        </p>
      ),
    },
    {
      title: "Harga per unit",
      render: (_, record) => <p>{formatToIDR(record.price_per_unit)}</p>,
    },
    {
      title: "Total",
      render: (_, record) => <p>{formatToIDR(record.total_price)}</p>,
    },
    {
      title: "Aksi",
      render: (_, record) => (
        <Popconfirm
          title="Hapus Transaksi"
          description="Apakah anda yakin?"
          onConfirm={() => handleDelete(record.id)}
          okText="Ya"
          cancelText="Tidak"
          icon={<QuestionCircleOutlined style={{ color: "red" }} />}
        >
          <Button danger>Hapus</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="flex flex-col items-center w-full h-full gap-12">
      <h1 className="text-xl font-semibold md:text-3xl text-primary">
        Daftar Transaksi
      </h1>
      {isLoading && (
        <div className="relative flex items-center justify-center bg-white w-full h-[50dvh] self-center">
          <div className="flex items-center justify-center space-x-2 bg-white ">
            <span className="sr-only">Loading...</span>
            <div className="h-5 w-5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-5 w-5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-5 h-5 rounded-full bg-primary animate-bounce"></div>
          </div>
        </div>
      )}
      {data && (
        <>
          <Table
            dataSource={data?.data?.data}
            columns={columns}
            className="w-[90%] h-[50dvh] overflow-y-scroll"
            pagination={false}
          />

          <Pagination
            defaultCurrent={
              parseInt(currentQueryParameters.get("page") as string) || 1
            }
            total={data?.data.total}
            showSizeChanger={false}
            onChange={(current) => handlePageChange(`${current}`)}
          />
        </>
      )}
    </div>
  );
}
