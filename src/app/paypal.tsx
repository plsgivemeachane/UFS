import { useEffect } from 'react';

function Paypal() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://www.paypal.com/sdk/js?client-id=Abw2MEAV1ALP_NdVkOhQkPWdlV8FB9iBe-KJoQ7L7tLgvcUZhR4ZVzIuyv68QfJkt7-iVxw_YFwBvlkz&vault=true&intent=subscription";
    script.setAttribute('data-sdk-integration-source', 'button-factory');
    script.onload = () => {
      (window as any).paypal.Buttons({
        style: {
          shape: 'rect',
          color: 'gold',
          layout: 'vertical',
          label: 'subscribe',
        },
        createSubscription: function(data: any, actions: any) {
          return actions.subscription.create({
            plan_id: 'P-6AS93140BX224934WMUHYAXQ'
          });
        },
        onApprove: function(data: any, actions: any) {
          alert(data.subscriptionID);
        }
      }).render('#paypal-button-container-P-6AS93140BX224934WMUHYAXQ');
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div id="paypal-button-container-P-6AS93140BX224934WMUHYAXQ" className='p-4 bg-transparent'></div>
  );
}

export default Paypal;
