"use client";
import HeaderNav from "@/components/headerNav";
import ScrollBar from "@/components/scrollBar";
import ScrollFood from "@/components/scrollFood";
import {
  ClockCircleOutlined,
  ClockCircleTwoTone,
  DollarOutlined,
  DollarTwoTone,
  DoubleRightOutlined,
  LikeFilled,
  PlusOutlined,
  SearchOutlined,
  StarFilled,
  StarOutlined,
} from "@ant-design/icons";
import { Input } from "antd";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface RestaurantDetail {
  restaurant_id: string;
  restaurant_name: string;
  restaurant_address: string;
  open_time: string;
  close_time: string;
  min_price: string;
  max_price: string;
}

interface RestaurantMenu {
  restaurant_id: string;
  course_name: string;
}

interface RestaurantFood {
  restaurant_id: string;
  food_name: string;
  ingredient: string;
  price: number;
  img: string;
}

export default function Home() {
  const [isActive, setIsActive] = useState(false);

  const handleMouseDown = () => {
    setIsActive(true);
  };

  const handleMouseUp = () => {
    setIsActive(false);
  };

  const searchParams = useSearchParams();
  const restaurant_id = searchParams ? searchParams.get("restaurant_id") : null;

  const [restaurantData, setRestaurantData] = useState<RestaurantDetail | null>(
    null
  );
  const [restaurantMenu, setRestaurantMenu] = useState<RestaurantMenu[] | null>(
    null
  );
  const [restaurantFood, setRestaurantFood] = useState<RestaurantFood[] | null>(
    null
  );

  useEffect(() => {
    const fetchFoodDetail = async () => {
      if (restaurant_id) {
        try {
          // Fetch restaurant details
          const restaurantResponse = await fetch(
            `http://localhost:8080/restaurant/get-restaurant-by-id/${restaurant_id}`
          );
          const restaurantData: RestaurantDetail =
            await restaurantResponse.json();
          setRestaurantData(restaurantData);

          // Fetch restaurant menu
          const menuResponse = await fetch(
            `http://localhost:8080/restaurant-menu/get-restaurant-menu-by-restaurant-id/${restaurant_id}`
          );
          const menuData: RestaurantMenu[] = await menuResponse.json();
          setRestaurantMenu(menuData);

          const restaurantFoodResponse = await fetch(
            `http://localhost:8080/restaurant-food/get-food-by-restaurant-id/${restaurant_id}`
          );
          const foodData: RestaurantFood[] =
            await restaurantFoodResponse.json();
          setRestaurantFood(foodData);
        } catch (error) {
          console.error("Failed to fetch data:", error);
        }
      }
    };

    fetchFoodDetail();
  }, [restaurant_id]);

  return (
    <>
      <div className="flex flex-col w-full h-auto">
        <div className="bg-white w-full h-80 flex">
          <div className="w-[45%] h-full py-4 px-10">
            <div className="w-full relative h-full">
              <Image
                layout="fill"
                objectFit="cover"
                src={"/food/ga1.jpg"}
                alt="Ga"
              ></Image>
            </div>
          </div>
          <div className=" w-[55%] h-full relative">
            <div className="absolute top-0 left-0 px-8 py-4">
              <span className="text-[13px] text-[#187CAA]">
                <a href="">Home</a>{" "}
                <DoubleRightOutlined className="text-[10px]" />{" "}
                <a href="">{restaurantData?.restaurant_name}</a>{" "}
              </span>
              <div className="flex flex-row text-[11px] justify-start items-center mt-3">
                <div className="bg-beamin text-white p-1 mr-2 cursor-pointer tracking-wider flex gap-1">
                  <LikeFilled />
                  <span>Yêu thích</span>
                </div>
                <span className="text-[#959595]">
                  QUÁN ĂN -{" "}
                  <a href="" className="text-[#0288D1]">
                    Chi nhánh
                  </a>
                </span>
              </div>
              <div className="text-[22px] font-bold mt-2">
                {restaurantData?.restaurant_name}
              </div>
              <div className="text-[13px] mt-1">
                {restaurantData?.restaurant_address}
              </div>
              <div className="flex flex-row text-[14px] gap-2 justify-start items-center">
                <ol className="flex flex-row text-[#FFC107] gap-1">
                  <li>
                    <StarFilled />
                  </li>
                  <li>
                    <StarFilled />
                  </li>
                  <li>
                    <StarFilled />
                  </li>
                  <li>
                    <StarFilled />
                  </li>
                  <li>
                    <StarOutlined />
                  </li>
                </ol>
                <p className="bg-[#FFC107] py-[2px] px-1 text-white rounded-md">
                  999+
                </p>
                <span>đánh giá trên Baemin</span>
              </div>
              <div className="flex flex-row gap-4 justify-start items-center my-1 text-[15px]">
                <div className="flex flex-row gap-1 text-[#6CC942] justify-start items-center">
                  <div className="w-2 h-2 bg-[#6CC942] rounded-full"></div>
                  <span>Mở cửa</span>
                </div>
                <div className="flex flex-row gap-1 justify-start items-center">
                  <ClockCircleTwoTone twoToneColor={"#3AC5C9"} />
                  <span>
                    {restaurantData?.open_time} - {restaurantData?.close_time}
                  </span>
                </div>
              </div>
              <div className="flex flex-row gap-1 justify-start items-center text-[#959595] text-[15px]">
                <DollarTwoTone
                  twoToneColor={"#c0c0c0"}
                  className="text-[16px]"
                />
                <span>
                  {" "}
                  {restaurantData?.min_price} - {restaurantData?.max_price}
                </span>
              </div>
            </div>

            <div className="w-full flex flex-col absolute bottom-0 left-0 px-8 mb-4 text-[#959595] text-[13px]">
              <div className="border-t-[1px]"></div>
              <div className="flex flex-row gap-4 justify-start items-center py-[10px]">
                <div className="flex flex-col ">
                  <span>PHÍ DỊCH VỤ</span>
                  <span className="text-beamin font-bold text-[14px]">
                    0.8% Phí dịch vụ
                  </span>
                </div>
                <div className="border-l border-solid h-6"></div>
                <div className="flex flex-col">
                  <span>DỊCH VỤ BỞI</span>
                  <span className="text-beamin font-bold text-[14px]">
                    Baemin
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="py-[13px] px-[26px] font-bold text-beamin text-[14px]">
            THỰC ĐƠN
          </div>
          <div className="w-full flex flex-row gap-3">
            <div className="w-[20%] bg-white p-5">
              <ul>
                <li
                  className={`cursor-pointer w-fit px-1 ${
                    isActive ? "" : "bg-[#959595] text-white"
                  }`}
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                >
                  Menu
                </li>
                {restaurantMenu?.map((menuItem) => (
                  <li className="mt-2 px-1 w-fit" key={menuItem.restaurant_id}>
                    {menuItem.course_name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-[50%] h-auto bg-white py-3 flex flex-col px-4">
              <div className="w-full mb-5">
                <Input addonBefore={<SearchOutlined />} placeholder="" />
              </div>
              <div className="flex flex-col w-full pl-1 gap-3">
                <div className="font-medium">MÓN ĐANG GIẢM</div>
                <div className="flex flex-col w-full gap-43 border-b">
                  {restaurantFood?.map((foodItem) => (
                    <div
                      className="flex flex-row "
                      key={foodItem.restaurant_id}
                    >
                      <div className="w-[15%] relative h-16">
                        <Image
                          layout="fill"
                          objectFit="cover"
                          src={foodItem?.img}
                          alt={foodItem?.food_name}
                        ></Image>                        
                      </div>
                      <div className="w-[60%] flex flex-col gap-1 px-2">
                        <span className="font-bold text-[#464646] ">
                          {foodItem?.food_name}{" "}
                        </span>
                        <span className="text-wrap text-sm text-[#464646] ">
                          {foodItem?.ingredient}{" "}
                        </span>
                      </div>
                      <div className="w-[15%] flex justify-center items-center">
                        <span className="text-[#0288d1] font-bold text-base">
                          {foodItem?.price}{" "}
                        </span>
                      </div>
                      <div className="w-[10%] flex justify-center items-center">
                        <div className="h-6 w-6 rounded-md flex justify-center items-center bg-beamin text-white font-bold cursor-pointer hover:brightness-110 ">
                          <PlusOutlined />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-[30%] bg-white"></div>
          </div>
        </div>
      </div>
    </>
  );
}
