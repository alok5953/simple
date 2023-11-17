import './input.css';
import Header from './Components/Headers/Header';
import Footer from './Components/Footer/Footer';
import Construction from './Assets/images/construction.jpeg';
import Contractor from './Assets/images/contractor_new.jpg';
import Carpenter from './Assets/images/imgpsh_fullsize_anim.jpeg';
import Judiciary from './Assets/images/judiciary.jpeg';
import Office from './Assets/images/judiciary.jpeg';
import School from './Assets/images/school.jpeg';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Input from './Components/Input';
import { useDropzone } from 'react-dropzone';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [screen, setScreen] = useState(1);
  const [values, setValues] = useState({
    issuedPermitNumber: '',
    address: '',
    requestedInspection: '',
    name: '',
    email: '',
    communitiesEmailAddress: '',
    comments: '',
  });
  const [userType, setUserType] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      accept: 'image/jpeg, image/png, image/gif, video/mp4',
      maxFiles: 1,
      maxSize: 30 * 1024 * 1024,
      onDrop: (acceptedFiles) => {
        setSelectedFile(acceptedFiles[0]);
      },
    });

  const handleUserType = (value) => {
    setUserType(value);
    setScreen(2);
  };
  const welcomeInputHandler = () => {
    values.address === '' && toast.error('Please enter your Address');
    values.name === '' && toast.error('Please enter your Name');
    values.email === '' && toast.error('Please enter your Email');
    values.issuedPermitNumber === '' &&
      toast.error('Please enter your Permit Number');
    values.requestedInspection === '' &&
      toast.error('Please enter your Requested Inspection');
    if (
      values.address !== '' &&
      values.name !== '' &&
      values.email !== '' &&
      values.issuedPermitNumber !== '' &&
      values.requestedInspection !== ''
    ) {
      setScreen(3);
    }
  };

  const submitHandler = async () => {
    if (values.comments === '') {
      toast.error('Please input a valid comments');
    } else {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });
      formData.append('userType', userType);
      formData.append('file', selectedFile);

      console.log(formData);

      const result = await fetch(process.env.REACT_APP_API, {
        method: 'POST',
        headers: {
          'x-api-key': `${process.env.REACT_APP_API_KEY}`,
          platform: process.env.REACT_APP_platform,
        },
        body: formData,
      });

      const response = await result.json();
      console.log(response);
    }
  };

  const inputList = [
    {
      type: 'text',
      label: 'Issue Permit Number*',
      placeholder: 'Enter Issue Permit Number',
      className: 'pt-2',
      name: 'issuedPermitNumber',
    },
    {
      type: 'text',
      label: 'Address*',
      placeholder: 'Enter Your Address',
      name: 'address',
      className: 'pt-2',
    },
    {
      type: 'text',
      label: 'Requested Inspection*',
      placeholder: '',
      className: 'pt-2',
      name: 'requestedInspection',
    },
    {
      type: 'text',
      label: 'Your Name*',
      placeholder: 'Enter Your Name',
      className: 'pt-2',
      name: 'name',
    },
    {
      type: 'text',
      label: 'Your Email Address*',
      placeholder: 'Enter Your Email Address',
      className: 'pt-2',
      name: 'email',
    },
    {
      type: 'text',
      label: 'Your Communities Email Address',
      placeholder: 'Enter Your Communities Email Address',
      className: 'pt-2',
      name: 'communitiesEmailAddress',
    },
  ];
  const handleInputChange = (e) => {
    const name = e.target.name;
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const userOccupation = [
    {
      value: 'Home Owner',
      label: Carpenter,
    },
    {
      value: 'Contractor',
      label: Contractor,
    },
    {
      value: 'Design Professional',
      label: Office,
    },
    {
      value: 'Construction Development',
      label: Construction,
    },
    {
      value: 'Public Schools',
      label: School,
    },
    {
      value: 'Jurisdiction Employee',
      label: Judiciary,
    },
  ];

  const Usertype = (
    <div className='flex justify-center items-center min-h-screen md:min-h-0 p-8'>
      <div>
        <h1 className='py-3 font-bold text-2xl'>Select User Type</h1>
        <div className=''>
          <div className='grid grid-cols-2 gap-8 max-w-screen-md'>
            {userOccupation.map((user, i) => {
              return (
                <button onClick={() => handleUserType(user.value)}>
                  <div className='bg-white pt-4 rounded-lg shadow-lg'>
                    <div className='flex justify-center'>
                      <img
                        className='rounded-lg object-cover w-4/5 h-4/5'
                        src={user.label}
                        alt={user.value}
                      />
                    </div>
                    <h1 className='text-center text-xl font-semibold'>
                      {user.value}
                    </h1>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  const Welcome = (
    <div className='md:flex justify-center'>
      <div className=' min-h-screen max-w-screen-sm md:w-full md:min-h-0 p-2 pt-16'>
        <h1 className='pt-6 font-bold text-l'>Welcome!</h1>
        <p className='text-sm'>
          Please entere the following information below.
        </p>

        {inputList.map((input, i) => {
          return (
            <Input
              key={i}
              name={input.name}
              type={input.type}
              label={input.label}
              changeHandler={handleInputChange}
              placeholder={input.placeholder}
              className={input.className}
            />
          );
        })}
        <button
          onClick={welcomeInputHandler}
          className='text-center w-full py-2 mt-4 rounded-lg bg-indigo-500 text-white'
        >
          Continue
        </button>
      </div>
    </div>
  );

  const uploadedFiles = () => {
    if (selectedFile !== null) {
      if (selectedFile.type.startsWith('image')) {
        console.log(selectedFile);
        return (
          <div>
            <h1>Image Preview</h1>
            <img
              src={URL.createObjectURL(selectedFile)}
              alt={selectedFile.name}
            />
          </div>
        );
      } else if (selectedFile.type.startsWith('video')) {
        return (
          <div>
            <h1>Video Preview</h1>
            <video src={URL.createObjectURL(selectedFile)} controls></video>
          </div>
        );
      }
    }
  };

  const Projectinformaion = (
    <div className='md:flex justify-center p-2'>
      <div className=' min-h-screen md:w-2/5 md:min-h-0  p-2 pt-16'>
        <h1 className='pt-6 font-bold text-l'>Enter Project Information</h1>
        <div className='w-full pt-3 flex flex-col'>
          <label htmlFor='comments'>Comments*</label>
          <textarea
            className='pt-2 mt-2'
            name='comments'
            placeholder='Enter Your Comments here'
            onChange={handleInputChange}
            id=''
            cols='30'
            rows='5'
          ></textarea>
        </div>
        <div className='w-full'>
          <label
            htmlFor='Uploadfiles'
            className='block text-l font-bold text-gray-700 pt-2'
          >
            Upload Images and Video
          </label>
          <p>PNG,JPG,GIF amd MP4 files are allowed</p>
          <div className='mt-2'>
            <div className='w-full bg-blue-50'>
              <div
                {...getRootProps()}
                className={`border rounded-lg border-dashed border-blue-600 p-12 mb-4 ${
                  isDragActive ? 'bg-gray-200' : ''
                } ${isDragReject ? 'bg-red-200' : ''}`}
              >
                <input {...getInputProps()} />
                <div className='flex flex-col justify-center items-center'>
                  <span className='text-gray-400 text-sm mx-2'>
                    <span className='text-black text-base text-sm mx-2'></span>
                    Upload images and video here
                  </span>
                </div>
              </div>
            </div>

            {uploadedFiles()}
            <button
              onClick={submitHandler}
              className='text-center w-full py-2 mt-4 w-2/3 mx-auto rounded-lg bg-indigo-500 text-white'
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div class='flex flex-col min-h-screen'>
      <Header />
      <ToastContainer />
      <main class='flex-grow'>
        <div className='app_id'>
          {screen === 1 && Usertype}
          {screen === 2 && Welcome}
          {screen === 3 && Projectinformaion}
        </div>
      </main>
      <footer class='mt-auto'>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
