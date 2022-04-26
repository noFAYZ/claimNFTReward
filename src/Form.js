import React, { useState } from "react";
import { useForm } from "react-hook-form";
import './App.css';

import axios from 'axios'


function Form() {

    const { register, errors, handleSubmit } = useForm();
    const [Claimed, setClaimed] = useState(false);

    const onSubmit = (data) => {
      console.log("RESULT", data);
      axios.post('https://sheet.best/api/sheets/c2938b54-29da-441c-a13b-5b9fb867eb5e',data).then(response=>{
         if(response.status === 200){
             setClaimed(true);
         }
      })


    };
    console.log(errors);

    
  if(Claimed) {
    return (
      <div > <h2 style={{"background-color":"green", "border-radius":"20px","padding":"10px 20px", "color":"white","display": "inline-block" }}>Congrats!!! You Claimed your Reward </h2>

      </div>
    )
  }

  else{
    return (
<div>
<div > <h2 style={{"background-color":"green", "border-radius":"20px","padding":"10px 20px", "color":"white","display": "inline-block" }}>Congrats!!! You own our NFT </h2>

</div>
    <div className="form-header">
    <p>
    To redeem your 30 minute live therapy please enter your first and last name and email address. Please wait 1-4 weeks for delivery. There will be an email sent to you and can redeem the session there.
    </p>

    <p>For assistance please join the discord: <br/>  <span><a href="https://discord.gg/R4uMejKJzt">{' '} https://discord.gg/R4uMejKJzt</a></span></p>
    </div>
        <form onSubmit={handleSubmit(onSubmit)}>
        <label>Name: </label>
        <input
          placeholder="Alex Jones"
          type="text"
          {...register("Name", { required: true, maxLength: 80 })}
        />

        <label>Email: </label>
        <input
          placeholder="username@website.com"
          type="text"
          {...register("Email", {
            required: true,
            pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          })}
        />
      

  
        <input type="submit" />
      </form>
      </div>

      )}
}

export default Form;
