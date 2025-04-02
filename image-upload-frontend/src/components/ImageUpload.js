import React, { useState, useEffect } from "react";

const ImageUpload = () => {
  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch("http://localhost:5000/images");
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile || !name || !description) {
      alert("Please fill all fields!");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("name", name);
    formData.append("description", description);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Image uploaded successfully!");
        fetchImages(); // Refresh images
      } else {
        alert("Upload failed!");
      }
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
    <h2 style={{ textAlign: "center", color: "#333" }}>Upload an Image</h2>
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: "8px", width: "80%", borderRadius: "5px", border: "1px solid #ccc" }}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ padding: "8px", width: "80%", borderRadius: "5px", border: "1px solid #ccc" }}
      />
      <input type="file" onChange={handleFileChange} style={{ padding: "8px" }} />
      <button
        onClick={handleUpload}
        style={{ padding: "10px 20px", background: "#007BFF", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}
      >
        Upload
      </button>
    </div>
    
    <h2 style={{ textAlign: "center", marginTop: "20px", color: "#333" }}>Uploaded Images</h2>
    <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", justifyContent: "center" }}>
      {images.map((image) => (
        <div key={image.id} style={{
          width: "250px",
          padding: "10px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          background: "#fff"
        }}>
          <h3 style={{ fontSize: "16px", margin: "5px 0" }}>{image.name}</h3>
          <p style={{ fontSize: "14px", color: "#555" }}>{image.description}</p>
          <img src={`http://localhost:5000${image.image_url}`} alt={image.name} width="100%" style={{ borderRadius: "5px" }} />
        </div>
      ))}
    </div>
  </div>

  );
};

export default ImageUpload;
