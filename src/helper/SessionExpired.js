import CustomAlert from "../components/CustomAlert";

function sessionExpired() {
  localStorage.removeItem("userLoginInfo");
  window.location.reload();
  CustomAlert.fire({
    icon: "warning",
    title: "Sesi Anda Telah Beraakhir!",
  });
}

export default sessionExpired;
