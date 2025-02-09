import { Footer, Header } from "../common/User";
import { Outlet } from "react-router-dom";


export default function MainLayouts() {
  return (
    < >
      <Header />

      {/* <section  > */}
      <Outlet />
      {/* </section> */}

      <Footer />
    </>
  )
}


