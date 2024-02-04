"use client";

import { HiOutlinePlusCircle } from "react-icons/hi";
import { Modal, AddItemForm, FoodCard } from "@/components";
import { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";

const Donor = () => {
  const [openModal, setOpenModal] = useState(false);

  const getMySharedFoodsRequest = async () => {
    const res = await axios.get("/api/item/me");

    return res.data;
  };

  const {
    data: foods,
    isLoading,
    isError,
    error,
  } = useQuery("shared-foods", getMySharedFoodsRequest);

  console.log(isLoading, foods);

  return (
    <main className="grid lg:grid-cols-3 py-12 px-[7%]">
      <section className=" cols-span-1 w-4/5">
        <h1 className="text-xl font-bold">Your Shared Foods</h1>

        <div>
          {foods?.map((food: any) => {
            return <FoodCard food={food} />;
          })}
        </div>
      </section>

      <section className="cols-span-1 w-1/5"></section>

      <button
        onClick={() => setOpenModal(true)}
        className=" bg-secondary w-[220px] h-[90px] fixed bottom-10 right-10 flex flex-col items-center justify-center rounded-sm"
      >
        <HiOutlinePlusCircle size={50} color="#FFFF" />

        <p className="text-[12px] text-white">Add an item to share</p>
      </button>

      <>
        {openModal && (
          <Modal closeModal={() => setOpenModal(false)}>
            <AddItemForm closeModal={() => setOpenModal(false)} />
          </Modal>
        )}
      </>
    </main>
  );
};

export default Donor;
