import { Pagination, Table, TableProps } from "antd";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetMembers } from "../hooks/members";
import { Member } from "../types/Member";

export default function PriceList() {
  const [currentQueryParameters, setSearchParams] = useSearchParams();
  const newQueryParameters: URLSearchParams = new URLSearchParams(
    currentQueryParameters.toString()
  );
  const { data, isLoading } = useGetMembers(
    currentQueryParameters.get("page") as string
  );
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

  const columns: TableProps<Member>["columns"] = [
    {
      title: "Nama",
      render: (_, record) => <p>{record.name}</p>,
    },
    {
      title: "Alamat",
      render: (_, record) => <p>{record.address}</p>,
    },
  ];
  return (
    <div className="flex flex-col items-center w-full h-full gap-12">
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
