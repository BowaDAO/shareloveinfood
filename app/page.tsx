"use client";

import Image from "next/image";
import { Button, Modal, LoginForm, SignupForm } from "@/components";
import image from "../public/assets/food.jpg";
import { useState } from "react";

export default function Home() {
  const [openSigninModal, setOpenSigninModal] = useState(false);

  const [openSignupModal, setOpenSignupModal] = useState(false);

  const closeSigninModal = () => {
    setOpenSigninModal(false);
  };

  const closeSignupModal = () => {
    setOpenSignupModal(false);
  };

  return (
    <main className="grid lg:grid-cols-2 bg-secondary">
      <section className="px-16 py-12 flex items-center text-white">
        <div className="flex flex-col gap-6">
          <h1 className="text-5xl font-bold">#ShareFoodInLove</h1>

          <h2 className="text-sm leading-[24px] ">
            Welcome to our community, where we're all about spreading love
            through the magic of food sharing. We connect those with empty
            plates to those with surplus to spare, making every meal a gesture
            of kindness.
          </h2>

          <p className="text-sm italic ">
            Join us in creating a world where love is the main ingredient in
            every bite.
          </p>

          <div className="flex items-center gap-4">
            <Button
              label="Give Food"
              onClick={() => setOpenSigninModal(true)}
            />

            <Button
              label="Request Food"
              onClick={() => setOpenSigninModal(true)}
            />
          </div>
        </div>
      </section>

      <section className="block relative h-screen w-full">
        <Image
          src={image}
          alt="Food sharing community"
          fill
          quality={100}
          loading="eager"
          className="object-cover object-right"
          sizes="any"
        />
      </section>

      <>
        {openSigninModal && (
          <Modal closeModal={closeSigninModal}>
            <LoginForm
              closeSigninModal={closeSigninModal}
              openSignupModal={() => setOpenSignupModal(true)}
            />
          </Modal>
        )}

        {openSignupModal && (
          <Modal closeModal={closeSignupModal}>
            <SignupForm closeSignupModal={closeSignupModal} />
          </Modal>
        )}
      </>
    </main>
  );
}
