import { FormEvent, useState, ChangeEvent } from "react";
import { TextInput } from "..";
import Image from "next/image";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

type ItemFormData = {
  name: string;
  location: string;
  description: string;
  images: string[];
};

type Props = {
  closeModal: () => void;
};

const AddItemForm = (props: Props) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const queryClient = useQueryClient();

  const handleImagesOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    const fileReader = new FileReader();

    fileReader.onload = () => {
      const image = fileReader.result as string;

      setImages((prev) => [...prev, image]);
    };

    if (files) {
      for (let i = 0; i < files?.length; i++) {
        fileReader.readAsDataURL(files[i]);
      }
    }
  };

  const addFoodRequest = async (data: ItemFormData) => {
    const res = await axios.post("/api/item", data);
    return res.data;
  };

  let errorResponse: any;

  const { mutateAsync, isLoading, isError, error } = useMutation(
    addFoodRequest,

    {
      onSuccess: () => {
        queryClient.refetchQueries("shared-foods");

        props.closeModal();
      },
    }
  );

  if (error) errorResponse = error;

  const addItem = async (e: FormEvent) => {
    e.preventDefault();

    if (!name || !description || !location || !images) {
      alert("All fields are required.");
    } else {
      await mutateAsync({ name, location, description, images });
    }
  };

  return (
    <div className="w-[500px] flex flex-col gap-8">
      <h1 className="text-secondary text-xl font-bold">Add Food Item</h1>

      <form className="flex flex-col gap-4 w-[500px] ">
        <TextInput
          label="Item(s) name"
          type="text"
          id="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

        <TextInput
          label="Location for pickup"
          type="text"
          id="location"
          onChange={(e) => setLocation(e.target.value)}
          value={location}
        />

        <span className="flex flex-col gap-2">
          <label htmlFor="itemDescription">
            A brief description of the item (type of food, quantity, etc).
          </label>

          <textarea
            rows={10}
            name="description"
            id="description"
            value={description}
            className=" text-base w-full border-secondary border-[1px] px-4 py-3 text-black"
            onChange={(e) => setDescription(e.target.value)}
          />
        </span>

        <span className="flex flex-col gap-2">
          <label>Share some images</label>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImagesOnchange}
          />
        </span>

        {images && (
          <div className="flex flex-wrap gap-2">
            {images.map((image, index) => {
              return (
                <div key={index} className="relative h-[120px] w-[120px] ">
                  <Image src={image} alt="food image" fill quality={100} />
                </div>
              );
            })}
          </div>
        )}

        <button
          className="text-white bg-secondary h-12 mt-12"
          onClick={addItem}
        >
          {isLoading ? "Posting..." : "Add"}
        </button>
      </form>

      {isError && (
        <p className="text-sm font-semibold text-red-900 self-center">
          {errorResponse?.response?.data?.message}
        </p>
      )}
    </div>
  );
};

export default AddItemForm;
