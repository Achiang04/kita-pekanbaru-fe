import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { MuiOtpInput } from "mui-one-time-password-input";

interface Props {
  isOpen: boolean;
  value: string;
  onChange: (value: string) => void;
  handleSubmit: () => void;
  handleResendButton: () => void;
}

const OTPModal = ({
  isOpen,
  value,
  onChange,
  handleSubmit,
  handleResendButton,
}: Props) => {
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const resendButtonHandler = () => {
    setTimeLeft(30);
    handleResendButton();
  };

  return (
    <Modal show={isOpen} centered>
      <Modal.Header>
        <Modal.Title>Insert OTP</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <MuiOtpInput value={value} onChange={onChange} length={6} />
      </Modal.Body>
      <Modal.Footer>
        <div style={{ display: "flex", marginRight: "auto", gap: "4px" }}>
          <p>Didn't receive OTP?</p>
          <button
            disabled={timeLeft !== 0}
            onClick={resendButtonHandler}
            className={`${timeLeft == 0 && "text-primary"}`}
          >
            Resend
          </button>
          {timeLeft !== 0 && (
            <p>{`(0:${String(timeLeft).padStart(2, "0")})`}</p>
          )}
        </div>
        <Button
          variant="outline-primary"
          disabled={value.length !== 6}
          onClick={handleSubmit}
        >
          Verify
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OTPModal;
