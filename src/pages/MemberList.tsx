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
import { useGetMembers } from "../hooks/members";
import { Member } from "../types/Member";
import { axiosInstance } from "../lib/axios";
import { queryClient } from "../main";
import { QuestionCircleOutlined } from "@ant-design/icons";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: string;
  addon?: string;
  inputType: "number" | "text";
  record: Member;
  index: number;
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  editing,
  dataIndex,
  title,
  inputType,
  children,
  addon,
  ...restProps
}) => {
  const inputNode =
    inputType === "number" ? <InputNumber addonBefore={addon} /> : <Input />;

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

export default function MemberList() {
  const [currentQueryParameters, setSearchParams] = useSearchParams();
  const newQueryParameters: URLSearchParams = new URLSearchParams(
    currentQueryParameters.toString()
  );
  const { data, isLoading } = useGetMembers(
    currentQueryParameters.get("page") as string
  );
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState(0);

  const isEditing = (record: Member) => record.id === editingKey;

  const handleSave = async (id: number) => {
    (await form.validateFields()) as Member;
    const val = form.getFieldsValue();
    const response = await axiosInstance.put(`/members/${id}`, val);
    if (response.status === 200) {
      setEditingKey(0);
      message.success("Berhasil ubah data");
    } else {
      message.error("Gagal ubah data");
    }
    queryClient.invalidateQueries({ queryKey: ["members"] });
  };
  const handleDelete = async (record: Member) => {
    const response = await axiosInstance.delete(`/members/${record.id}`);
    if (response.status === 200) {
      message.success("Berhasil hapus data");
    } else {
      message.error("Gagal hapus data");
    }
    queryClient.invalidateQueries({ queryKey: ["members"] });
  };

  const cancel = () => {
    setEditingKey(0);
  };
  const edit = (record: Member) => {
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
      title: "Nama",
      dataIndex: "name",
      editable: true,
      width: "30%",
      render: (_: unknown, record: Member) => <p>{record.name}</p>,
    },
    {
      title: "Alamat",
      dataIndex: "address",
      width: "30%",
      editable: true,
      render: (_: unknown, record: Member) => (
        <p>{record.address || "Belum ada alamat"}</p>
      ),
    },
    {
      title: "Aksi",
      dataIndex: "operation",
      width: "50%",
      render: (_: unknown, record: Member) => {
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
            <Typography.Link onClick={() => handleSave(record.id)}>
              <Button type="primary">Simpan</Button>
            </Typography.Link>
          </span>
        ) : (
          <span className="flex flex-row gap-5">
            <Popconfirm
              title="Hapus Member"
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
      onCell: (record: Member) => ({
        record,
        inputType: col.dataIndex === "price" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        addon: col.dataIndex === "price" ? "Rp" : "",
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div className="flex flex-col items-center w-screen h-full gap-12">
      <h1 className="text-xl font-semibold md:text-3xl text-primary">
        List Member
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
          <Form
            form={form}
            component={false}
            className="flex justify-center w-full"
          >
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
