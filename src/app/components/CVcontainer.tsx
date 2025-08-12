import axios from 'axios';
import React, { useState } from 'react'

export function CVcontainer({onuploaded}:{onuploaded:() =>void}) {
    const [file,setFile]=useState<File|null>(null)
    const [uploading,setUploading]=useState(false)

    const handleUpload=async()=>{
        if (!file) return;

        const formData=new FormData();
        formData.append("cv",file);
        setUploading(true)

        try{
            if(!formData){
                
            }
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}api/uploadcv`,formData,{
                headers:{
                    "Content-type":"multipart/form-data"
                },
            }),
            onuploaded()
        }
        catch(err){
            console.error(err);
        }
        finally{
            setUploading(false)
        }
    }

    const handleDelete=async()=>{
       try{
          await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/deletecv`);
          window.location.reload();
       }
       catch(err){
        console.error(err)
       }
    }
return (
  <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-2xl shadow-md space-y-5 max-w-md mx-auto border border-gray-200">
    <h2 className="text-xl font-bold text-gray-800">Upload Your CV</h2>
    <input
      type="file"
      className="rounded-lg p-3 bg-white border border-gray-300 w-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
      onChange={(e) => setFile(e.target.files?.[0] || null)}
    />
    <div className="flex space-x-3">
      <button
        disabled={!file || uploading}
        onClick={handleUpload}
        className={`px-4 py-2 rounded-lg text-white font-medium shadow-sm transition 
          ${!file || uploading ? "bg-green-700 cursor-not-allowed" : "bg-green-700 hover:bg-green-600"}`}
      >
        {uploading ? "Uploading..." : "Submit CV"}
      </button>

      <button
        onClick={handleDelete}
        className="bg-red-700 hover:bg-red-600 px-4 py-2 rounded-lg text-white font-medium shadow-sm transition"
      >
        Delete CV
      </button>
    </div>
  </div>
);
}
