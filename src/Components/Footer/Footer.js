const Footer = () => {
  return (
    <div className='bg-white w-full'>
      <div className='items-center text-xl font-semibold p-2 flex justify-between'>
        <h1 className='text-xl font-semibold'>Privacy Policy</h1>
        <h1>About</h1>
      </div>
      <p className='text-center pb-2 font-bold'>
        &copy; {new Date().getFullYear()}, All Rights Reserved
      </p>
    </div>
  );
};

export default Footer;
