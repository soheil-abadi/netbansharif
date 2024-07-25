import { useDispatch, useSelector } from "react-redux";
import earth from "../../img/Earth Planet.png";
import arrow from "../../img/Down Left Arrow.png";
import { Bar } from "react-chartjs-2";
import globe from "../../img/Globe.png";
import upload from "../../img/Upload to Cloud.png";
import thunder from "../../img/confilict.png";
import virus from "../../img/Bug.png";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);
import "./landingPage.css";
import {
  fetchedashboard,
  selectDashboardList,
  selectLoading,
  setDashboardList,
} from "../../Slice/LandingPageSlice";
import { useEffect, useState } from "react";
import { Button, ConfigProvider, Empty, Spin, Table } from "antd";

const Landingpage = () => {
  // handling select of redux
  const PageData = useSelector(selectDashboardList);
  const dispatch = useDispatch();
  // handeling domestic states

  const [cloud, setCloud] = useState({});
  const [domain, setDomain] = useState({});
  const [ip, setIp] = useState({});
  const [filteredData, setFilteredData] = useState([]);

  const loading = useSelector(selectLoading);

  // api fetch and placing of states
  useEffect(() => {
    dispatch(fetchedashboard());
  }, [dispatch]);
  useEffect(() => {
    if (PageData && PageData.cloud && PageData.ip && PageData.domain) {
      setDomain(PageData.domain);
      setIp(PageData.ip);
      setCloud(PageData.cloud);
      setFilteredData(PageData.assets);
    } else {
      dispatch(fetchedashboard());
    }
  }, [PageData]);

  // ==================chart

  const dataLive = {
    labels: ["", "", "", "", "", ""],
    datasets: [
      {
        data: domain.live,
        backgroundColor: "#458ED2",
        borderRadius: 20,
      },
    ],
  };
  const dataM = {
    labels: ["", "", "", "", "", ""],
    datasets: [
      {
        data: domain.monitored,
        backgroundColor: "#458ED2",
        borderRadius: 20,
      },
    ],
  };
  const dataLiveIP = {
    labels: ["", "", "", "", "", ""],
    datasets: [
      {
        data: ip.live,
        backgroundColor: "#458ED2",
        borderRadius: 20,
      },
    ],
  };
  const dataMIP = {
    labels: ["", "", "", "", "", ""],
    datasets: [
      {
        data: ip.monitored,
        backgroundColor: "#458ED2",
        borderRadius: 20,
      },
    ],
  };
  const dataLiveCloud = {
    labels: ["", "", "", "", "", ""],
    datasets: [
      {
        data: cloud.live,
        backgroundColor: "#458ED2",
        borderRadius: 20,
      },
    ],
  };
  const dataMCloud = {
    labels: ["", "", "", "", "", ""],
    datasets: [
      {
        data: cloud.monitored,
        backgroundColor: "#458ED2",
        borderRadius: 20,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  // -----------------------ant d column

  const columns = [
    {
      title: "Grade",
      dataIndex: "grade",
      key: "grade",
      width: 100,

      render: (text) => (
        <>
          <div className="flex justify-center items-center">
            <div className="hexagon text-center flex justify-center items-center">
              {text}
            </div>
          </div>
        </>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      width: 200,

      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Total Vulnerabilities",
      dataIndex: "total_vuls",
      width: 500,
      key: "total_vuls",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Last seen",
      dataIndex: "lastSeen",
      key: "lastSeen",
      width: 200,

      render: (text) => <p>{formatDate(text)}</p>,
    },
  ];
  // convertor of date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day}/${month}/${year} at ${hours}:${minutes}`;
  };
  // filter functions
  const filterDomain = () => {
    const filtered = PageData.assets.filter((item) =>
      item.name.includes(".com")
    );
    setFilteredData(filtered);
  };
  const filterIP = () => {
    const filtered = PageData.assets.filter(
      (item) => !item.name.includes("Cloud") && !item.name.includes(".com")
    );
    setFilteredData(filtered);
  };

  const filterCloud = () => {
    const filtered = PageData.assets.filter((item) =>
      item.name.includes("Cloud")
    );
    setFilteredData(filtered);
  };
  console.log(PageData);

  return (
    <>
      {!loading ? (
        <>
          <div className="justify-center items-center gap-10 text-white flex flex-wrap lg:flex-nowrap ">
            <div
              className="card w-full sm:h-[500px]  lg:w-1/3 rounded-3xl"
              onClick={() => filterDomain()}
            >
              <div className="rounded-lg flex justify-between items-start text-center p-5">
                <div className="card2">
                  <div>
                    <img
                      src={earth}
                      alt="earth"
                      className="bg-orange-500 w-full"
                    />
                  </div>
                  <div className="w-full">
                    <p className="bg-white w-full font-black text-black">
                      {ip.total}
                    </p>
                  </div>
                </div>
                <div className="rotate-180">
                  <img src={arrow} alt="arrow" className="w-[50px]" />
                </div>
              </div>
              <div className="mx-3">
                <h2 className="font-bold">Domain</h2>
                <hr />
              </div>
              <div className="flex justify-around items-center p-5">
                <div className="flex justify-center items-center gap-2">
                  <div>
                    <p className="font-black">live</p>
                    <p className="font-black">{domain.total_live}</p>
                  </div>
                  <div style={{ width: "100px" }}>
                    <Bar data={dataLive} options={options} />
                  </div>
                </div>
                <div className="flex justify-center items-center gap-2">
                  <div>
                    <p className="font-black">Monitored</p>
                    <p className="font-black">{domain.total_monitored}</p>
                  </div>
                  <div style={{ width: "100px" }}>
                    <Bar data={dataM} options={options} />
                  </div>
                </div>
              </div>
              <hr className="mx-3" />
              <div className="flex justify-around items-center gap-2 my-5 ">
                <div className="flex justify-center items-center gap-1">
                  <div className="w-20 bg-[#327694] p-3 rounded-lg">
                    <img src={globe} alt="" />
                  </div>
                  <div>
                    <p className="font-black">IPs</p>
                    <p className="font-black">{domain.ips}</p>
                  </div>
                </div>
                <div className="flex justify-center items-center gap-1">
                  <div className="w-20 bg-[#327694] p-3 rounded-lg">
                    <img src={thunder} alt="" />
                  </div>
                  <div>
                    <p className="font-black">Porsts</p>
                    <p className="font-black">{domain.ports}</p>
                  </div>
                </div>
                <div className="flex justify-center items-center gap-1">
                  <div className="w-20 bg-[#327694] p-3 rounded-lg">
                    <img src={virus} alt="" />
                  </div>
                  <div>
                    <p className="font-black">Vulns</p>
                    <p className="font-black">{domain.vulns}</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="card w-full lg:w-1/3 rounded-3xl"
              onClick={() => filterIP()}
            >
              <div className="rounded-lg flex justify-between items-start text-center p-5">
                <div className="card2">
                  <div>
                    <img
                      src={earth}
                      alt="earth"
                      className="bg-[#565392] w-full"
                    />
                  </div>
                  <div className="w-full">
                    <p className="bg-white w-full font-black text-black">
                      {domain.total}
                    </p>
                  </div>
                </div>
                <div className="rotate-180">
                  <img src={arrow} alt="arrow" className="w-[50px]" />
                </div>
              </div>
              <div className="mx-3">
                <h2 className="font-bold">IP Addresses</h2>
                <hr />
              </div>
              <div className="flex justify-around items-center p-5">
                <div className="flex justify-center items-center gap-2">
                  <div>
                    <p className="font-black">live</p>
                    <p className="font-black">{ip.total_live}</p>
                  </div>
                  <div style={{ width: "100px" }}>
                    <Bar data={dataLiveIP} options={options} />
                  </div>
                </div>
                <div className="flex justify-center items-center gap-2">
                  <div>
                    <p className="font-black">Monitored</p>
                    <p className="font-black">{ip.total_monitored}</p>
                  </div>
                  <div style={{ width: "100px" }}>
                    <Bar data={dataMIP} options={options} />
                  </div>
                </div>
              </div>
              <hr className="mx-3" />
              <div className="flex justify-around items-center gap-2 my-5">
                <div className="flex justify-center items-center gap-1">
                  <div className="w-20 bg-[#327694] p-3 rounded-lg">
                    <img src={globe} alt="" />
                  </div>
                  <div>
                    <p className="font-black">IPs</p>
                    <p className="font-black">{ip.ips}</p>
                  </div>
                </div>
                <div className="flex justify-center items-center gap-1">
                  <div className="w-20 bg-[#327694] p-3 rounded-lg">
                    <img src={thunder} alt="" />
                  </div>
                  <div>
                    <p className="font-black">Ports</p>
                    <p className="font-black">{ip.ports}</p>
                  </div>
                </div>
                <div className="flex justify-center items-center gap-1">
                  <div className="w-20 bg-[#327694] p-3 rounded-lg">
                    <img src={virus} alt="" />
                  </div>
                  <div>
                    <p className="font-black">Vulns</p>
                    <p className="font-black">{ip.vulns}</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="card w-full lg:w-1/3 rounded-3xl"
              onClick={() => filterCloud()}
            >
              <div className="rounded-lg flex justify-between items-start text-center p-5">
                <div className="card2">
                  <div>
                    <img
                      src={upload}
                      alt="earth"
                      className="bg-[#D1B003] w-full"
                    />
                  </div>
                  <div className="w-full">
                    <p className="bg-white w-full font-black text-black">
                      {cloud.total}
                    </p>
                  </div>
                </div>
                <div className="rotate-180">
                  <img src={arrow} alt="arrow" className="w-[50px]" />
                </div>
              </div>
              <div className="mx-3">
                <h2 className="font-bold">Cloud Accounts</h2>
                <hr />
              </div>
              <div className="flex justify-around items-center p-5">
                <div className="flex justify-center items-center gap-2">
                  <div>
                    <p className="font-black">live</p>
                    <p className="font-black">{cloud.total_live}</p>
                  </div>
                  <div style={{ width: "100px" }}>
                    <Bar data={dataLiveCloud} options={options} />
                  </div>
                </div>
                <div className="flex justify-center items-center gap-2">
                  <div>
                    <p className="font-black">Monitored</p>
                    <p className="font-black">{cloud.total_monitored}</p>
                  </div>
                  <div style={{ width: "100px" }}>
                    <Bar data={dataMCloud} options={options} />
                  </div>
                </div>
              </div>
              <hr className="mx-3" />
              <div className="flex justify-around items-center gap-2 my-5">
                <div className="flex justify-center items-center gap-1">
                  <div className="w-20 bg-[#327694] p-3 rounded-lg">
                    <img src={globe} alt="" />
                  </div>
                  <div>
                    <p className="font-black">IPs</p>
                    <p className="font-black">{cloud.ips}</p>
                  </div>
                </div>
                <div className="flex justify-center items-center gap-1">
                  <div className="w-20 bg-[#327694] p-3 rounded-lg">
                    <img src={thunder} alt="" />
                  </div>
                  <div>
                    <p className="font-black">Ports</p>
                    <p className="font-black">{cloud.ports}</p>
                  </div>
                </div>
                <div className="flex justify-center items-center gap-1">
                  <div className="w-20 bg-[#327694] p-3 rounded-lg">
                    <img src={virus} alt="" />
                  </div>
                  <div>
                    <p className="font-black">Vulns</p>
                    <p className="font-black">{cloud.vulns}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#1D1E2C] my-24 p-10 rounded-lg">
            <div className="py-6 px-2">
              <h2 className="text-white font-black text-2xl	 ">Assets</h2>
            </div>
            <div className="flex justify-center items-center  my-5">
              <Button
                onClick={() => setFilteredData(PageData.assets)}
                type="primary"
              >
                show all
              </Button>
            </div>
            <ConfigProvider
              theme={{
                token: {
                  lineWidth: 10,
                  colorBgContainer: "transparent",
                  colorText: " darkgray",
                  colorTextHeading: "white",
                  colorTextPlaceholder: "black",
                },
                components: {
                  Table: {
                    rowExpandedBg: "gray",
                    colorBgContainer: "transparent",
                    borderColor: "#1D1E2C",
                    stickyScrollBarBorderRadius: 100,

                    colorText: "white",
                    headerBg: "#424c58",
                  },
                },
              }}
            >
              <Table
                id="pdf-table"
                locale={{
                  emptyText: (
                    <Empty
                      description={
                        <span className="text-white">اطلاعات موجود نيست</span>
                      }
                    />
                  ),
                }}
                columns={columns}
                bordered={false}
                dataSource={filteredData}
                pagination={false}
                scroll={{ x: "max-content" }}
                size="middle"
              />
            </ConfigProvider>
          </div>
        </>
      ) : (
        <>
          <div className="h-dvh flex justify-center items-center ">
            <Spin size="large" className="w-full" />
          </div>
        </>
      )}
    </>
  );
};

export default Landingpage;
