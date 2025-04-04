import { useRef, useEffect } from 'react';
import { usePopupForm } from '../../hooks/usePopupForm';
import FormContent from './FormContent';

function PopupForm() {
  const { isVisible, setIsVisible } = usePopupForm();
  const modalRef = useRef<HTMLDivElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);

  const handleFormSubmit = (data: { name: string; email: string }) => {
    console.log('Form Data:', data);
    setIsVisible(false); // Close the pop-up after submission
  };

    // Close the modal when clicking outside the modal content
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsVisible(false);
      }
    };

    // Manage focus when the modal opens or closes
  useEffect(() => {
    if (isVisible) {
      modalRef.current?.querySelector('input')?.focus(); // Focus the first input in the modal
    } else {
      openButtonRef.current?.focus(); // Return focus to the open button
    }
  }, [isVisible]);

  return (
    <>
      {/* Button to open the form */}
      <button className="btn btn-primary"
      onClick={() => setIsVisible(true)}
      aria-haspopup="dialog"
      aria-expanded={isVisible} 
      ref ={openButtonRef}>
        Open Form
      </button>

      {/* Pop-up form */}
      {isVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={handleOverlayClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="popup-title">
          <div className="card w-96 bg-base-100 shadow-xl"
          ref={modalRef}>
            <div className="card-body">
              <h2 id ="popup-title" className="card-title text-center">Enter Your Details</h2>
              <FormContent
                onSubmit={handleFormSubmit} // Pass the submit handler
                onCancel={() => setIsVisible(false)} // Close the pop-up on cancel
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PopupForm;