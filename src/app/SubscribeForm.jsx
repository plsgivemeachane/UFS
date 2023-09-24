import React, { useEffect } from 'react';

const SubscribeForm = () => {
  useEffect(() => {
    // Load jQuery from CDN
    const script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // Once jQuery is loaded, you can use it here
      (function ($) {
        // jQuery code here
        window.fnames = new Array();
        window.ftypes = new Array();
        fnames[0] = 'EMAIL';
        ftypes[0] = 'email';
        fnames[1] = 'FNAME';
        ftypes[1] = 'text';
        fnames[2] = 'LNAME';
        ftypes[2] = 'text';
        fnames[3] = 'ADDRESS';
        ftypes[3] = 'address';
        fnames[4] = 'PHONE';
        ftypes[4] = 'phone';
        fnames[5] = 'BIRTHDAY';
        ftypes[5] = 'birthday';
      })(jQuery);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
  };

  return (
    <div id="mc_embed_shell">
      <link
        href="//cdn-images.mailchimp.com/embedcode/classic-061523.css"
        rel="stylesheet"
        type="text/css"
      />
      <style type="text/css">
        {`
          #mc_embed_signup {
            background: #fff;
            clear: left;
            font: 14px Helvetica, Arial, sans-serif;
            width: 600px;
            color: black;
            padding: 10px;
            margin-top: 10px;
          }
          /* Add your own Mailchimp form style overrides in your site stylesheet or in this style block.
             We recommend moving this block and the preceding CSS link to the HEAD of your HTML file. */
        `}
      </style>
      <div id="mc_embed_signup">
        <form
          action="https://gmail.us5.list-manage.com/subscribe/post?u=57fb816d7b4b895e29c3c7c33&amp;id=6965541565&amp;f_id=000320ebf0"
          method="post"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          className="validate"
          target="_blank"
          onSubmit={handleSubmit}
        >
          <div id="mc_embed_signup_scroll">
            <h2>Subscribe</h2>
            <div className="indicates-required">
              <span className="asterisk">*</span> indicates required
            </div>
            <div className="mc-field-group">
              <label htmlFor="mce-EMAIL">Email Address <span className="asterisk">*</span></label>
              <input type="email" name="EMAIL" className="required email" id="mce-EMAIL" required="" value="" />
              <span id="mce-EMAIL-HELPERTEXT" className="helper_text"></span>
            </div>
            <div id="mce-responses" className="clear foot">
              <div className="response" id="mce-error-response" style={{ display: 'none' }}></div>
              <div className="response" id="mce-success-response" style={{ display: 'none' }}></div>
            </div>
            <div aria-hidden="true" style={{ position: 'absolute', left: '-5000px' }}>
              {/* real people should not fill this in and expect good things - do not remove this or risk form bot signups */}
              <input type="text" name="b_57fb816d7b4b895e29c3c7c33_6965541565" className='bg-white' tabIndex="-1" value="HI" />
            </div>
            <div className="optionalParent">
              <div className="clear foot">
                <input type="submit" name="subscribe" id="mc-embedded-subscribe" className="button" value="Subscribe" />
                {/* <p style={{ margin: '0px auto' }}>
                  <a href="http://eepurl.com/iAldwI" title="Mailchimp - email marketing made easy and fun">
                    <span style={{ display: 'inline-block', backgroundColor: 'transparent', borderRadius: '4px' }}>
                      <img
                        className="refferal_badge"
                        src="https://digitalasset.intuit.com/render/content/dam/intuit/mc-fe/en_us/images/intuit-mc-rewards-text-dark.svg"
                        alt="Intuit Mailchimp"
                        style={{ width: '220px', height: '40px', display: 'flex', padding: '2px 0px', justifyContent: 'center', alignItems: 'center' }}
                      />
                    </span>
                  </a>
                </p> */}
              </div>
            </div>
          </div>
        </form>
      </div>
      <script type="text/javascript" src="//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"></script>
    </div>
  );
};

export default SubscribeForm;
