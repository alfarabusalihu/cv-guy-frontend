import { MediumSquareFilled } from '@ant-design/icons';
import { Button, Form, Input, message, Modal } from 'antd'
import { useForm } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';
import axios from 'axios';
import React, { useState } from 'react'

export const EmailForm = () => {
  const [form]=Form.useForm()
  const [modalState,setModalState]=useState(false);

    const handleEmail = async (values:any) => {
      const { receiver, subject, body } = values;
      
      try{
        const sendEmail = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}api/email`,
          {
            to:receiver,
            subject:subject,
            body:body,
          }
          )
          message.success("Email sent successfully");
          setModalState(false)
          form.resetFields()
      }
      catch(err){
        console.log(err)
      }
  }

  
  return (
    <div>
        <MediumSquareFilled  onClick={()=>setModalState(true)}
          className="px-4 py-2 text-3xl text-white rounded hover:bg-white"/>
      <Modal
        title="Send Mail"
        open={modalState}
        onCancel={()=>setModalState(false)}
        footer={null}
        className='text-center'
      >
  <Form
      layout="vertical"
      form={form}
      style={{ maxWidth: 600 }}
      onFinish={handleEmail}
    >

      <Form.Item name="receiver" label="Receiver's email">
        <Input placeholder="Enter Email" />
      </Form.Item>
      <Form.Item name="subject" label="Subject">
        <Input placeholder="Enter the Subject" />
      </Form.Item>
       <Form.Item name="body" label="Message">
        <TextArea placeholder="Enter the message" />
      </Form.Item>
      <Form.Item style={{textAlign:"right"}}  >
        <Button type="primary" htmlType='submit'>Submit</Button>
      </Form.Item>
    </Form>
      </Modal>
      </div>
  )
}

export default EmailForm