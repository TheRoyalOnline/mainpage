import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';
import Login from "./Login";

const popup = withReactContent(Swal);

export const ShowLogin = () => {
    popup.fire({
        title: 'Royal Online',
        html: <Login/>,
        showCloseButton: true,
        showConfirmButton: false,
    });
};