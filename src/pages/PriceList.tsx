import {
  Button,
  Form,
  Input,
  InputNumber,
  Pagination,
  Popconfirm,
  Table,
  Typography,
  message,
} from "antd";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetTrashes } from "../hooks/trashes";
import { Trash } from "../types/Trash";
import { axiosInstance } from "../lib/axios";
import { queryClient } from "../main";
import { formatToIDR } from "../lib/formatToIDR";
import { QuestionCircleOutlined } from "@ant-design/icons";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: string;
  inputType: "number" | "text";
  record: Trash;
  index: number;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  editing,
  dataIndex,
  title,
  inputType,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

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

export default function PriceList() {
  const [currentQueryParameters, setSearchParams] = useSearchParams();
  const newQueryParameters: URLSearchParams = new URLSearchParams(
    currentQueryParameters.toString()
  );
  const { data, isLoading } = useGetTrashes(
    currentQueryParameters.get("page") as string
  );
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState(0);

  const isEditing = (record: Trash) => record.id === editingKey;

  const handleSave = async (id: number) => {
    (await form.validateFields()) as Trash;
    const val = form.getFieldsValue();
    console.log(val);
    const response = await axiosInstance.put(`/trashes/${id}`, val);
    if (response.status === 200) {
      setEditingKey(0);
      message.success("Berhasil ubah data");
    } else {
      message.error("Gagal ubah data");
    }
    queryClient.invalidateQueries({ queryKey: ["trashes"] });
  };
  const handleDelete = async (record: Trash) => {
    const response = await axiosInstance.delete(`/trashes/${record.id}`);
    if (response.status === 200) {
      message.success("Berhasil hapus data");
    } else {
      message.error("Gagal hapus data");
    }
    queryClient.invalidateQueries({ queryKey: ["trashes"] });
  };

  const cancel = () => {
    setEditingKey(0);
  };
  const edit = (record: Trash) => {
    form.setFieldsValue({ ...record });
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
      title: "Nama Sampah",
      dataIndex: "name",
      editable: true,
      width: "30%",
      render: (_: unknown, record: Trash) => <p>{record.name}</p>,
    },
    {
      title: "Kode Sampah",
      dataIndex: "code",
      width: "30%",
      editable: true,
      render: (_: unknown, record: Trash) => <p>{record.code}</p>,
    },
    {
      title: "Unit Sampah",
      dataIndex: "unit",
      width: "30%",
      editable: true,
      render: (_: unknown, record: Trash) => <p>{record.unit}</p>,
    },
    {
      title: "Harga",
      dataIndex: "price",
      width: "30%",
      editable: true,
      render: (_: unknown, record: Trash) => (
        <p className="w-full">{formatToIDR(record.price)}</p>
      ),
    },
    {
      title: "Aksi",
      dataIndex: "operation",
      width: "50%",
      render: (_: unknown, record: Trash) => {
        const editable = isEditing(record);
        return editable ? (
          <span className="flex flex-row gap-5">
            <Popconfirm
              title="Batal ubah"
              description="Apakah anda yakin?"
              onConfirm={() => cancel()}
              okText="Ya"
              cancelText="Tidak"
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            >
              <Button danger type="primary">
                Batal
              </Button>
            </Popconfirm>
            <Typography.Link onClick={() => handleSave(record.id)}>
              <Button type="primary">Simpan</Button>
            </Typography.Link>
          </span>
        ) : (
          <span className="flex flex-row gap-5">
            <Popconfirm
              title="Hapus Sampah"
              description="Apakah anda yakin?"
              onConfirm={() => handleDelete(record)}
              okText="Ya"
              cancelText="Tidak"
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
      onCell: (record: Trash) => ({
        record,
        inputType: col.dataIndex === "price" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div className="flex flex-col items-center w-full h-full gap-12">
      <h1 className="text-xl font-semibold md:text-3xl text-primary">
        List Harga Sampah
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
