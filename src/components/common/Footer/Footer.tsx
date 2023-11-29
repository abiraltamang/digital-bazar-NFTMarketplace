const Footer = () => {
  return (
    <div className="bg-primary text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-4 gap-4 pt-[40px] pb-10">
          <div>
            <div className="pb-5">
              <p className="font-light">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut
                modi dicta doloremque deleniti accusantium, sequi, illum
                aspernatur
              </p>
            </div>
            <div className="grid grid-flow-col gap-2">
              <img src="/facebook.png" alt="facebook-icon" className="w-5" />
              <img src="/linkedin.png" alt="linkedin-icon" className="w-5" />
              <img src="/twitter.png" alt="twitter-icon" className="w-5" />
              <img src="/youtube.png" alt="youtube-icon" className="w-5" />
              <img src="/instagram.png" alt="instagram-icon" className="w-5" />
            </div>
          </div>
          <div>
            <h4 className="font-bold pb-3">Discover</h4>
            <ul className="font-light">
              <li>Collection</li>
              <li>Search</li>
              <li>Author Profile</li>
              <li>NFT Details</li>
              <li>Account Setting</li>
              <li>Upload NFT</li>
              <li>Connect Wallet</li>
              <li>Blog</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold pb-3">Help Center</h4>
            <ul className="font-light">
              <li>About</li>
              <li>Contact Us</li>
              <li>Sign Up</li>
              <li>Login</li>
              <li>Subscription</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold pb-8">Subscribe</h4>
            <input
              type="text"
              placeholder="Enter your email*"
              className="px-2 py-2 pl-10 rounded-3xl border-none focus:outline-none  text-gray-800 pb-2"
            />
            <p className="pt-4 font-light">Blah Blah Blah Blah</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
