import React, {useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
	name: yup
		.string()
		.min(8)
		.max(32)
		.required(),
	email: yup
		.string()
		.email()
		.required(),
	items: yup
		.array()
		.min(2, "Select atleast two items")
		.required(),
	password: yup
		.string()
		.required()
		.matches(
			/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
			"Password must contain at least 8 characters, one uppercase, one number and one special case character"
		),
	confirm_password: yup
		.string()
		.required()
		.when("password", {
			is: password => (password && password.length > 0 ? true : false),
			then: yup.string().oneOf([yup.ref("password")], "Password doesn't match"),
		}),
});

const Form = () =>
{
  const [selected, setSelected] = useState("")
  const [category, setCategory] = useState(null)

  const { register, handleSubmit, formState: { errors }, reset} = useForm({
      resolver: yupResolver(schema)
    });

    const onSubmit = data =>
    {
		axios.post("http://localhost:8080/form", data);
		reset()
    }
  
    useEffect(() =>
    {
      axios.get("http://localhost:8080/food")
        .then((res) => setCategory(res.data));
    }, [])
  
    const handleChange = (e) =>
    {
        setSelected(e.target.value)
  }
 
      return (
				<form className='main_form' onSubmit={handleSubmit(onSubmit)}>
					<input className='input_fields'
						{...register("name")}
						label='Name'
						name='name'
						type='text'
						placeholder='Your name'
					/>
					<p className='error_message'>{errors.name?.message}</p>
					<input className='input_fields'
						{...register("email")}
						label='Email Address'
						name='email'
						type='email'
						placeholder='Your Email'
					/>
					<p className='error_message'>{errors.email?.message}</p>
					<div class='select_options'>
						<select className='select_field' {...register("category")} onChange={handleChange}>
							{category &&
								category.map(cat => {
									return (
										<option className='show_option' value={cat.category} key={cat.category}>
											{cat.category}
										</option>
									);
								})}
						</select>

						<select className='select_field' {...register("items")} multiple>
							{category &&
								category.map(cat => {
									return cat.items.map(item => {
										if (cat.category === selected)
											return (
												<option className='show_option' value={item.name} key={item.name}>
													{item.name}
												</option>
											);
									});
								})}
						</select>
						<span>{errors.items?.message}</span>
						<input className='input_fields'
							{...register("password")}
							type='password'
							name='password'
							placeholder='Enter Password'
						/>
						<span>{errors.password?.message}</span>
						<input className='input_fields'
							{...register("confirm_password")}
							type='password'
							name='confirm_password'
							placeholder='Confirm Password'
						/>
						<span>{errors.confirm_password?.message}</span>
						<button type='submit' className='final_button'>Submit</button>
					</div>
				</form>
			);
}

export default Form
