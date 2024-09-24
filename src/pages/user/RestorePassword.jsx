import React, { useEffect, useState } from "react";
import styles from "./styles/restorepassword.module.scss";
import { UserService } from "../../service/user.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const RestorePasswordPage = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {}, []);
  const handleVerifyEmail = async () => {
    if (email == "") {
      return toast.error("Complete the fields.");
    }
    setIsLoading(true);
    try {
      const response = await UserService.verifyEmail(email);
      console.log("response: ", response);
      if (response == true) {
        setStep(step + 1);
      } else {
        toast.info("There is no account associated with the email");
      }
    } catch (error) {
      toast.error(error.message);
    }
    setIsLoading(false);
  };
  const handleChangePassword = async () => {
    if (newPassword == "") {
      return toast.error("Complete the fields.");
    }
    setIsLoading(true);
    try {
      const response = await UserService.recoverPassword(email, newPassword);
      if (response == true) {
        toast.success("Password changed successfully!");
        navigate("/user/login");
      } else {
        toast.error("Internal server error");
      }
    } catch (error) {
      toast.error(error.message);
    }
    setIsLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      // Llama a la función que quieres ejecutar
      if (step == 1) {
        handleVerifyEmail();
      } else if (step == 2) {
        handleChangePassword();
      }
    }
  };
  return (
    <main className={styles.container}>
      <h3>Restore Password</h3>

      {isLoading == false ? (
        <>
          {step == 1 && (
            <>
              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  placeholder="email@gmail.com"
                  value={email}
                  onKeyDown={handleKeyDown}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button onClick={handleVerifyEmail}>Next</button>
            </>
          )}
          {step == 2 && (
            <>
              <div>
                <label htmlFor="email">New Password:</label>
                <input
                  type="password"
                  placeholder="my pass..."
                  value={newPassword}
                  onKeyDown={handleKeyDown}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div>
                <button onClick={() => setStep(step - 1)}>Back </button>
                <button onClick={handleChangePassword}>
                  Change My Password
                </button>
              </div>
            </>
          )}
        </>
      ) : (
        <span className="loader"></span>
      )}
    </main>
  );
};

export default RestorePasswordPage;
