import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
    Stack,
} from '@mantine/core';
import React from 'react';
import {Link, useNavigate  } from "react-router-dom";

export function Login() {
    const [username,setUsername]=React.useState("");
    const [password,setPassword]=React.useState("");
    const navigate=useNavigate();
    const btnLoginOnPress=(e:any)=>{
        fetch("http://localhost:8080/authenticate",{
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({"username":username,"password":password}),
          }).then((response:Response)=>{
            if(response.status==200){
                response.text().then((d)=>{
                    localStorage.setItem("Authorization","BEARER "+d);
                    navigate("/app");
                })
            }else{
                response.text().then((d)=>{
                    alert(d)
                })
            }
            
          }).catch((err:any)=>{
            console.log(err)
          })
    }

    return (
        <Container size={420} my={40}>
            <Title ta="center">
                Authentication
            </Title>
            

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <TextInput label="Email" placeholder="Enter Username"  required value={username}  onChange={(e:any)=>setUsername(e.target.value)}/>
                <PasswordInput label="Password" placeholder="Your password" required mt="md" value={password} onChange={(e:any)=>setPassword(e.target.value)}/>
                <Button fullWidth mt="xl" onClick={btnLoginOnPress}>
                    Sign in
                </Button>                
            </Paper>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
                <Anchor size="sm" component="button">
                    Forget Password ?
                </Anchor>
            </Text>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
                Do not have an account yet?{' '}
                <Anchor size="sm" component={Link} to="/register">
                    Create account
                </Anchor>
            </Text>
        </Container>
    );
}