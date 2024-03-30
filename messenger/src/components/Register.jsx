import { Box, Card, Button } from "@radix-ui/themes";
import { useState } from "react";
import UseRegisterHook from "../hooks/UseRegisterHook.js";
import { toast } from 'react-toastify';
import UseLoginHook from "../hooks/UseLoginHook.js";

const Register = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [name, setName] = useState("");
  const [image, setImage] = useState("/src/assets/user-avatar.png");
  const [uri, setUri] = useState("");
  const [auth, setAuth] = useState(false);
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleRegister = UseRegisterHook(name, uri)
  const handleLogin = UseLoginHook(name);

  console.log(image)

  const handleRegistration = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      const metadata = JSON.stringify({
        name: "File name",
      });
      formData.append("pinataMetadata", metadata);

      const options = JSON.stringify({
        cidVersion: 0,
      });
      formData.append("pinataOptions", options);

      const res = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
          },
          body: formData,
        }
      );
      const resData = await res.json();
      setImage(`https://peach-payable-haddock-533.mypinata.cloud/ipfs/${resData.IpfsHash}`);
      setUri(resData.IpfsHash);
      console.log(resData);

      await handleRegister();
      toast("Registered")

    } catch (error) {
      console.log(error);
      toast("An error occured")
    }
  };

    return(
      <Card size="2" style={{ width: 800 , height: 800 }} className="mt-5 mb-5 mx-auto" >
        {
        auth ? 
        <Box>
           <h2 className="text-5xl">Register</h2>
      <div className="mx-auto mt-4">
        {/* <img className="w-10 h-10 rounded-full" src={image} alt="Rounded avatar" /> */}
      <div>
        <label 
      className="form-label "
      value = {name}
      onChange={(e) => setName(e.target.value)}
      > 
      Domain Name
      </label>
        </div>
        
        <input type="text" onChange={(e) => setName(e.target.value)}/> 
      </div>
       
      
        
        <div  className="mx-auto mt-4">
      <label className="form-label"> Choose File</label>
      </div>
      <div>
      <input type="file" onChange={changeHandler} />
      <div className="mx-auto mt-4">
      <Button onClick={handleRegistration()}>Register</Button>
      <h3>Already have an account <a className="text-blue text-underline" onClick={() => setAuth(false)}>login</a></h3>
      </div>
      
    </div>
        </Box>
       

    :
    <Box>
    <h2 className="text-5xl">Login</h2>
    <div className="mx-auto mt-4">
      {/* <img className="w-10 h-10 rounded-full" src={image} alt="Rounded avatar" /> */}
    <div>
      <label 
    className="form-label "
    value = {name}
    onChange={(e) => setName(e.target.value)}
    > 
    Domain Name
    </label>
      </div>
      
      <input type="text" onChange={(e) => setName(e.target.value)}/> 
    </div>
     
    
    <div>
    <div className="mx-auto mt-4">
    <Button onClick={() => handleLogin()}>Login</Button>
    <h3>Don't have an account <a className="text-blue text-underline" onClick={() => setAuth(true)}>register</a></h3>
    </div>
  </div>

    </Box>
        }
      
    </Card>  
    );
    
};

export default Register;