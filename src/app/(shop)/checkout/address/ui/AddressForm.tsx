"use client";

import React, { useEffect } from "react";
import styles from "./AddressForm.module.css";
import { useForm } from "react-hook-form";
import { UserAddress, Address, Country } from "@/interfaces";
import { useAddressStore } from "@/store";
import { deleteUserAddress, setUserAddress } from "@/actions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type FormInputs = {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  postalCode: string;
  city: string;
  country: string;
  phone: string;
  rememberAddress: boolean;
};

interface Props {
  countries: Country[]
  userStoreAddress?: Partial<Address>
  //userStoreAddress?: Partial<UserAddress>
}

export const AddressForm = ({countries, userStoreAddress = {}}: Props) => {
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { isValid },
    reset,
  } = useForm<FormInputs>({
    defaultValues: {
      ...(userStoreAddress as any),
      rememberAddress: false,
    },
  });

  const {data: session} = useSession({
    required: true
  })
  
  const setAddress = useAddressStore(state => state.setAddress)
  const address = useAddressStore(state => state.address)
  
  useEffect(()=>{
    if (address.firstName) {
      reset(address)
    }
  },[])
  
  const onSubmit = async(data: FormInputs) => {
    const {rememberAddress, ...restAddress} = data
    setAddress(restAddress)

    if (rememberAddress) {
      //TODO: Server action
      await setUserAddress(restAddress, session!.user.id)
    } else {
      //TODO: Server action
      await deleteUserAddress(session!.user.id)
    }

    router.push("/checkout")
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
      <div className={styles.inputContainer}>
        <span>Nombres</span>
        <input
          type="text"
          className={styles.formInput}
          {...register("firstName", { required: true })}
        />
      </div>

      <div className={styles.inputContainer}>
        <span>Apellidos</span>
        <input
          type="text"
          className={styles.formInput}
          {...register("lastName", { required: true })}
        />
      </div>

      <div className={styles.inputContainer}>
        <span>Dirección</span>
        <input
          type="text"
          className={styles.formInput}
          {...register("address", { required: true })}
        />
      </div>

      <div className={styles.inputContainer}>
        <span>Dirección 2 (opcional)</span>
        <input
          type="text"
          className={styles.formInput}
          {...register("address2")}
        />
      </div>

      <div className={styles.inputContainer}>
        <span>Código postal</span>
        <input
          type="text"
          className={styles.formInput}
          {...register("postalCode", { required: true })}
        />
      </div>

      <div className={styles.inputContainer}>
        <span>Ciudad</span>
        <input
          type="text"
          className={styles.formInput}
          {...register("city", { required: true })}
        />
      </div>

      <div className={styles.inputContainer}>
        <span>País</span>
        <select
          className={styles.formInput}
          {...register("country", { required: true })}
        >
          <option value="">[ Seleccione ]</option>
          {countries.map(country =>(
            <option key={country.id} value={country.id}>{country.name}</option>
          ))}
          
        </select>
      </div>

      <div className={styles.inputContainer}>
        <span>Teléfono</span>
        <input
          type="text"
          className={styles.formInput}
          {...register("phone", { required: true })}
        />
      </div>

      <div className={styles.checkboxContainer}>
        <label htmlFor="checkbox">
          <input
            type="checkbox"
            className={styles.checkbox}
            //   checked
            {...register("rememberAddress")}
          />
          <div className={styles.iconContainer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </label>
        <p>¿Recordar dirección?</p>
      </div>

      <div className={styles.inputContainer}>
        <button
        type="submit"
        className={isValid
          ? styles.forwardButton
          : styles.InvalidForwardButton
        }
        disabled={!isValid}>
          Siguiente
        </button>
      </div>
    </form>
  );
};
