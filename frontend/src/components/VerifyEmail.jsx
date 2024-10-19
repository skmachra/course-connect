import { useEffect } from "react";
import { useParams } from "react-router-dom";
import conf from "./conf";

const VerifyEmail = () => {
  const { token } = useParams();

  useEffect(() => {
    const verifyEmail = async () => {
      const response = await fetch(`${conf.apiUrl}/api/users/verify/${token}`);
      const data = await response.json();
      alert(data.message);
    };

    verifyEmail();
  }, [token]);

  return (
    <div>
      <h1>Email Verification</h1>
      <p>Verifying your email...</p>
    </div>
  );
};

export default VerifyEmail;
