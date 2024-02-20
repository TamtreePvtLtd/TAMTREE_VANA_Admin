import { useState } from "react";
import {  useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ILogin} from "../interface/type";
import { useNavigate } from "react-router";
import { getLoginCridential } from "../services/LoginApi";
import { useAuthContext } from "../context/AuthContext";
import { paths } from "../routes/path";
import toast from "react-hot-toast";


const schema = yup.object().shape({
  email: yup
    .string()
    .required()
    .typeError("Please enter the Email")
    .email("Please enter a valid Email"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const { updateUserData } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: yupResolver(schema),
    mode:"all"
  });


  
  const handleLogin = async (data: ILogin) => {
     await getLoginCridential(data)
     .then((response)=>{
      if (response.data) {
        updateUserData({
          ...response.data.data!
        });
        toast.success(response.data.message)
        navigate(paths.PRODUCT);
      } else {
        updateUserData(null);
      }
     })  
     .catch((error) => {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An error occurred while logging in.');
      }
      console.error("Error occurred during login:", error);
    });
};

    

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
      }}
    >
      <Box>
        <Typography variant="h6" align="center" my={2}>
          <b>Login</b>
        </Typography>
        <form onSubmit={handleSubmit(handleLogin)}>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600, opacity: 0.7 }}>
              Email<span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              variant="outlined"
              margin="dense"
              size="small"
              fullWidth
              type="email"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message?.toString()}
              autoComplete="new"
              required
            />
          </Box>

          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600, opacity: 0.7 }}>
              Password<span style={{ color: "red" }}>*</span>
            </Typography>
            <TextField
              variant="outlined"
              size="small"
              margin="dense"
              fullWidth
              type={showPassword ? "text" : "password"}
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message?.toString()}
              required
              autoComplete="new"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 3 }}
            type="submit"
          >
            Login
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
