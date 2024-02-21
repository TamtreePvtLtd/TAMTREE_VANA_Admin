import { useEffect, useState } from "react";
import {  useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  TextField,
  Button,
  Box,
  Typography,
  InputAdornment,
  AppBar,
  IconButton,
  Toolbar,
  Avatar,
} from "@mui/material";
import vanaLogo from "../assets/vanalogo.png";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ILoginFormInputs} from "../interface/type";
import { useNavigate,Link } from "react-router-dom";
import { getLoginCridential,isAuthorized} from "../services/LoginApi";
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
  const togglePasswordVisibility = () => setShowPassword((show) => !show);
  
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ILoginFormInputs>({
    resolver: yupResolver(schema),  
    mode:"all"
  });

  useEffect(() => {
    checkAuthorization();
  }, []);

  const checkAuthorization = async () => {
    setIsLoading(true);
    let user;

    try {
      user = await isAuthorized();
      if (!user) {
        setIsLoading(false);
      } else {
        setIsLoading(false);
        updateUserData({ ...user });
        navigate(paths.ROOT)
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error checking authorization:", error);
      navigate(paths.LOGIN);
      
    }
  };
  
  const handleLogin = async (data: ILoginFormInputs) => {
     await getLoginCridential(data)
     .then((response)=>{
      if (response.data) {
        updateUserData({
          ...response.data
        });
        toast.success(response.message)
        navigate(paths.ORDER);
      } else {
        updateUserData(null);
        navigate(paths.ROOT)
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

  

  return (
<>
{isLoading != null && !isLoading && (
    <>
    <AppBar
        position="fixed"
        sx={{ height: "70px", display: "flex", justifyContent: "center" }}
      >
        <Toolbar>
        <Link
                  to={paths.ROOT}
                  style={{ textDecoration: "none", display: "flex" }}
                >
          <Avatar
            alt="Company Logo"
            src={vanaLogo}
            sx={{
              marginRight: 2,
              backgroundColor: "#F6F6F6",
              height: "45px",
              width: "45px",
            }}
          />
          </Link>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            VANA
          </Typography>
          
         
        </Toolbar>
      </AppBar>
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
        marginTop: "50px",
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
    </>
)}
    </>

  );
};

export default Login;
