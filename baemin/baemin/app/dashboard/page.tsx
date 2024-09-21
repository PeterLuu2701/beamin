"use client";

import HeaderNav from "@/components/headerNav";
import ScrollBar from "@/components/scrollBar";
import ScrollFood from "@/components/scrollFood";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useEffect, useState } from "react";

interface AppMenuItem {
  menu_type: string;
  imageSrc?: string;
  description?: string;
  id: string
}

interface FrontendItem {
  name: string;
  imageSrc: string;
  description: string;
  id: string
}

interface FoodCardData {
  id: string;
  food_name: string;
  restaurant_name: string;
  restaurant_address: string;
  img: string;
  app_menu_id: string,
  restaurant_id: string
}

interface FoodCardItem {
  id: string;
  name: string;
  address: string;
  img: string;
  kind: string;
  app_menu_id: string,
  restaurant_id: string
}

export default function Home() {
  const [items, setItems] = useState<FrontendItem[]>([]);
  const [todayFood, setTodayFood] = useState<FoodCardItem[]>([]);
  const [selectedMenuType, setSelectedMenuType] = useState<string | null>(null); 
  const router = useRouter()

  useEffect(() => {
    const fetchDataAppMenu = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/app-menu/get-all-app-menu"
        );
        const data: AppMenuItem[] = await response.json();

        console.log('menu type', data);
        

        const mappedItems = data.map((item: AppMenuItem) => ({
          name: item.menu_type,
          imageSrc: item.imageSrc || "/images/default.png",
          description: item.description || "Fast Food",
          id: item.id
        }));

        setItems(mappedItems);
      } catch (error) {
        console.error("Failed to fetch items:", error);
      }
    };

    const fetchDataTodayFood = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/food-card/get-all-food-card"
        );
        const data: FoodCardData[] = await response.json();

        console.log('food card', data);
        

        const mappedItems = data.map((item: FoodCardData) => ({
          id: item.id,
          name: item.food_name,
          kind: item.restaurant_name,
          address: item.restaurant_address,
          img: item.img,
          app_menu_id: item.app_menu_id,
          restaurant_id: item.restaurant_id
        }));

        setTodayFood(mappedItems);
      } catch (error) {
        console.error("Failed to fetch Today Food items:", error);
      }
    };

    fetchDataAppMenu();
    fetchDataTodayFood();
  }, []);

  const filteredFood = todayFood.filter((food) =>
    selectedMenuType ? food.app_menu_id === selectedMenuType : true
  );

  const banneritems = [
    {
      id: "1",
      name: "anh 1",
      url: "/images/map1.png",
    },
    {
      id: "2",
      name: "anh 2",
      url: "/images/map2.png",
    },
    {
      id: "3",
      name: "anh 32",
      url: "/images/map3.png",
    },
    {
      id: "3",
      name: "anh 32",
      url: "/images/map4.png",
    },
  ];

  const handleFoodCardClick = (id: string) => {
    router.push(`http://localhost:8080/resraurant/get-restaurant-by-id/${id}`); 
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3 pt-3 pl-8 pr-8 z-40">
          <div className="flex flex-col fixed bg-white w-64 rounded-2xl pl-3 pt-2 pb-5 gap-3">
            <span>Thực đơn</span>
            {items.map((item, index) => (
              <div
                key={index}
                className="flex flex-col gap-3 cursor-pointer hover:bg-slate-100"
                onClick={() => setSelectedMenuType(item.id)}
              >
                <div className="flex flex-row items-center gap-1">
                  <Image
                    src={item.imageSrc}
                    width={30}
                    height={30}
                    alt={item.description}
                  />
                  <span>{item.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-9 w-full pt-3 pr-8 gap-3 flex flex-col">
          <ScrollBar items={banneritems}></ScrollBar>
          <p>Today Food</p>
          <div className="grid grid-cols-5 gap-6">
            {filteredFood.map((item, index) => (
              <div
                key={index}
                onClick={() => router.push(`/detailfood/${item.restaurant_id}`)}
                className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <a href="#">
                  <img
                    className="rounded-t-lg"
                    src={item.img}
                    alt={item.name}
                  />
                </a>
                <div className="p-5">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {item.name}
                    </h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {item.address}
                  </p>
                  <p className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    {item.kind}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}