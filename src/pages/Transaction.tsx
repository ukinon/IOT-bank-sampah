import {
  Button,
  Form,
  InputNumber,
  Pagination,
  Popconfirm,
  Select,
  Table,
  Typography,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetTransactions } from "../hooks/transactions";
import { Transaction } from "../types/Transaction";
import { axiosInstance } from "../lib/axios";
import { queryClient } from "../main";
import { formatToIDR } from "../lib/formatToIDR";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { AnyObject } from "antd/es/_util/type";
import { useGetTrashes } from "../hooks/trashes";
import { useGetMembers } from "../hooks/members";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: string;
  label: string;
  datas: AnyObject[];
  inputType: "number" | "text" | "select";
  record: Transaction;
  addonBefore?: string;
  addonAfter?: string;
  index: number;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  editing,
  dataIndex,
  title,
  inputType,
  children,
  datas,
  defaultValue,
  addonBefore,
  addonAfter,
  ...restProps
}) => {
  const { Option } = Select;
  const inputNode =
    inputType === "number" ? (
      <InputNumber addonBefore={addonBefore} addonAfter={addonAfter} />
    ) : (
      <Select
        showSearch
        placeholder="Pilih Jenis Sampah"
        className="w-full rounded-lg text-primary"
        defaultValue={defaultValue}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option?.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {datas?.map((data) => (
          <Option value={data.id} key={data.id}>
            {data.name}
          </Option>
        ))}
      </Select>
    );

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default function TransactionPage() {
  const [currentQueryParameters, setSearchParams] = useSearchParams();
  const newQueryParameters: URLSearchParams = new URLSearchParams(
    currentQueryParameters.toString()
  );
  const { data, isLoading } = useGetTransactions(
    currentQueryParameters.get("page") as string
  );
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState(0);
  const { data: trashes } = useGetTrashes("1&perPage=10000000");
  const { data: members } = useGetMembers("1&perPage=10000000");

  const isEditing = (record: Transaction) => record.id === editingKey;

  const handleSave = async (id: number) => {
    (await form.validateFields()) as Transaction;
    const val = form.getFieldsValue();
    const response = await axiosInstance.put(`/transactions/${id}`, val);
    if (response.status === 200) {
      setEditingKey(0);
      message.success("Berhasil ubah data");
    } else {
      message.error("Gagal ubah data");
    }
    queryClient.invalidateQueries({ queryKey: ["transactions"] });
  };
  const handleDelete = async (record: Transaction) => {
    const response = await axiosInstance.delete(`/transactions/${record.id}`);
    if (response.status === 200) {
      setEditingKey(0);
      message.success("Berhasil hapus data");
    } else {
      message.error("Gagal hapus data");
    }
    queryClient.invalidateQueries({ queryKey: ["transactions"] });
  };
  const cancel = () => {
    setEditingKey(0);
  };
  const edit = (record: Transaction) => {
    form.setFieldsValue({
      ...record,
      trash_id: record.trash?.id,
      member_id: record.member?.id,
    });
    setEditingKey(record.id as number);
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

  const defaultColumns = [
    {
      title: "Member",
      dataIndex: "member_id",
      editable: true,
      width: "20%",
      render: (_: unknown, record: Transaction) => <p>{record.member?.name}</p>,
    },
    {
      title: "Sampah",
      dataIndex: "trash_id",
      width: "20%",
      editable: true,
      render: (_: unknown, record: Transaction) => <p>{record.trash?.name}</p>,
    },
    {
      title: "Berat / Jumlah",
      dataIndex: "weight",
      type: "number",
      width: "20%",
      editable: true,
      render: (_: unknown, record: Transaction) => (
        <p>
          {record.weight} {record.trash?.unit}
        </p>
      ),
    },
    {
      title: "Harga per Unit",
      dataIndex: "price_per_unit",
      width: "20%",
      type: "number",
      editable: true,
      render: (_: unknown, record: Transaction) => (
        <p className="w-full">{formatToIDR(record.price_per_unit as number)}</p>
      ),
    },
    {
      title: "Total Harga",
      dataIndex: "total_price",
      type: "number",
      width: "20%",
      editable: true,
      render: (_: unknown, record: Transaction) => (
        <p className="w-full">{formatToIDR(record.total_price as number)}</p>
      ),
    },
    {
      title: "Aksi",
      dataIndex: "operation",
      width: "50%",
      render: (_: unknown, record: Transaction) => {
        const editable = isEditing(record);
        return editable ? (
          <span className="flex flex-row gap-5">
            <Popconfirm
              title="Batal ubah"
              description="Apa kamu yakin?"
              onConfirm={() => cancel()}
              okText="Iya"
              cancelText="Enggak, deh"
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            >
              <Button danger type="primary">
                Batal
              </Button>
            </Popconfirm>
            <Typography.Link onClick={() => handleSave(record.id as number)}>
              <Button type="primary">Simpan</Button>
            </Typography.Link>
          </span>
        ) : (
          <span className="flex flex-row gap-5">
            <Popconfirm
              title="Hapus Sampah"
              description="Apa kamu yakin?"
              onConfirm={() => handleDelete(record)}
              okText="Iya"
              cancelText="Enggak, deh"
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            >
              <Button danger>Hapus</Button>
            </Popconfirm>

            <Button
              disabled={editingKey !== 0}
              onClick={() => edit(record)}
              type="primary"
              className="text-white"
            >
              Ubah
            </Button>
          </span>
        );
      },
    },
  ];

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Transaction) => ({
        record,
        inputType: col.type === "number" ? "number" : "select",
        dataIndex: col.dataIndex,
        title: col.title,
        addonBefore: col.dataIndex.includes("price") ? "Rp" : "",
        addonAfter: col.dataIndex === "weight" ? record.trash?.unit : "",
        editing: isEditing(record),
        datas:
          col.dataIndex === "trash_id" ? trashes.data.data : members.data.data,
        defaultValue:
          col.dataIndex === "member_id" ? record.trash?.id : record.member?.id,
      }),
    };
  });

  return (
    <div className="flex flex-col items-center w-screen h-full gap-12">
      <h1 className="text-xl font-semibold md:text-3xl text-primary">
        List Transaksi
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
          <Form form={form} component={false}>
            <Table
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              dataSource={data?.data.data}
              columns={columns}
              className="w-[85%] h-[55dvh] overflow-y-scroll overflow-x-scroll"
              bordered
              rowClassName="editable-row"
              pagination={false}
            />
          </Form>

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
