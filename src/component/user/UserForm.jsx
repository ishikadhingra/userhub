import React, {useEffect} from 'react'
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import conf from "../../conf/conf"
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

function UserForm() {
    const {register, handleSubmit, formState : {errors, dirtyFields, isSubmitSuccessful}, reset, clearErrors, setValue} = useForm({
        defaultValues: {firstName: "", number: "", email:"", sex:""}
      });
  
      const resetForm = () => {
        reset(); // reset the form
        clearErrors(); // clear all errors 
      }
      const location = useLocation();
      const queryParams = new URLSearchParams(location.search);
      const userId = queryParams.get("id");
      const navigate = useNavigate();
  
      const onSubmit = async (data) => {
         await axios.post(`${conf.apiUrl}/create`, data).then((response) => {
          if(response.status === 200) {
            toast.success("Form submitted successfully");
          }else {
            toast.error("Form submission failed");
          }
         }).catch((error) => {
          console.log(error);
         });
      }
  
      const onUpdate = async (data) => {
        await axios.put(`${conf.apiUrl}/update/${userId}`, data).then(() => {
          toast.success("Form updated successfully");
          setTimeout(() => {
            navigate("/dashboard/user-list");
          }, 2000);
        }).catch((error) => {
          console.log(error);
        })
      }
  
      const fetchUser = async () => {
        await axios.get(`${conf.apiUrl}/get?id=${userId}`).then((response) => {
          if(response.status === 200) {
          setValue("firstName", response.data.result?.firstName);
          setValue("number", response.data.result?.number);
          setValue("email", response.data.result?.email);
          setValue("sex", response.data.result?.sex);
          }else {
            toast.error("User Details not found");
          }
        }).catch((error)=> {
          console.log(error);
        })
      }
  
      useEffect(() => {
        if(userId) {
          fetchUser();
        }
      }, [userId])   
  
      useEffect(() => {
        reset(); //Calling reset function here will reset the form after successful submission
      }, [isSubmitSuccessful])

  return (
    <div
      className='flex items-center justify-center min-h-screen'
      style={{
        background: 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)',
        transition: 'background 0.4s',
      }}
    >
      <div
        className='bg-white p-8 rounded-xl shadow-lg w-full max-w-md'
        style={{
          borderLeft: '6px solid #6366f1',
          boxShadow: '0 6px 32px rgba(80, 112, 255, 0.10), 0 1.5px 4px rgba(0,0,0,0.03)',
        }}
      >
        <h2 className='text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white'>Form</h2>
        <form onSubmit={userId ? handleSubmit(onUpdate) : handleSubmit(onSubmit)} className="space-y-4 bg-white dark:bg-gray-800">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Name</label>
            <input 
              {...register("firstName", { required: "This is required"})} 
              className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 transition-colors duration-300" 
              id="firstName" 
              placeholder="Enter your name" 
            />
            <ErrorMessage errors={errors} name="firstName" render={({ message }) => <p className="text-red-500 dark:text-red-400">{message}</p>} />
          </div>
          <div>
            <label htmlFor="number" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Mobile Number</label>
            <input 
              type='tel' 
              {...register("number", { required: true, maxLength:10})} 
              className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 transition-colors duration-300" 
              id="number" 
              placeholder="Enter your mobile number" 
            />
            {errors.number?.type === "required" && <p className='text-red-500 dark:text-red-400'>Number is required</p>}
            {errors.number?.type === "minLength" && <p className='text-red-500 dark:text-red-400'>Please enter 10 digit mobile number</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
            <input 
              type="email" 
              {...register("email", { required: true, pattern: /^[\w.-]+@([\w-]+\.)+[a-zA-Z]{2,3}$/ })} 
              className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 transition-colors duration-300" 
              id="email" 
              placeholder="Enter your email" 
            />
            {errors.email?.type === "required" && <p className='text-red-500 dark:text-red-400'>Email is required</p>}
            {errors.email?.type === "pattern" && <p className='text-red-500 dark:text-red-400'>Incorrect Email</p>}
          </div>
          <div>
            <label htmlFor="sex" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Sex</label>
            <select 
              {...register("sex", {required: true})} 
              className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300" 
              id="sex"
            >
              <option value="">Choose...</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
            {errors.sex?.type === "required" && <p className='text-red-500 dark:text-red-400'>Sex field is required</p>}
          </div>
          <div className="space-y-3">
            <button 
              type="submit" 
              className="w-full round-full py-2 px-4 bg-green-600 but text-white font-semibold rounded-md hover:bg-green-700 transition-colors duration-200 cursor-pointer"
            >
              {userId ? "Update" : "Submit"}
            </button>
            <button 
              type="button" 
              className="w-full round-full py-2 px-4 bg-red-600 but text-white font-semibold rounded-md hover:bg-red-700 transition-colors duration-200 cursor-pointer" 
              onClick={resetForm}
            >
              Reset
            </button>
          </div>
        </form>
        <ToastContainer/>
        <div>
         
        </div>
      </div>
    </div>
  )
}

export default UserForm