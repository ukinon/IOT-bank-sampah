import { useRecoilState } from "recoil";
import { formValue } from "../../../atoms/formValue";
import { useEffect, useState } from "react";
import mqtt, { MqttClient, IClientOptions } from "mqtt";
import { useGetTrash } from "../../../hooks/trashes";
import { formatToIDR } from "../../../lib/formatToIDR";

interface Subscription {
  topic: string;
  qos: 0 | 1 | 2;
}

export default function Step2() {
  const [currentValue, setCurrentValue] = useRecoilState(formValue);
  const [client, setClient] = useState<MqttClient | null>(null);
  const [connectStatus, setConnectStatus] = useState("Connect");
  const { data } = useGetTrash(currentValue.trash_id);

  const mqttConnect = (host: string, mqttOption: IClientOptions) => {
    setConnectStatus("Connecting");
    const mqttClient = mqtt.connect(host, mqttOption);
    setClient(mqttClient);
  };

  useEffect(() => {
    const host = "wss://ae1e003b.ala.asia-southeast1.emqxsl.com:8084/mqtt";
    const options: IClientOptions = {
      clientId: "emqx_desktop_" + Math.random().toString(16).substring(2, 8),
      username: "emqx-desktop",
      password: "emqx_public",
    };

    mqttConnect(host, options);
  }, []);

  useEffect(() => {
    if (client) {
      client.on("connect", () => {
        setConnectStatus("Connected");
        console.log("Connection successful");
        mqttSub({ topic: "emqx/esp32", qos: 0 });
      });

      client.on("error", (err: Error) => {
        console.error("Connection error: ", err);
        client.end();
      });

      client.on("reconnect", () => {
        setConnectStatus("Reconnecting");
        console.log("Reconnecting...");
      });

      client.on("message", (topic: string, message: Buffer) => {
        console.log(topic);
        setCurrentValue({
          ...currentValue,
          weight: JSON.parse(message.toString()).weight,
        });
      });

      client.on("close", () => {
        setConnectStatus("Connect");
        console.log("Connection closed");
      });

      client.on("offline", () => {
        setConnectStatus("Offline");
        console.log("Client offline");
      });

      return () => {
        client.end();
      };
    }
  }, [client]);

  const mqttSub = (subscription: Subscription) => {
    if (client) {
      const { topic, qos } = subscription;
      client.subscribe(topic, { qos }, (error) => {
        if (error) {
          console.log("Subscribe to topics error", error);
          return;
        }
        console.log(`Subscribe to topics: ${topic}`);
      });
    }
  };

  return (
    <div className="relative flex flex-col items-start justify-center w-full h-full gap-8">
      {connectStatus == "Connecting" && (
        <div className="relative flex items-center self-center justify-center w-full h-full bg-white">
          <div className="flex items-center justify-center space-x-2 bg-white ">
            <span className="sr-only">Loading...</span>
            <div className="h-5 w-5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-5 w-5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-5 h-5 rounded-full bg-primary animate-bounce"></div>
          </div>
        </div>
      )}
      {connectStatus == "Connected" && (
        <>
          <h1 className="self-center ml-12 text-5xl 2xl:mt-24 justify-self-center md:text-9xl text-primary">
            {currentValue.weight || 0}{" "}
            <span className="text-base font-semibold text-black md:text-xl">
              Kg
            </span>
          </h1>
          <h1 className="self-center text-xl font-semibold 2xl:mt-24 md:text-2xl">
            Value <span className="font-bold text-primary">Sampah</span>
            <span className="font-bold">Mu</span>:{" "}
            <span className="text-primary">
              {formatToIDR(currentValue.weight * data?.data.price)}
            </span>
          </h1>
        </>
      )}
    </div>
  );
}
