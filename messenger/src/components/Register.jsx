import { Box, Card, Flex, Text, TextField, Button } from "@radix-ui/themes";
import { useState } from "react";
// import { useState } from "react";

const Register = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmission = async () => {
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
      setImage(`https://yellow-permanent-cicada-618.mypinata.cloud/ipfs/${resData.IpfsHash}`);
      console.log(resData);
    } catch (error) {
      console.log(error);
    }
  };

    return(
      <Card size="2" style={{ width: 800 }} className="mt-5 mb-5 mx-auto">
      <Flex gap="" align="center">
        
      {/* <div>
        <img className="w-10 h-10 rounded-full" src={image} alt="Rounded avatar" />
      </div> */}
      <label className="form-label"> Domain Name</label>
      <input type="text" onChange={(e) => setName(e.target.value)}/>
      <label className="form-label"> Choose File</label>
      <input type="file" onChange={changeHandler} />
      <Button onClick={handleSubmission}>Submit</Button>
      </Flex>
    </Card>  
    );
    
};

export default Register;